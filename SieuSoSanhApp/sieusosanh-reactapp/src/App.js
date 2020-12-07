import React, {useRef} from 'react';
import {BrowserRouter,Switch} from "react-router-dom"
import HomeTemplate from "./template/HomeTemplate";
import {routesHome}from "./routes"
import './App.css';

function App() {

  const container = useRef(null)

  document.documentElement.classList.remove("nav-open");

  
  const showMenuHome=routes=>{
    if(this.props.match.params.name == "admin"){
      return 
    }
    if(routes && routes.length >0 ){
        return routes.map((item,index)=>{
          return(
            //homeTemplate is HOC (High-Order-copmonent)
            <HomeTemplate
              key={index}
              exact={item.exact}
              path={item.path}
              Component={item.component}
              container
            />  
          )
        })
    }
  }

  return (
    //BrowserRouter se theo doi theo thanh url de render view tuong ung dua theo file routes.js
    <BrowserRouter>
      <Switch>
        {showMenuHome(routesHome)}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
