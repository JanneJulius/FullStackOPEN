const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  return(
    <p style={{fontWeight: 'bold'}}>
      total of {parts.reduce((sum, i) =>  sum + i.exercises,0)} exercises
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key = {part.id} part = {part}/>)}  
  </>

const Course = ({ course }) =>{
  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts = {course.parts}/>
    </>
  )
}

const Courses = ({courses}) => {
  return (
    <>
      {courses.map(course => <Course key={course.id} course={course} />) }
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses}/>
    </div>
  )
}

export default App