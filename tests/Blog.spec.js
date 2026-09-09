import {expect,test} from "@playwright/test"
const Blog = require('../pages/Blog')

test("Blog", async ({page}) =>
{
    
    await page.goto("https://sauce-demo.myshopify.com/",{waitUntil:'commit'})
    
    const blog = new Blog(page)
    await blog.BlogDetails()
  
})