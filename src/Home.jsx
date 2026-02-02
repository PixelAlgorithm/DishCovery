import {useEffect,useState} from 'react';

function Home(){
const [userName,setUserName]=useState('');

useEffect(()=>{
const name=localStorage.getItem('userName');
if(name){
setUserName(name);
}
},[]);

return(
<div className="page-container">
<div className="home-container">
<div className="home-content">
<h1 className="home-title">Welcome to Dishcovery</h1>
{userName&&<h2 className="home-greeting">Hello, {userName}!</h2>}
<p className="home-subtitle">Discover the Flavors of India</p>
<div className="home-features">
<div className="feature-box">
<h3>Authentic Recipes</h3>
<p>Explore traditional Indian recipes from different regions</p>
</div>
<div className="feature-box">
<h3>Easy to Follow</h3>
<p>Step-by-step instructions for perfect cooking every time</p>
</div>
<div className="feature-box">
<h3>AI Assistant</h3>
<p>Get recipe suggestions based on your available ingredients</p>
</div>
</div>
<div className="home-cta">
<a href="/recipe" className="cta-button">Explore Recipes</a>
<a href="/chatbot" className="cta-button">Try AI Assistant</a>
</div>
</div>
</div>
</div>
);
}

export default Home;
