import validation from "./validation.js";

beforeEach(() => {
});

describe('testing validation', () => {


  test('return obj after validation', () => {
    const resultObj = {
      id: getNextId(),
      title,
      category : mainCategory,
      ammount,
      date,
      type
    }
    expect(validation('income')).toEquaL(resultObj)

  });

});