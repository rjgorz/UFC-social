import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

function FighterForm ({ handleNewFighter, numFighters, setNumFighters }) {
    const initialInput = {
        name: "",
        image: "",
        reign: "",
        division: "",
        highlights: "",
        style: "",
        stance: "",
        height: "",
        nickname: "",
        record: "",
        defences: "",
    }

    console.log(numFighters);

    const initialPollData = {
        fighterId: numFighters + 1,
        yes: 1,
        no: 1
    }

    const history = useHistory();

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
            highlights: input.highlights,
            description: {
                style: input.style,
                stance: input.stance,
                height: input.height,
                nickname: input.nickname,
                record: input.record,
                defences: input.defences
            },
            comments: [],
            likes: 0
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
            setNumFighters(prevCount => prevCount + 1);
            fetch("http://localhost:3001/fighterPolls", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(initialPollData)
            });
            history.push("/");
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
                    placeholder="Enter a Champion's Name..."
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
                    placeholder="Enter a Champion's Image URL..."
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
                <label>Highlight Video: </label>
                <input
                    type="text"
                    name="highlights"
                    placeholder="Enter a Champion's Highlight Video..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {input.highlights}
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
            <Form.Field>
                <label>Record: </label>
                <input
                    type="text"
                    name="record"
                    placeholder="Enter a Champion's Record..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {input.record}
                />
            </Form.Field>
            <Form.Field>
                <label>Defences: </label>
                <input
                    type="text"
                    name="defences"
                    placeholder="Enter a Champion's Title Defences..."
                    className="input-text"
                    onChange = {handleChanges}
                    value = {input.defences}
                />
            </Form.Field>
            <Button type="submit" disabled=
            {
                input.name===""  ||
                input.image==="" ||
                input.reign==="" ||
                input.division==="" ||
                input.highlights==="" ||
                input.style==="" ||
                input.stance==="" ||
                input.height==="" ||
                input.nickname==="" ||
                input.record==="" ||
                input.defences==="" ?
                true : false
            }
            >Add Champion</Button>
        </Form>
      );
}

export default FighterForm;