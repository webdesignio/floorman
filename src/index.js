import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reduce from './reducers'

export function createStore ({ globals, record }) {
  const store = createReduxStore(
    reduce,
    { originalRecord: record, record, globals },
    applyMiddleware(thunk)
  )
  return store
}

export function findAll (components) {
  const slice = Array.prototype.slice
  const els = slice.call(document.querySelectorAll('[data-component]'))
  return els
    .map(el => (
      !components[el.getAttribute('data-component')]
        ? null
        : {
          component: components[el.getAttribute('data-component')],
          props: JSON.parse(decodeURI(el.getAttribute('data-props') || '{}')),
          el
        }
    ))
    .filter(n => !!n)
}

export function renderAll (components, props) {
  components.forEach(def =>
    def.component(Object.assign({}, def.props, props), def.el)
  )
}

export function findAndRender (components, opts) {
  const store = createStore(opts)
  renderAll(findAll(components), { store })
  return store
}
