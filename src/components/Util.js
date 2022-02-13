import {nanoid} from 'nanoid'

function correctQuestion(question){
    let correctQues="";
    let incorrectWord=false;
    for(let i=0;i<question.length;i++){
        if(incorrectWord){
            if(question[i]===';'){
                incorrectWord=false;
            }
            continue
        }
        if(question[i]==='&'){
            incorrectWord=true;
            continue
        }
        correctQues+=question[i]
    }
    return correctQues;
}

function create_options(incorrect_answers, correct_answer){
    let options=incorrect_answers.slice()
    const randomIndex=Math.floor(Math.random()*(incorrect_answers.length+1))
    options.splice(randomIndex,0,correct_answer)
    return options
}

export default function ConvertData(rawData){
    let mainData=[]
    rawData.forEach((item,index)=>{
        mainData[index]={
            id:nanoid(),
            question:correctQuestion(item.question),
            options:create_options(item.incorrect_answers, item.correct_answer),
            correct_answer:item.correct_answer,
            selected:""
        }
    })
    return mainData
}