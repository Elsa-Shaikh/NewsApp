import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, newsUrl, author, date,source } = this.props;
    return (
    <div className="my-3">
        <div className="card">
          
           <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
           }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
           </div>
          
          
          <img
            src={!imgUrl?"https://image.cnbcfm.com/api/v1/image/107273388-1689733279342-gettyimages-821304076-singaporesunset2.jpeg?v=1692748108&w=1920&h=1080":imgUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">

            <h5 className="card-title">{title} <span className="badge bg-success rounded-pill">{source} </span> </h5>

            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on 
            {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
    </div>
    );
  }
}

export default NewsItem;
