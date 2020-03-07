const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '19121993',
    database: 'klug-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server Test');
});

app.post('/signin', (req, res) => signIn.handleSignIn(req, res, database, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, database, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, database));

app.put('/image', (req, res) => image.handleImage(req, res, database));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
