import React from "react";
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => (
        <Courses courses={course} key={course.id} />
      ))}
    </div>
  );
};

const Courses = ({ courses }) => (
  <div>
    <Header courses={courses} />
    <Content courses={courses} />
    <Sum courses={courses} />
  </div>
);

const Header = ({ courses }) => <h2>{courses.name}</h2>;
const Content = ({ courses }) =>
  courses.parts.map(course => (
    <p key={course.id}>
      {course.name}: {course.exercises}
    </p>
  ));
const Sum = ({ courses }) => {
  const reducer = (acc, curr) => acc + curr;
  const sum = courses.parts.map(course => course.exercises).reduce(reducer);
  return <h4>Total of {sum} exercises</h4>;
};

export default App;
