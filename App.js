import React, {useState,useEffect} from 'react';
import './App.css';
import './style.css';
import axios from 'axios';
function App() {
const [quote,setQuote] = useState("");
const[author,setAuthor] = useState("");

const quoteAPI = async ()=>{
let arrQ = [];
try{
      const data = await axios.get('https://api.quotable.io/random');
     arrQ =  data.data
}
catch(e){
  console.log(e);
}


try{
  setQuote(arrQ.content);
  setAuthor(arrQ.author);
} 
catch(e)
{
  console.log(e);
}
};
useEffect(()=>{
  quoteAPI();
},[]);
  

  return( 
  <div className="App">
    <div className="container">
      <div className="items">
         <div className="qbutton">
         <button onClick={quoteAPI}>GENERATE</button>
         </div>
       <div className="quote">{quote}</div>
       <div className="author">--{author}--</div>
       </div>
    </div>
  
  

 
  </div>
  )
    
  
};

export default App;
