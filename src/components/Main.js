import React from 'react';
import ConvertData from './Util'
import Question from './Question';
import Loading from './Loading';

export default function Main(){
    const [data, setData] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(true)

    async function fetchApi(){
        const response=await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy')
        const apiData=await response.json()
        setData(ConvertData(apiData.results));
        setIsLoading(false)
    }

    React.useEffect(()=>{
        fetchApi()
    },[])

    function selectAnswer(id,answer){
        setData(prevData=>{
            return prevData.map(item=>{
                if(id===item.id){
                    item.selected=answer
                    return item
                }
                return item
            })
        })
    }

    function checkAnswers(e){
        if(e.target.innerText==="Check answers"){
            let count=0;
            data.forEach(item=>{
                if(item.selected===item.correct_answer){
                    count++;
                }
            })
            setScore(count)
            setChecked(true)
        }
        else{
            fetchApi()
            setChecked(false)
            setScore(0)
            setIsLoading(true)
        }
    }
    
    return (
        <div className="main flex">
            <div className="rectangle"></div>
            {isLoading ? 
                <Loading /> : 
                <div className="main--content">
                    {data.map(item=>{
                        return <Question 
                            key={item.id}
                            id={item.id}
                            question={item.question} 
                            options={item.options}
                            selected={item.selected}
                            selectAnswer={selectAnswer}
                            correct_answer={item.correct_answer}
                            checked={checked}
                        />
                    })}
                    <div className="main--btn--container">
                        <p
                            style={checked?{marginRight:'20px'}:{}}
                        >
                            {checked?`You scored ${score}/5 correct answer`:''}
                        </p>
                        <button
                            className="btn main--btn"
                            onClick={checkAnswers}
                        >
                            {checked?"Play again":"Check answers"}
                        </button>
                    </div>
                </div>
            }
            
            <div className="circle"></div>
        </div>
    )
}