import lib, {i18n, InitOptions} from "i18next";
import {Elysia} from "elysia";
import path from "path";
import {Glob} from "bun";

export type I18NextPluginOptions = {
    initOptions: InitOptions;
    instance: null | i18n;
};

function _getLanguage(context: any, keys: any = ['language', 'lang']) {
    let {request, body, set, params, store} = context;
    const url = new URL(request.url);
    for (const key of keys) {
        if (url.searchParams.get(key)) {
            return url.searchParams.get(key);
        }

        if (body && body[key]) {
            return body[key];
        }

        if (params && key in params) {
            return params[key];
        }

        const cookie = set.cookie ? set.cookie[key] : null;
        if (cookie && cookie.value) {
            return cookie.value;
        }

        if (key in store) {
            return (store as Record<string, unknown>)[key] as | string | null;
        }
    }
}

const loadLocales = () => {
    const locales: any = {};
    const glob = new Glob("*");
    for (const file of glob.scanSync({cwd: './locales', absolute: true})) {
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        locales[fileNameWithoutExt] = {translation: require(file)};
    }
    return locales;
};

const defaultOptions: I18NextPluginOptions = {
    instance: null,
    initOptions: {
        lng: "en",
        resources: loadLocales(),
        fallbackLng: "en",
        detection: {
            caches: []
        },
        cache: {
            enabled: false
        }
    },
};
const options: I18NextPluginOptions = {...defaultOptions};
const _instance = options.instance || lib;

export default (app: Elysia) =>
    app
        .derive(async (ctx: any) => {
            if (!_instance.isInitialized) {
                await _instance.init(options.initOptions || {});
            }
            const _outputFunc = (key: string, opts?: any) => {
                //Fix bug many request and error language key
                let lang = _getLanguage(ctx);
                const modifiedOpts = {...opts, lng: lang ?? 'en'};
                return _instance.t(key, modifiedOpts);
            };
            return {t: _outputFunc, i18n: _instance};
        })

