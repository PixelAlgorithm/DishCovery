import {useState} from 'react';

function Feedback(){
const [formData,setFormData]=useState({name:'',email:'',rating:'5',message:''});
const [submitted,setSubmitted]=useState(false);

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit=(e)=>{
e.preventDefault();
console.log('Feedback Submitted:',formData);
setSubmitted(true);
setTimeout(()=>{
setSubmitted(false);
setFormData({name:'',email:'',rating:'5',message:''});
},3000);
};

return(
<div className="page-container">
<div className="form-container">
<h1 className="form-title">Feedback</h1>
<form onSubmit={handleSubmit} className="auth-form">
<div className="form-group">
<label>Name</label>
<input type="text" name="name" value={formData.name} onChange={handleChange} required/>
</div>
<div className="form-group">
<label>Email</label>
<input type="email" name="email" value={formData.email} onChange={handleChange} required/>
</div>
<div className="form-group">
<label>Rating</label>
<select name="rating" value={formData.rating} onChange={handleChange} className="form-select">
<option value="5">⭐⭐⭐⭐⭐ Excellent</option>
<option value="4">⭐⭐⭐⭐ Good</option>
<option value="3">⭐⭐⭐ Average</option>
<option value="2">⭐⭐ Poor</option>
<option value="1">⭐ Very Poor</option>
</select>
</div>
<div className="form-group">
<label>Message</label>
<textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="form-textarea" required></textarea>
</div>
<button type="submit" className="form-button">Submit Feedback</button>
</form>
{submitted&&<p className="form-message">Thank you for your feedback!</p>}
</div>
</div>
);
}

export default Feedback;
