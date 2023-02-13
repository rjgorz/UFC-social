import React from 'react';
import FighterCard from './FighterCard';
import Search from './Search';
import { Card } from "semantic-ui-react";

function FighterContainer({ fighterList, search, setSearch }) {
const fighterCards = fighterList.map(fighter => {
return (
    <FighterCard 
        key = {fighter.id} 
        id = {fighter.id}
        name = {fighter.name} 
        image = {fighter.image} 
    />
    );
});

    return (
        <>
            <br />
            <Search setSearch={setSearch}  search= {search}/>
            <br />
            <Card.Group itemsPerRow={3}>
                {fighterCards}
            </Card.Group>
        </>
        
    );

}

export default FighterContainer;