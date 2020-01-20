import test from "tape"
import { createStore, combineReducers } from "redux"

import { buildList, useList } from ".."

test("Update - id not in response", async t => {
  // WHAT TO TEST
  const todos = buildList("UPDATE-ERROR-NO-ID_TODOS", {
    read: () => [{ id: 1, name: "build gdpr startup" }, { id: 2 }],
    update: (id, data) => data,
  })

  // Redux store
  const store = createStore(
    combineReducers({
      [todos.name]: todos.reducer,
    })
  )

  const { selector, read, update } = useList(todos, store.dispatch)

  await read()
  await update(1, { name: "updated" })

  const { items } = selector(store.getState())

  t.deepEquals(
    items(),
    [{ id: 1, name: "updated" }, { id: 2 }],
    "Update should be done on the element with the id parameter .update was called with if there is no id field in the response"
  )

  t.end()
})