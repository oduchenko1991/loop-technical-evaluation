import {Page} from "@playwright/test";
import {Column, Navigation} from "../models/enums";
import {toDate} from "../utils/timeUtil";
import {Tile} from "../models/entities";


export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to a specific page
     * @param navigation
     */
    public async navigateTo(navigation: Navigation | string) {
        await this.page.click(`//nav//h2[text()='${navigation}']`);
    }

    /**
     * Returns the titles of all tiles in a column
     * @param column
     */
    public async getColumnTitles(column: Column | string): Promise<Tile[]> {
        const columns = await this.getColumnTilesCount(column);
        const tiles: Tile[] = [];
        for (let i = 1; i <= columns; i++) {
            tiles.push(await this.getTile(column, i));
        }
        return tiles;
    }

    /**
     * Returns a tile object
     * @param column
     * @param index
     */
    public async getTile(column: Column | string, index: number) {
        const title = await this.getTileTitle(column, index);
        const description = await this.getTileDescription(column, index);
        const tags = await this.getTileTags(column, index);
        const author = await this.getTileAuthor(column, index);
        const date = await this.getTileDate(column, index);
        return {title, description, tags, author, date} as Tile;
    }

    /**
     * Returns the number of tiles in a column
     * @param column
     * @private
     */
    private async getColumnTilesCount(column: Column | string): Promise<number> {
        const textCount: string = await this.page.locator(`//h2[text()="${column}"]/span`).textContent();
        return parseInt(textCount.replace(/\D/g, ''));
    }

    /**
     * Returns the title of a tile
     * @param column
     * @param index
     * @private
     */
    private async getTileTitle(column: Column | string, index: number): Promise<string> {
        return this.page.locator(this.tileBaseLocator(column, index)).locator('h3').textContent();
    }

    /**
     * Returns the description of a tile
     * @param column
     * @param index
     * @private
     */
    private async getTileDescription(column: Column | string, index: number): Promise<string> {
        return this.page.locator(this.tileBaseLocator(column, index)).locator('p').textContent();
    }

    /**
     * Returns the tags of a tile
     * @param column
     * @param index
     * @private
     */
    private async getTileTags(column: Column | string, index: number): Promise<string[]> {
        return this.page.locator(this.tileBaseLocator(column, index)).locator('//div[1]//span[contains(@class, "rounded-full")]').allInnerTexts();
    }

    /**
     * Returns the author of a tile
     * @param column
     * @param index
     * @private
     */
    private async getTileAuthor(column: Column | string, index: number): Promise<string> {
        return this.page.locator(this.tileBaseLocator(column, index)).locator('//div[2]//div[1]').textContent();
    }

    /**
     * Returns the date of a tile
     * @param column
     * @param index
     * @private
     */
    private async getTileDate(column: Column | string, index: number): Promise<Date> {
        const dateString = await this.page.locator(this.tileBaseLocator(column, index)).locator('//div[2]//div[2]').textContent();
        return toDate(dateString);
    }

    /**
     * Returns the base locator for a tile in a column
     * @param column
     * @param index
     * @private
     */
    private tileBaseLocator(column: Column | string, index: number): string {
        return `(//*[text()='${column}']/following-sibling::div/*[contains(@class,'bg-white')])[${index}]`;
    }
}