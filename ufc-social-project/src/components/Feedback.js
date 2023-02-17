import React, { useState, useEffect } from "react";
import { Button } from 'semantic-ui-react';

function Feedback () {
    const [bar1, setBar1] = useState(0);
    const [bar2, setBar2] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/feedbackPoll')
            .then(r => r.json())
            .then(answers => {
                console.log(answers);
                setBar1(answers.yes);
                setBar2(answers.no);
            });
    }, []);

    const totalVotes = bar1 + bar2;
    const yesPercentage = (bar1/totalVotes);
    const noPercentage = (bar2/totalVotes);
    const width1 = yesPercentage * 1127;
    const width2 = noPercentage * 1127;
    
    const bar1Style = {
        width: `${width1}px`
    }
    const bar2Style = {
        width: `${width2}px`
    }

    function handleYes() {
        fetch('http://localhost:3001/feedbackPoll', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                yes: bar1 + 1
            })
        })
        .then(r => r.json())
        .then(answers => setBar1(answers.yes));
    }

    function handleNo() {
        fetch('http://localhost:3001/feedbackPoll', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                no: bar2 + 1
            })
        })
        .then(r => r.json())
        .then(answers => setBar2(answers.no));
    }

    return (
        <>
           <div className="poll">
            <br />
            <h2>Is This the Best Phase 2 Project Ever?</h2>
            <br />
                <div className="option">
                    <Button content='Vote Yes' onClick={handleYes} />
                    <div id="bar" style={bar1Style}>
                        <p style={{color: 'white'}}><strong><em>{Math.ceil(yesPercentage*100)}%</em></strong></p>
                    </div>
                </div>
                <br />
                <div className="option">
                    <Button content='Vote No' onClick={handleNo} />
                    <div id="bar" style={bar2Style}>
                        <p style={{color: 'white'}}><strong><em>{Math.floor(noPercentage*100)}%</em></strong></p>
                    </div>
                </div>
           </div>
        </>
        );
};
        
export default Feedback;