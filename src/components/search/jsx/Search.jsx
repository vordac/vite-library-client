import React, { useState } from "react";
import axios from "axios";
import Book from "./Book";
import "../css/search.css";

const Search = ({ searchResults }) => {

    return (
        <div>
            <div className="all">
                {searchResults.map((book) => (
                    <Book book={book} key={book.book_id} />
                ))}
            </div>
        </div>
    );
};

export default Search;
