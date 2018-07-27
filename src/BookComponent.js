import React  from 'react'
import PropTypes from 'prop-types'; // ES6

class BookComponent extends React.Component {
    
      render()
      { 
          return (
        <div className="book" data-idx={this.props.idx} data-key={this.props.shelfType || ""} onChange={this.props.onChangeListener || ""}>
        <div className="book-top">
          <div className="book-cover" style={ {width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          {/* Conditional Move option Render */}
          {this.props.moveOption &&
          <div className="book-shelf-changer">
          
            <select>
              <option value="move">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          
          </div>
          }
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{
              this.props.book.authors.join(" , ")
        }</div>
      </div>)
      }
}

BookComponent.defaultProps = {
    moveOption: true
}

BookComponent.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeListener: PropTypes.func,
    shelfType: PropTypes.string

}
export default BookComponent