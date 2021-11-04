import { Part } from './../types';
import React from 'react';

const CoursePart = ({ name, exerciseCount }: Part) => {
  return (
    <div>
      <p>
        {name} {exerciseCount}
      </p>
    </div>
  );
};

const Content = ({ courses }: { courses: Part[] }) => {
  return (
    <div>
      {courses.map((part) => (
        <CoursePart
          key={part.name}
          name={part.name}
          exerciseCount={part.exerciseCount}
        />
      ))}
    </div>
  );
};

export default Content;
