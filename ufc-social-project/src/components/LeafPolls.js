import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Image, Header } from 'semantic-ui-react';

function LeafPolls ({ openPoll, setOpenPoll, name }) {
    const [bar1, setBar1] = useState(0);
    const [bar2, setBar2] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => {
                setBar1(fighter.fighterPolls[0].yes);
                setBar2(fighter.fighterPolls[0].no);
            });
    }, [id]);

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
        fetch(`http://localhost:3001/fighterPolls/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                yes: bar1 + 1
            })
        })
        .then(r => r.json())
        .then(fighter => setBar1(fighter.yes));
    }

    function handleNo() {
        fetch(`http://localhost:3001/fighterPolls/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                no: bar2 + 1
            })
        })
        .then(r => r.json())
        .then(fighter => setBar2(fighter.no));
    }

    return (
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
                    <Header>Do you like this Fighter?</Header>
           <div className="fighter-poll">
            <br />
                <div className="fighter-option">
                    <Button content='Vote Yes' onClick={handleYes} />
                    <div id="fighter-bar" style={bar1Style}>
                        <p style={{color: 'white'}}><strong><em>{Math.ceil(yesPercentage*100)}%</em></strong></p>
                    </div>
                </div>
                <br />
                <div className="fighter-option">
                    <Button content='Vote No' onClick={handleNo} />
                    <div id="fighter-bar" style={bar2Style}>
                        <p style={{color: 'white'}}><strong><em>{Math.floor(noPercentage*100)}%</em></strong></p>
                    </div>
                </div> 
            </div>
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

export default LeafPolls;

