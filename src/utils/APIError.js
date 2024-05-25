class APIError extends Error {
    constructor(
        message = ''
    ){
        super(message);
        this.status = 'error';
        this.message = message;
    }
}

export default APIError;