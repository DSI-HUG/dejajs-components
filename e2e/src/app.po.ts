import { browser, by, element } from 'protractor';

export class AppPage {
    public navigateTo(): unknown {
        return browser.get('/');
    }

    public getTitleText(): unknown {
        return element(by.css('app-root h1')).getText();
    }
}
