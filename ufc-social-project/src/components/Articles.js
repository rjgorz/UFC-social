import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Item, Icon } from 'semantic-ui-react';

function Articles() {
    const [articles, setArticles] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => setArticles(fighter.articles));
    }, [id]);

    console.log(articles);

    return (
        <Container>

        </Container>
    );
}

export default Articles;