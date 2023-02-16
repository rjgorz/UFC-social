import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LeafPoll } from 'react-leaf-polls'
import { Modal, Button, Image, Header } from 'semantic-ui-react';

function LeafPolls ({ openPoll, setOpenPoll, name }) {

    const [polls, setPolls] = useState([]);
    const [pollAnswers, setPollAnswers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => {
                setPolls(fighter.fighterPolls)
                // console.log(fighter.fighterPolls);
            });
    },[]);
    console.log(polls);
    console.log(polls[0]?.text);
    
    

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
    }     

    const pollQuestion = "Do you like this fighter?";
    const answers = {
        option: polls[0]?.text,
        votes: polls[0]?.votes
}; 

    const pollOptions = polls.map((poll) => {
        return (
            <Modal.Group key = {poll.id}>
                <Modal
                   onClose={() => setOpenPoll(false)}
                   onOpen={() => setOpenPoll(true)}
                   open={openPoll}
                   trigger={<Button className='poll-btn' content='Champion Poll' icon ="chart bar outline" />}
                >
                    <Modal.Header>
                        <Image size='small' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/2560px-UFC_Logo.svg.png' wrapped />
                        <Header>{name}</Header>
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>FIGHTER POLL</Header>
                            <LeafPoll
                                question={pollQuestion}
                                answers = {answers}
                                onVote={handleVote}
                            />
                            <br />
                        </Modal.Description>
                    </Modal.Content>
                </Modal> 
            </Modal.Group>
        )
    })


    return (
        <div></div>
        // {pollOptions}
    );
}

export default LeafPolls;

