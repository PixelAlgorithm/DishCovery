import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Registration(){
const [formData,setFormData]=useState({name:'',email:'',password:'',confirmPassword:''});
const [message,setMessage]=useState('');
const navigate=useNavigate();

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();
if(formData.password!==formData.confirmPassword){
setMessage('Passwords do not match');
return;
}
try{
const response=await axios.post('http://localhost:5000/api/register',{
name:formData.name,
email:formData.email,
password:formData.password
});
setMessage(response.data.message);
setTimeout(()=>navigate('/login'),1500);
}catch(error){
setMessage(error.response?.data?.message||'Registration failed');
}
};

return(
<div className="page-container">
<div className="form-container">
<h1 className="form-title">Registration</h1>
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
<label>Password</label>
<input type="password" name="password" value={formData.password} onChange={handleChange} required/>
</div>
<div className="form-group">
<label>Confirm Password</label>
<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
</div>
<button type="submit" className="form-button">Register</button>
</form>
{message&&<p className="form-message">{message}</p>}
<p className="form-link">Already have an account? <a href="/login">Login</a></p>
</div>
</div>
);
}

export default Registration;
