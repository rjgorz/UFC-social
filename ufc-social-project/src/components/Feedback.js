import React, { useState } from "react";
import Poll from "react-polls";

function Feedback () {


    const pollQuestion = "This is the best Phase 2 Project?";
    const answers = [
        { option: "Yes", votes: 7 },
        { option: "No", votes: 2 },
        { option: "I don't know", votes: 1 }
    ];

    const [pollAnswers, setPollAnswers] = useState([...answers]);

    const handleVote = (voteAnswer) => {
        setPollAnswers((pollAnswers) => 
            pollAnswers.map((answer) => 
                answer.option === voteAnswer
                    ? {
                        ...answer,
                        votes: answer.votes + 1
                    }
                    : answer
            )
        );
    };

    return (
        <>
            <Poll
            question={pollQuestion}
            answers={pollAnswers}
            onVote={handleVote}
            />
        </>
        );
};
        
export default Feedback;