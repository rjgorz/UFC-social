import React from 'react';
import { Comment, Header, Form, Button } from 'semantic-ui-react';

function Comments({ comments, author, comment, handleChanges, handleComment }) {

    const commentsList = comments.map((commentObj, i) => {
        const { author, comment, timestamp } = commentObj;
        return (
            <Comment key={i}>
                <Comment.Content>
                    <Comment.Author as="a">{author}</Comment.Author>
                    <Comment.Metadata>
                        <p>
                            <em>{timestamp}</em>
                        </p>
                    </Comment.Metadata>
                    <Comment.Text>{comment}</Comment.Text>
                </Comment.Content>
            </Comment>
        );
    });

    return (
        <Comment.Group>
            <Header as="h3" dividing>
                Comments
            </Header>
            {commentsList}
            <br />
            <Form onSubmit={handleComment}>
                <Form.Field>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Enter your name..."
                        className="input-text"
                        onChange={handleChanges}
                        value={author}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Comment: </label>
                    <Form.TextArea
                        type="text"
                        name="comment"
                        placeholder="Enter your comment..."
                        className="input-text"
                        onChange={handleChanges}
                        value={comment}
                    />
                </Form.Field>
                <Button id='comment-btn' type='submit' color='red' content='Comment' labelPosition='left' icon='plus' primary disabled={author==="" || comment==="" ? true : false} />
                <br />
            </Form>
        </Comment.Group>
    );
}

export default Comments;