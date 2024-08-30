import {expect} from "@playwright/test"
export class WomanPantsSection {
    constructor(page){
        this.page = page
        this.itemCard = page.locator('.item.product.product-item')
        this.itemSorter = page.getByLabel("Sort By")
    }

    filterByCheapest = async() => {
        await this.itemCard.first().waitFor()
        const itemListBefore = await this.itemCard.locator('.product-item-info').locator('.product.details.product-item-details').locator('.product.name.product-item-name').allInnerTexts()
        await this.itemSorter.selectOption("Price")
        await this.itemCard.first().waitFor()
        const itemListAfter = await this.itemCard.locator('.product-item-info').locator('.product.details.product-item-details').locator('.product.name.product-item-name').allInnerTexts()
        expect(itemListAfter).not.toEqual(itemListBefore)


    }

    addItemToCart = async(index)=> {
        const firstItemCard = await this.itemCard.nth(index)
        const productName = await firstItemCard.locator('.product.name.product-item-name .product-item-link').innerText();
        console.log(productName)
        const firstSizeOption = await firstItemCard.locator('.swatch-attribute.size .swatch-attribute-options .swatch-option.text').first().click();
        const firstColorOption = await firstItemCard.locator('.swatch-attribute.color .swatch-attribute-options .swatch-option.color').first().click();
        await this.page.waitForLoadState('networkidle')
        await firstItemCard.hover()
        const addToCartButton = await firstItemCard.getByRole('button', { name: 'Add to Cart' })
        await addToCartButton.waitFor()
        await addToCartButton.click()
        await this.page.getByText(`You added ${productName} to`).waitFor()
    }

}