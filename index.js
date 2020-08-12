// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const ACTIONS=['paper','rock','scissor'];
let win=0,loss=0,tie=0;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Rock Paper Scissor, What do you want to choose - rock, paper or scissor ?';
        win=0;
        loss=0;
        tie=0;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const RockIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RockIntent';
    },
    handle(handlerInput) {
        let repromptOutput = 'What do you choose next?';
        let alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];
        let combo = 'rock'+alexaAction;
        let speakOutput='';
        switch(combo)
        {
            case 'rockrock':
                speakOutput+="You selected rock and I selected rock, It's a tie! ";
                tie++;
                break;
            case 'rockpaper':
                speakOutput+="You selected rock and I selected paper, I win! ";
                loss++;
                break;
            case 'rockscissor':
                speakOutput+="You selected rock and I selected scissor, You win! Congrats ";
                win++;
                break;
            default:
                 break;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
const PaperIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PaperIntent';
    },
    handle(handlerInput) {
        let repromptOutput = 'What do you choose next?';
        let alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];
        let combo = 'paper'+alexaAction;
        let speakOutput='';
        switch(combo)
        {
            case 'paperrock':
                speakOutput+="You selected paper and I selected rock,  You win! Congrats.";
                win++;
                break;
            case 'paperpaper':
                speakOutput+="You selected paper and I selected paper, It's a tie";
                tie++;
                break;
            case 'paperscissor':
                speakOutput+="You selected paper and I selected scissor, I win! ";
                loss++;
                break;
            default:
                 break;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
const ScissorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScissorIntent';
    },
    handle(handlerInput) {
        let repromptOutput = 'What do you choose next?';
        let alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];
        let combo = 'scissor'+alexaAction;
        let speakOutput='';
        switch(combo)
        {
            case 'scissorrock':
                speakOutput+="You selected scissor and I selected rock,  I win!";
                loss++;
                break;
            case 'scissorpaper':
                speakOutput+="You selected scissor and I selected paper,  You win! Congrats";
                win++;
                break;
            case 'scissorscissor':
                speakOutput+="You selected scissor and I selected scissor,  It's a tie ";
                tie++;
                break;
            default:
                 break;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
const TrackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrackIntent';
    },
    handle(handlerInput) {
        let speakOutput='Your scoreboard: ';
        speakOutput+=('  Number of times you have won are '+win);
        speakOutput+=(' ,  Number of times you have lost are '+loss);
        speakOutput+=(' ,  Number of ties are '+tie);
        speakOutput+=('.  You can continue playing by selecting any one of rock, paper or scissor. Else end game');
        let repromptOutput = 'What do you choose next?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
const ExitIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExitIntent';
    },
    handle(handlerInput) {
        let speakOutput='Thank you for playing this game! ';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RockIntentHandler,
        PaperIntentHandler,
        ScissorIntentHandler,
        TrackIntentHandler,
        ExitIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
