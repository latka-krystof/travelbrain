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
  const age = req.body.age;
  const travellers = req.body.travellers;
  const historical = req.body.historical;
  if(historical == "Yes"){
    const emphasis = "The trip should prioritize visiting historical sites and museums. ";
  }
  const time = req.body.time;
  if(time == 1){
     const time_s = "Start the plan very early in the morning. "
  } else if (time == 2){
    const time_s = "Start the plan early in the morning. "
  } else if (time == 4){
    const time_s = "The plan should end late at night. "
  } else if (time == 5){
    const time_s = "Start the plan should end very late at night. "
  } 
  const budget = req.body.budget;
  if(budget == 1){
    const budget_s = "The user is extremely cost-conscious. "
  } else if (budget == 2){
    const budget_s = "The user is cost-conscious. "
  } else if (budget == 4){      
    const budget_s = "The user is seeking convenience. "
  } else if (budget == 5){
    const budget_s = "The user is seeking luxury and convenience."
  }
  const personality = req.body.personality;
  if(personality == 1){
    const personality_s = "The user is very outgoing and social."
  } else if (personality == 2){  
    const personality_s = "The user is extroverted."
  } else if (personality == 4){
    const personality_s = "The user is introverted."
  } else if (personality == 5){
    const personality_s = "The user is very introverted."
  }
  const adventure = req.body.adventure;
  if(adventure == 1){
    const adventure_s = "The user is always seeking new adventures and enjoys activities full of adrenaline. "
  } else if (adventure == 2){
    const adventure_s = "The user enjoys getting out of his comfort zone. "
  } else if (adventure == 4){
    const adventure_s = "The user is cautious and prefers to play it safe. "
  } else if (adventure == 5){
    const adventure_s = "The user is very cautious and never takes any risks. "
  }
  const open = req.body.open;
  if(open == 1){
    const open_s = "The user is very open-minded and willing to try anything. "
  } else if (open == 2){
    const open_s = "The user is mostly open-minded and open to new activities. "
  } else if (open == 4){
    const open_s = "The user is mostly conservative and prefers to stick to what he knows. "
  } else if (open == 5){
    const open_s = "The user is always conservative and prefers to stick to what he knows. "
  }
  const organized = req.body.organized;
  if(organized == 1){
    const organized_s = "The user is extremely organized and likes to plan ahead. "
  } else if (organized == 2){
    const organized_s = "The user is mostly organized, leaving little room for surprise. "
  } else if (organized == 4){
    const organized_s = "The user is mostly spontaneous and likes to go with the flow. "
  } else if (organized == 5){
    const organized_s = "The user is extremely spontaneous and likes to plan things last minute. "
  }
  const response1 = await openai.createChatCompletion({
    temperature: 0.5,
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a personal travel guide trained to plan customized full day itineraries for travellers. Give me times of day and a detailed explanation of what is unique about that place and how this relates to the traveler's interests. Do not include anything else before or after the plan. Do not include any places that do not have a specific address." },
      { role: "user", content: "Plan me a full day itinerary in Santa Monica" },
      { role: "assistant", content: '9:00am - Start your day with breakfast at The Hive. This trendy spot offers delicious coffee and breakfast items, including avocado toast and breakfast burritos. * 10:00am - After breakfast, head over to the Santa Monica Pier. Take a walk along the boardwalk and enjoy the stunning views of the Pacific Ocean. You can also check out the amusement park, play some carnival games, and ride the Ferris wheel. * 12:00pm - For lunch, try out Ingo\'s Tasty Diner. This restaurant offers classic American cuisine, such as burgers and fries, as well as healthy options like salads. * 1:00pm - After lunch, head over to the Santa Monica State Beach. Here you can relax on the sand, take a dip in the ocean, or rent a bike to ride along the beachfront bike path. * 3:00pm - Next, make your way to the Third Street Promenade. This outdoor shopping center offers a wide variety of stores, including major retailers and unique boutiques. * 5:00pm - For dinner, try out Tar & Roses. This restaurant offers a delicious selection of small plates, as well as heartier entrees like steak and pasta. * 7:00pm - End your day with a movie at the AMC Dine-In Theatre. Here you can enjoy dinner and drinks while watching the latest blockbuster films.'},
      {
        role: "user", 
        content: `Do not write anything before or after the plan but include details. Based on the previous template and separating every suggestion by a *, plan a full day itinerary for a ${age}-year old traveler, traveling ${travellers} in ${location}. ${emphasis}${time_s}${budget_s}${personality_s}${adventure_s}${open_s}${organized_s}`
      }
          ],
  });
  const plan = response1.data.choices[0].message;
  const response2 = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      { role: "system", content: "Give me all places suggested to visit by a specific itinerary and their address, separating them by a * and nothing else. Do not include anything else before or after the places."},
      { role: "user", content: `Plan me a full day itinerary in ${location}` },
      { role: "assistant", content: plan.content},
      { role: "user", content: "Give me all places suggested to visit by the above itinerary along with their address, separating them by a * and nothing else. "}
    ],
  });
  const parsed_plan = response1.data.choices[0].message.content.split('*');
  const places = response2.data.choices[0].message.content.split('*');
  const filtered_places = places.filter(place => place !== '');
  const response = {
    plan: parsed_plan,
    places: filtered_places
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

  User.create({ username: req.body.username, email: req.body.email, password: req.body.password, survey: false })
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

app.post('/survey', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    res.json({ 'error': 'we can\'t find your username :\<'})
    return;
  }
  user.survey = true;
  user.responses = req.body.responses;
  user.save()
    .then(() => res.json({ msg: "Survey filled out!" }))
    .catch(err => console.log(err))
});

app.post('/survey/responses', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    res.json({ 'error': 'we can\'t find your username :\<'})
    return;
  }
  res.json(user.responses);
});


