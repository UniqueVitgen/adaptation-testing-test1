module.exports = class NumberValidator {

    constructor(minimum, maximum, acceptString = false, immediateValidate = false) {
        this.isSubmitted = immediateValidate;
        this.acceptString = acceptString;
        this.minimum = minimum;
        this.maximum = maximum;
    }

    setSubmitted() {
        this.isSubmitted = true;
    }

    isValid(value) {
        if (!this.isSubmitted) {
            return true;
        }

        if (this.isWrongType(value)) {
            return false;
        }

        return value >= this.minimum && value <= this.maximum;
    }

    isWrongType(value) {
        const acceptableString = this.acceptString && typeof value === "string";

        if (acceptableString && isNaN(parseFloat(value))) {
            return false;
        }

        return !(typeof value === "number" || acceptableString);
    }
}