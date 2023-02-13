import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Card, Button } from "semantic-ui-react";

function FighterCard({ id, name, image }) {

    return (
        <Card className="fighter-card">
            <h2 id="card-title">{name}</h2>
            <img className="fighter-image" src={image} alt={name} />
            <Button className = "fighter-btn">
                <Link to={`/fighter/${id}`}>
                    Stat Details
                </Link>
            </Button>
            
        </Card>
    );
}

export default FighterCard;