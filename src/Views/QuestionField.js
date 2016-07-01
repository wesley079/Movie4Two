import _ from 'underscore';
import BaseView from "./BaseView";

var QuestionField = BaseView.extend({

    initialize: function () {
        //Run initialize of 'BaseView'
        QuestionField.__super__.initialize.apply(this, arguments);
    },

    QuestionHandler: function () {
        //Simulate new question in this model
        let currentQuestion = this.model["GlobalSettings"].QuestionNumber; //starting with 0, so -1 (for object)

        //Get global question number
        let currentGlobalQuestion = this.model["GlobalSettings"].attributes.QuestionNumber;

        //Empty innerHTML of element
        this.el.innerHTML = "";

        //Create question
        var question = document.createElement("h1");
        //Fill html & elements
        //classList.add instead of classList = "" for firefox & IE
        question.classList.add("large");
        question.classList.add("pad-top-5");
        question.innerHTML = this.model["QuestionModel"].Questions[currentQuestion].question;

        var PersonIndex = document.createElement("h2");
        //Fill html & elements
        PersonIndex.classList.add("average");
        PersonIndex.classList.add("mar-bot-15");
        PersonIndex.classList.add("fat");
        PersonIndex.innerHTML = "Person "+ this.model["GlobalSettings"].CurrentPerson +" is picking";

        //Create UL element
        var list = document.createElement("ul");
        //Fill Class
        list.classList.add("answers");
        list.classList.add("row");

        //Create List Items (API OR STANDARD)

        //Question related data
        if (currentGlobalQuestion == 1) {
            //Reset count (for DONE check in foreach)
            let loopCount = 0;

            //Save answer length
            let possibleLength = this.model["QuestionModel"].Questions[currentQuestion].PossibleAnswers.length;
            _.each(this.model["QuestionModel"].Questions[currentQuestion].PossibleAnswers, function (element) {
                loopCount++;
                var item = document.createElement("li");
                item.innerHTML = element;
                item.className = "answer";
                list.appendChild(item);

                //Check if loop done, if done Trigger event
                if (loopCount == possibleLength) {
                    //Dom ready, signal other classes/models/views
                    App.events.trigger("DomReady");
                }
            });
        }
        //Api data as possible ANSWERS
        else if(currentGlobalQuestion == 2){
            //Reset count (for DONE check in foreach)
            let loopCount = 0;
            //Get API data in new backbone model and fill list
            let apiData = new Backbone.Model;
            apiData.url = this.model["QuestionModel"].Questions[currentQuestion].url;
            //fetch data
            apiData.fetch({
                success: (model, response, options) =>
                    //Create list item for each response genre
                    _.each(response.genres, function (element) {
                        loopCount++;
                        var item = document.createElement("li");
                        item.innerHTML = element.name;
                        item.className = "answerLarge";
                        item.setAttribute("GenreId", element.id);
                        list.appendChild(item);

                        //Check if loop done, if done Trigger event
                        if (loopCount == response.genres.length) {
                            //Dom ready, signal other classes/models/views
                            App.events.trigger("DomReady");
                        }
                    }),
                error: (model, response, options) =>
                    console.log("error" + model)
            });

        }
        else if(currentGlobalQuestion == 3){
            //Reset count (for DONE check in foreach)
            let loopCount = 0;
            //Get API data in new backbone model and fill list
            let apiData = new Backbone.Model;
            apiData.url = this.model["QuestionModel"].Questions[2].url + this.model["Person"][this.model["GlobalSettings"].CurrentPerson-1].GenreId;
            //fetch data
            apiData.fetch({
                success: (model, response, options) =>
                    //Create list item for each response genre
                    _.each(response.results, function (element) {
                        loopCount++;
                        var item = document.createElement("img");
                        item.className = "answer-inline";
                        item.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+ element.poster_path;
                        item.setAttribute("Title", element.title);
                        list.appendChild(item);

                        //Check if loop done, if done Trigger event
                        if (loopCount == response.results.length) {
                            //Dom ready, signal other classes/models/views
                            App.events.trigger("DomReady");
                        }
                    }),
                error: (model, response, options) =>
                    console.log("error" + model)
            });
            question.innerHTML = this.model["QuestionModel"].Questions[2].question;

        }
        else if(currentGlobalQuestion == 4){
            let RandomMovie = this.model['Person'][Math.floor( Math.random() * this.model['GlobalSettings'].PersonAmount)];
            question.innerHTML = "Thanks for using movie4two!, your movie will be " +"<span class='fat'>"+ RandomMovie.Movie +"</span>";
            var item = document.createElement("img");
            item.className = "FinalMovie";
            item.src = RandomMovie.MovieImage;
            list.appendChild(item);
        }

        //append child for all filled data
        this.el.appendChild(question);

        //Check if question contains currentPerson
        if(currentGlobalQuestion != 4){
            this.el.appendChild(PersonIndex);
        }
        this.el.appendChild(list);
    }

});

export default QuestionField;