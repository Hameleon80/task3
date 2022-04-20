export class ApiError extends Error{
    constructor(status: number, message: string){
        super();
        this.status = status;
        this.message = message;
    }

    status: number;
    message: string;

    static badRequest(message: string){
        return new ApiError(404, message);
    }
}