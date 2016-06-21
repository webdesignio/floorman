import test from 'ava'
import 'babel-register'

import reduce from './reducers'
import {
  updateRecord,
  setEditable,
  SAVE,
  saveFailure,
  saveSuccess
} from './actions'
import {
  createValueSelector,
  recordData,
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
  t.deepEqual(recordData(newState), {... state.record.data, ... update})
  t.is(createValueSelector('title')(newState), update.title)
  t.is(createValueSelector('foo')(newState), update.foo)
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
