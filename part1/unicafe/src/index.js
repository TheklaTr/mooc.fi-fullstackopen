import React, { useState } from 'react';

import ReactDOM from 'react-dom';

// define the buttons used for submitting feedback
const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};

// display a single statistic
const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (good === 0 && (bad === 0) & (neutral === 0)) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100 + ' %';

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} label="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutral" />
      <Button handleClick={() => setBad(bad + 1)} label="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
