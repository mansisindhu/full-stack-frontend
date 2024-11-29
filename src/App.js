function function1(param1) {
  return function function2(param2) {
    return param1 + param2
  }
}

const function1Return = function1(2);
console.log(function1Return)
const function2Return = function1Return(1)

console.log(function2Return)