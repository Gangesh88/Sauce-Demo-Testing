const{expect} = require('@playwright/test')

class Cart
{
    constructor(page)
    {   
        this.page = page
        this.CatalogLink = this.page.getByText("Catalog")
        this.heading = "(//h1)[2]"
        this.productslist = "//a[@class='animated fadeInUpBig']"
        this.addtocart =  "//input[@value='Add to Cart']"
        this.soldout = "//input[@value='Sold Out']"
        this.cartcount = "//a[@href='#']//span[@class = 'count cart-target']"
        this.mycart = "//a[@class='toggle-drawer cart desktop ']"
        this.sidebar = "//div[@id='sidebar']//li[not (@class='mobile')]/a"
        this.sidebardata = ['Home','Catalog','Blog','About Us','Wish list','Refer a friend']
        this.emptycart = "//p[@class='empty']"
        this.productAndPriceList =[]
        this.Total_Price = 0
        this.total_products =0
    }



    async product()
    {
        this.productAndPriceList =[]
        await this.CatalogLink.click()
        this.total_products = await this.page.locator(this.productslist).count()

        for(let i=1;i<=this.total_products;i++)
            {
                const ProductXpath = this.page.locator(`a[id='product-${i}'] h3`)
                const ProductPriceXpath = this.page.locator(`a[id='product-${i}'] h4`)
                const text = await ProductXpath.innerText();
                const price = await ProductPriceXpath.innerText();
                const fixedprice = parseFloat(price.replace(/[^0-9.]/g,''))
                this.productAndPriceList.push({ProductName:text, price:fixedprice})
                console.log(text, " => " ,price)
            }
        
         
            
    }

    async Emptycart()
    {
        await expect(this.page.locator(this.mycart)).toHaveText("My Cart (0)")
        await expect(this.page.locator(this.cartcount)).toHaveText("(0)")
        await this.page.locator(this.mycart).click()
        await expect (this.page.locator(this.emptycart)).toHaveText("Your cart is empty.")

    }

    async cart()
    {
        await this.CatalogLink.click()
        await this.page.locator(`a[id='product-1']`).click()
        await this.page.waitForURL("https://sauce-demo.myshopify.com/products/flower-print-jeans")
        await expect(this.page.locator(this.cartcount)).toHaveText("(0)")
        await this.page.locator("//div[@id='product-variants']//select[@id='product-select-option-0']").selectOption({value:'M'})
        await this.page.locator(this.addtocart).click()
        await expect(this.page.locator(this.cartcount)).toHaveText("(1)")
        await this.CatalogLink.click()
        await this.page.locator(`a[id='product-2']`).click()
        await expect(this.page.locator(this.cartcount)).toHaveText("(1)")
        await this.page.locator(this.addtocart).click()
        await expect(this.page.locator(this.cartcount)).toHaveText("(2)");

        await this.CatalogLink.click()
        await this.page.locator(`a[id='product-4']`).click()
        await expect(this.page.locator(this.cartcount)).toHaveText("(2)")
        await this.page.locator(this.addtocart).click()
        await expect(this.page.locator(this.cartcount)).toHaveText("(3)") 
        
         
        console.log("3 Products added to the cart")
        console.log("**********  Products added to cart  ************")
        this.Total_Price = (this.productAndPriceList[0].price + this.productAndPriceList[1].price + this.productAndPriceList[3].price)
        console.log(this.Total_Price);
        return this.Total_Price
    }

}
module.exports = Cart


