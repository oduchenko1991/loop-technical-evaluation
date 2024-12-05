import {Locator, Page} from "@playwright/test";
import {config} from "../config/config";
import {logger} from "../utils/logger";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.locator('#username');
        this.passwordInput = this.page.locator('#password');
        this.signInButton = this.page.locator('[type="submit"]');
    }

    /**
     * Logs in to the application
     * @param email
     * @param password
     */
    public async login(email: string, password: string) {
        await this.emailInput.fill(email, {timeout: config.wait.short});
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    /**
     * Navigates to the login page
     */
    public async goToLoginPage() {
        logger.info(`Navigating to ${config.ui.baseURL}`);
        await this.page.goto(config.ui.baseURL);
    }
}