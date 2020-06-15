import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from 'redux-saga/effects'
import { createLogger } from 'redux-logger'

// Reducer
function reducer(state = { count: 0 }, action) {
    console.log("reducer", action);

    switch(action.type) {
        case "INCREMENT": {
            return {
                count: state.count + 1,
            };
        }
        case "DECREMENT": {
            return {
                count: state.count - 1,
            }
        }
        default:
            return state;
    }
}

// Logger middleware
const loggerMiddleware = createLogger();

const myMiddleware = (state) => {
    console.log("myMiddleware:state", state);

    return (dispatch) => {
        console.log("myMiddleware:dispatch", dispatch);

        return (action) => {
            console.log("myMiddleware:action", action);

            return dispatch(action);
        }
    }
}

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Store
var store = createStore(reducer, applyMiddleware(sagaMiddleware, myMiddleware));
window.store = store;

store.subscribe(() => console.log("state:", store.getState()));

function* logIncrement(action) {
    console.log("logIncrement", action);
}

function *incrementSaga(action) {
    yield takeEvery("INCREMENT", logIncrement);
}

sagaMiddleware.run(incrementSaga);

// setTimeout(() => {
//     store.dispatch({ type: "INCREMENT"});
// }, 2000);