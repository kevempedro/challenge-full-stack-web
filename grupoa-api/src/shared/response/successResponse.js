export default class SuccessResponse {
    message;
    status;
    data;
    hasError;

    constructor(data, status) {
        this.message = '';
        this.data = data;
        this.status = status;
        this.hasError = false;
    }
}
