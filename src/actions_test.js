import test from 'ava'
import 'babel-register'
import { spy } from 'sinon'

import reduce from './reducers'
import {
  updateRecord,
  updateGlobals,
  update,
  setEditable,
  SAVE,
  saveFailure,
  saveSuccess,
  switchLanguage
} from './actions'
import {
  createValueSelector,
  recordData,
  globals,
  isEditable,
  isSaving,
  currentLanguage,
  languages
} from './selectors'

test('updates record data', t => {
  const state = {
    currentLanguage: 'en',
    record: { data: {} }
  }
  const update = { title: { values: { en: 'test' } }, foo: { values: { en: ['bar'] } } }
  const action = updateRecord(update)
  const newState = reduce(state, action)
  t.deepEqual(recordData(newState), Object.assign({}, state.record.data, update))
  t.is(createValueSelector('title')(newState), update.title.values.en)
  t.is(createValueSelector('foo')(newState), update.foo.values.en)
})

test('updates global data', t => {
  const state = {
    currentLanguage: 'en',
    globals: { title: '' },
    record: { data: {} }
  }
  const update = { title: { values: { en: 'test' } }, foo: { values: { en: ['bar'] } } }
  const action = updateGlobals(update)
  const newState = reduce(state, action)
  t.deepEqual(globals(newState), Object.assign({}, state.globals, update))
  t.is(createValueSelector('title')(newState), update.title.values.en)
  t.is(createValueSelector('foo')(newState), update.foo.values.en)
  t.is(newState.globals.title, update.title)
})

test('updates both globals and record data', t => {
  const state = {
    defaultLanguage: 'en',
    languages: ['en', 'de'],
    currentLanguage: 'de',
    globals: {
      title: { values: { en: 'Fooish stuff' } },
      foo: { values: {} }
    },
    record: { data: {} },
    noLangFields: []
  }
  const updateData = { title: 'test', foo: [], bar: 42 }
  const { title, foo, bar } = updateData
  const dispatch = spy()
  const getState = () => state
  const action = update(updateData)
  action(dispatch, getState)
  t.truthy(dispatch.calledTwice)
  t.deepEqual(
    dispatch.args[0][0],
    updateRecord({ bar: { values: { [state.currentLanguage]: bar } } })
  )
  t.deepEqual(
    dispatch.args[1][0],
    updateGlobals({
      title: {
        values: {
          [state.currentLanguage]: title,
          en: state.globals.title.values.en
        }
      },
      foo: {
        values: { [state.currentLanguage]: foo }
      }
    })
  )
})

test('toggles the editable flag', t => {
  const state = {
    isEditable: false
  }
  const newState = reduce(state, setEditable(true))
  t.is(isEditable(newState), true)
})

test('reflects the saving state', t => {
  const state = {
    isSaving: false,
    record: null
  }
  const record = { data: { _new: 1 } }
  const savingState = reduce(state, { type: SAVE })
  t.is(isSaving(savingState), true)
  const failureState = reduce(savingState, saveFailure())
  t.is(isSaving(failureState), false)
  const successState = reduce(savingState, saveSuccess(record))
  t.is(isSaving(successState), false)
  t.is(recordData(successState), record.data)
})

test('switches the language', t => {
  const state = {
    defaultLanguage: 'en',
    languages: ['de', 'en', 'fr'],
    currentLanguage: 'de'
  }
  const frLangState = reduce(state, switchLanguage('fr'))
  t.is(currentLanguage(frLangState), 'fr')
  t.is(languages(state), state.languages)
})

test('updates no-lang fields properly', t => {
  let state = {
    defaultLanguage: 'en',
    languages: ['de', 'en', 'fr'],
    currentLanguage: 'de',
    noLangFields: ['logo'],
    record: { data: {} }
  }
  const dispatch = action => (state = reduce(state, action))
  update({ logo: 'my value' })(dispatch, () => state)
  t.is(createValueSelector('logo')(state), 'my value')
  t.deepEqual(state.record.data.logo, { value: 'my value' })
})
