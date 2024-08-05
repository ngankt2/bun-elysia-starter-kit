import {Elysia} from "elysia";
import * as list from './list';
import * as detail from './detail';

export default (app: Elysia) => {
    return app.group("/news", (app) =>
        app
            .post("/list", list.main, list.validation)
            .post("/detail", detail.main, detail.validation)
            .post("/detail", list)
    );
};
