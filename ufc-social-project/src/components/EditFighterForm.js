import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

function EditFighterForm({ onUpdateFighter }) {
    const initialInput = {
        name: "",
        image: "",
        reign: "",
        division: "",
        style: "",
        stance: "",
        height: "",
        nickname: "",
    }

    const [input, setInput] = useState(initialInput);

    const { name, image, reign, division, style, stance, height, nickname } = input;

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => {
                setInput({
                    name: fighter.name,
                    image: fighter.image,
                    reign: fighter.reign,
                    division: fighter.division,
                    style: fighter.description.style,
                    stance: fighter.description.stance,
                    height: fighter.description.height,
                    nickname: fighter.description.nickname,
                });
            })
    }, [id])

    function handleChanges(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:3001/fighters/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: input.name,
                image: input.image,
                reign: input.reign,
                division: input.division,
                description: {
                    style: input.style,
                    stance: input.stance,
                    height: input.height,
                    nickname: input.nickname,
                }
            })
        })
            .then(r => r.json())
            .then(updatedFighter => {
                onUpdateFighter(updatedFighter);
                history.push(`/fighter/${id}`);
            });

    }

    return (
        <Form onSubmit={handleSubmit}>
            <h3 id="form-title">Edit Champion</h3>
            <Form.Field>
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter a Champion's name..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {name}
                />
            </Form.Field>
            <Form.Field>
                <label>Image URL: </label>
                <input
                    type="text"
                    name="image"
                    placeholder="Enter a Champion's image URL..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {image}
                />
            </Form.Field>
            <Form.Field>
                <label>Reign: </label>
                <input
                    type="text"
                    name="reign"
                    placeholder="Enter a Champion's Title Reign..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {reign}
                />
            </Form.Field>
            <Form.Field>
                <label>Division: </label>
                <input
                    type="text"
                    name="division"
                    placeholder="Enter a Champion's Division..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {division}
                />
            </Form.Field>
            <Form.Field>
                <label>Style: </label>
                <input
                    type="text"
                    name="style"
                    placeholder="Enter a Champion's Fighting Style..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {style}
                />
            </Form.Field>
            <Form.Field>
                <label>Stance: </label>
                <input
                    type="text"
                    name="stance"
                    placeholder="Enter a Champion's Stance..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {stance}
                />
            </Form.Field>
            <Form.Field>
                <label>Height: </label>
                <input
                    type="text"
                    name="height"
                    placeholder="Enter a Champion's Height..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {height}
                />
            </Form.Field>
            <Form.Field>
                <label>Nickname: </label>
                <input
                    type="text"
                    name="nickname"
                    placeholder="Enter a Champion's Nickname..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {nickname}
                />
            </Form.Field>
            <Button type="submit">Submit Changes</Button>
        </Form>
    );
}

export default EditFighterForm;