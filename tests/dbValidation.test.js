const { generateErrorResp } = require('../models/dbValidation');

describe('generateErrorResp', () => {
  test('should return an error response object with custom message and no validation errors', () => {
    const error = new Error('Something went wrong');
    const customMessage = 'Custom error message';
    const expectedResp = {
      error: true,
      message: customMessage,
    };

    const actualResp = generateErrorResp(error, customMessage);

    expect(actualResp).toEqual(expectedResp);
  });

  test('should return an error response object with validation errors and custom message', () => {
    const error = {
      errors: {
        name: {
          name: 'ValidatorError',
          path: 'name',
          message: 'Name is required',
        },
        email: {
          name: 'ValidatorError',
          path: 'email',
          message: 'Email is required',
        },
      },
    };
    const customMessage = 'Custom validation failed message';
    const expectedResp = {
      error: true,
      message: customMessage,
      validationError: [
        {
          field: 'name',
          message: 'Name is required',
        },
        {
          field: 'email',
          message: 'Email is required',
        },
      ],
    };

    const actualResp = generateErrorResp(error, customMessage);

    expect(actualResp).toEqual(expectedResp);
  });

  test('should ignore non-ValidatorError validation errors', () => {
    const error = {
      errors: {
        name: {
          name: 'SomeOtherError',
          path: 'name',
          message: 'Name is required',
        },
        email: {
          name: 'ValidatorError',
          path: 'email',
          message: 'Email is required',
        },
      },
    };
    const expectedResp = {
      error: true,
      message: error.message,
      validationError: [
        {
          field: 'email',
          message: 'Email is required',
        },
      ],
    };

    const actualResp = generateErrorResp(error);

    expect(actualResp).toEqual(expectedResp);
  });
});