
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import './App.css';
import Recipe from './components/Recipe';
import Recipee from './components/Recipee';
import Alert from './components/Alert';



const App =() =>{
    const[query,setQuery]= useState("");
    const[recipes,setRecipes]= useState([]);
    const[recipe1,setRecipe1]= useState([]);
    const [submit,setSubmit]=useState(false)
    const[alert,setAlert]=useState("");

    const APP_ID = "c23a492f";

    const APP_KEY = "18eda54222c9941b6c47cbb33f91a1c6";


    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const url2 = `https://api.edamam.com/search?q="pizza"&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async()=>{
        if(query!==""){
        const result = await axios.get(url);
        if(!result.data.more){
            return setAlert("No Food With Such Name")
        }
        setRecipes(result.data.hits)
        console.log(result);
        setAlert("");
        setQuery("");
    }
        else{
            setAlert("please fill the form")
        }
    };

    useEffect(async()=>{
        const firstdata= await url2;
        axios.get(firstdata)
        .then(result=>{
            console.log("-----data-----",result)
            setRecipe1(result.data.hits)
        }).catch(err=>console.log(err))
    },[])
    
    const onSubmit = (e)=>{
        setSubmit(true)
        e.preventDefault();
        getData();
    }

    const onChange = (e) =>{
        setQuery(e.target.value)
    }
    
    return(   
        <div className="App">
          
                <div className="App-header">

                    <h1 onClick={getData}>Foodie Ingrediants</h1>
                    
                        <div style={{marginLeft:1100,position:"absolute"}}>
                        <a href="#" id="home">Home</a>
                        </div>
                        <div style={{marginLeft:1200,position:"absolute"}}>
                        <a href="#" id="about">About</a>
                        </div>
                        <div style={{marginLeft:1300,position:"absolute"}}>
                        <a href="#" id="contactus" >Contact Us</a>
                        </div>
                </div>
            
            <form className="search-form" onSubmit={onSubmit}>
               
                {alert!=="" && <Alert alert={alert}/>} 
             
                
                <input type="text" placeholder="Search" autoComplete="off" onChange={onChange} value={query}/>
                <input type="submit" value="search" />
            </form>
           {submit?<div className="recipes">
                {recipes!==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
                {/* {recipe1!==[] && recipe1.map(recipe => <Recipee key={uuidv4()} recipe={recipe}/>)} */}
            </div>:<div className="recipes">
                {/* {recipes!==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)} */}
                {recipe1!==[] && recipe1.map(recipe => <Recipee key={uuidv4()} recipe={recipe}/>)}
              
            </div>} 
         
        </div>
    );
}

export default App;