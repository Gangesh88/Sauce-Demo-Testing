const { expect } = require("@playwright/test")

class Blog
{
    constructor (page)
    {
        this.page = page
        this.link = "//a[@href='/blogs/news']"
        this.heading = "(//h2)[1]"
        this.para1 = "//p[contains(text(),'This is your store')]"
        this.para2 = "//p[contains(text(),'You can check out Shopify’s ')]"
        this.para2link = "//a[contains(text(),'ecommerce blog')]"
        this.para3 = "//p[contains(text(),'Log in') ]"
        this.para3bold = "//strong[contains(text(),'How do I remove this post?')]"
        this.para3link = "//a[contains(text(),'admin area')]"
        this.para4bold = "//strong[contains(text(),'Why use Shopify?')]"
        this.para4 = "//p[4]"
        this.para4link1 = "(//a[contains(text(),'Shopify')])[1]"
        this.para4link2 = "//a[contains(text(),'sell online')]"
        this.para4link3 = "//a[contains(text(),'ecommerce template')]"
        this.para4link4 = "//a[contains(text(),'ecommerce hosting')]"
        this.para4link5 = "//a[contains(text(),'shopping cart software')]"

    }

    async BlogDetails()
    {

        
        await expect(this.page.locator(this.link)).toBeVisible()
        await this.page.click(this.link)
        await expect(this.page).toHaveTitle("News – Sauce Demo")
        await expect(this.page.locator(this.heading)).toHaveText("First Post")
        await expect(this.page.locator(this.para1)).toHaveText("This is your store’s blog. You can use it to talk about new product launches, experiences, tips or other news you want your customers to read about.")
        await expect(this.page.locator(this.para2)).toHaveText("You can check out Shopify’s ecommerce blog for inspiration and advice for your own store and for your store’s blog.")
        await expect(this.page.locator(this.para2link)).toHaveText('ecommerce blog')
        await expect(this.page.locator(this.para3)).toHaveText("How do I remove this post? Log in to your store’s admin area then go to the blog section to delete this post.")
        await expect(this.page.locator(this.para3bold)).toHaveText("How do I remove this post?")
        await expect(this.page.locator(this.para3link)).toHaveText("admin area")
        await expect(this.page.locator(this.para4)).toHaveText("Why use Shopify? Shopify gives you everything you need to sell online and run an online store. Pick an ecommerce template, add your products, then launch your store to the world. Shopify includes ecommerce hosting, a shopping cart software, and more.")
        await expect(this.page.locator(this.para4bold)).toHaveText("Why use Shopify?")
        await expect(this.page.locator(this.para4link1)).toHaveText('Shopify')
        await expect(this.page.locator(this.para4link2)).toHaveText('sell online')
        await expect(this.page.locator(this.para4link3)).toHaveText('ecommerce template')
        await expect(this.page.locator(this.para4link4)).toHaveText('ecommerce hosting')
        await expect(this.page.locator(this.para4link5)).toHaveText('shopping cart software')
 
    }

}
module.exports = Blog