import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Poll from 'react-polls';
import { Modal, Button, Image, Header } from 'semantic-ui-react';

function ModalPoll ({ openPoll, setOpenPoll, name }) {

    const [polls, setPolls] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => setPollAnswers(fighter.fighterPolls));
    }, [id]);
    
    const [pollAnswers, setPollAnswers] = useState([]);

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
    const answers = [
        { option: "Yes", votes: 7 },
        { option: "No", votes: 2 },
        { option: "I don't know", votes: 1 }
    ];   

    return (
        <Modal
            // key={poll.id}
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
                    <Poll
                        question={pollQuestion}
                        answers={answers}
                        onVote={handleVote}
                    />
                    <br />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button
                content="Close Window"
                labelPosition='right'
                icon='close'
                color='red'
                onClick={() => setOpenPoll(false)}
                positive
            />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalPoll;