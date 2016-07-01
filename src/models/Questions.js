import {Model} from 'backbone';
/**
 * Model for the matches endpoint
 *
 * @constructor
 */
const Questions = Model.extend({
    Questions: [
        {
            'question': "How many people are watching?",
            'PossibleAnswers': [2, 3, 4, 5, 6]
        },
        {
            'question': "What genre of movies are you looking for?",
            'PossibleAnswers': "API",
            url: "https://api.themoviedb.org/3/genre/movie/list?api_key=c34846dc59ec6ced2e56a570b3c89d17"
        },
        {
            'question': "What movie is it gonna be?",
            'PossibleAnswers': "API",
            url: "https://api.themoviedb.org/3/discover/movie?api_key=c34846dc59ec6ced2e56a570b3c89d17&sort_by=popularity.desc&with_genres="
        },
        {
            "question": "Thanks for using Movie4Two, the random picked movie is"
        }
    ]

});
export default Questions;