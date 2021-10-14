import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
   const { daily_exercises, target } = req.body as {
      daily_exercises: Array<number>;
      target: number;
   };

   if (!daily_exercises || !target) {
      res.status(400).send({ error: 'parameters missing' });
   }

   // check if daily_exercises is an array
   if (!Array.isArray(daily_exercises)) {
      res.status(400).send({ error: 'malformatted parameters' });
   }

   // check if every elements is number
   const isNumbers = daily_exercises.every(
      (hour: number): boolean => typeof hour === 'number'
   );

   if (isNaN(target) || !isNumbers) {
      res.status(400).send({ error: 'malformatted parameters' });
   }

   const result = calculateExercises(daily_exercises, target);
   res.status(200).json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
