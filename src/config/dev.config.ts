import process from "node:process";

const _email = (process.env.USERNAME || '').trim();
const _password = (process.env.USER_PASSWORD || '').trim();

export const cfg = {
    user: {
        username: _email,
        password: _password
    },
    ui: {
        baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app'
    }
}