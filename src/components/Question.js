import React from 'react';

const selectedStyle={
    backgroundColor:'#D6DBF5'
}
const trueAns={
    backgroundColor:'#94D7A2'
}
const falseAns={
    backgroundColor:'#F8BCBC'
}

export default function Question(props){
    return (
        <div className="question--container">
            <h3 className='question'>{props.question}</h3>
            <ul className='options flex'>
                {props.options.map((option,index)=>{
                    return <li key={index}
                        onClick={()=> props.selectAnswer(props.id,option)}
                            // set Style function   
                        className='option' 
                        style={
                            props.checked?
                            props.selected===option?
                            option===props.correct_answer?
                            trueAns:
                            falseAns:
                            option===props.correct_answer?
                            trueAns:
                            {}:
                            props.selected===option?
                            selectedStyle:
                            {}
                        }
                        name={option}
                        >
                        {option}
                    </li>
                })}
            </ul>
            <span className="rule"></span>
        </div>
    )
}