import {View} from 'backbone';
import GlobalSettings from '../models/GlobalSettings';

var Answer = View.extend({

    events: {
        'click': 'clickHandler'
    },

    initialize: function() {
    },

    /***
     * 1) Answer is given, save the data
     * 2) Trigger event for communication
     * @param e
     */
    clickHandler: function(e){
        e.preventDefault();
        let CurrentQuestion;

        //Try to get into object model "global settings", if this doesn't exist, only 1 model is given.. catch error
        try{
            CurrentQuestion = this.model["GlobalSettings"].attributes.QuestionNumber;
        }
        catch(err){
            CurrentQuestion = this.model.QuestionNumber;
        }

        //Do question logic
        switch(CurrentQuestion){
            case 1:
                //save answer in model
                let answer = this.el.innerHTML;
                //Case 1, only 1 model, push personAmount into global settings
                this.model.PersonAmount = answer;

                //Trigger event for creating a global array based on handled information
                App.events.trigger("CreatePersonArray");
                break;
            case 2:
                //save data in current person (handled in main.js)
                 this.model["Person"].Genre = this.el.innerHTML;
                 this.model["Person"].GenreId = this.el.getAttribute("GenreId");
                break;
            case 3:
                this.model["Person"].Movie = this.el.getAttribute("Title");
                this.model["Person"].MovieImage = this.el.src;
                break;

        }

        //Question answered, trigger for a new question
        App.events.trigger("NextQuestion");
    }

});

export default Answer;