const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { pick, find, compose } = require('lodash/fp');

const app = express();

const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'ipochvamdabegambate';
const expiresIn = '48h';

const getJSONPath = filename => path.join(__dirname, `./json/${filename}.json`);
const saveJSON = (jsonFilename, data) => fs.writeFileSync(
  getJSONPath(jsonFilename),
  JSON.stringify(data)
);
const getJSON = compose(
  JSON.parse,
  fs.readFileSync,
  getJSONPath,
)

function createToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn });

  return token;
}

function verifyToken(token) {
  const verificationResult = jwt.verify(token, SECRET_KEY, (err, decode) => decode || err);

  return verificationResult;
}

function findUser({ email, passHash }) {
  const userDb = getDbData();
  const user = userDb.users.find(u => u.email === email && u.passHash === passHash);

  return user;
}

function authenticatedMiddleware(req, res, next) {
  const bearerToken = req.headers.authorization;
  try {
    const pureTokenValue = bearerToken.replace('Bearer ', '');
    const verifiedToken = verifyToken(pureTokenValue);

    if (verifiedToken.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Expired token', code: 190 });
    }

    req.user = verifiedToken;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ mesage: 'Unauthorized' });
  }
}

const validateBody = (keys, body) => keys && body && keys.every(k => Boolean(body[k]));

app.post('/auth/register', (req, res) => {
  const userKeys = ['firstName', 'lastName', 'password', 'username'];
  const validRequestBody = validateBody(userKeys, req.body);
  
  if (!validRequestBody) {
    return res.status(400).send({
      success: false,
      message: `Missing one of props ${userKeys.join(', ')}`,
    });
  }

  const users = getJSON('users').concat(
    pick(userKeys, req.body),
  );

  saveJSON('users', users);
  return res.status(201).send({ success: true, message: 'Register success!' });
});

app.put('/auth/login', (req, res) => {
  const { username, password } = req.body;

  const users = getJSON('users');
  const targetUser = find({ username, password }, users);
  if (!targetUser) {
    return res.status(400).send({
      success: false,
      message: 'Invalid credentials!',
    });
  }

  const payload = pick(targetUser, ['username', 'firstName', 'lastName']);
  const token = createToken(payload);

  return res.status(200).send({
    success: true,
    token,
  });
});

app.listen(
  PORT,
  () => console.log(`SERVER IS LISTENING ON PORT ${PORT}...`)
);
