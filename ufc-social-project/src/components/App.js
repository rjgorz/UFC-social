import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import Header from './Header';
import FighterContainer from './FighterContainer';
import FighterForm from './FighterForm';
import EditFighterForm from './EditFighterForm';
import FighterPage from './FighterPage';
import Feedback from './Feedback';

function App() {
    const [fighters, setFighters] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(false);
    const [numFighters, setNumFighters] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/fighters')
            .then(r => r.json())
            .then(fighterData => {
                setFighters(fighterData);
                setNumFighters(fighterData.length);
            });
    }, []);

    let fetchFighters = fighters.filter(fighter => fighter.name.toLowerCase().includes(search.toLowerCase()));

    function handleNewFighter(newFighter) {
        setFighters([...fighters, newFighter]);
    }

    function onUpdateFighter(updatedFighter) {
        const updatedFighters = fighters.map(ogFighter => {
            if (ogFighter.id === updatedFighter.id)
                return updatedFighter;
            else
                return ogFighter;
        });
        setFighters(updatedFighters);
    }

    function bubbleSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < (arr.length - i - 1); j++) {
                if (arr[j].name > arr[j + 1].name) {
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
        return arr;
    }
    
    if(sort)
        fetchFighters = bubbleSort(fetchFighters);

    return (
        <Container>
            <Header />            
            <Switch>
                <Route exact path="/">
                    <FighterContainer className="fighter-container" fighterList={fetchFighters} search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
                </Route>

                <Route path="/fighter/:id/edit">
                    <EditFighterForm onUpdateFighter={onUpdateFighter} />
                </Route>

                <Route path="/fighter/:id">
                    <FighterPage className="fighter-page" />
                </Route>

                <Route path="/form">
                    <FighterForm handleNewFighter={handleNewFighter} numFighters={numFighters} setNumFighters={setNumFighters} />
                </Route>

                <Route path="/feedback">
                    <Feedback />
                </Route>
            </Switch>
        </Container>
    );
}

export default App;