import {useState} from "react";
import axios from "axios";

function Chatbot(){
const [messages,setMessages]=useState([]);
const [input,setInput]=useState("");

const sendMessage=async()=>{
if(input.trim()==="") return;
const userText=input;
setMessages([...messages,{sender:"user",text:userText}]);
setInput("");
try{
const response=await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=Your_API_Key_Here`,
{contents:[{role:"user",parts:[{text:userText}]}]},
{headers:{"Content-Type":"application/json"}}
);
const botReply=response.data.candidates[0]?.content?.parts[0]?.text||"No response";
setMessages(prev=>[...prev,{sender:"bot",text:botReply}]);
}catch(error){
console.log(error.response?.data||error.message);
setMessages(prev=>[...prev,{sender:"bot",text:"Error: Could not connect to AI service"}]);
}
};

const handleKeyPress=(e)=>{
if(e.key==="Enter"){
sendMessage();
}
};

return(
<div className="chatbot-container">
<h2>DishCovery AI Assistant</h2>
<div className="chat-window">
{messages.length===0&&(
<div className="chat-welcome">
<p>👋 Welcome! Ask me anything about recipes and cooking!</p>
</div>
)}
{messages.map((msg,index)=>(
<div key={index} className={`message ${msg.sender}`}>
{msg.text}
</div>
))}
</div>
<div className="input-area">
<input type="text" value={input} onChange={(e)=>setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..."/>
<button onClick={sendMessage}>Send</button>
</div>
</div>
);
}

export default Chatbot;