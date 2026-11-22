import {Locator, Page} from '@playwright/test'
import { BasePage } from './basePage.js';

export class HomePage extends BasePage {
    private readonly headers:Locator
    private readonly logoutLink:Locator

    constructor(page:Page){
        super(page)
        this.headers=page.locator("h2")
        this.logoutLink=page.locator("(//a[text()='Logout'])[2]")
    }
    
    async getHomePageTitle():Promise<string>{
        return await this.page.title()
    }

    async getAllHeaders():Promise<string[]>{
        let headersList:string[]=await this.headers.allInnerTexts()
        return headersList
    }

    async isLogoutLinkAvailable():Promise<boolean>{
        return await this.logoutLink.isVisible()
    }

    async doSearch(searchText:string){
        console.log("The search item is:" + searchText)
        await this.searchBar.fill(searchText)
        await this.searchIcon.click()
    }
}
