export function program(statements) {
  return {
    kind: "Program",
    statements,
  }
}

export function variableDeclaration(name, initializer) {
  return {
    kind: "VariableDeclaration",
    name,
    initializer,
  }
}

export function typeDeclaration(type) {
  return {
    kind: "TypeDeclaration",
    type,
  }
}

export const numType = { kind: "NumType" }
export const boolType = { kind: "BoolType" }
export const textType = { kind: "TextType" }

export function streamType(baseType) {
  return {
    kind: "StreamType",
    baseType,
  }
}

export function emptyStream(baseType) {
  return {
    kind: "EmptyStream",
    baseType,
  }
}

export function optionalType(baseType) {
  return {
    kind: "OptionalType",
    baseType,
  }
}

export function taskDeclaration(name, params, body) {
  return {
    kind: "TaskDeclaration",
    name,
    params,
    body,
  }
}

export function modelDeclaration(name, fields) {
  return {
    kind: "ModelDeclaration",
    name,
    fields,
  }
}

export function indexStatement(target, index, source) {
  return {
    kind: "IndexStatement",
    target,
    index,
    source,
  }
}

export function ifStatement(test, consequent, alternate) {
  return {
    kind: "IfStatement",
    test,
    consequent,
    alternate,
  }
}

export function shortIfStatement(test, consequent) {
  return {
    kind: "ShortIfStatement",
    test,
    consequent,
  }
}

export function returnStatement(expression) {
  return {
    kind: "ReturnStatement",
    expression,
  }
}

export function shortReturnStatement() {
  return {
    kind: "ShortReturnStatement",
  }
}

export function dryStatement() {
  return {
    kind: "DryStatement",
  }
}

export function loopStatement(params, body) {
  return {
    kind: "LoopStatement",
    params,
    body,
  }
}

export function conditional(test, consequent, alternate) {
  return {
    kind: "Conditional",
    test,
    consequent,
    alternate,
  }
}

export function assignment(target, source) {
  return {
    kind: "Assignment",
    target,
    source,
  }
}

export function call(target, args) {
  return {
    kind: "Call",
    target,
    args,
  }
}

export function binary(op, left, right) {
  return {
    kind: "Binary",
    op,
    left,
    right,
  }
}

export function variable(name, frozen, type) {
  return {
    kind: "Variable",
    name,
    frozen,
    type,
  }
}

export function task(name, paramCount) {
  return {
    kind: "Task",
    name,
    paramCount,
  }
}

export function model(fields) {
  return {
    kind: "Model",
    fields,
  }
}

export function field(name, type) {
  return {
    kind: "Field",
    name,
    type,
  }
}

export const standardLibrary = Object.freeze({
  num: numType,
  text: textType,
  bool: boolType,
  stream: streamType,
  inflow: task("inflow", 1),
  outflow: task("outflow", 1),
})

Number.prototype.type = numType
String.prototype.type = textType
Boolean.prototype.type = boolType
