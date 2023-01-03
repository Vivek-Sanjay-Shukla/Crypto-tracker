import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
       <BrowserRouter>
          <div className="App">
              <Header/>

              <Routes>
                 <Route path='/Crypto-tracker' element = {<HomePage/>} exact/>
                 <Route path='/Crypto-tracker/coins/:id' element = {<CoinPage/>}/>
             </Routes> 
          </div>
       </BrowserRouter>
  );
}

export default App;