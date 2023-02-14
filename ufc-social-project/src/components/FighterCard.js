import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from "semantic-ui-react";

function FighterCard({ id, name, image }) {

    return (
        <Card className="fighter-card">
            <h2 id="card-title">{name}</h2>
            <img className="fighter-image" src={image} alt={name} />
            <Link to={`/fighter/${id}`}>
                <Button className = "fighter-btn">
                    Stat Details
                </Button>
            </Link>
        </Card>
    );
}

export default FighterCard;