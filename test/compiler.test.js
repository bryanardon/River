import * as assert from "node:assert/strict"
import { compile } from "../src/River.js"
describe("Compiler", () => {
  it("Should compile", () => {
    assert.equal(compile(), "eventually this will return the compiled code")
  })
})
