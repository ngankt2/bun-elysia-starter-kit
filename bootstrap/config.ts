// @ts-ignore
import data from "../package.json";

export default {
    app: {
        name: data.name,
        version: data.version,
        port: process.env.APP_PORT || '3100',
    },
}
