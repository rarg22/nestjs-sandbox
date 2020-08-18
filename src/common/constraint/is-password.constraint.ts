import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const NUMBER_PATTERN = /.*\d.*/;
const UPPER_CASE_PATTERN = /.*[a-z].*/;
const LOWER_CASE_PATTERN = /.*[A-Z].*/;
const DEFAULT_MESSAGE =
    'Your password must between 8 and 32 characters long and contain at least one number and have a mixture of uppercase and lowercase letters.';
const MAX_LENGTH = 32;
const MIN_LENGTH = 8;

export function IsPassword(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = {};
            validationOptions.message = DEFAULT_MESSAGE;
        }
        registerDecorator({
            name: 'isPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: ['password'],
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    if (!NUMBER_PATTERN.test(value)) {
                        return false;
                    }
                    if (!UPPER_CASE_PATTERN.test(value)) {
                        return false;
                    }
                    if (!LOWER_CASE_PATTERN.test(value)) {
                        return false;
                    }
                    if (!(value.length >= MIN_LENGTH && value.length <= MAX_LENGTH)) {
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
