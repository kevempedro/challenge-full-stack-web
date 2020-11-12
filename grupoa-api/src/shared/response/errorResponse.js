export default class ErrorResponse {
    message;
    status;
    data;
    hasError;

    constructor(message, status) {
      this.message = message;
      this.status = status;
      this.data = null;
      this.hasError = true;
    }
}
