import {
  UPDATE_LOCAL_FIELDS,
  UPDATE_GLOBAL_FIELDS,
  SET_EDITABLE,
  SWITCH_LANGUAGE
} from './actions'

const reducers = {
  locals,
  globals,
  languages,
  defaultLanguage,
  currentLanguage,
  isEditable
}

export { reducers as map }

export default function reduce (state = {}, action) {
  const { nextState, hasChanged } = Object.keys(reducers)
    .reduce(
      ({ nextState, hasChanged }, key) => {
        const value = reducers[key](nextState[key], action)
        return {
          nextState: Object.assign({}, nextState, { [key]: value }),
          hasChanged: hasChanged || (value !== nextState[key])
        }
      },
      { nextState: state, hasChanged: false }
    )
  return (
    hasChanged ? nextState : state
  )
}

function locals (state = null, action) {
  switch (action.type) {
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
