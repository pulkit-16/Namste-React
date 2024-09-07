const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://www.swiggy.com/dapi/restaurants/list/update', req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
        console.error('Response Data:', error.response.data); // Log response data
        console.error('Response Status:', error.response.status); // Log response status
      }
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
