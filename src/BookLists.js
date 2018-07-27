import React  from 'react'
import * as Utils from './Utils'
import BookComponent from './BookComponent';
class BookLists extends React.Component {
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
    });

   
    
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
        if(newShelf !== currentShelf && (!(newShelf === "none" || newShelf === "move")))
          {
              this.setState( prevState => {
                 // Update only if there are books in current shelf
                 if(prevState.bookShelves[currentShelf].length !== 0)
                
                    {
                      prevState.bookShelves[currentShelf][bookIdx].shelf = newShelf

                      if (prevState.bookShelves[newShelf] === undefined)
                          prevState.bookShelves[newShelf] = [prevState.bookShelves[currentShelf][bookIdx]];
                      else
                          prevState.bookShelves[newShelf].push(prevState.bookShelves[currentShelf][bookIdx]);
                      prevState.bookShelves[currentShelf].splice(bookIdx,1)
                     // Persist data, so that user can continue without re-arranging
                     let updatedData =  [].concat.apply([], Object.values(prevState.bookShelves))
                     Utils.savetoCache(updatedData)

                    return prevState
                  }
              });       
          }
    }
    createBookList = (bookList,shelfType) => {
       return bookList.map((book,idx) => {
            return ( book && 
              <li key={idx}>
              <BookComponent idx={idx}
                  book={book}
                  shelfType={shelfType}
                  onChangeListener={this.moveBookBetweenShelves}
                  />
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