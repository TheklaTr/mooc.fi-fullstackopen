import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import express from 'express';
import patientRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
