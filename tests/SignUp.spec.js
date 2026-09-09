import {test,expect} from "@playwright/test"
import signup from "../pages/SignUp.js"

const Sign_Data = JSON.parse(JSON.stringify(require("../Test_Data/Signup_Data.json")))



    for(const i of Sign_Data)
    {   
        test(`SignUp for ${i.firstname}`, async ({page}) =>
            {
            await page.goto("https://sauce-demo.myshopify.com/")
            const signuppage = new signup(page)
            await signuppage.signup(i)
            })
    }

