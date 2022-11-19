import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);


  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;//Page size ye btara hai ki ek page mai kitni news hongi aur page ye ki konse no. ka page hai
    setLoading(true);  //Jab bhi loading true hogi toh ek loading gif ghumega(humne har rqst pr ye kiya hai)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsApp-${props.category}`
    updateNews();
  }, []);

  const fetchMoreData = async () => {   //ye func humne infiniteScroll ke andar define kiya hai,taki hum next/previous hata sake.
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;//Page size ye btara hai ki ek page mai kitni news hongi aur pge ye ki konse no. ka page hai
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div className='container my-3'><br /><br /><br />
      <h1 style={{color:"white"}} className='text-center'>Top Headlines of Today- </h1> <br />
      {loading && <Spinner />}  {/*agar loading true hai toh spinner dikhao */}

      <InfiniteScroll       // Now this is used to create an infinite scrollbar,so that we can load all our data in a single page itself
        dataLength={articles.length}
        next={fetchMoreData}    //Jab tk aur articles hai tb kya kya krna hai vo yha define kiya hai
        hasMore={articles.length !== totalResults}   //jabtk articles -totalResults ke equal ni hojyenge tb tk chlega
        loader={<Spinner />}    //loading ke vakt spinner dikhao
      >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                // {/*agar loading false hai tb ye content dikhao */ } 
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title ? element.title.slice(0, 36) : "Title"} description={element.description ? element.description.slice(0, 80) : "This is Description"} imageUrl={element.urlToImage ? element.urlToImage : "https://images.news18.com/ibnlive/uploads/2022/06/wazirx-165518676816x9.jpg"} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author ? element.author : "NewsApp"} />
                </div>
              })}
            </div>
          </div>
      </InfiniteScroll>
    </div>
  )
}
