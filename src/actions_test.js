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
  saveSuccess
} from './actions'
import {
  createValueSelector,
  recordData,
  globals,
  isEditable,
  isSaving
} from './selectors'

test('updates record data', t => {
  const state = {
    record: { data: {} }
  }
  const update = { title: 'test', foo: ['bar'] }
  const action = updateRecord(update)
  const newState = reduce(state, action)
  t.deepEqual(recordData(newState), Object.assign({}, state.record.data, update))
  t.is(createValueSelector('title')(newState), update.title)
  t.is(createValueSelector('foo')(newState), update.foo)
})

test('updates global data', t => {
  const state = {
    globals: { title: '' },
    record: { data: {} }
  }
  const update = { title: 'test', foo: ['bar'] }
  const action = updateGlobals(update)
  const newState = reduce(state, action)
  t.deepEqual(globals(newState), Object.assign({}, state.globals, update))
  t.is(createValueSelector('title')(newState), update.title)
  t.is(createValueSelector('foo')(newState), update.foo)
  t.is(newState.globals.title, update.title)
})

test('updates both globals and record data', t => {
  const state = {
    globals: { title: '', foo: null },
    record: { data: {} }
  }
  const updateData = { title: 'test', foo: [], bar: 42 }
  const { title, foo, bar } = updateData
  const dispatch = spy()
  const getState = () => state
  const action = update(updateData)
  action(dispatch, getState)
  t.truthy(dispatch.calledTwice)
  t.deepEqual(dispatch.args[0][0], updateRecord({ bar }))
  t.deepEqual(dispatch.args[1][0], updateGlobals({ title, foo }))
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
