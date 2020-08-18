export class BaseException extends Error {
    readonly code: string;
    readonly message: string;

    constructor(code: string, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
}
