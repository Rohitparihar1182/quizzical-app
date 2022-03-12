import  data from '../data/data.json'

const { trivia_categories, URL} = data;

function findCategory(category){
    for(let i = 0; i < trivia_categories.length; i++){
        if(trivia_categories[i].name === category){
            return trivia_categories[i].id
        }
    }
}

export default function GetUrl(choice){
    const {amount, category, difficulty, type} = choice;

    let url = URL
    url += `amount=${amount}`;
    if(category && category !== "any"){
        url += `&category=${findCategory(category)}`;
    }

    if(difficulty && difficulty !== "any"){
        url += `&difficulty=${difficulty}`;
    }

    if(type && type !== "any"){
        url += `&type=${type}`;
    }

    return url;
}