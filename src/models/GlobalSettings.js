import {Model} from 'backbone';
/**
 * Model for the matches endpoint
 *
 * @constructor
 */
const GlobalSettings = Model.extend({
        //default variables
        PersonAmount: 0,
        //Question start at 1
        QuestionNumber: 1
});
export default GlobalSettings;