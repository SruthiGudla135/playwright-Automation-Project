import {test as baseTest} from '@playwright/test'
import {LoginPage} from '../pages/loginPage.js'
import {HomePage} from '../pages/homepage.js'
import {SearchResultsPage} from '../pages/searchResultsPage.js'
import {ProductInfoPage} from '../pages/productInfoPage.js'

type pageFixtures={
    loginPage:LoginPage,
    homePage:HomePage,
    searchResultsPage:SearchResultsPage
    productInfoPage:ProductInfoPage
}

export let test = baseTest.extend<pageFixtures>({
    loginPage:async ({page}, use) => {
        let loginPage = new LoginPage(page)
        await use(loginPage)
    },

    homePage:async ({page}, use) => {
        let homePage = new HomePage(page)
        await use(homePage)
    },
    
    searchResultsPage:async ({page}, use) => {
        let searchResultsPage = new SearchResultsPage(page)
        await use(searchResultsPage)
    },

    productInfoPage:async ({page}, use) => {
        let productInfoPage = new ProductInfoPage(page)
        await use(productInfoPage)
    }
})

export {expect} from '@playwright/test'