import _ from 'underscore';
import {View} from 'backbone';
var BaseView = View.extend({

    /***
     * Basic initialization
     */
    initialize: function() {
        App.events.on("NextQuestion", this.QuestionHandler, this);
    },

    /***
     * Define this function at child
     * @constructor
     */
    QuestionHandler: function(){
        //Define at child
    }
});
export default BaseView;