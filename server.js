const express = require('express')
const app = express();

app.get('/', (req, res) => {
   res.render('/html/main')
});

app.listen(8080, (req, res) => {
   console.log('server on! http://localhost:8080');
});

