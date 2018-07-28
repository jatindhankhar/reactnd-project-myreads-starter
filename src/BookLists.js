import React  from 'react'
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

class BookLists extends React.Component {
  constructor()
  {
    super();
    this.bookshelfTitle = {
      "none" : "New",
      "currentlyReading" : "Currently Reading",
      "wantToRead" : "Want to Read",
      "read" : "Read"
    } 
   
  }
    createBookShelves = bookShelves => {
        return Object.keys(bookShelves).map( key => {
         let bookShelf = bookShelves[key]
           return (
            <div className="bookshelf" key={key} >
            <h2 className="bookshelf-title">{this.bookshelfTitle[key]}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.createBookList(bookShelf,key)}
                    </ol>
                </div>
            </div>
           )
        })
    }

    
    createBookList = (bookList,shelfType) => {
       return bookList.map((book,idx) => {
            return ( book && 
              <li key={idx}>
              <BookComponent idx={idx}
                  book={book}
                  shelfType={shelfType}
                  onChangeListener={this.props.moveShelfLogic}
                  />
            </li>
            )})
    }

    render()
    {
        return(
                <div className="list-books">
                   {this.createBookShelves(this.props.bookShelves)}
                </div>
              )
  
    }
}

BookLists.defaultProps = {
    books: [],
    bookShelves: {}
  }

BookLists.propTypes = {
    books: PropTypes.array.isRequired,
    bookShelves: PropTypes.object.isRequired
  }
  
  
   
export default BookLists