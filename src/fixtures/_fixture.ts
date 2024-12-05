import {pageFixture,} from "./pageFixture";
import {mergeTests, expect} from "@playwright/test";

/**
 * Custom test fixture
 */
const customTest = mergeTests(pageFixture);
export {customTest, expect};