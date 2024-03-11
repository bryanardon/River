<div align="center">
  <img src="docs/logo.png" width="64px">
  <h1>River</h1>
</div>

### Created by Bryan Ardon-Contreras, Davis Banks, Henry Benso, Maika Tran, and Nicholas Lee

In the tranquil embrace of nature, rivers flow in a manner such that ecosystems flourish where it goes. This concept of a peaceful flow gave life to the concept we call River. River is a statically typed language designed to put the users first. We have created River to become a programming language where the developer feels calm expressing their programming desires.

### Feature Overview

- Indentation
  - In River, statements are separated by indendation.
- Models
  - Object oriented structures (similar to classes).
- Supported data types and keywords:

  - `Num`
  - `Text`
  - `Bools`
  - Custom datatypes for created Models.
  - `Frozen` (similar to `const` in JavaScript)
  - `Dry` (which to `break` in JavaScript)

- Tasks
  - Tasks are River's function declarations.
  - River supports non-asynchronous functions and `async` functions.
  - For standard input and output, River supplies `inflow` and `outflow` functions respectively.
- Loops
  - River handles iterations through a single `loop` function.
- Assignment
  - Assignments in River are written using `~`.
- Variables
  - Variables in River follow the conventional `snake_case`. We were planning to separate names through hyphens `-` but weren't sure if this would cause an issue with the subtraction operator.
- Data Structures
  - River has `Stream` built-in, which has the same behavior as conventional arrays.

### Examples

Here's an example of input and output handling:

```
text my_name = inflow("What's your name?")
outflow(my_name)
```

A program using loops:

```
 num y ~ 0
    loop()
        if(y == 1)
            dry
        y +~ 1
 outflow(y)
```

A `task` declaration:

```
 stream our_array ~ [1,2,3]
 task sum_array_elements(our_array)
        num sum ~ 0
        loop(3)
            sum ~ sum + n
        return sum
```

A model:

```
model Dog
    num age = 0
    task birthday()
        age +~ 1
```

And `frozen` variables:

```
frozen text language_name = "River"
language_name = "Pyth"   // Would throw an error
```
