import {expect,test} from "@playwright/test"
import SearchBox from "../pages/SearchBox"

const invalid_JSON = require("../Test_Data/invalid_data.json")
const valid_JSON = require("../Test_Data/valid_data.json")


test.beforeEach(async ({page}) =>
{
    await page.goto("https://sauce-demo.myshopify.com/")
})

test(" Empty Search Box Verification", async ({page}) =>
{
    
    const SearchBar = new SearchBox(page)
    await SearchBar.EmptySearchBox()

})

test("Invalid Search Box Data Verification", async ({page}) =>
{
    for(const i of invalid_JSON)
    {

        const SearchBar = new SearchBox(page)
        await SearchBar.InvalidSearchBoxData(i.data)

    }
})

test("Valid Search Box Data Verification", async ({page}) =>
{

    for(const i of valid_JSON)
    {
        const SearchBar = new SearchBox(page)
        await SearchBar.ValidSearchBoxData(i.data)
    }

})

