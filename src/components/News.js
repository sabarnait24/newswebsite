import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class news extends Component {
  static defaulttypes = {
    pageSize: 4,
    country: "in",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-Stay Updated!!`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async componentDidMount() {
    var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.props.page} &apiKey=44e8e44602db4cc5bf9ad83782eb289a`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    var url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.props.page} &apiKey=eca97371d54347369bf7f097c3eab44e`;
    // this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({ articles: parsedData.articles, loading: false });

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <>
        <h1 class="text-center my-3">Your Daily NewsFeed</h1>
        {this.state.loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >
          <div class="container">
            <div class="row">
              {this.state.articles.map((Element) => {
                return (
                  <div class="col-span-4">
                    <Newsitem
                      title={Element.title ? Element.title : ""}
                      description={
                        Element.description ? Element.description : ""
                      }
                      imageUrl={Element.urlToImage ? Element.urlToImage : ""}
                      newsUrl={Element.url ? Element.url : ""}
                      author={Element.author}
                      date={Element.publishedAt}
                      source={Element.source.name}
                    ></Newsitem>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default news;
