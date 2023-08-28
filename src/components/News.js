import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
cap = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    //   console.log("Constructor from News Component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.cap(this.props.category)} - NewsApp`;
  }

 async updatedNews(){
  
    // const url = `https://newsapi.org/v2/top-headlines?
    // country=${this.props.country}
    // &category=${this.props.category}
    // &apiKey=c9b9839a1b104e9ebcf5a3a287207e7d
    // &page=${this.state.page}
    // &pageSize=${this.props.pageSize}`;
    this.props.setProgress(10); 
  const url = `https://newsapi.org/v2/top-headlines?
    country=${this.props.country}
    &category=${this.props.category}
    &apiKey=c9b9839a1b104e9ebcf5a3a287207e7d
    &page=${this.state.page}
    &pageSize=${this.props.pageSize}`;

    // &apiKey=${this.props.apikey}


    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40); 

    let parseData = await data.json();
    this.props.setProgress(70); 

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
   this.props.setProgress(100);
 }

  async componentDidMount() {
    // console.log("Mout Second");
    // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=c9b9839a1b104e9ebcf5a3a287207e7d";
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9b9839a1b104e9ebcf5a3a287207e7d&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // // console.log(parseData);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    this.updatedNews();
  }

  handleNext = async () => {
    console.log("Next");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=c9b9839a1b104e9ebcf5a3a287207e7d&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading: false,
    //   });}
    this.setState({
        page: this.state.page +1
    });
    this.updatedNews();
    

  };


  handlePre = async () => {
    console.log("Next");
    this.setState({
        page: this.state.page -1
    });

    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=c9b9839a1b104e9ebcf5a3a287207e7d&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false,
    // });
   this.updatedNews();
};
  fetchMoreData = async() => {
    this.setState({page: this.state.page+1});
    // this.updatedNews();
  const url = `https://newsapi.org/v2/top-headlines?
    country=${this.props.country}
    &category=${this.props.category}
    &apiKey=c9b9839a1b104e9ebcf5a3a287207e7d
    &page=${this.state.page}
    &pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });



  };


  render() {
    console.log("Render First");
    return (
     <>
     {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{
          marginTop:"90px"
        }}>NewsApp - Top {this.cap(this.props.category)} Headlines</h1>
        {this.state.loading && <Loading />}
 <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
<div className="container">
        <div className="row">
          { //this.state.loading &&
            this.state.articles.map((element) => {
              // console.log(element);
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePre}
          >
            {" "}
            &larr; Preview
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}
      {/* </div> */}
    </>
    );
  }
}

export default News;
