const calculate = (str) => {
  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const operators = {
    plus: function (a, b) {
      return Math.floor(a + b);
    },
    minus: function (a, b) {
      return Math.floor(a - b);
    },
    times: function (a, b) {
      return Math.floor(a * b);
    },
    divided_by: function (a, b) {
      return Math.floor(a / b);
    },
  };

  str = str.slice(0, -4); // Removes "()))" from "eight(divided_by(three()))"

  str = str.split("("); // ["eight","divided_by","three"]

  const result = operators[str[1]](numbers[str[0]], numbers[str[2]]);

  return JSON.stringify(result);
};

export default calculate;
