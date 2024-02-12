export class WebError extends Error {

    public status: number = 500;
    public data: any;
    public errors: any;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status || 500;
    }

}