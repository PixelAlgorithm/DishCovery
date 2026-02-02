import Chatbot from './chatbot.jsx';

function ChatBotPage(){
return(
<div className="page-container">
<div className="chatbot-page">
<h1 className="page-title">AI Recipe Assistant</h1>
<p className="chatbot-description">Ask me anything about recipes and cooking!</p>
<Chatbot/>
</div>
</div>
);
}

export default ChatBotPage;
