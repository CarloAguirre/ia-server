const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = process.env.PORT;
const apiKey = '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';

app.use(cors());
app.use(express.json());

app.post('/api/gpt', async (req, res) => {
    
    const { input } = req.body;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: input,
        max_tokens: 150,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });
  
      const text = response.data.choices[0].text;
  
      res.status(200).send(text);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

