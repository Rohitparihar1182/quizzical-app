import React, { useState, useEffect } from 'react';
import data from '../data/data.json';

export default function Start({startQuiz, choice, dispatch}){
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [difficulties, setDifficulties] = useState([]);

    function handleStart(){
        if(choice.amount < 5 || choice.amount > 20){
            alert('Enter the correct no. of questions');
            return;
        }
        startQuiz(true);
    }

    useEffect(()=>{
        setCategories(data.categories)
        setTypes(data.types)
        setDifficulties(data.difficulties)
    }, []);

    return (
        <main>
            
        <div className="start flex container">
            <div className="rectangle"></div>
            <div className="start--content">
                <h2 className='start--title'>Quizzical</h2>
            </div>
                <form className='data-input flex' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="amount">Number of Questions (5-20)</label>
                    <input 
                        type="number" 
                        name="amount" 
                        id='amount' 
                        onChange={(e)=>dispatch({value: 'changeAmount', e})} 
                        value={choice.amount}
                        min={5}
                        max={20}
                    />
                    <label htmlFor="category">Select Category</label>
                    <select 
                        name="category" 
                        id="category"  
                        onChange={(e)=>dispatch({value: "changeCategory", e})} 
                    >
                        {categories.map((category, index) => {
                            return <option key={index} value={category}>{category}</option>
                        })}
                    </select>
                    <label htmlFor="difficulty">Select Difficulty</label>
                    <select 
                        name="difficulty"
                        id="difficulty"
                        onChange={(e)=>dispatch({value:"changeDifficulty", e})}
                    >
                        {difficulties.map((difficulty, index)=> {
                            return <option key={index} value={difficulty}>{difficulty}</option>
                        })}
                    </select>
                    <label htmlFor="type">Select Question Type</label>
                    <select 
                        name="type" 
                        id="type" 
                        onChange={(e)=>dispatch({value:"changeType", e})}
                    >
                        {types.map((type, index)=> {
                            return <option key={index} value={type.val}>{type.name}</option>
                        })}
                    </select>
                </form>
                
                <button onClick={handleStart} className="btn start--btn">Start Quiz</button>
            
            <div className="circle"></div>
        </div>
        
        </main>
    )
}