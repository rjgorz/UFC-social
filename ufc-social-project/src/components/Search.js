import React from 'react';
import { Form } from "semantic-ui-react";

function Search ({ setSearch, search }) {

    function handleSearch(e){
        const value = e.target.value
        setSearch(value);
    }

    return (
        <Form>
            <input
             value = {search}
             type = "text"
             id = "search"
             placeholder= "Search Fighter..."
             onChange = {handleSearch}
            />
        </Form>
    );
}

export default Search;