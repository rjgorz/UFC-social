import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { useParams, useHistory } from 'react-router-dom';

function FighterPage() {
    const initialInput = {
        author: "",
        comment: "",
    }

    const history = useHistory();

    const [fighter, setFighter] = useState(null);
    const [fighterComments, setFighterComments] = useState([]);
    const [input, setInput] = useState(initialInput);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => {
                setFighter(fighter);
                setFighterComments(fighter.comments);
            });
    }, []);

    if (fighter) {
        const { name, image, division, reign, description, comments } = fighter;
        const { style, stance, height, nickname } = description;

        function handleChanges(e) {
            setInput({ ...input, [e.target.name]: e.target.value });
        }

        function handleComment(e) {
            e.preventDefault();

            const newComment = {
                author: input.author,
                comment: input.comment,
            }

            fetch(`http://localhost:3001/fighters/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comments: [...comments, newComment]
                })
            })
                .then(r => r.json())
                .then(fighter => {
                    setFighterComments(fighter.comments);
                    setInput(initialInput);
                });
        }

        return (
            <>
                <section>
                    <div className='fighter-title'>
                        <h2>{name}</h2>
                        <img src={image} alt={name} />
                    </div>
                    <div className='fighter-details'>
                        <p><em>Style: {style}</em></p>
                        <p><em>Stance: {stance}</em></p>
                        <p><em>Height: {height}</em></p>
                        <p><em>Nickname: {nickname}</em></p>
                        <h3>{division}</h3>
                        <h3>Title Reign: {reign}</h3>
                    </div>
                </section>
                <Comments comments={fighterComments} author={input.author} comment={input.comment} handleChanges={handleChanges} handleComment={handleComment} />
            </>

        );
    } else {
        return (
            <h2>Loading...</h2>
        );
    }
}

export default FighterPage;