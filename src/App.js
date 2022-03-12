import React, { useReducer, useState } from 'react';
import './App.css';
import Start from './components/Start';
import Main from './components/Main.js'

function reducer(prevState, {value, e}){
    const newState = {...prevState}
    switch(value){
        case 'changeDifficulty':
            newState.difficulty = e.target.value;
            break;
        case 'changeAmount':
            newState.amount = e.target.value;
            break;
        case 'changeType':
            newState.type = e.target.value;
            break;
        case 'changeCategory':
            newState.category = e.target.value;
            break;
        default:
            break;
    }
    return newState
}

export default function App(){
    const [start, setStart] = useState(false);
    const [choice, dispatch] = useReducer(reducer, {
        difficulty: 'any',
        type: 'any',
        category: 'any',
        amount: 5
    })
    function handleStart(val){
        setStart(val);
    }
    return (
        <div className="app">
            {!start ? 
                <Start startQuiz={handleStart} choice={choice} dispatch={dispatch}/> : 
                <Main choice={choice} resetQuiz={handleStart}/>
            }
        </div>
    )
}
