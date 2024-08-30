import {expect} from "@playwright/test"
export class ReviewPage {
    constructor(page){
        this.page=page
        this.shippingToContainer = page.locator('.shipping-information')
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
    }
    assertAddress = async(checkoutDetails) =>{
        await this.shippingToContainer.waitFor()
        await this.shippingToContainer.locator('.ship-to').locator('.shipping-information-content').waitFor()
        const shippingInformation = await this.shippingToContainer.locator('.ship-to').locator('.shipping-information-content').first().innerText()
        const eachItem = shippingInformation.split("\n")
        console.log(eachItem)
        const fullName = eachItem[0].split(" ")
        const firstName = fullName[0]
        expect(firstName).toBe(checkoutDetails.firstName)
        const lastName = fullName[1]
        expect(lastName).toBe(checkoutDetails.lastName)
        const streetAddress = eachItem[1]
        expect(streetAddress).toBe(checkoutDetails.streetAddress)
        const phoneNumber = eachItem[4]
        expect(phoneNumber).toBe(checkoutDetails.phoneNumber)
        const cityStatePostalCodeSplit = eachItem[2].split(", ")
        const city = cityStatePostalCodeSplit[0]
        console.log(cityStatePostalCodeSplit)
        console.log(city)
        const statePostalCode = cityStatePostalCodeSplit[1]
        console.log(statePostalCode)
        const [state, postalCode] = statePostalCode.split(/\s(?=\d)/)
        expect(state).toBe(checkoutDetails.stateProvince)
        expect(postalCode).toBe(checkoutDetails.postalCode)
        
    }
    placeOrder = async()=>{
        await this.placeOrderButton.waitFor()
        await this.placeOrderButton.click()
        await this.page.waitForURL('/checkout/onepage/success/')
    }
}