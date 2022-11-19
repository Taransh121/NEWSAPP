import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,publishedAt,author}=this.props;
    //props change ni kr skte huum log ,agar hume props pass krke state set krni hai toh hum log state ko set krke usko change kr skte hai pr props ko ni kr skte
    return (
      //Hum log imageurl,title,description,newsurl sab kuch props ki help se pass krenge.
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} rel="noreferrer"  target="_blank" className="btn btn-sm btn-dark">Read More</a> 
               <p style={{margin:"10px 0px 0px 0px"}}  className="card-text"><small className="text-muted">Published at {new Date(publishedAt).toGMTString()} by {author}</small></p>  
               {/* toGMTString converts date into india/s date format  */}
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem