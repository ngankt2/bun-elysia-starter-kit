import {Elysia} from "elysia";
import swagger from "@elysiajs/swagger";
import {basicAuth} from "@eelkevdbos/elysia-basic-auth";
import config from "../../bootstrap/config";

let document_path = '/docs';
export default (app: Elysia) =>
    app
        .use(basicAuth({
            credentials: [{
                username: process.env.BASIC_AUTH_USERNAME || 'admin',
                password: process.env.BASIC_AUTH_PASSWORD || 'password'
            }],
            realm: 'Admin',
            scope: document_path,
        }))
        .use(swagger({
            path: 'docs',
            exclude: [
                document_path, '/',
                document_path + '/json',
            ],
            autoDarkMode: true,
            theme: 'dark',
            documentation: {
                info: {
                    title: config.app.name + " API DOCUMENTATION",
                    version: config.app.version,
                },
                tags: [],
            },
        }))
