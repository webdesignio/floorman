import { createSelector } from 'reselect'

export const recordData = createSelector(
  ({ record: { data } }) => data,
  data => data || {}
)

export const globals = createSelector(
  ({ globals }) => globals,
  globals => globals || {}
)

export const noLangFields = ({ noLangFields }) => noLangFields

export const currentLanguage = createSelector(
  ({ currentLanguage }) => currentLanguage,
  ({ defaultLanguage }) => defaultLanguage,
  ({ languages }) => languages[0],
  (currentLanguage, defaultLanguage, firstLanguage) =>
    currentLanguage || defaultLanguage || firstLanguage
)

export const languages = ({ languages }) => languages

export function isEditable ({ isEditable }) {
  return isEditable
}

export function isSaving ({ isSaving }) {
  return isSaving
}

export function createValueSelector (name) {
  return createSelector(
    noLangFields,
    recordData,
    globals,
    currentLanguage,
    (noLangFields, recordData, globals, currentLanguage) =>
      Object.keys(globals).indexOf(name) !== -1
        ? extractField({ currentLanguage, noLangFields }, name, globals[name])
        : extractField({ currentLanguage, noLangFields }, name, recordData[name])
  )
}

function extractField ({ currentLanguage, noLangFields }, name, field) {
  if (noLangFields.indexOf(name) === -1) {
    const values = (field || {}).values || {}
    return values[currentLanguage]
  } else {
    return (field || {}).value
  }
}
