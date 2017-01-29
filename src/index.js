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
        alphaActionMenuHandlers
    );
    alexa.execute();
};

const states = {
    MAINMENU: '_MAINMENU',
    PRODUCTFOO: "_PRODUCTFOO",
    ALPHAACTIONMENU: "_ALPHAACTIONMENU"
};

var entryPointHandlers = {
    'NewSession': function () {
        console.log('enter NewSession');
        this.attributes['session'] = {};
        var speechOutput = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu', speechOutput);
    },
    'Unhandled': function () {
        console.log('enter Unhandled');
        this.emit(':tell', this.t("UNEXPECTED"));
    },
    'SessionEndedRequest': function () {
        console.log('enter SessionEndedRequest');
    }
};

var mainMenuHandlers = Alexa.CreateStateHandler(states.MAINMENU, {
    'MainMenu': function (prefix) {
        console.log('enter MAINMENU.MainMenu');
        var speechOutput = (prefix || "") + this.t("MAIN_MENU");
        var repromptSpeech = this.t("MAIN_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'ListIntent': function () {
        console.log('enter MAINMENU.ListIntent');
        this.handler.state = states.MAINMENU;
        this.emitWithState('ListProductsIntent');
    },
    'ListProductsIntent': function () {
        console.log('enter MAINMENU.ListProductsIntent');
        var speechOutput = this.t("PRODUCT_LIST") + this.t("MAIN_MENU");
        var repromptSpeech = this.t("MAIN_MENU_REPROMPT");
        this.emit(':ask', speechOutput);
    },
    'ProductFooIntent': function () {
        console.log('enter MAINMENU.ProductFooIntent');
        this.handler.state = states.PRODUCTFOO;
        this.emitWithState('ProductFooMenu');
    },
    'ProductBarIntent': function () {
        console.log('enter MAINMENU.ProductBarIntent');
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.RepeatIntent': function () {
        console.log('enter MAINMENU.AMAZON.RepeatIntent');
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu');
    },
    'AMAZON.CancelIntent': function () {
        console.log('enter MAINMENU.AMAZON.CancelIntent');
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        console.log('enter MAINMENU.AMAZON.StopIntent');
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        console.log('enter MAINMENU.AMAZON.StartOverIntent');
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu');
    },
    'AMAZON.HelpIntent': function () {
        console.log('enter MAINMENU.AMAZON.HelpIntent');
        var speechOutput = this.t("HELP_MESSAGE_MAIN_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        console.log('enter MAINMENU.Unhandled');
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('enter MAINMENU.SessionEndedRequest');
    }
});

var productFooMenuHandlers = Alexa.CreateStateHandler(states.PRODUCTFOO, {
    'ProductFooMenu': function (prefix) {
        console.log('enter PRODUCTFOO.ProductFooMenu');
        this.attributes['session'].productState = states.PRODUCTFOO;
        this.attributes['session'].productMenu = 'ProductFooMenu';
        var speechOutput = this.t("PRODUCTFOO_MENU");
        var repromptSpeech = this.t("PRODUCTFOO_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'ListIntent': function () {
        console.log('enter PRODUCTFOO.ListIntent');
        this.handler.state = states.PRODUCTFOO;
        this.emitWithState('ListFeaturesIntent');
    },
    'ListFeaturesIntent': function () {
        console.log('enter PRODUCTFOO.ListFeaturesIntent');
        var speechOutput = this.t("PRODUCTFOO_FEATURE_LIST") + this.t("PRODUCTFOO_MENU");
        var repromptSpeech = this.t("PRODUCTFOO_MENU_REPROMPT");
        this.emit(':ask', speechOutput);
    },
    'FeatureAlphaIntent': function () {
        console.log('enter PRODUCTFOO.FeatureAlphaIntent');
        this.handler.state = states.ALPHAACTIONMENU;
        this.emitWithState('AlphaActionMenu');
    },
    'FeatureBetaIntent': function () {
        console.log('enter PRODUCTFOO.FeatureBetaIntent');
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'FeatureCharlieIntent': function () {
        console.log('enter PRODUCTFOO.FeatureCharlieIntent');
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.RepeatIntent': function () {
        console.log('enter PRODUCTFOO.AMAZON.RepeatIntent');
        this.handler.state = states.PRODUCTFOO;
        this.emitWithState('ProductFooMenu');
    },
    'AMAZON.CancelIntent': function () {
        console.log('enter PRODUCTFOO.AMAZON.CancelIntent');
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        console.log('enter PRODUCTFOO.AMAZON.StopIntent');
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        console.log('enter PRODUCTFOO.AMAZON.StartOverIntent');
        this.handler.state = states.MAINMENU;
        this.emitWithState('MainMenu');
    },
    'AMAZON.HelpIntent': function () {
        console.log('enter PRODUCTFOO.AMAZON.HelpIntent');
        var speechOutput = this.t("HELP_MESSAGE_PRODUCTFOO_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        console.log('enter PRODUCTFOO.Unhandled');
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('enter PRODUCTFOO.SessionEndedRequest');
    }
});

var alphaActionMenuHandlers = Alexa.CreateStateHandler(states.ALPHAACTIONMENU, {
    'AlphaActionMenu': function (prefix) {
        console.log('enter ALPHAACTIONMENU.AlphaActionMenu');
        this.attributes['session'].actionState = states.ALPHAACTIONMENU;
        this.attributes['session'].actionMenu = 'AlphaActionMenu';
        var speechOutput = this.t("ALPHA_ACTION_MENU");
        var repromptSpeech = this.t("ALPHA_ACTION_MENU_REPROMPT");
        this.attributes["reprompt"] = repromptSpeech;
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'AddAnAlphaIntent': function () {
        var speechOutput = this.t("NOTIMPL");
        this.emit(':tell', speechOutput);
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
        console.log('enter ALPHAACTIONMENU.AMAZON.RepeatIntent');
        this.handler.state = states.ALPHAACTIONMENU;
        this.emitWithState('AlphaActionMenu');
    },
    'AMAZON.CancelIntent': function () {
        console.log('enter ALPHAACTIONMENU.AMAZON.CancelIntent');
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        console.log('enter ALPHAACTIONMENU.AMAZON.StopIntent');
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StartOverIntent': function () {
        console.log('enter ALPHAACTIONMENU.AMAZON.StartOverIntent');
        this.handler.state = this.attributes['session'].productState;
        this.emitWithState(this.attributes['session'].productMenu);
    },
    'AMAZON.HelpIntent': function () {
        console.log('enter ALPHAACTIONMENU.AMAZON.HelpIntent');
        var speechOutput = this.t("HELP_MESSAGE_ALPHA_ACTION_MENU", this.t("HOW_CAN_I_HELP"));
        this.emit(':ask', speechOutput, speechOutput);
    },
    'Unhandled': function () {
        console.log('enter ALPHAACTIONMENU.Unhandled');
        var speechOutput = this.t("NO_UNDERSTAND") + this.attributes["reprompt"];
        var repromptSpeech = this.t("HELP_ME");
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SessionEndedRequest': function () {
        console.log('enter ALPHAACTIONMENU.SessionEndedRequest');
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
            "ALPHA_ACTION_MENU": "Would you like to learn how to add an alpha, edit an alpha, or delete an alpha? ",
            "ALPHA_ACTION_MENU_REPROMPT": "Say the action you want to learn, or say help me. ",
            "HELP_MESSAGE_ALPHA_ACTION_MENU": "Say the action you want to learn. Say repeat to hear the commands again.  Say start over to choose a new feature or you can say exit...Now, %s",
            "UNEXPECTED": "An unexpected error has occurred. Please try again later! ",
            "NOTIMPL": "This code path is not yet implemented. "
        }
    }
};