import {useState} from 'react';

function AddRecipe(){
const [formData,setFormData]=useState({name:'',category:'',cookingTime:'',ingredients:'',instructions:''});
const [submitted,setSubmitted]=useState(false);

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit=(e)=>{
e.preventDefault();
console.log('Recipe Added:',formData);
setSubmitted(true);
setTimeout(()=>{
setSubmitted(false);
setFormData({name:'',category:'',cookingTime:'',ingredients:'',instructions:''});
},3000);
};

return(
<div className="page-container">
<div className="form-container">
<h1 className="form-title">Suggest Recipe</h1>
<form onSubmit={handleSubmit} className="auth-form">
<div className="form-group">
<label>Recipe Name</label>
<input type="text" name="name" value={formData.name} onChange={handleChange} required/>
</div>
<div className="form-group">
<label>Category</label>
<select name="category" value={formData.category} onChange={handleChange} className="form-select" required>
<option value="">Select Category</option>
<option value="Breakfast">Breakfast</option>
<option value="Main Course">Main Course</option>
<option value="Appetizer">Appetizer</option>
<option value="Dessert">Dessert</option>
<option value="Snacks">Snacks</option>
</select>
</div>
<div className="form-group">
<label>Cooking Time</label>
<input type="text" name="cookingTime" value={formData.cookingTime} onChange={handleChange} placeholder="e.g., 30 minutes" required/>
</div>
<div className="form-group">
<label>Ingredients (comma separated)</label>
<textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows="4" className="form-textarea" placeholder="e.g., 2 cups rice, 1 cup dal, salt" required></textarea>
</div>
<div className="form-group">
<label>Instructions</label>
<textarea name="instructions" value={formData.instructions} onChange={handleChange} rows="5" className="form-textarea" required></textarea>
</div>
<button type="submit" className="form-button">Add Recipe</button>
</form>
{submitted&&<p className="form-message">Recipe added successfully!</p>}
</div>
</div>
);
}

export default AddRecipe;
