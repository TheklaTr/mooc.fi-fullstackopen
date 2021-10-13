import { calculateBmi } from './bmiCalculator';
import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
   res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
   const height = Number(req.query.height);
   const weight = Number(req.query.weight);

   if (isNaN(weight) || isNaN(height)) {
      res.status(400).send({ error: 'malformatted parameters' });
   }

   res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
   });
});

const PORT = 3002;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
