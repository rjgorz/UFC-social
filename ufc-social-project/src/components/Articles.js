import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Item, Icon } from 'semantic-ui-react';

function Articles() {
    const [articles, setArticles] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/fighters/${id}`)
            .then(r => r.json())
            .then(fighter => setArticles(fighter.articles));
    }, [id]);

    const articleList = articles.map(article => {
        return (
            <Item.Group key={article.id}>
                <Item>
                    <Item.Image src={article.thumbnail} alt={article.title}/>
                    <Item.Content>
                        <Item.Header>{article.title}</Item.Header>
                        <Item.Meta>Content: </Item.Meta>
                        <Item.Description>{article.content}</Item.Description>
                        <Item.Extra>Written By {article.author}</Item.Extra>
                    </Item.Content>
                    
                </Item>
            </Item.Group>
        );
    });

    return (
        <div>
            {articleList}
        </div>
    );
}

export default Articles;