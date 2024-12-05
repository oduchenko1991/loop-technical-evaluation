import * as process from "node:process";

const _env = process.env.ENV || 'dev';

export const cfg = {
    env: _env,
    wait: {
        short: 5000
    }
}