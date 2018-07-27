import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import * as Utils from './Utils'
class BookLists extends Component {
  constructor()
  {
    super();
    this.bookshelfTitle = {
      "currentlyReading" : "Currently Reading",
      "wantToRead" : "Want to Read",
      "read" : "Read"
    }

   this.state = {
    bookShelves: {}
  }
  }
  
  
  
   segregateBooks = (data) =>
   {
     // If we trigger setState on each book addition, there would be too many render calls
     // Instead use temp variable and update it once
     let tempShelf = {};
      data.forEach(element => {
             // If shelf doesn't exist create one
             if(!(element.shelf in tempShelf)) 
                 tempShelf[element.shelf] = [element] // Create bookShelf and Add book to shelf
              else 
                 tempShelf[element.shelf].push(element);                 
        });
    // Single Render 
    this.setState({
      bookShelves: tempShelf
    })
   }


   componentDidMount = ()=>
   {
     Utils.initData().then(this.segregateBooks); 
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

    moveBookBetweenShelves = evt => {
        let newShelf = evt.target.value
        let currentShelf = evt.currentTarget.getAttribute("data-key")
        let bookIdx = evt.currentTarget.getAttribute("data-idx")
        // Only allow following types if they are different
        if(newShelf != currentShelf && bookIdx !== undefined && ((newShelf != "none") || newShelf != "move"))
          {
              this.setState( prevState => {
                // Add to new shelf
               // debugger;
                 // Update only if there are books in current shelf
                 if(prevState.bookShelves[currentShelf].length != 0)
                    {prevState.bookShelves[newShelf].push(prevState.bookShelves[currentShelf][bookIdx])
                 // Remove from old shelf
                    prevState.bookShelves[currentShelf].splice(bookIdx,1)
                    return prevState
                  }
              });       
          }
    }
    createBookList = (bookList,shelfType) => {
       return bookList.map((book,idx) => {
            return (
              <li key={idx}>
              <div className="book" data-idx={idx} data-key={shelfType} onChange={this.moveBookBetweenShelves}>
                <div className="book-top">
                  <div className="book-cover" style={ {width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move">Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{
                      book.authors.join(" , ")
                }</div>
              </div>
            </li>
            )})
    }

    render()
    {
        return(
                <div className="list-books">
                   {this.createBookShelves(this.state.bookShelves)}
                </div>
              )
  
    }
}

export default BookLists