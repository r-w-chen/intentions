import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session"
import skills from "./skills";
import exercises from "./exercises";
import errors from "./errors";
import createSessionExercises from "./create-session";
import dashboardSessions from "./dashboard-sessions";
const rootReducer = combineReducers({
    session,
    skills,
    exercises,
    errors,
    createSessionExercises,
    dashboardSessions
});



let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
