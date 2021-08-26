/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const { exception } = require('console');
const absolute = require('../testIf');
const greet = require('../testString');
const arrCur = require('../testArrays');
const getProduct = require('../testObject');
const registerUser = require('../testEeception');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = absolute(1);
    expect(result).toBe(1);
  });
  it('should return a positive number if input is negetive', () => {
    const result = absolute(-1);
    expect(result).toBe(1);
  });
  it('should return 0  if input is 0', () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});

// test('absolute - should return a positive number if input is positive', () => {
//   const result = absolute(1);
//   expect(result).toBe(1);
// });
// test('absolute - should return a positive number if input is negetive', () => {
//   const result = absolute(-1);
//   expect(result).toBe(1);
// });
// test('absolute - should return 0  if input is 0', () => {
//   const result = absolute(0);
//   expect(result).toBe(0);
// });

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = greet('mosh');
    expect(result).toMatch(/mosh/);
    expect(result).toContain('mosh');
  });
});

describe('arrCur', () => {
  it('should return supported currencies', () => {
    const result = arrCur();
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    // ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

// TEST OBJECT

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty('id', 1);
  });
});

// exception testing

describe('registerUser', () => {
  it('should through if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => { registerUser(a); }).toThrow();
    });
  });
  it('should return a user object if valid username is pased', () => {
    const result = registerUser('mosh');
    expect(result).toMatchObject({ username: 'mosh' });
    expect(result.id).toBeGreaterThan(0);
  });
});

// Exercise 174
