import React from 'react';
import './App.css';
import Start from './components/Start';
import Main from './components/Main.js'

export default function App(){
    const [start, setStart] = React.useState(false);
    function handleClick(){
        setStart(true);
    }
    return (
        <div className="app">
            {!start ? <Start startQuiz={handleClick}/> : <Main/>}
        </div>
    )
}
