import React from 'react';

export default function Start(props){
    return (
        <div className="start flex container">
            <div className="rectangle"></div>
            <div className="start--content">
                <h2 className='start--title'>Quizzical</h2>
                <p className='start--desc'>Take a short quiz in less than 15 seconds</p>
                <button onClick={props.startQuiz} className="btn start--btn">Start Quiz</button>
            </div>
            <div className="circle"></div>
        </div>
    )
}