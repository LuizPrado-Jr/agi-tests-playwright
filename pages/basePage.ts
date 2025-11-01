// pages/base-page.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ 
            path: `debug-${name}.png`, 
            fullPage: true 
        });
    }

    async waitForElement(locator: Locator, timeout: number = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async clickWithRetry(locator: Locator, maxRetries: number = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await locator.click();
                return;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }
}