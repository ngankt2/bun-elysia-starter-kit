import {Elysia} from "elysia";
import * as list from './list';
import * as detail from './detail';

export default (app: Elysia) => {
    return app.group("/news", (app) =>
        app
            .get("/", list.main, list.validation)
            .get("/detail", detail.main, detail.validation)
    );
};
