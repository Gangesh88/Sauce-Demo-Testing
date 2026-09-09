const{expect} = require('@playwright/test')



class Checkout
{
    constructor(page)
    {
        this.page = page
        this.cartopen = "//a[@class='toggle-drawer cart desktop ']"
        this.jacket = "//form[@action = '/cart']//h3/a[@href='/collections/all/products/grey-jacket']"
        this.sandals = "//form[@action = '/cart']//h3/a[@href='/collections/all/products/bronze-sandals']"
        this.heels = "//form[@action = '/cart']//h3/a[@href='/collections/all/products/flower-print-jeans']"
        this.name = "(//div[@class='nine columns description']//h3)"
        this.total = "//div[@class='six columns omega cart total']//h2"
        this.checkoutbtn = "//input[@id='checkout']"
        

        //////////// User Details

        this.email = "//input[@id='email']"
        this.countrydropdown="//select[@name='countryCode']"
        this.country = "//option[@value='IN']"
        this.firstname = "(//input[@name='firstName'])[1]"
        this.lastname = "(//input[@name='lastName'])[1]"
        this.city = "(//input[@name='city'])[1]"
        this.state = "(//select[@name='zone'])"
        this.stateselection = "(//option[@value='HR'])[2]"
        this.postalcode = "(//input[@name='postalCode'])[1]"
        this.address = "//input[@placeholder = 'Address']"

        /////////////// CARD DETAILS
        this.cardnumber = "//input[@placeholder='Card number']"
        this.expirydate = "//input[@placeholder='Expiration date (MM / YY)']"
        this.securityCode = "//input[@placeholder='Security code']"
        this.Cardname = "//input[@placeholder='Name on card']"
        this.PayNowButton = "//button[@id ='checkout-pay-button']"
        this.invalidCard = "//div[@id='error-for-number']"
        this.invalidcardtext = "//div[@class='sdr03sc']"

        
        //////////////////// FRAMES XPATH ////////////////////

        this.cardnumberframe = this.page.frameLocator("//iframe[@title='Field container for: Card number']")
        this.expirydateframe = this.page.frameLocator("//iframe[@title='Field container for: Expiration date (MM / YY)']")
        this.securitycodeframe = this.page.frameLocator("//iframe[@title='Field container for: Security code']")

    }

    async cartpage(Total_Price)
    {
        await this.page.locator(this.cartopen).click()
        await expect(this.page.locator(this.jacket)).toBeVisible()
        await expect(this.page.locator(this.sandals)).toBeVisible()
        await expect(this.page.locator(this.heels)).toBeVisible()
       
        await this.page.locator("//div[@class='actions']//input[@value='Check Out'][1]").click()
        const total = this.page.locator(this.total)
        const desc1 = await total.innerText()
        const desc2 =parseFloat(desc1.replace(/[^0-9.]/g,''))
        await expect(Total_Price).toBe(desc2)
        await this.page.locator(this.checkoutbtn).click()

    }

    async checkoutpage(email,country,firstname,lastname,city,state,postalcode,address)
    {
        
        await this.page.locator(this.email).fill(email)
        await this.page.locator(this.countrydropdown).pressSequentially(country)
        await this.page.locator(this.firstname).fill(firstname)
        await this.page.locator(this.lastname).fill(lastname)
        await this.page.locator(this.city).fill(city)
        await this.page.locator(this.state).pressSequentially(state)
        await this.page.locator(this.postalcode).fill(postalcode)
        await this.page.locator(this.address).fill(address)
        
    }

    async CardDetails(CardNumber, ExpiryDate, SecurityCode)
    {
            const cardnumberframe = this.page.frameLocator("//iframe[@title='Field container for: Card number']")
            const expirydateframe = this.page.frameLocator("//iframe[@title='Field container for: Expiration date (MM / YY)']")
            const securitycodeframe = this.page.frameLocator("//iframe[@title='Field container for: Security code']")
            await cardnumberframe.locator(this.cardnumber).fill(CardNumber)
            await expirydateframe.locator(this.expirydate).fill(ExpiryDate)
            await securitycodeframe.locator(this.securityCode).fill(SecurityCode)
            await this.page.locator(this.PayNowButton).click()
            await expect(this.page.locator(this.invalidCard)).toHaveText("Enter a valid card number")
            const error_message = await this.page.locator(this.invalidcardtext).innerText()
            console.log(error_message)
    }
}
module.exports = Checkout