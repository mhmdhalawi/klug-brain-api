const handleRegister = (req, res, database, bcrypt) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json('Incorrect Submission');
  }

  const hash = bcrypt.hashSync(password);

  database
    .transaction(trx => {
      trx
        .insert({
          email: email,
          hash: hash
        })
        .into('login')
        .returning('email')
        .then(logEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: logEmail[0],
              name: name,
              joined: new Date()
            })
            .then(user => res.json(user[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('could not register'));
};

module.exports = {
  handleRegister
};
