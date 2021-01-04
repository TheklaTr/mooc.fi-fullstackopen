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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };
  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1.name}
        p2={part2.name}
        p3={part3.name}
        ex1={part1.exercises}
        ex2={part2.exercises}
        ex3={part3.exercises}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
