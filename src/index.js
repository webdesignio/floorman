import { createStore } from 'redux'

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

export function findAndRender (components, ... args) {
  const store = createStore(... args)
  renderAll(findAll(components), { store })
  return store
}
