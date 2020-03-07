const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '7e29daceb38b4c4c901caaf8414dd52d'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to handle api request'));
};

const handleImage = (req, res, database) => {
  const { id } = req.body;
  database('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall
};
