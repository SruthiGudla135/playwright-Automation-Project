import {Locator, Page} from '@playwright/test'

export class BasePage {

    protected readonly page:Page
    protected readonly footerLinks:Locator
    protected readonly logo: Locator;
    protected readonly searchBar: Locator;
    protected readonly searchIcon: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;

    constructor(page:Page){
        this.page = page
        this.footerLinks = page.locator('footer a');
        this.logo = page.locator('NLTECH Trainings Hub')
        this.searchBar = page.getByPlaceholder('Search');
        this.searchIcon = page.locator("//button[@type='submit' and @class='btn btn-light btn-lg']");
        this.currency = page.locator('#form-currency');
        this.cartButton = page.locator('div#cart button');
    }

    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean> {
        return await this.searchBar.isVisible();
    }

    async isCurrencyBoxVisible(): Promise<boolean> {
        return await this.currency.isVisible();
    }

    async isCartButtonVisible(): Promise<boolean> {
        return await this.cartButton.isVisible();
    }

    async getPageFootersCount(): Promise<number> {
        return await this.footerLinks.count();
    }

    async getPageFooters(): Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }

    //page level generic methods:
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

}