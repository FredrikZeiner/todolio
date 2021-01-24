import express from 'express';

const app = express();

app.all('*', (req, res) => {
  res.send('OK');
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
