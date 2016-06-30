import { combineReducers } from 'redux'

import {
  UPDATE_RECORD,
  UPDATE_GLOBALS,
  SET_EDITABLE,
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,
  SWITCH_LANGUAGE
} from './actions'

export default combineReducers({
  originalRecord,
  record,
  globals,
  noLangFields,
  languages,
  defaultLanguage,
  currentLanguage,
  isEditable,
  isSaving
})

function originalRecord (state = null, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return action.record
    default:
      return state
  }
}

function record (state = null, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return action.record
    case UPDATE_RECORD:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.update)
      })
    default:
      return state
  }
}

function globals (state = null, action) {
  switch (action.type) {
    case UPDATE_GLOBALS:
      return Object.assign({}, state, action.update)
    default:
      return state
  }
}

function noLangFields (state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

function languages (state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

function defaultLanguage (state = null, action) {
  switch (action.type) {
    default:
      return state
  }
}

function currentLanguage (state = null, action) {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return action.lang
    default:
      return state
  }
}

function isEditable (state = true, action) {
  switch (action.type) {
    case SET_EDITABLE:
      return action.value
    default:
      return state
  }
}

function isSaving (state = false, action) {
  switch (action.type) {
    case SAVE:
      return true
    case SAVE_SUCCESS:
    case SAVE_FAILURE:
      return false
    default:
      return state
  }
}
