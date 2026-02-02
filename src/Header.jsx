import {Link,useNavigate,useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Typing from "./typesss.jsx";

function Header(){
const [isLoggedIn,setIsLoggedIn]=useState(false);
const navigate=useNavigate();
const location=useLocation();

useEffect(()=>{
const checkLoginStatus=()=>{
const token=localStorage.getItem('token');
setIsLoggedIn(!!token);
};
checkLoginStatus();
window.addEventListener('storage',checkLoginStatus);
window.addEventListener('loginStatusChanged',checkLoginStatus);
return()=>{
window.removeEventListener('storage',checkLoginStatus);
window.removeEventListener('loginStatusChanged',checkLoginStatus);
};
},[location]);

const handleLogout=()=>{
localStorage.removeItem('token');
localStorage.removeItem('userName');
setIsLoggedIn(false);
window.dispatchEvent(new Event('loginStatusChanged'));
navigate('/login');
};

return(
<header className="header_class">
<div className="headertag">
<span className={"typed-title"}>DIS</span><Typing/>
</div>
<nav className={"nav_class"}>
<ul className={"nav_class__list"}>
<li className={"nav_class__list__item"}>
<Link to="/home">Home</Link>
</li>
<li className={"nav_class__list__item"}>
<Link to="/services">Services</Link>
</li>
<li className={"nav_class__list__item"}>
<Link to="/recipe">Recipes</Link>
</li>
<li className={"nav_class__list__item"}>
<Link to="/addrecipe">Suggest Recipe</Link>
</li>
<li className={"nav_class__list__item"}>
<Link to="/chatbot">ChatBot</Link>
</li>
<li className={"nav_class__list__item"}>
<Link to="/feedback">Feedback</Link>
</li>
<li className={"nav_class__list__item"}>
<Link to="/contact">Contact</Link>
</li>
{!isLoggedIn?(
<li className={"nav_class__list__item"}>
<Link to="/login">Login</Link>
</li>
):(
<li className={"nav_class__list__item"}>
<button onClick={handleLogout} className="logout-button">Logout</button>
</li>
)}
</ul>
</nav>
</header>
);
}

export default Header;