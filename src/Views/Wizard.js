import _ from 'underscore';
import BaseView from "./BaseView";

var Wizard = BaseView.extend({

    initialize: function() {
        //Run initialize of 'BaseView'
        Wizard.__super__.initialize.apply(this, arguments);
    },

    /**
     * New question is triggered, check for updates
     * Update wizard classes
     * @constructor
     */
    QuestionHandler: function(){
        //Get element data
        let currentActive = this.model.attributes.QuestionNumber-1; //starts with 0, do -1
        let tabs = document.getElementById("wizardTabs");

        //Get children
        let currentChild = tabs.children[currentActive];

        //Make all children inactive
        _.each(tabs.children, function(el){
            el.className = "";
            el.children[0].className = "white";
        });
        //Make selected question active
        currentChild.className = "active";
        currentChild.children[0].className = "orangeFocus";
    }

});

export default Wizard;