# River

In the tranquil embrace of nature, rivers flow in a manner such that ecosystems flourish where it goes. This concept of a peaceful flow gave life to the concept we call River. River is a statically typed language designed to put the users first. We have created River to become a programming language where the developer feels calm expressing their programming desires.

### Features

- Indentation
  - We indent to separate statements in River.
- Models
  - Same as classes
- Data types and keywords:

  - Num
  - Text
  - Bools
  - Custom datatypes for the Models created.
  - Frozen which has the same behavior as `const`
  - Dry which is the same as `break`

- Tasks
  - These will be our function declarations
  - We will include non-asynchronous functions and `async` functions
  - For inputing and outputing text, we have created `inflow` and `outflow` functions respectively.
- Loops
  - Iterations are handled through our `loop` function
- Assignment
  - Assignments are done through `~`
- Variables
  - Variables follow the convetional snake_case. We were planning to separate names through hyphens `-` but weren't sure if this would cause an issue with the subtraction operator.
- Data strucutres
  - We'll have the built in `Stream` which has the same behavior as an array.

### Examples

```
text my_name = inflow("What is your name")
outflow(my_name)
```

```
 num y ~ 0
    loop()
        if(y == 1)
            dry
        y +~ 1
 outflow(y)
```

```
 stream our_array ~ [1,2,3]
 task sum_array_elements(our_array)
        num sum ~ 0
        loop(3)
            sum ~ sum + n
        return sum
```

```
model Dog
    num age = 0
    task birthday()
        age +~ 1
```

```
frozen text language_name = "River"
language_name = "Pyth"   // Would throw an error
```
