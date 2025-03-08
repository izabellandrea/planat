import React,{useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import DetailView from "./components/DetailView";
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import OfflineMessage  from './components/OfflineMessage';
import ReactGA from "react-ga"
import PushPermission from "./components/PushPermission"

function App() {

const [isLoading, setLoading] = useState(true);
function fakeRequest() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}


React.useEffect(()=>{
  
  ReactGA.initialize('G-K74T0E80HH')
  //to report page view
  ReactGA.pageview('/')

  fakeRequest().then(() => {
    const el = document.querySelector(".loader-container");
    if (el) {
      el.remove();
      setLoading(!isLoading);
    }
  });

}
)

if (isLoading) {
  return null;
}

  return (
    <div className="app">

      <Router>
       <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/search-results">
            <Search />
          </Route>
          <Route exact path="/details">
            <DetailView />
          </Route>
        </Switch> 
      </Router>
      <OfflineMessage></OfflineMessage>
      <PushPermission></PushPermission>
      
    </div>
  );
}
export default App;
