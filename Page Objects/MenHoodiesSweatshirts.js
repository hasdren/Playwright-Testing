import {expect} from "@playwright/test"
// 6, 7, 22, pakeist index i string 
export class MenHoodiesSweatshirts {
    constructor(page){
        this.page = page
        this.itemCard = page.locator('.item.product.product-item')
        this.perPageValue = page.locator('[data-role="limiter"]').nth(1)
    }

    checkDisplayedjackets = async()=> {
        await this.itemCard.first().waitFor()
        const toBeDisplayedItems = await this.perPageValue.inputValue()
        console.log({toBeDisplayedItems})
        const toBeDisplayedItemsNumber = parseInt(toBeDisplayedItems)
        expect(this.itemCard).toHaveCount(toBeDisplayedItemsNumber)
        
    }

    goToDetailsFrankieSweatshirt = async(index)=>{
        await this.itemCard.nth(index).waitFor()
        await this.itemCard.nth(index).click()
        await this.page.waitForURL("/frankie-sweatshirt.html")
    }
}