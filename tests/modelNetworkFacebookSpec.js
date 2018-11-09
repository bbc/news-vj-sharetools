define(['models/Facebook'], function (FacebookModel) {

    var model;

    beforeEach(function() {
        model = new FacebookModel();
    });

    describe('ShareTools Model - Facebook', function () {

        it('should have methods for getting and setting the Facebook message', function () {
            expect(model.setShareUrl).toBeDefined();
            expect(model.getShareUrl).toBeDefined();
            expect(model.setMessage).toBeDefined();
            expect(model.getMessage).toBeDefined();
        });

        it('should throw an error if I attempt to set a null Facebook message', function () {
            var setNullFacebookMessage = function () {
                model.setMessage(null);
            };
            expect(setNullFacebookMessage).toThrowError('ShareTools: Facebook message requires a "title"');
        });

        it('should throw an error if I attempt to set a Facebook message without a title', function () {
            var setFacebookMessageWithMissingTitle = function () {
                model.setMessage({});
            };
            expect(setFacebookMessageWithMissingTitle).toThrowError('ShareTools: Facebook message requires a "title"');
        });

        it('should get and set the Facebook message defaults, requiring only a title', function () {
            var message = {
                title: 'My title'
            };
            model.setMessage(message);
            expect(model.getMessage().title).toEqual(message.title);
            expect(model.getMessage().description).toEqual('Shared via BBC News');
            expect(model.getMessage().image).toEqual('https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png');
        });

        it('should allow me to specify the Facebook message description and image', function () {
            var message = {
                title:       'My title',
                description: 'Custom description',
                image:       'http://custom.image/url'
            };
            model.setMessage(message);
            expect(model.getMessage().title).toEqual(message.title);
            expect(model.getMessage().description).toEqual(message.description);
            expect(model.getMessage().image).toEqual(message.image);
        });

    });

});