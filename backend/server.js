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


