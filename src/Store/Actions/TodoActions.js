import dispatcher from '../Dispatchers/Dispatcher';
import * as actionTypes from './ActionTypes';


export const createTodo = (name) => {
    dispatcher.dispatch({
        type: actionTypes.CREATE_TODO,
        name
    });
};

export const deleteTodo = (id) => {
    dispatcher.dispatch({
        type: actionTypes.CREATE_TODO,
        id
    });
};
