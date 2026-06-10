import type { Page } from "@playwright/test";

export class LoginPage{
    private page:Page

    constructor(page:Page){
        this.page = page
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async login(username: string, password: string){
        await this.page.getByPlaceholder('Username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', {name:'Login'}).click()

    }

    async isLoggedIn(){
        return await this.page.getByText('Products').isVisible()
    }

    async getErrorMessage(){
        await this.page.getByTestId('error').isVisible()
        return await this.page.getByTestId('error').textContent()
    }
}