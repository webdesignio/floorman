import { createSelector } from 'reselect'

export function recordData ({ record: { data } }) {
  return data
}

export function isEditable ({ isEditable }) {
  return isEditable
}

export function isSaving ({ isSaving }) {
  return isSaving
}

export function createValueSelector (name) {
  return createSelector(
    recordData,
    ({ [name]: value }) => value
  )
}
