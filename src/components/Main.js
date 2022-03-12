import React from 'react';
import ConvertData from './Util'
import Question from './Question';
import Loading from './Loading';
import GetUrl from './GetUrl';
import Error from './Error';

export default function Main({choice, resetQuiz}){
    const [data, setData] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorOccured, setErrorOccured] = React.useState(false);
    const [changeQuestion, setChangeQuestion] = React.useState(true);

    React.useEffect(()=>{
        async function fetchApi(){
            try{
                const url = GetUrl(choice);
                const response=await fetch(url)
                const apiData=await response.json()
                setData(ConvertData(apiData.results));
                setIsLoading(false)
            }catch(err){
                if(err)
                    setErrorOccured(true);
            }
        }
        if(changeQuestion){
            fetchApi();
            setChangeQuestion(false);
        }
    },[choice, changeQuestion])

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
            setChangeQuestion(true);
            setChecked(false)
            setScore(0)
            setIsLoading(true)
        }
    }
    
    return (
        <div className="main flex">
            <div className="rectangle"></div>
            {errorOccured ?
                <Error /> :
                isLoading ? 
                <Loading /> : 
                <div className="main--content">
                    {data.map((item, index)=>{
                        return <Question 
                            key={item.id}
                            index={index}
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
                            {checked?`You scored ${score}/${data.length} correct answer`:''}
                        </p>
                        <button
                            className="btn main--btn"
                            onClick={checkAnswers}
                        >
                            {checked?"Play again":"Check answers"}
                        </button>
                    </div>
                    <div className="flex reset-btn-container">
                        <button 
                            style={!checked ? {display : 'none'} : {display : "block"}} 
                            className="btn reset--btn"
                            onClick={()=>resetQuiz(false)}
                        >
                            Reset Settings
                        </button>
                    </div>
                </div>
            }
            
            <div className="circle"></div>
        </div>
    )
}