import React from 'react'
import {Link} from 'react-router-dom'
import BookLists from './BookLists';
import PropTypes from 'prop-types';


const BookListContainer = (props)=> {
        return ( <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {props.books.length === 0 && <i className="fas fa-sync-alt fa-5x fa-spin" style={{ textAlign: 'center'}}> </i>}
        <BookLists books={props.books}
          bookShelves={props.bookShelves}
          moveShelfLogic={props.moveShelfLogic}
          addToShelfLogic={props.addToShelfLogic}
          />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>)
  
}

BookListContainer.defaultProps = {
  books: [],
  bookShelves: {},
  moveShelfLogic: () => {}
}

BookListContainer.propTypes = {
 books: PropTypes.array.isRequired,
 bookShelves: PropTypes.object.isRequired,
 moveShelfLogic: PropTypes.func.isRequired
}

export default BookListContainer