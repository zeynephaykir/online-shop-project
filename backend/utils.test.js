import jwt from 'jsonwebtoken';
import { generateToken, isAuth, isAdmin, payOrderEmailTemplate } from './utils';

jest.mock('jsonwebtoken');

describe('generateToken', () => {
  it('should expose a function', () => {
		expect(generateToken).toBeDefined();
	});
  
  it('generateToken should return expected output', () => {
    // const retValue = generateToken(user);
    expect(false).toBeTruthy();
  });
});
describe('isAuth', () => {
  it('should expose a function', () => {
		expect(isAuth).toBeDefined();
	});
  
  it('isAuth should return expected output', () => {
    // const retValue = isAuth(req,res,next);
    expect(false).toBeTruthy();
  });
});
describe('isAdmin', () => {
  it('should expose a function', () => {
		expect(isAdmin).toBeDefined();
	});
  
  it('isAdmin should return expected output', () => {
    // const retValue = isAdmin(req,res,next);
    expect(false).toBeTruthy();
  });
});
describe('payOrderEmailTemplate', () => {
  it('should expose a function', () => {
		expect(payOrderEmailTemplate).toBeDefined();
	});
  
  it('payOrderEmailTemplate should return expected output', () => {
    // const retValue = payOrderEmailTemplate(order);
    expect(false).toBeTruthy();
  });
});