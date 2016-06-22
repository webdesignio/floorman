/* global fetch, location, Headers */

import { parse } from 'url'
import 'whatwg-fetch'

import { globals } from './selectors'

export const UPDATE_RECORD = 'UPDATE_RECORD'
export const UPDATE_GLOBALS = 'UPDATE_GLOBALS'
export const SET_EDITABLE = 'SET_EDITABLE'
export const SAVE = 'SAVE'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAILURE = 'SAVE_FAILURE'

export function updateRecord (update) {
  return { type: UPDATE_RECORD, update }
}

export function updateGlobals (update) {
  return { type: UPDATE_GLOBALS, update }
}

export function update (update) {
  return (dispatch, getState) => {
    const globalKeys = Object.keys(globals(getState()))
    const updates = Object.keys(update)
      .map(key =>
        globalKeys.indexOf(key) !== -1
          ? { type: 'global', update: [key, update[key]] }
          : { type: 'local', update: [key, update[key]] }
      )
      .reduce(
        (updates, update) =>
          update.type === 'global'
            ? Object.assign({}, updates, {
              global: Object.assign({}, updates.global, {
                [update.update[0]]: update.update[1]
              })
            })
            : Object.assign({}, updates, {
              local: Object.assign({}, updates.local, {
                [update.update[0]]: update.update[1]
              })
            }),
        {}
      )
    if (updates.local) {
      dispatch(updateRecord(updates.local))
    }
    if (updates.global) {
      dispatch(updateGlobals(updates.global))
    }
  }
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
    const { globals, record } = getState()
    fetch(putLocation, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ record, globals })
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
