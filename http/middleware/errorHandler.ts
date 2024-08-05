import {Elysia} from 'elysia';
import {StatusCodes} from 'http-status-codes';

export default (app: Elysia) =>
    app
        .onError((handler: any) => {
            console.error(handler.error)
            handler.set.status ||= StatusCodes.INTERNAL_SERVER_ERROR;
            return {
                message: handler.error.message,
                status: handler.set.status,
            }
        })
