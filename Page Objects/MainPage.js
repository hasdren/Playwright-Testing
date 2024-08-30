export class MainPage {
    constructor(page){
        this.page = page
        this.MenSection = page.getByRole('menuitem').getByText('Men', { exact: true })
        this.WomenSection = page.getByRole('menuitem').getByText('Women', { exact: true })
    }

    navigateMenSection = async() => {
        await this.MenSection.waitFor()
        await this.MenSection.click()
        await this.page.waitForURL('/men.html')
    }
    navigateWomanSection = async() => {
        await this.WomenSection.click()
        await this.page.waitForURL('/women.html')
    }
}