import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import BookComponent from './BookComponent';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class SearchBook extends Component {
    constructor()
    {
        super()
        this.booksFiltered = []
    }
    state = {
        query: '',
        searchedBooks: []
    }

    resetRealTimeQuery()
    {
        this.setState({searchedBooks: []})
    }
    getRealTimeQuery = (query) => {
        if(query)
        {
             BooksAPI.search(query).then(res => { 
                 if(res.error) 
                    this.resetRealTimeQuery();
                else 
                    this.setState({ searchedBooks: res})
             });
        }
        else
          this.resetRealTimeQuery();
    }
    handleInput = (evt)=> {
        let query = evt.target.value;
        this.setState({
            query: query
        })
        if(query === "") 
            return;
        /* Filter through both title and author */
        this.getRealTimeQuery(query);
        this.booksFiltered = this.props.books.filter( 
            book => book.title.toLowerCase().includes(query.toLowerCase()) 
            || book.authors.some( author => author.toLowerCase().includes(query.toLowerCase()) ) 
        )
       
       
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
            <div className="results">
            <h2 style={{ textAlign: 'center'}}> From the store: </h2>
                  <ol className="books-grid">
                     {
                         this.state.searchedBooks.length === 0 &&
                         <i className="fas fa-sync-alt fa-5x fa-spin" style={{ textAlign: 'center'}}> </i>
                     }
                     {   (this.state.searchedBooks.length > 0 &&
                         this.state.searchedBooks.map((book,idx) => {
                            return <BookComponent book={book}
                                    moveOption={true}
                                    key={idx} 
                                    newBook={true}
                                    onChangeListener={this.props.addToShelfLogic}
                                    />
                         }))
                     }
                  </ol>
            </div>
            <div className="results">
            <h2 style={{ textAlign: 'center'}}> From the shelf: </h2>
              <ol className="books-grid">
               { 
                   this.booksFiltered.map((book,idx) => {
                       return <BookComponent book={book}
                        idx={idx}
                        moveOption={true}
                        onChangeListener={this.props.moveShelfLogic}
                        key={idx}
                       />
                   })
               }
              </ol>
              </div>
            </div>
            }
          </div>
        )
    }

}

SearchBook.defaultProps = {
    books: [],
    moveShelfLogic: ()=>{},
    addToShelfLogic: ()=> {},

}

SearchBook.propTypes = {
    books: PropTypes.array.isRequired,
    addToShelfLogic: PropTypes.func.isRequired

}


export default SearchBook