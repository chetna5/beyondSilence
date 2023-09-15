import axios from 'axios';

var messageHistory = [];

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    // new method
    greet() {
      const greetingMessage = this.createChatBotMessage("Hi, friend.");
      this.updateChatbotState(greetingMessage);
    }
  
    handleJavascriptList = () => {
      const message = this.createChatBotMessage(
        "Fantastic, I've got the following resources for you on Device offers:",
        {
          widget: "javascriptLinks",
        }
      );
  
      this.updateChatbotState(message);
    };
    
    handlePromptMessage = (promptMessage) => {
      messageHistory.push({
        "role": "user",
        "content": promptMessage
      })
      const requestPromptMessage = {
        "messages": messageHistory
      }
        const res = axios.post(`http://localhost:8080/chat`, requestPromptMessage).then((res) => {
            const responseMessage = this.createChatBotMessage(res.data);
            // console.log(res.data);
            messageHistory.push({
              "role": "assistant",
              "content": res.data
            });
            this.updateChatbotState(responseMessage);
        }).catch((err) => {
            console.log(res);
        });
    }

    updateChatbotState(message) {
      // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.
      
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;