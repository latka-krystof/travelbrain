const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.MONGODB_URI,
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to DB'))
  .catch(console.error);

app.listen(3001, () => console.log('Server listening on port 3001'));

const User = require('./models/user');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/chat/response', async (req, res) => {
  const location = req.body.location;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a personal travel guide trained to plan customized day itineraries for travellers. At the end of each personal itinerary, please output a list of all the places suggested to visit, along with their address." },
        { role: "user", content: "Plan me an 8-hour itinerary in " + location },
      ],
    });
    res.send(response);
  } catch (error) {
    if (error.response) {
      res.send(error.response.data);
    } else {
      res.send(error.message);
    }
  }
});

app.post('/register', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const duplicateName = await User.findOne({ username: req.body.username });
  if (duplicateName) {
    res.json({ 'error' : 'duplicate username exists :\<'})
    return;
  }

  const duplicateEmail = await User.findOne({ email: req.body.email });
  if (duplicateEmail) {
    res.json({ 'error' : 'this email is already registered'})
    return;
  }

  User.create({ username: req.body.username, email: req.body.email, password: req.body.password })
    .then(() => res.json({ msg: "New user successfully created!" }))
    .catch(err => console.log(err));
});

app.post('/login', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    res.json({ 'error': 'we can\'t find your username :\<'})
    return;
  }

  if (user.comparePassword(req.body.password, function(err, isMatch) {
    if (err) throw err;
    if (isMatch) {
      res.json(user);
    } else {
      res.json({ 'error': 'incorrect password'})
    }
  }));
});


