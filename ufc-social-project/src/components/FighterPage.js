import React, { useState, useEffect } from 'react';
import Stats from './Stats';
import Comments from './Comments';
// import Articles from './Articles';
import ModalPopup from './ModalPopup';
import LeafPolls from './LeafPolls';
// import ModalPoll from './ModalPoll';
import { useParams, Link } from 'react-router-dom';
import { Icon, Button, Container } from 'semantic-ui-react';

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
    const [likes, setLikes] = useState(0);
    const [open, setOpen] = useState(false);
    const [openPoll, setOpenPoll] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => {
                setFighter(fighter);
                setLikes(fighter.likes);
                setFighterComments(fighter.comments);
            });
    }, [id]);

    if (fighter) {
        const { name, image, highlights, comments } = fighter;
        

        function handleChanges(e) {
            setInput({ ...input, [e.target.name]: e.target.value });
        }

        function handleLikes() {
            fetch(`http://localhost:3001/fighters/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    likes: likes + 1
                })
            })
                .then(r => r.json())
                .then(fighter => {
                    setLikes(fighter.likes);
                });
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
                <div>
                    <div className='fighter-title'>
                        <h2>{name}</h2>
                        <div>
                            <Icon id='like-btn' name='thumbs up outline' size='large' color='red' link onClick={handleLikes}>{likes}</Icon>
                            <Link to={`/fighter/${id}/edit`}>
                                <Icon id='edit-btn' name='edit' size='large' color='red' link />
                            </Link>
                            
                        </div>
                        <img src={image} alt={name} />
                    </div>
                    <div className='fighter-details'>
                        <Container>
                            <Stats fighter={fighter} />
                        </Container>
                    </div>
                </div>
                <Button.Group>
                    <ModalPopup name={name} open={open} setOpen={setOpen} video={highlights} />
                    <LeafPolls name={name} openPoll={openPoll} setOpenPoll={setOpenPoll} />
                </Button.Group>
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