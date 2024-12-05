import { merge } from 'lodash';
import {logger} from "../utils/logger";

export interface ConfigType {
    env: string;
    user: {
        username: string;
        password: string;
    }
    ui: {
        baseURL: string;
    }
    wait: {
        short: number
    }
}

export class Config implements ConfigType {

    constructor() {
        this.loadConfig<ConfigType>(`${__dirname}/default.config`);
        this.loadConfig<ConfigType>(`${__dirname}/${this.env}.config`);
    }

    protected loadConfig<T extends ConfigType>(configFile: string) {
        {
            logger.debug(`Loading config file from ${configFile}`);
            try {
                merge(this, require(configFile).cfg as T);
            } catch (e) {
              logger.warn(`Skipping ${configFile}: ${e}`);
            }
        }
    }

    env: string;
    user: {
        username: string;
        password: string;
    }
    ui: {
        baseURL: string;
    }
    wait: {
        short: number;
    }
}

const config: Config = new Config();

export { config };