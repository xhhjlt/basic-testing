import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(10);
    expect(account instanceof BankAccount).toBe(true);
    expect(account.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      getBankAccount(10).withdraw(20);
    } catch (error) {
      expect(error instanceof InsufficientFundsError).toBe(true);
    }
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(10).transfer(20, getBankAccount(5))).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10);
    expect(() => account.transfer(20, account)).toThrow();
  });

  test('should deposit money', () => {
    const account = getBankAccount(10);
    account.deposit(20);
    expect(account.getBalance()).toBe(30);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(30);
    account.withdraw(20);
    expect(account.getBalance()).toBe(10);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(30);
    const toAccount = getBankAccount(10);
    fromAccount.transfer(15, toAccount);
    expect(fromAccount.getBalance()).toBe(15);
    expect(toAccount.getBalance()).toBe(25);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(10);
    expect(await getBankAccount(0).fetchBalance()).toBe(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(10);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error instanceof SynchronizationFailedError).toBe(true);
    }
  });
});
