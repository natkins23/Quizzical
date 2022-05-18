import './App.css'
import blob1 from './images/blob1.png'
import blob2 from './images/blob2.png'
import StartingPage from './components/StartingPage/StartingPage'
import React from 'react'
import Quiz from './components/Quiz/Quiz'

function App() {
    const [started, setStarted] = React.useState(false)

    return (
        <div className='App'>
            <img className='blob1' src={blob1} alt='blob'></img>
            <img className='blob2' src={blob2} alt='blob'></img>
            {!started && <StartingPage startQuiz={() => setStarted(true)} />}
            {started && <Quiz />}
        </div>
    )
}

export default App
