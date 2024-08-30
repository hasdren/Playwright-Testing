export class CheckOutPage {
    constructor(page){
        this.page=page
        this.email = page.locator('#customer-email').nth(0)
        this.firstName = page.getByLabel('First Name')
        this.lastName = page.getByLabel('Last Name')
        this.streetAddress = page.getByLabel('Street Address').nth(0)
        this.cityName = page.getByLabel('City')
        this.postalCode = page.getByLabel('Zip/Postal Code')
        this.country = page.getByLabel('Country')
        this.phoneNumber = page.getByLabel('Phone Number')
        this.stateProvince = page.locator('select[name="region_id"]')
        this.nextButton = page.getByRole('button', { name: 'Next' })
        
    }

    fillCheckoutFields = async(checkoutDetails) => {
        await this.email.waitFor()
        await this.email.fill(checkoutDetails.email)
        await this.firstName.waitFor()
        await this.firstName.fill(checkoutDetails.firstName)
        await this.lastName.waitFor()
        await this.lastName.fill(checkoutDetails.lastName)
        await this.streetAddress.waitFor()
        await this.streetAddress.fill(checkoutDetails.streetAddress)
        await this.cityName.waitFor()
        await this.cityName.fill(checkoutDetails.cityName)
        await this.postalCode.waitFor()
        await this.postalCode.fill(checkoutDetails.postalCode)
        await this.country.waitFor()
        await this.country.selectOption(checkoutDetails.countryName)
        await this.phoneNumber.waitFor()
        await this.phoneNumber.fill(checkoutDetails.phoneNumber)
        await this.stateProvince.waitFor()
        await this.stateProvince.selectOption(checkoutDetails.stateProvince)
    }

    continue = async() => {
        await this.page.pause()
        await this.nextButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.page.waitForURL(/\/checkout\//)
        await this.nextButton.click()
    }
}