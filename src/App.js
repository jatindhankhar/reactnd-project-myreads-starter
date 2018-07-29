import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import SearchBook from './SearchBook';
import BookListContainer from './BookListContainer';
import * as Utils from './Utils'
import * as BookAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    bookShelves: {}
  }

  componentDidMount = ()=>
  {
      Utils.initData().then(this.segregateBooks);
  }

  segregateBooks = (books) =>
   {

     // Set state
     this.setState({books})
     // If we trigger setState on each book addition, there would be too many render calls
     // Instead use temp variable and update it once
     let bookShelves = {};
      books.forEach(element => {
             // If shelf doesn't exist create one
             if(!(element.shelf in bookShelves)) 
                 bookShelves[element.shelf] = [element] // Create bookShelf and Add book to shelf
              else 
                 bookShelves[element.shelf].push(element);                 
        });
    // Single Render 
    this.setState({
      bookShelves
    });  
   }
  

  moveBookBetweenShelves = evt => {
    let newShelf = evt.target.value
    let currentShelf = evt.currentTarget.getAttribute("data-key")
    let bookIdx = evt.currentTarget.getAttribute("data-idx")
    let bookId = evt.currentTarget.getAttribute("data-id")
     
    // Update on remote as well
    BookAPI.update(bookId,newShelf);
    // Only allow following types if they are different
    if(newShelf !== currentShelf &&  newShelf !== "move")
      {
          this.setState( prevState => {
             // Update only if there are books in current shelf
               if(prevState.bookShelves[currentShelf] === undefined)
                      prevState.bookShelves[currentShelf] = []

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

  addToShelf = (evt,book) => {
      let newShelf = evt.target.value
      if(book && newShelf !== "move")
      {
        // Update on remote as well
        BookAPI.update(book.id,newShelf);
        this.setState(prevState => {
          if (prevState.bookShelves[newShelf] === undefined)
               prevState.bookShelves[newShelf] = [book];
         else
              prevState.bookShelves[newShelf].push(book);

          // Persist data, so that user can continue without re-arranging
          let updatedData =  [].concat.apply([], Object.values(prevState.bookShelves))
          Utils.savetoCache(updatedData)

          return prevState;
              
        })


      }
      

  }
  render() {
    return (
      <div className="app">
      <Switch>
        <Route path="/search" render={ ()=> 
        (<SearchBook 
         books={this.state.books}
         moveShelfLogic={this.moveBookBetweenShelves}
         addToShelfLogic={this.addToShelf}
         />
         
        )} />


        <Route exact path="/" render={() => 
        <BookListContainer
         books={this.state.books}
         bookShelves={this.state.bookShelves}
         moveShelfLogic={this.moveBookBetweenShelves}
         />} />


        <Redirect from='*' to='/' />
      </Switch>
      </div>
    )
  }
}

export default BooksApp
