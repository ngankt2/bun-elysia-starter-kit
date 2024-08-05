import {cron, Patterns} from '@elysiajs/cron'
export default (app: any) =>
    app
        .use(cron({
            name: 'jobRunEveryHours',
            pattern: Patterns.everyHours(),
            run() {
                console.log("Run cron job run (jobRunEveryHours)");
            }
        }))