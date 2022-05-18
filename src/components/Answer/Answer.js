import './Answer.css'
import parse from 'html-react-parser'

function Answer(props) {
    let answerBtnColor = 'unanswered'
    if (props.isSelected) {
        answerBtnColor = 'selected'
    }
    if (props.showAnswers) {
        if (props.isCorrect) answerBtnColor = 'correctAnswer'
        if (!props.isCorrect && props.isSelected)
        answerBtnColor = 'answeredIncorrectly'
    }

    return (
        <>
            <button
                onClick={props.selectAnswer}
                className={`answer-btn ${answerBtnColor}`}
            >
                {parse(props.answer)}
            </button>
        </>
    )
}

export default Answer
