import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        void page.navigateTo();
        void expect(page.getTitleText()).toEqual('Welcome to dejajs-component!');
    });
});
