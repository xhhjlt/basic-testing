// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 9, b: 3, action: Action.Subtract, expected: 6 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 'invalid', b: 2, action: Action.Exponentiate, expected: null },
  { a: 2, b: 'invalid', action: Action.Add, expected: null },
  { a: 3, b: 2, action: 'invalid', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b and return $expected, or return null on invalid input',
    ({ expected, ...input }) => {
      expect(simpleCalculator(input)).toBe(expected);
    },
  );
});
