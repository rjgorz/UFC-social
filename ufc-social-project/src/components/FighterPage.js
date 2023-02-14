import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import Articles from './Articles';
import { useParams, Link } from 'react-router-dom';
import { Icon, Modal, Button, Image, Header } from 'semantic-ui-react';

function FighterPage() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    const AMPM = hour > 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const timestamp = `${month + 1}/${day}/${year} at ${hour}:${minutes}${AMPM}`;

    const initialInput = {
        author: "",
        comment: "",
        timestamp: "",
    }

    const [fighter, setFighter] = useState(null);
    const [fighterComments, setFighterComments] = useState([]);
    const [input, setInput] = useState(initialInput);
    const [open, setOpen] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => {
                setFighter(fighter);
                setFighterComments(fighter.comments);
            });
    }, [id]);

    if (fighter) {
        const { name, image, division, reign, description, comments } = fighter;
        const { style, stance, height, nickname } = description;

        function handleChanges(e) {
            setInput({ ...input, [e.target.name]: e.target.value });
        }

        function handleComment(e) {
            e.preventDefault();
  
            console.log(comments);
            const newComment = {
                author: input.author,
                comment: input.comment,
                timestamp: timestamp,
            }

            fetch(`http://localhost:3001/fighters/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comments: [...fighterComments, newComment]
                })
            })
                .then(r => r.json())
                .then(fighter => {
                    setFighterComments(fighter.comments);
                    console.log(fighterComments)
                    setInput(initialInput);
                });
        }

        return (
            <>
                <section>
                    <div className='fighter-title'>
                        <h2>{name}</h2>
                        <Link to={`/fighter/${id}/edit`}>
                            <Icon id='edit-btn' name='edit' size='large' color='red' link />
                        </Link>
                        <img src={image} alt={name} />
                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<Button>Articles</Button>}
                        >
                            <Modal.Header>
                                <Image size='small' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/2560px-UFC_Logo.svg.png' wrapped />
                                <Header>{name}</Header>
                            </Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>ARTICLES</Header>
                                    <Articles />
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </div>
                    <div className='fighter-details'>
                        <p><em>Style: {style}</em></p>
                        <p><em>Stance: {stance}</em></p>
                        <p><em>Height: {height}</em></p>
                        <p><em>Nickname: {nickname}</em></p>
                        <h3>Division: {division}</h3>
                        <h3>Title Reign: {reign}</h3>
                    </div>
                </section>
                <Comments comments={fighterComments} author={input.author} comment={input.comment} timestamp={input.timestamp} handleChanges={handleChanges} handleComment={handleComment} />
                <br />
            </>

        );
    } else {
        return (
            <h2>Loading...</h2>
        );
    }
}

export default FighterPage;