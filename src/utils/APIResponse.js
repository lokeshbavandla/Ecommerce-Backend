class APIResponse {
    constructor(
        message = '',
        data = {}
    ){
        this.status = 'Success';
        this.message = message;
        this.data = data;
    }
}

export default APIResponse;