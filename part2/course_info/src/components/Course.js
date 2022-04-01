const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
    return (
    <p>
        {part.name} {part.exercises}
    </p>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part => <Part key={part.id} part={part}/>
        )
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total sum={course.parts.map((part) => part.exercises)
            .reduce( (prev, curr) => {
                return prev+curr
            })
            }/>
        </div>
    )
}

export default Course