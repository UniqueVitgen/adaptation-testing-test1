var NumberValidator = require("../../number-validator");

describe('NumberValidator', () => {
    let numberValidator;
    const minimumValue = 0;
    const maximumValue = 10;
    const internalValue = 5;
    beforeEach(() => {
        numberValidator = new NumberValidator(minimumValue, maximumValue);
    });

    describe('setSubmitted', () => {
        it('should submitted to be true', () => {
            numberValidator.setSubmitted();
            expect(numberValidator.isSubmitted).toBeTruthy();
        });
    });

    describe('isValid', () => {
        it('if submitted flag is false - should return true', () => {
            numberValidator.isSubmitted = false;
            expect(numberValidator.isValid(234)).toBeTruthy();
        });

        describe('flag submitted is true', () => {
            beforeEach(() => {
                numberValidator.isSubmitted = true;
            });

            it('if wrong type - should return false', () => {
                spyOn(numberValidator, "isWrongType").and.returnValue(true);
                expect(numberValidator.isValid(235)).toBeFalsy();
            });

            describe('if not wrong type', () => {
                beforeEach(() => {
                    spyOn(numberValidator, "isWrongType").and.returnValue(false);
                });
                it('if value less than minimum - should return false', () => {
                    expect(numberValidator.isValid(minimumValue - 1)).toBeFalsy();
                });
                it('if value between minimum and maximum value - should return true', () => {
                    expect(numberValidator.isValid(internalValue)).toBeTruthy();
                });
                it('if value more than maximum - should return false', () => {
                    expect(numberValidator.isValid(maximumValue + 1)).toBeFalsy();
                });
            });
        });
    });

    describe('isWrongType', () => {
        describe('if type string', () => {
            describe('if flag acceptable string is true', () => {
                beforeEach(() => {
                    numberValidator.acceptString = true;
                });
                it('if value is number - should return false', () => {
                    expect(numberValidator.isWrongType('1.23')).toBeFalsy();
                });
                it('if value is not number - should return false', () => {
                    expect(numberValidator.isWrongType('aaa')).toBeFalsy();
                });
            });
            it('if flag acceptable string is false', () => {
                numberValidator.acceptString = false;
                expect(numberValidator.isWrongType('aaa')).toBeTruthy();
            });
        });
        it('if type number - should return false', () => {
            expect(numberValidator.isWrongType(12)).toBeFalsy();
        });
    });
});