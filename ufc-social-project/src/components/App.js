import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import Header from './Header';
import FighterContainer from './FighterContainer';
import FighterForm from './FighterForm';
import FighterPage from './FighterPage';

function App() {
    const [fighters, setFighters] = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        fetch('http://localhost:3001/fighters')
        .then(r => r.json())
        .then(fighterData => setFighters(fighterData));
    }, []);

    const fetchFighters = fighters.filter(fighter => fighter.name.toLowerCase().includes(search.toLowerCase()));

    function handleNewFighter(newFighter) {
        setFighters([...fighters, newFighter]);
    }

    return (
        <Container>
            <Header />
            <Switch>
                <Route exact path="/">
                    <FighterContainer className="fighter-container" fighterList={fetchFighters} search={search} setSearch={setSearch} />
                </Route>
                <Route path="/fighter/:id">
                    <FighterPage className="fighter-page" />
                </Route>
                <Route path="/form">
                    <FighterForm handleNewFighter={handleNewFighter} />
                </Route>
            </Switch>
        </Container>
    );
}

export default App;