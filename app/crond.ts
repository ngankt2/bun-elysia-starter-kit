import schedule from "../console/schedule";

const datetime = new Date();
import {Elysia} from "elysia";

import errorHandler from "../http/middleware/errorHandler";

const app: any = new Elysia()
app.use(schedule)
    .use(errorHandler)
    .listen(9630, async () => {
        console.log(
            `Worker, Queue, Cronjob is running at ${app.server?.hostname}:${app.server?.port}, ${datetime}`
        );
    });