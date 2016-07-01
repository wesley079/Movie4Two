//global import
import _ from 'underscore';
import {Events} from 'backbone';

//Models import
import Questions from './models/Questions'
import GlobalSettings from './models/GlobalSettings';
import PersonalSettings from './models/PersonalSettings';
//Views import
import AnswerClick from './Views/AnswerClick';
import QuestionField from './Views/QuestionField'
import Wizard from './Views/Wizard';

(function () {
        //global vars
        var Persons = [];
        var CurrentPerson = 1;
        var RecentReset = false;

        //Global models
        var GlobalSetting = new GlobalSettings();
        var QuestionModel = new Questions();


        //Methods

    /**
     * Do initialization
     * Load Views with models
     * Do main logic
     * Load plugins (wizard)
     */
    var init = function () {
            //Basic initialization
            GlobalSetting.attributes.QuestionNumber = 1;
            QuestionModel.attributes.CurrentPerson = CurrentPerson;
            window.App = {};
            App.events = _.clone(Events);

            //loading wizard
            $(document).ready(function () {
                $('#rootWizard').bootstrapWizard();
            });

            //Even listeners
            App.events.on("NextQuestion", NewQuestion, this);
            App.events.on("DomReady", DomReady, this);
            App.events.on("CreatePersonArray", CreatePersons,this);

            //Initialize views
            _.each(document.getElementsByClassName('answer'), function (element) {
                new AnswerClick({el: element, model: GlobalSetting});
            });
            new QuestionField({el: "#questionBlock", model: {"QuestionModel":QuestionModel, "GlobalSettings": GlobalSetting, "Person": Persons}});
            new Wizard({el: "#rootWizard", model: GlobalSetting});


        };
        /***
         * Question change, do main logic
         * Update models, fill arrays
         * Give views new models or a list of models when needed
         * @constructor
         */
        var NewQuestion = function () {
                //Update question field models
                new QuestionField({el: "#questionBlock", model: {"QuestionModel":QuestionModel, "GlobalSettings": GlobalSetting, "Person": Persons}});

                //Check if current person reset
                if(CurrentPerson >= GlobalSetting.PersonAmount){
                    CurrentPerson = 1;
                    GlobalSetting.attributes.QuestionNumber++;
                    RecentReset = true;
                }

                //Logic about current person and question
                switch (GlobalSetting.attributes.QuestionNumber) {
                    case 1:                                                             //Question 1 logic
                        //First question answered, next question
                        GlobalSetting.attributes.QuestionNumber++;
                        break;
                    case 2:
                        //Question 2 logic
                        if(RecentReset == false){
                            CurrentPerson++;
                        }
                        break;
                    case 3:                                                             //Question 3 logic
                        //Check if person 1 already answered
                        if(RecentReset == false){
                            CurrentPerson++;
                        }
                        //next time start counting
                        RecentReset = false;
                        break;
                }

                //Debugging GlobalSettings current person
                GlobalSetting.CurrentPerson = CurrentPerson;
            };

        /***
         * Put new listeners on all possible answers
         * @constructor
         */
        var DomReady = function () {
            _.each(document.getElementsByClassName('answer'), function (element) {
                new AnswerClick({el: element, model: GlobalSetting});
            });
            _.each(document.getElementsByClassName('answerLarge'), function (element) {
                new AnswerClick({el: element, model: {"GlobalSettings": GlobalSetting, "Person": Persons[GlobalSetting.CurrentPerson-1]}});
            });

            _.each(document.getElementsByClassName('answer-inline'), function (element) {
                new AnswerClick({el: element, model: {"GlobalSettings": GlobalSetting, "Person": Persons[GlobalSetting.CurrentPerson-1]}});
            });
        };

    /**
     * GlobalSettings filled with amount, fill array Persons
     * @constructor
     */
    var CreatePersons = function (){
            for (let i = 1; i <= GlobalSetting.PersonAmount; i++) {
                let newModel = new PersonalSettings();
                Persons.push(newModel);
                newModel.attributes.PersonalIndex = i;
            }
        };

        //Document ready
        window.addEventListener('load', init);
    })();