import * as types from '../constants/ActionTypes'
import api from '../api';

const identity = i=> i;

const createAsyncAction = (type, asyncFn, metaCreator = identity) => syncPayload => dispatch => {
  dispatch({
    type, 
    payload: syncPayload,
    meta: metaCreator({
      asyncPhase: 'START'
    })
  })
  asyncFn(syncPayload).then(
    (data)=> {
      dispatch({
        type: `${type}_SUCCESS`, 
        payload: data,
        meta: metaCreator({
          asyncPhase: 'SUCCESS'
        })  
      })
    },
    (e)=> {
      dispatch({
        type: `${type}_FAILED`, 
        payload: e,
        meta: metaCreator({
          asyncPhase: 'FAILED'
        }), 
        error: true
      })
    }
  )
}

export const addTodo = createAsyncAction(
  types.ADD_TODO, 
  (text)=> Promise.all([api.addTodo(text), api.addTodo(text)])
    .then(data=> data, e => {
      throw new Error('Custom msg!')
    }),
  defaultMeta => ({...defaultMeta, omitError: true})
);

export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
