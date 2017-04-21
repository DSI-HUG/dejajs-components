/**
 * Created by rtrompier on 20.03.17.
 */
describe('Accordion page', function () {

    beforeAll(function() {
        browser.get('/');
        element(by.css('md-toolbar-row > a[href="/components"]')).click().then(function () {
            element(by.css('md-nav-list > a[ng-reflect-router-link="accordion"]')).click();
        });
    });

    it('all accordion should be opening on click', function () {

        element.all(by.css('deja-accordion-group')).each(function(item){
            var header = item.element(by.css('deja-accordion-header'));
            var body = item.element(by.css('deja-accordion-body'));

            body.getCssValue('max-height').then(function (value) {
                expect(value).toEqual('0px');

                header.click();

                // Wait for opening animation
                setTimeout(function () {
                    return body.getCssValue('max-height');
                }, 1000)
            }).then(function (value) {
                expect(value).not.toEqual('0px');
            });
        });

    });

});