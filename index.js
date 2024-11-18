require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const apiUrl = "https://gasstation.polygon.technology/amoy";

// Endpoint to fetch gas price
app.get('/getgasprice', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}`);
        const data = response.data;

        // Transform the data
        const gasPrice = {
            safeLow: data.safeLow.maxFee, // Convert Gwei to Wei
            standard: data.standard.maxFee,
            fast: data.fast.maxFee,
            fastest: data.fast.maxFee, // Use the same value as `fast` (no fastest in API response)
            blockTime: Math.round(data.blockTime), // Round to the nearest whole number
            blockNumber: data.blockNumber
        };

        res.json(gasPrice);
    } catch (error) {
        console.error('Error fetching gas prices:', error);
        res.status(500).json({ error: 'Failed to fetch gas prices' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
