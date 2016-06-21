import test from 'ava'
import { spy } from 'sinon'

import 'babel-register'
import { renderAll } from '.'

test('all components are rendered', t => {
  t.plan(6)
  const components = [
    { component: spy(), props: { prop: 1 }, el: {} },
    { component: spy(), props: { prop: 2 }, el: {} },
    { component: spy(), props: { prop: 3 }, el: {} }
  ]
  const props = { additional: 'props' }
  renderAll(components, props)
  components.forEach(c => {
    t.truthy(c.component.calledOnce)
    t.deepEqual(
      c.component.args[0][0],
      Object.assign({}, c.props, props)
    )
  })
})
