import {customTest as test, expect} from "../fixtures/_fixture";
import {config} from "../config/config";
import {logger} from "../utils/logger";
import loginTestData from "../test-data/loginTestData.json";

test.describe('Login tests', () => {
    loginTestData.forEach(({description, title, page, column, tags}) => {
        test(description, async ({loginPage, homePage}) => {
            await loginPage.goToLoginPage();
            await loginPage.login(config.user.username, config.user.password);
            await homePage.navigateTo(page);
            const tiles = await homePage.getColumnTitles(column);

            logger.info(`Tiles: ${JSON.stringify(tiles, null, 2)}`);
            logger.info(`Expected title: ${title}`);
            const expectedTile = tiles.find(tile => tile.title === title);

            expect(expectedTile).toBeDefined();
            expect(expectedTile.tags).toEqual(tags);
        });
    });
});