const{expect} = require('@playwright/test')

class Products
{
    constructor(page)
    {   
        this.page = page
        this.CatalogLink = this.page.getByText("Catalog")
        this.heading = "(//h1)[2]"
        this.productslist = "//a[@class='animated fadeInUpBig']"
        this.addtocart =  "//input[@value='Add to Cart']"
        this.soldout =  "//input[@value='Sold Out']"
        this.cartcount = "//a[@href='#']//span[@class = 'count cart-target']"
        this.mycart = "//a[@class='toggle-drawer cart desktop ']"
        //this.soldout = "//div[@class='sold-out']"
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
        await expect(this.page).toHaveURL("https://sauce-demo.myshopify.com/collections/all")
        await expect(this.page).toHaveTitle("Products – Sauce Demo")
        await expect(this.page.locator(this.sidebar)).toHaveCount(6)
        await expect(this.page.locator(this.sidebar)).toHaveText(this.sidebardata)
        let total_products = await this.page.locator(this.productslist).count()
        for(let i=1;i<=total_products;i++)
            {
                const ProductXpath = this.page.locator(`a[id='product-${i}'] h3`)
                const ProductPriceXpath = this.page.locator(`a[id='product-${i}'] h4`)
                const text = await ProductXpath.innerText();
                const price = await ProductPriceXpath.innerText();
                const fixedprice = parseFloat(price.replace(/[^0-9.]/g,''))
                this.productAndPriceList.push({ProductName:text, price:fixedprice})
                console.log(text, " => " ,price)
            }
        console.log(this.productAndPriceList)
         
            
    }

    async SoldOutProducts()
    {
        let count = 0;
        await this.CatalogLink.click()
        let total_products = await this.page.locator(this.productslist).count()
        console.log(total_products)
        for(let i=1;i<=total_products;i++)
        {

            await this.CatalogLink.click()
            await this.page.locator(`a[id='product-${i}']`).click()
            
            await this.page.waitForTimeout(1000)
            if(await this.page.locator(this.soldout).isVisible())
            {
                console.log(this.productAndPriceList[i-1].ProductName + ' is Sold Out')
                continue;
                
            }

            else
            {
                await this.page.locator(this.addtocart).click()
                count += 1
                
                if(this.productAndPriceList[i-1].price)
                {
                    this.Total_Price += this.productAndPriceList[i-1].price
                }
                
            }

        }
        console.log(`${total_products} products in Catalog`)
        console.log(`${count} products available and ${total_products-count} Out of stock`)
    }


}
module.exports = Products


