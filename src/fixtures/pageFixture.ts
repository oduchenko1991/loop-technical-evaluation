import {test as base} from '@playwright/test';
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";

/**
 * Fixture to create a new page object
 */
const pageFixture = base.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
}>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
});

export { pageFixture };