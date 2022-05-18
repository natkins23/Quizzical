import parse from 'html-react-parser'
import Answer from '../Answer/Answer'

function Question(props) {
    let questionId = props.id

    const renderAnswers = props.answers.map((a) => {
        return (
            <Answer
                key={a.id}
                answer={a.answerText}
                isCorrect={a.isCorrect}
                isSelected={a.isSelected}
                selectAnswer={() => props.selectAnswer(questionId, a.id)}
                showAnswers = {props.showAnswers}

            />
        )
    })
    return (
        <>
            <pre>{parse(props.question)}</pre>
            <div className='answers-container'>{renderAnswers}</div>
        </>
    )
}
export default Question
