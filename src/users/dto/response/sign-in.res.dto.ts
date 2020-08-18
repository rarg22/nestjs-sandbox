
export class SignInResDto {
    data: {
        idToken: string, 
        accessToken: string,
        refreshToken: string, 
        expiresIn: Number,
        payload: Object
    }
}