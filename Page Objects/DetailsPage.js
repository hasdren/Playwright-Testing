import {expect} from "@playwright/test"
// Issitraukt konstantas i objekta Size Color Qty
// padaryt  private metodus size color ir quantity

// testuot su data objektu , testuotuoju qty, kaina , spalva ir dydi

// minimal ir maximum test (tik reikiamus field/visus field)
export class DetailsPage {
    constructor(page) {
        this.page = page
        this.sizes = page.getByLabel('Size')
        this.colors = page.getByLabel('Color')
        this.quantity = page.getByLabel('Qty')
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' })
        this.alertMessage = page.locator('[data-ui-id="message-success"]')
        this.cartCount = page.locator('.counter.qty', {has: page.locator('.counter-number')})
        this.cartItemName = page.locator('#mini-cart').getByRole('strong')
        this.cartItemQuantity = page.getByRole('spinbutton', { name: 'Qty:' })
        this.cartSeeDetails = page.getByRole('tab').getByText('See Details', { exact: true })
        this.hiddenContent = page.locator('[data-role="content"]').nth(0)
        this.proceedToCheckOutButton = page.getByRole('button', { name: 'Proceed to Checkout' })
    }

    selectAtributesAddToCart = async(itemDetails) => {
        const selectSize = await this.sizes.getByLabel(itemDetails.Size, { exact: true })
        await selectSize.waitFor()
        await selectSize.click()
        const selectColor = await this.colors.getByLabel(itemDetails.Color)
        await selectColor.waitFor()
        await selectColor.click()
        await this.quantity.waitFor()
        await this.quantity.fill(itemDetails.Qty)
        await this.addToCartButton.waitFor()
        const basketCountBefore = await this.getBasketCount()
        console.log({basketCountBefore})
        await this.addToCartButton.click()
        await this.alertMessage.waitFor()
        await this.cartCount.locator('.counter-number').waitFor()
        const basketCountAfter = await this.getBasketCount()
        console.log({basketCountAfter})
        expect(basketCountAfter).toBeGreaterThanOrEqual(basketCountBefore)
        
    }
    checkAddedProductMatches = async(itemDetails) => {
        await this.cartCount.click()
        await this.cartItemName.waitFor()
        const nameInCart = await this.cartItemName.innerText()
        console.log({nameInCart})
        expect(nameInCart).toBe(itemDetails.ProductName)
        await this.cartItemQuantity.waitFor()
        const quantityInCart = parseInt(await this.cartItemQuantity.inputValue())
        console.log({quantityInCart})
        expect(quantityInCart).toBe(parseInt(itemDetails.Qty))
        this.cartSeeDetails.waitFor()
        this.cartSeeDetails.click()
        await expect(this.hiddenContent).not.toBeHidden()
        
        await this.hiddenContent.locator('.values').nth(0).waitFor()
        const sizeInCart = await this.hiddenContent.locator('.values').nth(0).innerText()
        console.log(sizeInCart)
        expect(sizeInCart).toBe(itemDetails.Size)
        await this.hiddenContent.locator('.values').nth(1).waitFor()
        const colorInCart = await this.hiddenContent.locator('.values').nth(1).innerText()
        console.log(colorInCart)
        expect(colorInCart).toBe(itemDetails.Color)

    }
    proceedToCheckout = async()=>{
        await this.proceedToCheckOutButton.waitFor()
        await this.proceedToCheckOutButton.click()
        await this.page.waitForURL(/\/checkout/)
    }
    getBasketCount = async() => {
        const cartIsVisible = await this.cartCount.isVisible()
        let basketCount
        if (cartIsVisible) {
            return parseInt(basketCount = await this.cartCount.locator('.counter-number').innerText())
        }
        else {
            basketCount = 0
            return basketCount
        }

    }

}