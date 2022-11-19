import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

//Write rcc to write react class based  omponent
export default function App(){
  const [progress,setProgress]=useState(0);
  const pageSize=5;
// hlo 
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
          <Navbar />
          <Switch>
            <Route  exact path="/" ><News setProgress={setProgress} key="general" pageSize={pageSize} country={"in"} apiKey={"ef0483f5f7c84252be397f0da2c9236b"} 
            category="general" /> </Route>
            {/* Humne setProgress,key,pageSize,country,apiKey as a prop paas krdi hai News mai ,ab hum use News component mai use kr skte */}
            <Route  exact  path="/entertainment" ><News setProgress={setProgress} key="entertainment" pageSize={pageSize} country={"in"} apiKey={"ef0483f5f7c84252be397f0da2c9236b"} category="Entertainment" /> </Route>
            <Route  exact path="/health" ><News setProgress={setProgress} key="health" pageSize={pageSize} country={"in"} apiKey={"ef0483f5f7c84252be397f0da2c9236b"} category="Health" /> </Route>
            <Route  exact path="/sports" ><News setProgress={setProgress}  key="sports" pageSize={pageSize} country={"in"} apiKey={"ef0483f5f7c84252be397f0da2c9236b"} category="Sports" /> </Route>
            <Route  exact path="/technology" ><News setProgress={setProgress} key="technology" pageSize={pageSize} country={"in"} apiKey={"ef0483f5f7c84252be397f0da2c9236b"} category="Technology" /> </Route>
            <Route  exact path="/science" ><News setProgress={setProgress} Key="science" key="science" pageSize={pageSize} country={"in"} apiKey={"ef0483f5f7c84252be397f0da2c9236b"} category="Science" /> </Route>
            {/* React won’t render the NewsComponent again while navigating through different categories as it will render the NewsComponent for the first request. But we want to rebound the News component with the Updated Props. To fix this issue we would add a unique key prop to every route .We would be displaying the News of a specific Category while the selected path is used as an endpoint in the URL. */}
          </Switch>
        </Router>
      </div>
    )
  }
// https://newsapi.org/v2/top-headlines?country=in&apiKey=ef0483f5f7c84252be397f0da2c9236b
//Switch has been removed in newer versions of react-router-dom
//to use Switch , npm install react-router-dom@5.2.0
