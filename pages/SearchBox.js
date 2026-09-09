import {expect} from "@playwright/test"

class SearchBox 
{
    constructor (page)
    {
        this.page = page
        this.searchpath = this.page.getByPlaceholder("Search")
        this.searchResult = this.page.getByText('Search Results',{exact: true})
        this.keyword = this.page.locator("//div[@id='keyword']/span")
        this.searchtext = this.page.locator("//div[@id='keyword']")
        this.emptysearchText = this.page.locator("//div[@id='page-content']/p")
        this.homepagelink = this.page.locator('//a[contains(text(),"homepage")]')
        this.resultdata = this.page.locator("//a[@class='animated fadeInUpBig']")
    }

    async SearchBoxVisibility ()
    {
        await (this.searchpath)
        await expect(this.searchpath).toBeVisible()
        await expect(this.searchpath).toBeEnabled()
        await expect(this.searchpath).toBeEditable()
    }

    async InvalidSearchBoxData(invalid_data)
    {
        const data = await this.searchpath
        data.fill(invalid_data)
        data.press("Enter")
        await expect (this.searchResult).toBeVisible()
        await expect(this.searchResult).toHaveText("Search Results")
        await expect(this.keyword).toHaveText(invalid_data)

    }

    async EmptySearchBox()
    {
        const data1 = await (this.searchpath)
        data1.press("Enter")
        await expect(this.searchResult).toHaveText("Search Results")
        await expect(this.emptysearchText).toHaveText("No search performed. If you are looking for something, please try our homepage")
        await expect(this.homepagelink).toHaveText("homepage")
    }

    async ValidSearchBoxData (valid_data)
    {
        await this.searchpath.fill(valid_data)
        await this.searchpath.press("Enter")
        await expect (this.searchResult).toBeVisible()
        await expect(this.searchResult).toHaveText("Search Results")
        await expect(this.searchtext).toHaveText("Showing results for "+valid_data)
        await expect(this.keyword).toHaveText(valid_data)

        console.log("Search Result for : " +valid_data)
        const result_count = await (this.resultdata).count()
        for (let i =1;i <=result_count;i++)
        {
            const Product_Xpath =  this.page.locator(`//a[@id='product-${i}']/h3`)
            const Product_Content = await Product_Xpath.textContent()
            const lowercase_product = Product_Content.toLowerCase()
            
            if (lowercase_product.includes(valid_data.toLowerCase()))
            {
                console.log(Product_Content)
            }
        }
    }
}
module.exports=SearchBox