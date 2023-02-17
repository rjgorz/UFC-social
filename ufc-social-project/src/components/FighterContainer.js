import React, { useState } from 'react';
import FighterCard from './FighterCard';
import Search from './Search';
import { Card, Checkbox, Container, Pagination } from "semantic-ui-react";

function FighterContainer({ fighterList, search, setSearch, sort, setSort }) {
    const [endArray, setEndArray] = useState(9);

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

    const length = fighterCards.length;
    
    let fightersToRender = [];
    if(fighterList.length > 0) {
        for(let i = endArray - 9; i < endArray; i++)
            fightersToRender.push(fighterCards[i]);
    }

    function handlePage(e) {
        setEndArray((e.target.getAttribute('value') * 9));
    }

    function handleCheck() {
        setSort(sort => !sort);
    }


    return (
        <>
            <br />
            <Container className="search-sort">
                <Search setSearch={setSearch}  search= {search}/>
                <br />
                <Checkbox id="sort-check" label="Sort A-Z" checked={sort} onChange={handleCheck} />
            </Container>
            <br />
            <Card.Group itemsPerRow={3}>
                {fightersToRender}
            </Card.Group>
            <Container className = "page-number-container">
                <Pagination defaultActivePage={1} totalPages={Math.ceil(length / 9)} onClick={handlePage} />
            </Container>
            <br />
        </>
        
    );

}

export default FighterContainer;