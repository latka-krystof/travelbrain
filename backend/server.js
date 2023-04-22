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

app.post('/chat/response', async (req, res) => {
  const location = req.body.location;
  const response1 = await openai.createChatCompletion({
    temperature: 0.5,
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a personal travel guide trained to plan customized full day itineraries for travellers. Give me times of day and a detailed explanation of what is unique about that place and how this relates to the traveler's interests. Do not include anything else before or after the plan." },
      { role: "user", content: "Plan me a full day itinerary in Santa Monica" },
      { role: "assistant", content: '9:00am - Start your day with breakfast at The Hive. This trendy spot offers delicious coffee and breakfast items, including avocado toast and breakfast burritos. \n\n10:00am - After breakfast, head over to the Santa Monica Pier. Take a walk along the boardwalk and enjoy the stunning views of the Pacific Ocean. You can also check out the amusement park, play some carnival games, and ride the Ferris wheel. \n\n12:00pm - For lunch, try out Ingo\'s Tasty Diner. This restaurant offers classic American cuisine, such as burgers and fries, as well as healthy options like salads. \n\n1:00pm - After lunch, head over to the Santa Monica State Beach. Here you can relax on the sand, take a dip in the ocean, or rent a bike to ride along the beachfront bike path. \n\n3:00pm - Next, make your way to the Third Street Promenade. This outdoor shopping center offers a wide variety of stores, including major retailers and unique boutiques. \n\n5:00pm - For dinner, try out Tar & Roses. This restaurant offers a delicious selection of small plates, as well as heartier entrees like steak and pasta. \n\n7:00pm - End your day with a movie at the AMC Dine-In Theatre. Here you can enjoy dinner and drinks while watching the latest blockbuster films.'},
      { role: "user", content: `Based on the previous template, plan me a full day itinerary in ${location}` },
    ],
  });
  const plan = response1.data.choices[0].message;
  const response2 = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      { role: "user", content: `Plan me a full day itinerary in ${location}` },
      { role: "assistant", content: plan.content },
      { role: "user", content: "Output all places suggested to visit by the above itinerary, one on each line. "},
    ],
  });
  const places = response2.data.choices[0].message.content.split('\n');
  const response = {
    plan: plan,
    places: places
  }
  res.send(response);
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


