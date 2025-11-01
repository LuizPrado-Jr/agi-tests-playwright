// pages/homePage.ts - VERSÃO CORRIGIDA
import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { HeaderComponent } from './components/headerComponents';

export class HomePage extends BasePage {
    readonly header: HeaderComponent;
    readonly url = 'https://blog.agibank.com.br/'; 

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
    }

    async navigate() {
        await this.goto(this.url);
    }

    async searchFor(term: string) {
        return await this.header.performSearch(term);
    }
}