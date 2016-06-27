import { createSelector } from 'reselect'

export const recordData = createSelector(
  ({ record: { data } }) => data,
  data => data || {}
)

export const globals = createSelector(
  ({ globals }) => globals,
  globals => globals || {}
)

export const currentLanguage = ({ currentLanguage }) => currentLanguage

export const languages = ({ languages }) => languages

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
    currentLanguage,
    (recordData, globals, currentLanguage) =>
      Object.keys(globals).indexOf(name) !== -1
        ? extractField({ currentLanguage }, globals[name])
        : extractField({ currentLanguage }, recordData[name])
  )
}

function extractField ({ currentLanguage }, field = {}) {
  const values = field.values || {}
  return values[currentLanguage]
}
