import {Elysia} from "elysia";
import config from "../bootstrap/config";

import apiDocument from "../http/middleware/apiDocument";
import {staticPlugin} from "@elysiajs/static";
import errorHandler from "../http/middleware/errorHandler";
import i18nextHandler from "../http/middleware/i18nHandler";

const datetime = new Date();
const app = new Elysia()

app
    .use(errorHandler)
    .use(apiDocument)
    .use(i18nextHandler)
    .use(staticPlugin())
    .get("/", async (context: any) => {
        return {
            name: config.app.name,
            message: context.t('hi'),
            version: config.app.version,
            runtime: datetime,
            time: new Date(),
            status: 200,
        }
    })
    .listen(process.env.APP_PORT || 4000, async () => {
        console.log(
            `Starter app is running at ${app.server?.hostname}:${app.server?.port}, ${datetime}`
        );

    });