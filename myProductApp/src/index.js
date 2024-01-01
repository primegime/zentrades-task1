const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

async function fetchData() {
    try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        let products = Object.values(response.data.products);
        products.sort((a, b) => b.popularity - a.popularity);
        return products;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

app.get('/', async (req, res) => {
    const products = await fetchData();
    let html = '<h1>Product List</h1><table><tr><th>Title</th><th>Price</th><th>Subcategory</th><th>Popularity</th></tr>';
    products.forEach(product => {
        html += `<tr><td>${product.title}</td><td>$${product.price}</td><td>${product.subcategory}</td><td> ${product.popularity}</td></tr>`;
    });
    html += '</table>';
    res.send(html);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = app
