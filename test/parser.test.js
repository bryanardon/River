import assert from "node:assert/strict"
import parse from "../src/parser.js"

const syntaxChecks = [
  [
    "demonstrate loop",
    `num y ~ 0  
    loop()  
        if(y == 1) 
            dry 
    y ~ y + 1`,
  ],
  ["printing", "outflow(5)"],
  ["inputting", 'name ~ inflow("What is your name")'],
  ["declare frozen", 'frozen text x ~ "Hello"'],
  [
    "function",
    `stream our_array ~ [1,1,1] 
    task sum_array_elements(our_array)  
    num sum ~ 0  
    loop(3) 
        sum ~ sum + 1  
    return sum`,
  ],
  ["text", 'text word ~ "String is Text"'],
  ["numbers", "num z ~ 9"],
  [
    "input and output",
    `text my_name ~ inflow("What is your name")
     outflow(my_name)`,
  ],
  ["end of program inside comment", 'text name ~ "River"  // yay'],
  ["comments", "// only a comment"],
  ["num non-Latin letters in identifiers", "num コンパイラ ~ 100"],
  [
    "Text non-Latin letters in identifiers",
    'text コンパイラ ~ "Non latin letters"',
  ],
  ["bool non-Latin letters in identifiers", "bool コンパイラ ~ true"],
  [
    "reassignment for num",
    `num y ~ 0
     y ~ 1`,
  ],
  ["reassignment for bool", `bool n ~ false n ~ true`],
  ["reassignment for text", 'text s ~ "Hello" s ~ "World"'],
  ["Reinitialize stream ", 'stream x ~ ["Hello", "World"] x ~ ["Hi!"]'],
  [
    "print variable",
    `num x ~ 5
    outflow(x)`,
  ],
  [
    "print elements in stream ",
    `stream our_array ~ [1,2,3] 
     loop(3) 
        outflow(1)`,
  ],
  ["stream with any data type", `stream all ~ [\"Scary\", 3, true]`],
  [
    "model",
    `model Dog
        num age ~ 0
        task birthday()
            age ~ age + 1
`,
  ],
  [
    "nested loop",
    ` x ~ 1
    loop(x < 0)
        y  ~ 2
        loop(y < 0)
            outflow(x)
            outflow(y)
            y ~ y - 1
        x ~ x - 1
`,
  ],
  [
    "if else",
    `if (false)
        outflow("Hello")
    else 
        outflow("World")`,
  ],
  [
    "if else if else",
    `if (false)
        outflow("Hello")
    else if (true)
        outflow("The else if")
    else 
        outflow("World")`,
  ],
  ["valid operations", "outflow(2 * 3 / 4 + 7)"],
]

const syntaxErrors = [
  ["non-letter in an identifier", "ab😭c = 2", /Line 1, col 3/],
  ["malformed number", "x= 2.", /Line 1, col 2/],
  ["missing semicolon", "x = 3 y = 1", /Line 1, col 3/],
  ["a missing right operand", "print(5 -", /Line 1, col 1/],
  ["a non-operator", "print(7 * ((2 _ 3)", /Line 1, col 1/],
  ["an expression starting with a )", "x = );", /Line 1, col 3/],
  ["a statement starting with expression", "x * 5;", /Line 1, col 3/],
  ["an illegal statement on line 2", "print(5);\nx * 5;", /Line 1, col 9/],
  ["a statement starting with a )", "print(5);\n) * 5", /Line 1, col 9/],
  ["an expression starting with a *", "x = * 71;", /Line 1, col 3/],
  ["incomplete conditional expression", "if (x == 5", /Line 1, col 11/],
  ["mismatched parentheses", "print((5 * 2", /Line 1, col 1/],
  ["unmatched opening brace", "function test() {", /Line 1, col 1/],
  ["unmatched closing brace", "}", /Line 1, col 1/],
  ["missing opening parenthesis", "x = 5)", /Line 1, col 3/],
  [
    "unclosed string literal",
    'text message = "Hello, world!',
    /Line 1, col 14/,
  ],
  ["missing closing bracket", "array = [1, 2, 3", /Line 1, col 7/],
  ["unexpected character in number", "y = 10a", /Line 1, col 3/],
  ["invalid assignment operator", "x === 5", /Line 1, col 3/],
  [
    "missing closing quotation mark in string",
    'const str = "unclosed string',
    /Line 1, col 7/,
  ],
  [
    "invalid syntax within template literal",
    "const template = `Hello, ${name`",
    /Line 1, col 7/,
  ],
  [
    "incorrect array index notation",
    "const arr = [1, 2, 3]; arr[0",
    /Line 1, col 7/,
  ],
  [
    "missing comma in object literal",
    'const obj = { key1: "value1" key2: "value2" };',
    /Line 1, col 7/,
  ],
  ["invalid character after number", "const num = 10x;", /Line 1, col 7/],
  [
    "invalid character in variable declaration",
    "const $var = 5;",
    /Line 1, col 7/,
  ],
]

describe("The parser", () => {
  for (const [scenario, source] of syntaxChecks) {
    it(`properly specifies ${scenario}`, () => {
      assert(parse(source).succeeded())
    })
  }
  for (const [scenario, source, errorMessagePattern] of syntaxErrors) {
    it(`does not permit ${scenario}`, () => {
      assert.throws(() => parse(source), errorMessagePattern)
    })
  }
})
