import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login(){
const [formData,setFormData]=useState({email:'',password:''});
const [message,setMessage]=useState('');
const navigate=useNavigate();

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();
try{
const response=await axios.post('http://localhost:5000/api/login',formData);
setMessage(response.data.message);
localStorage.setItem('token',response.data.token);
localStorage.setItem('userName',response.data.name);
window.dispatchEvent(new Event('loginStatusChanged'));
setTimeout(()=>navigate('/home'),1500);
}catch(error){
setMessage(error.response?.data?.message||'Login failed');
}
};

return(
<div className="page-container">
<div className="form-container">
<h1 className="form-title">Login</h1>
<form onSubmit={handleSubmit} className="auth-form">
<div className="form-group">
<label>Email</label>
<input type="email" name="email" value={formData.email} onChange={handleChange} required/>
</div>
<div className="form-group">
<label>Password</label>
<input type="password" name="password" value={formData.password} onChange={handleChange} required/>
</div>
<button type="submit" className="form-button">Login</button>
</form>
{message&&<p className="form-message">{message}</p>}
<p className="form-link">Don't have an account? <a href="/registration">Register</a></p>
</div>
</div>
);
}

export default Login;
