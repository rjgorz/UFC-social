import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";

function FighterForm ({handleNewFighter}) {
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
    
    function handleChanges(e) {
        setInput({...input, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const newFighter = {
            name: input.name,
            image: input.image,
            reign: input.reign,
            division: input.division,
            description: {
                style: input.style,
                stance: input.stance,
                height: input.height,
                nickname: input.nickname,
            },
            comments: [],
        };

        fetch("http://localhost:3001/fighters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFighter),
            })
        .then((r) => r.json())
        .then(fighter => {
            handleNewFighter(fighter);
            setInput(initialInput);
        });
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <h3 id="form-title">Add a Champion!</h3>
            <Form.Field>
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter a Champion's name..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {input.name}
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
                    value = {input.image}
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
                    value = {input.reign}
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
                    value = {input.division}
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
                    value = {input.style}
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
                    value = {input.stance}
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
                    value = {input.height}
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
                    value = {input.nickname}
                />
            </Form.Field>
            <Button type="submit">Add Champion</Button>
        </Form>
      );
}

export default FighterForm;