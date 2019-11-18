const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();
const corsMiddleware = cors();
const port = 4000;

app.use(corsMiddleware);
app.use(jsonParser);

app.listen(port, () => console.log(`Listening on port ${port}`));