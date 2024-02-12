import {WebError} from "../webError";

export class InvalidIdError extends WebError {
    constructor(id: any) {
        super(`Bad Request: '${id}' is not a valid id!`);
        this.status = 400;
        this.data = {
            invalidId : id
        }
    }
}