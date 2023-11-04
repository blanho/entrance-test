export class CustomError extends Error {
    public timestamp: string;
    constructor(message: string, public statusCode: number, public path: string) {
        super(message);
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString()
        this.path = path
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;