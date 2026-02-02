import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Registration from './Registration.jsx';
import Services from './Services.jsx';
import Recipe from './Recipe.jsx';
import Contact from './Contact.jsx';
import ChatBotPage from './ChatBotPage.jsx';
import Feedback from './Feedback.jsx';
import AddRecipe from './AddRecipe.jsx';

function App(){
return(
<Router>
<Header/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/registration" element={<Registration/>}/>
<Route path="/services" element={<Services/>}/>
<Route path="/recipe" element={<Recipe/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/chatbot" element={<ChatBotPage/>}/>
<Route path="/feedback" element={<Feedback/>}/>
<Route path="/addrecipe" element={<AddRecipe/>}/>
</Routes>
</Router>
);
}

export default App;
