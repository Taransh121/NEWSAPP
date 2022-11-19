import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
  
export default class News extends Component {

  constructor(props) {
    super(props);
    //Jab bhi constructor banta hai tab super ko call krna pdega yani ki super class ke constructor ko call krna hai,ye sbse pehle run hoga
    // console.log("Hello i am constructor from news component.");
    this.state = {
      articles: [],
      loading: true,
      totalResults:0,
      page: 1,  //by default pehla page khulega 
      //Jab bhi koi cheeze load vagr hori hogi toh mai loading ko true krdunga   
    }
    document.title = `NewsApp-${this.props.category}`
  }

  //cdm is a life cycle method -app mai maza aata rhe iske liye cdm use hota hai,ye tb run hoga jab apka poora render run hojyega
  // async componentDidMount(){  
  //   //ek async function apni body ke andar wait kr skta hai kuch promises ke resolve hone ka.
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;//Page size ye btara hai ki ek page mai kitni news hongi aur pge ye ki konse no. ka page hai
  //   this.setState({loading:true});  //Jab bhi loading true hogi toh ek loading badge ghumega(humne har rqst pr ye kiya hai)
  //   let data=await fetch(url);  
  //   //fetch leti hai url aur ek return krti hai ek promise
  //   let parsedData=await data.json()  
  //   //kyuki ye asynchronous function hai toh "await" likhne ki vajh se ye is promise ke resolve hone ka intezar krega
  //   // console.log(parsedData);
  //   this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})  
  //   //state ka jo article hai na usko set krlo parsedData.articles,totalresults ko bhi set krlo parsedData.totalResults.
  // }
  // previousClick=async()=>{
  //   // console.log("Previous button clicked");
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data=await fetch(url);  
  //   let parsedData=await data.json()  
  //   this.setState({
  //     page:this.state.page - 1,
  //     articles:parsedData.articles,
  //     loading:false
  //   })
  // }
  // nextClick = async () => {
  //   // console.log("Next");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize))) {  
  //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;;
  //       this.setState({loading:true});
  //       let data = await fetch(url);
  //       let parsedData = await data.json()
  //       // console.log(parsedData);
  //       this.setState({
  //           page: this.state.page + 1,
  //           articles: parsedData.articles,
  //           loading:false
  //       })
  //   }
  // }
  //Now as we are writing almost the same function three times we will now write it once and then call it as per need.
  async updateNews() {   //Humne ek function bana diya hai jisko hum log baar baar use krenge.
    this.props.setProgress(10);       
    //ek async function apni body ke andar wait kr skta hai kuch promises ke resolve hone ka.
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;//Page size ye btara hai ki ek page mai kitni news hongi aur pge ye ki konse no. ka page hai
    this.setState({ loading: true });  //Jab bhi loading true hogi toh ek loading badge ghumega(humne har rqst pr ye kiya hai)
    let data = await fetch(url);
    //fetch leti hai url aur ek return krti hai ek promise
    let parsedData = await data.json()
    //kyuki ye asynchronous function hai toh "await" likhne ki vajh se ye is promise ke resolve hone ka intezar krega
    // console.log(parsedData);
    this.setState({ 
      articles:parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false })
    //state ka jo article hai na usko set krlo parsedData.articles,totalresults ko bhi set krlo parsedData.totalResults.
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  // previousClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }
  // nextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }
  fetchMoreData = async () => {   //ye func humne infiniteScroll ke andar define kiya hai,taki hum next/previous hata sake.
    this.setState({page:this.state.page+1});
    //ek async function apni body ke andar wait kr skta hai kuch promises ke resolve hone ka.
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;//Page size ye btara hai ki ek page mai kitni news hongi aur pge ye ki konse no. ka page hai
    // this.setState({ loading: true });  //Jab bhi loading true hogi toh ek loading badge ghumega(humne har rqst pr ye kiya hai)
    let data = await fetch(url);
    //fetch leti hai url aur ek return krti hai ek promise
    let parsedData = await data.json()
    //kyuki ye asynchronous function hai toh "await" likhne ki vajh se ye is promise ke resolve hone ka intezar krega
    // console.log(parsedData);
    this.setState({ 
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false 
    })
    //state ka jo article hai na usko set krlo parsedData
  };
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>Top Headlines of Today- </h1>
        {this.state.loading && <Spinner/>}  {/*agar loading true hai toh spinner dikhao */}  
        {/* Ab hum logo ne humare articles mai ek loop chalaya taki ek ek krke hum log uske elements load kar sake  */}
        {/* Hum log ek newsitem return krenge har loop ke iteration mai.  */}
        {/* hum logo ne title or description ko slice bhi kiya hai  */}
        {/* eslint-disable-next-line */}
        <InfiniteScroll           
        // Now this is used to create an infinite scrollbar,so that we can load all our data in a single page itself
        dataLength={this.state.articles.length}       
        next={this.fetchMoreData}    //Jab tk aur articles hai tb kya kya krna hai vo yha define kiya hai
        hasMore={this.state.articles.length!==this.state.totalResults}   //jabtk articles -totalResults ke equal ni hojyenge tb tk chlega
        loader={<Spinner/>}    //loading ke vakt spinner dikhao
        >    
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              // {/*agar loading false hai tb ye content dikhao */ } 
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title.slice(0, 36) : "Title"} description={element.description ? element.description.slice(0, 80) : "This is Description"} imageUrl={element.urlToImage ? element.urlToImage : "https://images.news18.com/ibnlive/uploads/2022/06/wazirx-165518676816x9.jpg"} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author ? element.author : "NewsApp"} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* agar next previous button hota toh ye kaam ata- */}
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.previousClick}> &larr; Previous</button>
          {/* disabled={this.state.page<=1} */}
          {/* <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button> */} 
          {/* agar aage news dikhane ke liye page ni hai toh next button disable hojyega  */}
        {/* </div> */}
      </div>
    )
  }
}
