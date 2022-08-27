const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
app = express();
// const app = require('./app');
// const http = require('http');
// const cors = require('cors');
const { PORT } = require('./utils/config');
const connectToDB = require('./db');

// const loginUser = require('./controllers/auth');

connectToDB();

// const server = http.createServer(app);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static('/client/build'));
// // }

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .send({ error: 'No account with this email has been registered.' });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).send({ error: 'Invalid credentials.' });
  }

  const payloadForToken = {
    id: user._id,
  };

  // const token = jwt.sign(payloadForToken, SECRET);
  const token = payloadForToken;

  res
    .status(200)
    .send({ token, displayName: user.displayName, email: user.email });
});

app.post('/api/register', async (req, res) => {
  const { displayName, email, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ error: 'Password needs to be atleast 6 characters long.' });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send({ error: 'Valid email address is required.' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .send({ error: 'An account with this email already exists.' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    displayName,
    email,
    passwordHash,
  });
  console.log('AUTH.JS[64]:: ', displayName, email, passwordHash);
  const savedUser = await user.save();
  console.log('SaveUser[66]: ', savedUser);

  const payloadForToken = {
    id: savedUser._id,
  };
  // const token = jwt.sign(payloadForToken, SECRET);
  const token = payloadForToken;

  console.log('Tokem[73]: ', token);
  res.status(200).send({
    token,
    displayName: savedUser.displayName,
    email: savedUser.email,
  });
});

app.listen(PORT, console.log(`Serer running on port ${PORT}`));
