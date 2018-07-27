import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import * as Utils from './Utils'
import BookComponent from './BookComponent';
class SearchBook extends Component {
    constructor()
    {
        super()
        this.books = []
        this.booksFiltered = []
    }
    state = {
        query: ''
    }


    componentDidMount = ()=>
    {
        Utils.initData().then(data => {
           this.books = data;
        }
        );
    }
    handleInput = (evt)=> {
        let query = evt.target.value.trim();
        if(query === "") 
            return;
        /* Filter through both title and author */
        this.booksFiltered = this.books.filter( 
            book => book.title.toLowerCase().includes(query.toLowerCase()) 
            || book.authors.some( author => author.toLowerCase().includes(query.toLowerCase()) ) 
        )
       
        this.setState({
            query: query
        })
    }
   
    clearQuery = () => {
        this.booksFiltered = [];

        this.setState(
            {
                query: ''
            }
        )
    }
    
    render()
    {
        return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"  value={this.state.query} onChange={this.handleInput} placeholder="Search by title or author"/>

              </div>
              <div className="close-btn" onClick={this.clearQuery}></div>
            </div>            
            
    

            {this.booksFiltered.length > 0 &&
            <div className="search-books-results">
             <h2 style={{ textAlign: 'center'}}>Search Results for {this.state.query}</h2>
              <ol className="books-grid">
               { 
                   this.booksFiltered.map((book,idx) => {
                       return <BookComponent book={book}
                        moveOption={false}
                        key={idx}
                       />
                   })
               }
              </ol>
            </div>
            }
          </div>
        )
    }

}

export default SearchBook