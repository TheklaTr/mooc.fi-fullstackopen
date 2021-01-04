import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.p} {props.ex}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part p={props.p1} ex={props.ex1} />
      <Part p={props.p2} ex={props.ex2} />
      <Part p={props.p3} ex={props.ex3} />
    </div>
  );
};

const Total = (props) => {
  const sum = props.exercises1 + props.exercises2 + props.exercises3;
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1}
        p2={part2}
        p3={part3}
        ex1={exercises1}
        ex2={exercises2}
        ex3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
