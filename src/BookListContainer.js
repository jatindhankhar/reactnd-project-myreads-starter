import React from 'react'
import {Link} from 'react-router-dom'
import BookLists from './BookLists';
import PropTypes from 'prop-types';


class BookListContainer extends React.Component {
    
    render() {
        return ( <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {this.props.books.length === 0 && <i className="fas fa-sync-alt fa-5x fa-spin" style={{ textAlign: 'center'}}> </i>}
        <BookLists books={this.props.books}
          bookShelves={this.props.bookShelves}
          moveShelfLogic={this.props.moveShelfLogic}
          addToShelfLogic={this.props.addToShelfLogic}
          />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>)
    }
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