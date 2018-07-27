import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import BookLists from './BookLists';
import * as Utils from './Utils';

class BookListContainer extends React.Component {
    
    render() {
        return ( <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BookLists/>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>)
    }
}

export default BookListContainer