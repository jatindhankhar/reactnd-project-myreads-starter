import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as Utils from './Utils'
import './App.css'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import SearchBook from './SearchBook';
import BookListContainer from './BookListContainer';
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
         <Route path="/search" render={
           ()=> (<SearchBook/>)
         } />

         <Route exact path="/" render={() => <BookListContainer/>} />
      </div>
    )
  }
}

export default BooksApp
