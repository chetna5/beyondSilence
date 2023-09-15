// MessageParser starter code in MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }

    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
      if(lowerCaseMessage === "token") {
        window.open("http://codinginveins:8080/token");
      } else {
        if (lowerCaseMessage.includes("hello")) {
          this.actionProvider.greet();
        }
    
        if (lowerCaseMessage.includes("javascript")) {
          this.actionProvider.handleJavascriptList();
        }
  
        this.actionProvider.handlePromptMessage(message);
      }
    }
  }
  
  export default MessageParser;