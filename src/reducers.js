import { combineReducers } from 'redux'

import {
  UPDATE_LOCAL_FIELDS,
  UPDATE_GLOBAL_FIELDS,
  SET_EDITABLE,
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,
  SWITCH_LANGUAGE
} from './actions'

export default combineReducers({
  locals,
  globals,
  noLangFields,
  languages,
  defaultLanguage,
  currentLanguage,
  isEditable,
  isSaving
})

function locals (state = null, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return Object.assign({}, state, {
        fields: action.fields
      })
    case UPDATE_LOCAL_FIELDS:
      return Object.assign({}, state, {
        fields: Object.assign({}, state.fields, action.update)
      })
    default:
      return state
  }
}

function globals (state = null, action) {
  switch (action.type) {
    case UPDATE_GLOBAL_FIELDS:
      return Object.assign({}, state, {
        fields: Object.assign({}, state.fields, action.update)
      })
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
