import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 100);
    expect(spy).toHaveBeenCalledWith(callback, 100);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 500);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 100);
    expect(spy).toHaveBeenCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously('index.ts');
    expect(spy).toHaveBeenCalledWith(__dirname, 'index.ts');
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('not-exist.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously('index.ts');
    expect(result).toBeDefined();
  });
});
