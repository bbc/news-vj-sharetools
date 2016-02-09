define(['ShareToolsModel'], function (ShareToolsModel) {

    var model;

    beforeEach(function() {
        model = new ShareToolsModel();
    });

    describe('ShareTools Model', function () {

        it('should have methods for getting and setting the share URL and message', function () {
            expect(model.setShareUrl).toBeDefined();
            expect(model.getShareUrl).toBeDefined();
            expect(model.setMessage).toBeDefined();
            expect(model.getMessage).toBeDefined();
        });

        it('should get and set the share URL as expected', function () {
            var shareUrl = 'http://bbc.co.uk/news';
            model.setShareUrl(shareUrl);
            expect(model.getShareUrl()).toEqual(shareUrl);
        });

    });

});