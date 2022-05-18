import './StartingPage.css'

function StartingPage(props) {


    return (
        <div className='start-container'>
            <header className='start-text'>
                <h1>Quizzical</h1>
                <p>Do your best!</p>
                <button className='start-btn' onClick={props.startQuiz}>
                    Start quiz
                </button>
            </header>
        </div>
    )
}

export default StartingPage
