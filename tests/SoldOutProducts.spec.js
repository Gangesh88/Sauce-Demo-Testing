const{expect,test} = require('@playwright/test')

const Product = require("../pages/Products")

test("Products", async ({page}) =>
{
    
    await page.goto("https://sauce-demo.myshopify.com/",{waitUntil:'commit'})
    
    
    const product = new Product(page)
    await product.product()
    await product.SoldOutProducts()

})





