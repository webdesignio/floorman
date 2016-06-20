# webdesignio-floorman

Floorman is the client application that is embedded into each website. It coordinates the updates between the components. The API still WIP.

## `findAndRender(components, opts)`

This finds all components on the page and bootstraps them. The following `opts` are supported:

 * `record` - The record passed by the webdesignio engine.

The following props are passed to each component:

 * `store` - The store which can be used to subscribe to state updates. Since this is a redux store,
  check their [docs](http://redux.js.org)
