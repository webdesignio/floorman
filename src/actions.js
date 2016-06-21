/* global fetch, location, Headers */

import { parse } from 'url'
import 'whatwg-fetch'

export const UPDATE_RECORD = 'UPDATE_RECORD'
export const SET_EDITABLE = 'SET_EDITABLE'
export const SAVE = 'SAVE'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAILURE = 'SAVE_FAILURE'

export function updateRecord (update) {
  return { type: UPDATE_RECORD, update }
}

export function setEditable (value) {
  return { type: SET_EDITABLE, value }
}

export function save () {
  const { pathname } = parse(location.href)
  const putLocation = pathname === '/'
    ? '/index'
    : pathname
  return (dispatch, getState) => {
    dispatch({ type: SAVE })
    const { record } = getState()
    fetch(putLocation, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(record)
    })
    .then(res => res.json())
    .then(record => dispatch(saveSuccess(record)))
    .catch(e => dispatch(saveFailure(e)))
  }
}

export function saveSuccess (record) {
  return { type: SAVE_SUCCESS, record }
}

export function saveFailure () {
  return { type: SAVE_FAILURE }
}
