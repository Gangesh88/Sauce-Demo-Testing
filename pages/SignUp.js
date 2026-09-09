const {expect, test} = require("@playwright/test")

class SignUp
{
    constructor (page)
    {
        this.page = page
        this.first_name = "//input[@id='first_name']"
        this.last_name = "//input[@id='last_name']"
        this.email = "//input[@id='email']"
        this.password = "//input[@id='password']"
        this.create_button = '//input[@value="Create"]'
    }

    async signup(data)
    {
        await this.page.getByText("Sign Up").click()
        await expect(this.page).toHaveURL("https://sauce-demo.myshopify.com/account/register")
        await expect (this.page).toHaveTitle("Create Account – Sauce Demo")
        console.log("Creating for "+data.firstname +" "+data.lastname);
            
        await this.page.locator(this.first_name).fill(data.firstname)
        await this.page.locator(this.last_name).fill(data.lastname)
        await this.page.locator(this.email).fill(data.email)
        await this.page.locator(this.password).fill(data.password)
        await this.page.locator(this.create_button).click()
        await expect(this.page).toHaveURL("https://sauce-demo.myshopify.com/account/register")
        console.log("Account Created for : " +data.firstname);
        console.log("");
    }
}
module.exports = SignUp