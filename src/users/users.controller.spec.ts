import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { SignUp, SignIn } from './usecase';
import { SignUpReqDto } from './dto/request';
import { validate, ValidationError } from 'class-validator';

describe('UsersController', () => {
    let controller: UsersController;
    let SignUpMock = { start: () => {} };
    let SignInMock = { start: () => {} };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersController, SignIn, SignUp],
        })
            .overrideProvider(SignIn)
            .useValue(SignInMock)
            .overrideProvider(SignUp)
            .useValue(SignUpMock)
            .compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Should_FailIsEmailConstraint_ForInvalidEmail', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.email = 'joedoe.com';
        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'email');
        expect(error && error.constraints.hasOwnProperty('isEmail')).toBe(true);
    });

    it('Should_FailIsPasswordConstraint_WhenPasswordHasNoNumber', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.password = 'Password';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'password');
        expect(error && error.constraints.hasOwnProperty('isPassword')).toBe(true);
    });

    it('Should_FailIsPasswordConstraint_WhenPasswordHasNoUpperCase', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.password = 'password123';
        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'password');
        expect(error && error.constraints.hasOwnProperty('isPassword')).toBe(true);
    });

    it('Should_FailIsPasswordConstraint_WhenPasswordHasNoLowerCase', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.password = 'PASSWORD123';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'password');
        expect(error && error.constraints.hasOwnProperty('isPassword')).toBe(true);
    });

    it('Should_FailIsNotEmptyConstraint_WhenUsernameIsEmpty', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.username = '';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'username');
        expect(error && error.constraints.hasOwnProperty('isNotEmpty')).toBe(true);
    });

    it('Should_FailIsNotEmptyConstraint_WhenFirstNameIsEmpty', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.firstName = '';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'firstName');
        expect(error && error.constraints.hasOwnProperty('isNotEmpty')).toBe(true);
    });

    it('Should_FailIsNotEmptyConstraint_WhenLastNameIsEmpty', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.username = '';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'lastName');
        expect(error && error.constraints.hasOwnProperty('isNotEmpty')).toBe(true);
    });

    it('Should_FailIsAlphaConstraint_WhenFirstNameContainsNonAlphaCharacters', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.firstName = 'J0e';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'firstName');
        expect(error && error.constraints.hasOwnProperty('isAlpha')).toBe(true);
    });

    it('Should_FailIsAlphaConstraint_WhenLastNameContainsNonAlphaCharacters', async () => {
        const signUpReqDto: SignUpReqDto = new SignUpReqDto();
        signUpReqDto.lastName = 'Doe!';

        const errors: Array<ValidationError> = await validate(signUpReqDto);
        const error = errors.find(value => value.property === 'lastName');
        expect(error && error.constraints.hasOwnProperty('isAlpha')).toBe(true);
    });
});
