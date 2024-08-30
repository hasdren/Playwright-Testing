export class MenPage{
    // 
    
    constructor(page){
        this.page = page
        this.hoodiesSweatshirtsLink = page.getByRole('link', { name: 'Hoodies & Sweatshirts' })
    }
    
    navigateHoodiesSweatshirts = async() => {
        await this.hoodiesSweatshirtsLink.waitFor()
        await this.hoodiesSweatshirtsLink.click()
        await this.page.waitForURL(/\/men\/tops-men\/hoodies-and-sweatshirts/)
    }
}