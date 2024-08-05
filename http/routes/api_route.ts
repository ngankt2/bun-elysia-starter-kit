import {Elysia} from "elysia";
import newsRoute from "../controllers/news/_route";

export default (app: Elysia) => {
    return app.group("/api", (app) =>
        app.use(newsRoute)
    );
};
