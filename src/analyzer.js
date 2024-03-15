import * as core from "./core.js"

const NUM = core.numType
const TEXT = core.textType
const BOOL = core.boolType

class Context {
  constructor({
    parent = null,
    locals = new Map(),
    inLoop = false,
    function: f = null,
  }) {
    Object.assign(this, { parent, locals, inLoop, function: f })
  }
  add(name, entity) {
    this.locals.set(name, entity)
  }
  lookup(name) {
    return this.locals.get(name) || this.parent?.lookup(name)
  }
  static root() {
    return new Context({
      locals: new Map(Object.entries(core.standardLibrary)),
    })
  }
  newChildContext(props) {
    return new Context({ ...this, ...props, parent: this, locals: new Map() })
  }
}

export default function analyze() {
  let context = Context.root()

  function must(condition, message, errorLocation) {
    if (!condition) {
      const prefix = errorLocation.at.source.getLineAndColumnMessage()
      throw new Error(`${prefix}: ${message}`)
    }
  }

  function mustNotBeDeclared(name, at) {
    must(!context.lookup(name), `already declared: ${name}`, at)
  }

  function mustHaveBeenFound(entity, name, at) {
    must(entity, `undeclared: ${name}`, at)
  }

  function mustHaveNumType(e, at) {
    // TODO: are types optional yet?
    must(e.type?.kind === NUM, `expected a number`, at)
  }

  function mustHaveTextType(e, at) {
    // TODO: are types optional yet?
    must(e.type?.kind === TEXT, `expected text`, at)
  }

  function mustHaveBoolType(e, at) {
    // TODO: are types optional yet?
    must(e.type?.kind === BOOL, `expected a boolean`, at)
  }

  function mustHaveStreamType(e, at) {
    // TODO: are types optional yet?
    must(e.type?.kind === "StreamType", `expected a stream`, at)
  }

  function mustHaveModelType(e, at) {
    // TODO: are types optional yet?
    must(e.type?.kind === "ModelType", `expected a model`, at)
  }

  // TODO: optional type?

  function mustBothHaveSameType(left, right, at) {
    must(
      left.type === right.type,
      `expected both sides to have the same type`,
      at
    )
  }

  function mustAllHaveSameType(expressions, at) {
    must(
      expressions.slice(1).every((e) => e.type === expressions[0].type),
      `expected all expressions to have the same type`,
      at
    )
  }

  function mustBeAType(e, at) {
    must(e.kind.endsWith("Type"), `expected a type`, at)
  }

  function includesAsField(modelType, type) {
    return (
      modelType.fields.some((f) => f.type === type) &&
      includesAsField(f.type, type)
    )
  }

  function equivalent(t1, t2) {
    return (
      t1 === t2 ||
      (t1.kind === "StreamType" &&
        t2.kind === "StreamType" &&
        equivalent(t1.baseType, t2.baseType))
    )
  }

  function assignable(fromType, toType) {
    return equivalent(fromType, toType)
  }

  function typeDescription(type) {
    switch (type.kind) {
      case "NumType":
        return "num"
      case "TextType":
        return "text"
      case "BoolType":
        return "bool"
      case "StreamType":
        return `stream of ${typeDescription(type.baseType)}`
      case "ModelType":
        return type.name
    }
  }

  function mustBeAssignable(e, { toType: type }, at) {
    must(
      assignable(e.type, type),
      `cannot assign a ${typeDescription(e.type)} to a ${typeDescription(
        type
      )}`,
      at
    )
  }

  function mustNotBeFrozen(e, at) {
    must(!e.frozen, `cannot modify a frozen variable`, at)
  }

  function mustHaveDistinctFields(type, at) {
    const fieldNames = new Set(type.fields.map((f) => f.name))
    must(fieldNames.size === type.fields.length, `fields must be distinct`, at)
  }

  function mustHaveMember(structType, field, at) {
    must(
      structType.fields.some((f) => f.name === field),
      `no such field`,
      at
    )
  }

  function mustBeInLoop(at) {
    must(context.inLoop, `dry and continue are only allowed in loops`, at)
  }

  function mustBeInFunction(at) {
    must(context.function, `return is only allowed in functions`, at)
  }

  function mustBeCallable(e, at) {
    must(e.type.kind === "CallableType", `non-function called`, at)
  }

  function mustHaveCorrectParamCount(e, count, at) {
    must(e.type.paramTypes.length === count, `expected ${count} arguments`, at)
  }

  // TODO: program representation builder
}
