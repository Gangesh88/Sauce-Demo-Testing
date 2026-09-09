import {expect,test} from "@playwright/test"


const FacebookPath = "//a[@href = 'http://www.facebook.com/shopify']"
const TwitterPath = "//a[@href='http://www.twitter.com/sauce_io']"
const PinterestPath = "//a[@href='http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/']"
const InstagramPath = "//a[@href  = 'http://www.instagram.com/shopify']"
const BlogNewsPath = "//a[@href='/blogs/news.atom']"

test("Facebook Handle Verification" ,async ({browser}) =>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://sauce-demo.myshopify.com")

    const [Facebook] = await Promise.all([

        context.waitForEvent("page"),
        page.locator(FacebookPath).click()

    ])

    await expect (Facebook).toHaveURL("https://www.facebook.com/shopify",{timeout:15000})
    await expect(Facebook).toHaveTitle("Shopify | Facebook",{timeout:15000})
    await page.bringToFront();

})

test("Instagram Handle Verification", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://sauce-demo.myshopify.com")

    const [Instagram] = await Promise.all([

        context.waitForEvent("page"),
        page.locator(InstagramPath).click()

    ])
    
    
    await expect(Instagram).toHaveTitle("Shopify (@shopify) • Instagram photos and videos",{timeout:15000})
    await expect(Instagram).toHaveURL("https://www.instagram.com/shopify",{timeout:15000})   
    await page.bringToFront();

})

test("Twitter Handle Verification", async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://sauce-demo.myshopify.com")

    const[twitter] = await Promise.all([

        context.waitForEvent("page"),
        page.locator(TwitterPath).click()
    ])

    await expect(twitter).toHaveURL("http://www.twitter.com/sauce_io",{timeout:15000})
    await expect(twitter).toHaveTitle("twitter.com | 520: Web server is returning an unknown error",{timeout:15000})
    await page.bringToFront();
})

test("Pinterest Handle Verification", async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://sauce-demo.myshopify.com")

    const[Pinterest] = await Promise.all([

        context.waitForEvent("page"),
        page.locator(PinterestPath).click()
    ])

    await expect(Pinterest).toHaveURL("https://www.pinterest.com/chrisjhoughton/social-design/",{timeout:15000})
    await expect(Pinterest).toHaveTitle("7 Social design ideas | mobile design inspiration, ui animation, ios design",{timeout:15000})
    await page.bringToFront();
})

test("Blog News", async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://sauce-demo.myshopify.com")

    const[Blog] = await Promise.all([

        context.waitForEvent("page"),
        page.locator(BlogNewsPath).click()
    ])

    await expect(Blog).toBeTruthy()
    await page.bringToFront();
})