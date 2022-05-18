import React from 'react'
import './Quiz.css'
import Question from '../Question/Question'
import { nanoid } from 'nanoid'

//next steps
//i need to create a function to change if a value is selected
//there could be a state specifically for if its being helped, but it is already being held in state with the quizData
//  --likely i just need ot be able to updated quiz data with a function that i send.
// ---
//if i select an answer
//--look through the quiz data, find the id that matches that answer
//      ---if that answer matches call setQuizData
//            --set the isSelected propoerty of all other answers to be false and the selected answer to be true

//the page should then be rerendered

//need to rewatch the isHeld dice example in the react course
//regardless im having trouble conceptualizing it.

function Quiz(props) {
    const [quizData, setQuizData] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)

    function selectAnswer(questionId, answerId) {
        setQuizData((prevQuizData) => {
            return prevQuizData.map((q) => {
                if (q.id === questionId) {
                    q.answers.forEach((a) => {
                        a.isSelected = false
                        if (a.id === answerId) {
                            a.isSelected = true
                        }
                    })
                }
                return q
            })
        })
    }
    function getScore() {
        let score = 0
        quizData.forEach((q) => {
            q.answers.forEach((a) => {
                if (a.isCorrect && a.isSelected) score++
            })
        })
        return score
    }

    async function getData() {
        const url = `https://opentdb.com/api.php?amount=5`
        const response = await fetch(url)
        const data = await response.json()
        const result = data.results

        setQuizData(
            result.map((q) => {
                return {
                    question: q.question,
                    answers: formatAnswers(),
                    id: nanoid(),
                }
                function formatAnswers() {
                    //shuffles answers in random order (Fisher–Yates shuffle) - https://bost.ocks.org/mike/shuffle/
                    const shuffleAnswers = (answersArr) => {
                        let m = answersArr.length,
                            i,
                            t
                        while (m) {
                            i = Math.floor(Math.random() * m--)
                            t = answersArr[m]
                            answersArr[m] = answersArr[i]
                            answersArr[i] = t
                        }
                        return answersArr
                    }
                    //formats correct and incorrect answers to have necessary properties
                    const correctAnswer = {
                        answerText: q.correct_answer,
                        isCorrect: true,
                        isSelected: false,
                        id: nanoid(),
                    }
                    const incorrectAnswers = q.incorrect_answers.map((a) => {
                        return {
                            answerText: a,
                            isCorrect: false,
                            isSelected: false,
                            id: nanoid(),
                        }
                    })
                    return shuffleAnswers([correctAnswer, ...incorrectAnswers])
                }
            })
        )
    }

    React.useEffect(() => {
        getData()
    }, [])

    let renderQuestions = quizData.map((q) => {
        return (
            <Question
                key={q.id}
                question={q.question}
                answers={q.answers}
                id={q.id}
                selectAnswer={selectAnswer}
                showAnswers={showAnswers}
            />
        )
    })

    return (
        <div className='questions-container'>
            <h1>Questions</h1>
            {renderQuestions}
            {/* <p className='question'>{parse(question)}</p> */}
            {/* <pre>{console.log('quizdata', quizData)}</pre> */}
            {/* <p>{questions[0].question}</p> */}
            <button onClick={() => setShowAnswers(true)}>Check Answers</button>
            {showAnswers && <p>Score:{getScore()}</p>}
        </div>
    )
}

export default Quiz
