import {useState,useEffect} from 'react';
import axios from 'axios';

function Recipe(){
const [recipes,setRecipes]=useState([]);
const [filteredRecipes,setFilteredRecipes]=useState([]);
const [loading,setLoading]=useState(true);
const [error,setError]=useState('');
const [searchInput,setSearchInput]=useState('');
const [selectedRecipe,setSelectedRecipe]=useState(null);

useEffect(()=>{
fetchRecipes();
},[]);

const fetchRecipes=async()=>{
try{
const response=await axios.get('http://localhost:5000/api/recipes');
setRecipes(response.data);
setFilteredRecipes(response.data);
setLoading(false);
}catch(error){
setError('Failed to fetch recipes. Make sure backend server is running.');
setLoading(false);
}
};

const handleSearch=(e)=>{
const value=e.target.value;
setSearchInput(value);
if(value.trim()===''){
setFilteredRecipes(recipes);
return;
}
const searchTerms=value.toLowerCase().split(',').map(term=>term.trim());
const filtered=recipes.filter(recipe=>{
const recipeIngredients=recipe.ingredients.join(' ').toLowerCase();
return searchTerms.some(term=>recipeIngredients.includes(term));
});
setFilteredRecipes(filtered);
};

const openPopup=(recipe)=>{
setSelectedRecipe(recipe);
};

const closePopup=()=>{
setSelectedRecipe(null);
};

if(loading){
return(
<div className="page-container">
<div className="recipe-container">
<h1 className="page-title">Loading Recipes...</h1>
</div>
</div>
);
}

if(error){
return(
<div className="page-container">
<div className="recipe-container">
<h1 className="page-title">Error</h1>
<p className="error-message">{error}</p>
</div>
</div>
);
}

return(
<div className="page-container">
<div className="recipe-container">
<h1 className="page-title">Indian Recipes</h1>
<div className="recipe-search">
<input type="text" placeholder="Search by ingredients (comma separated)..." value={searchInput} onChange={handleSearch} className="search-input"/>
</div>
{filteredRecipes.length===0?(
<p className="no-results">No recipes found with those ingredients</p>
):(
<div className="recipe-grid-compact">
{filteredRecipes.map((recipe,index)=>(
<div key={index} className="recipe-card-compact" onClick={()=>openPopup(recipe)}>
<h2 className="recipe-name-compact">{recipe.name}</h2>
<p className="recipe-time-compact">⏱ {recipe.cookingTime}</p>
<p className="recipe-category-compact">{recipe.category}</p>
</div>
))}
</div>
)}
{selectedRecipe&&(
<div className="popup-overlay" onClick={closePopup}>
<div className="popup-content" onClick={(e)=>e.stopPropagation()}>
<button className="popup-close" onClick={closePopup}>×</button>
<h2 className="popup-title">{selectedRecipe.name}</h2>
<div className="popup-info">
<p><strong>Category:</strong> {selectedRecipe.category}</p>
<p><strong>Cooking Time:</strong> {selectedRecipe.cookingTime}</p>
</div>
<div className="popup-ingredients">
<h3>Ingredients:</h3>
<ul>
{selectedRecipe.ingredients.map((ingredient,idx)=>(
<li key={idx}>{ingredient}</li>
))}
</ul>
</div>
<div className="popup-instructions">
<h3>Instructions:</h3>
<p>{selectedRecipe.instructions}</p>
</div>
</div>
</div>
)}
</div>
</div>
);
}

export default Recipe;
