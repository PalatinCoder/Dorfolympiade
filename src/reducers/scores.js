import { ADD_SCORE } from "../actions/scores";

const INITIAL_STATE =
        [
            ['Sunny', 'Schützen', 10],
            ['Jessy', 'Schützen', 10],
            ['Markus', 'Hütte', 10],
            ['1234-abcd', 'undefined', 10],
        ];

const scores = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_SCORE:
            return [
                action.score,
                ...state
            ]
        default:
            return state;
    }
};

export default scores;
