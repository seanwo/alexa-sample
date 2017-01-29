'use strict';

const Alexa = require('alexa-sdk');
var APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(
        entryPointHandlers,
        mainMenuHandlers,
        productFooMenuHandlers,
        alphaActionMenuHandlers,
        actionWalkThruMenuHandlers
    );
    alexa.execute();
};

const states = {
    MAINMENU: '_MAINMENU',
    PRODUCTFOO: "_PRODUCTFOO",
    ALPHAACTIONMENU: "_ALPHAACTIONMENU",
    ACTIONWALKTHRUMENU: "_ACTIONWALKTHRUMENU"
};

var entryPointHandlers = {
    'NewSession': function () {
        this.attributes['session'] = {};
        var speechOutput = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu', speechOutput);
    },
    'Unhandled': function () {
        this.emit(':tell', this.t("UNEXPECTED"));
    },
    'SessionEndedRequest': function () {
        console.log('SessionEndedRequest');
    }
};

var mainMenuHandlers = Alexa.CreateStateHandler(states.MAINMENU, {
    'MainMenu': function (prefix) {
        var speechOutput = (prefix || "") + this.t("MAIN_MENU");
        var repromptSpeech = this.t("MAIN_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'ListIntent': function () {
        this.handler.state = states.MAINMENU;
        this.emitWithState('ListProductsIntent');
    },
    'ListProductsIntent': function () {
        var speechOutput = this.t("PRODUCT_LIST") + this.t("MAIN_MENU");
        var repromptSpeech = this.t("MAIN_MENU_REPROMPT");
        this.emit(':ask', speechOutput);
    },
    'ProductFooIntent': function () {
        this.handler.state = states.PRODUCTFOO;
        this.emitWithState('ProductFooMenu');
    },
    'ProductBarIntent': function () {
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.RepeatIntent': function () {
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu');
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE_MAIN_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('MAINMENU.SessionEndedRequest');
    }
});

var productFooMenuHandlers = Alexa.CreateStateHandler(states.PRODUCTFOO, {
    'ProductFooMenu': function () {
        this.attributes['session'].productState = states.PRODUCTFOO;
        this.attributes['session'].productMenu = 'ProductFooMenu';
        var speechOutput = this.t("PRODUCTFOO_MENU");
        var repromptSpeech = this.t("PRODUCTFOO_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'ListIntent': function () {
        this.handler.state = states.PRODUCTFOO;
        this.emitWithState('ListFeaturesIntent');
    },
    'ListFeaturesIntent': function () {
        var speechOutput = this.t("PRODUCTFOO_FEATURE_LIST") + this.t("PRODUCTFOO_MENU");
        var repromptSpeech = this.t("PRODUCTFOO_MENU_REPROMPT");
        this.emit(':ask', speechOutput);
    },
    'FeatureAlphaIntent': function () {
        this.handler.state = states.ALPHAACTIONMENU;
        this.emitWithState('AlphaActionMenu');
    },
    'FeatureBetaIntent': function () {
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'FeatureCharlieIntent': function () {
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.RepeatIntent': function () {
        this.handler.state = states.PRODUCTFOO;
        this.emitWithState('ProductFooMenu');
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE_PRODUCTFOO_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('PRODUCTFOO.SessionEndedRequest');
    }
});

var alphaActionMenuHandlers = Alexa.CreateStateHandler(states.ALPHAACTIONMENU, {
    'AlphaActionMenu': function () {
        this.attributes['session'].actionState = states.ALPHAACTIONMENU;
        this.attributes['session'].actionMenu = 'AlphaActionMenu';
        var speechOutput = this.t("ALPHA_ACTION_MENU", this.t("ADD_ALPHA"), this.t("EDIT_ALPHA"), this.t("DELETE_ALPHA"));
        var repromptSpeech = this.t("ALPHA_ACTION_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'AddAnAlphaIntent': function () {
        this.attributes['session'].action = 'ADD_ALPHA';
        this.attributes['session'].walkthru = this.t("ALPHA_WALKTHRU");
        this.handler.state = states.ACTIONWALKTHRUMENU;
        this.emitWithState('ActionWalkThruMenu');
    },
    'EditAnAlphaIntent': function () {
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'DeleteAnAlphaIntent': function () {
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.RepeatIntent': function () {
        this.handler.state = states.ALPHAACTIONMENU;
        this.emitWithState('AlphaActionMenu');
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = this.attributes['session'].productState;
        this.emitWithState(this.attributes['session'].productMenu);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE_ALPHA_ACTION_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('ALPHAACTIONMENU.SessionEndedRequest');
    }
});

var actionWalkThruMenuHandlers = Alexa.CreateStateHandler(states.ACTIONWALKTHRUMENU, {
    'ActionWalkThruMenu': function () {
        var speechOutput = this.t("ACTION_WALKTHRU_MENU", this.t(this.attributes['session'].action));
        this.attributes['session'].index = 0;
        this.handler.state = states.ACTIONWALKTHRUMENU;
        this.emitWithState('WalkThruSteps', speechOutput);
    },
    'WalkThruSteps': function (prefix) {
        var speechOutput = (prefix || "");
        if (this.attributes["session"].index<this.attributes["session"].walkthru.length){
            speechOutput+=this.attributes["session"].walkthru[this.attributes["session"].index];
        } else {
            speechOutput+=this.t("WALKTHRU_COMPLETE");
            this.emit(':tell', speechOutput);
        }
        var repromptSpeech = this.t("ACTION_WALKTHRU_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'AMAZON.NextIntent': function () {
        this.attributes['session'].index += 1;
        this.handler.state = states.ACTIONWALKTHRUMENU;
        this.emitWithState('WalkThruSteps');
    },
    'AMAZON.RepeatIntent': function () {
        this.handler.state = states.ACTIONWALKTHRUMENU;
        this.emitWithState('WalkThruSteps');
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = this.attributes['session'].actionState;
        this.emitWithState(this.attributes['session'].actionMenu);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE_ACTION_WALKTHRU_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('ACTIONWALKTHRUMENU.SessionEndedRequest');
    }
});

const languageStrings = {
    "en-US": {
        "translation": {
            "SKILL_NAME": "Sample",
            "WELCOME_MESSAGE": "Welcome to %s. ",
            "HOW_CAN_I_HELP": "How can I help you? ",
            "HELP_ME": "For instructions on what you can say, please say help me. ",
            "STOP_MESSAGE": "Goodbye! ",
            "NO_UNDERSTAND": "Sorry, I don't quite understand what you mean. ",
            "MAIN_MENU": "Which product do you need help with today? ",
            "MAIN_MENU_REPROMPT": "Say the name of the product you need help with, say list to hear a list of products, or say help me. ",
            "HELP_MESSAGE_MAIN_MENU": "Say the name of the product you need help with. Say list to hear a list of products. Say repeat to hear the commands again or you can say exit...Now, %s",
            "PRODUCT_LIST": "I can help you with product foo or product bar. ",
            "PRODUCTFOO_MENU": "Which feature do you need help with today? ",
            "PRODUCTFOO_MENU_REPROMPT": "Say the name of the feature you need help with, say list to hear a list of features, or say help me. ",
            "HELP_MESSAGE_PRODUCTFOO_MENU": "Say the name of the feature you need help with. Say list to hear a list of features. Say repeat to hear the commands again.  Say start over to choose a new product or you can say exit...Now, %s",
            "PRODUCTFOO_FEATURE_LIST": "I can help you with feature alpha, feature beta, or feature charlie. ",
            "ALPHA_ACTION_MENU": "Would you like to learn how to %s, %s, or %s? ",
            "ALPHA_ACTION_MENU_REPROMPT": "Say the action you want to learn, or say help me. ",
            "HELP_MESSAGE_ALPHA_ACTION_MENU": "Say the action you want to learn. Say repeat to hear the commands again.  Say start over to choose a new feature or you can say exit...Now, %s",
            "ADD_ALPHA": "add an alpha",
            "EDIT_ALPHA": "edit an alpha",
            "DELETE_ALPHA": "delete an alpha",
            "ACTION_WALKTHRU_MENU": "Let's walk through how to %s, say next after each step.  Let's begin. ",
            "ACTION_WALKTHRU_MENU_REPROMPT": "Say next for the next step.  Say repeat to hear the step again.  ",
            "HELP_MESSAGE_ACTION_WALKTHRU_MENU": "To hear the next step, say next.  To hear the step again, say repeat.  Say start over to choose a new action or you can say exit...Now, %s",
            "WALKTHRU_COMPLETE":"Walk through complete! ",
            "ALPHA_WALKTHRU": [
                "Select the alpha item drop down from the upper left corner. ",
                "Select new from the sub menu. ",
                "Enter the information for alpha and press OK. "
            ],
            "UNEXPECTED": "An unexpected error has occurred. Please try again later! ",
            "NOTIMPL": "This code path is not yet implemented. "
        }
    }
};