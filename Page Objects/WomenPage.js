export class WomenPage{
    constructor(page){
        this.page = page
        this.womenBottomPants = page.getByRole('link', { name: 'Pants', exact: true })
    }

    navigateToWomenPants = async() =>{
        this.womenBottomPants.click()
        await this.page.waitForURL('https://magento.softwaretestingboard.com/women/bottoms-women/pants-women.html')
    }
    
}