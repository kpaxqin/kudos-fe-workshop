import * as types from '../constants/ActionTypes'
import api from '../api';

const addTodoSuccess = text => ({ type: types.ADD_TODO, text })

export const addTodo = text => dispatch => api.addTodo(text).then((data)=> {
  dispatch(addTodoSuccess(text));
});
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
