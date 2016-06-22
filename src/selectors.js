import { createSelector } from 'reselect'

export const recordData = createSelector(
  ({ record: { data } }) => data,
  data => data || {}
)

export const globals = createSelector(
  ({ globals }) => globals,
  globals => globals || {}
)

export function isEditable ({ isEditable }) {
  return isEditable
}

export function isSaving ({ isSaving }) {
  return isSaving
}

export function createValueSelector (name) {
  return createSelector(
    recordData,
    globals,
    (recordData, globals) =>
      Object.keys(globals).indexOf(name) !== -1
        ? globals[name]
        : recordData[name]
  )
}
