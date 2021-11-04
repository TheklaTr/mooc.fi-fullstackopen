import { CoursePart } from './../types';
import React from 'react';
import { assertNever } from './../utils';

const Part = (part: CoursePart) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(part);
  }
};

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return <div>{courses.map((part) => Part(part))}</div>;
};

export default Content;
