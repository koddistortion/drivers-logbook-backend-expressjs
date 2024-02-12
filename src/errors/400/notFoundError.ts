import {WebError} from "../webError";

export class NotFoundError extends WebError {
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}