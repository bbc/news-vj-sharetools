define(['ShareToolsModel'], function (ShareToolsModel) {

    var model;

    beforeEach(function() {
        model = new ShareToolsModel();
    });

    describe('ShareTools Model', function () {

        it('should have methods for getting and setting the share URL', function () {
            expect(model.setShareUrl).toBeDefined();
            expect(model.getShareUrl).toBeDefined();
        });

        it('should get and set the share URL as expected', function () {
            var shareUrl = 'http://bbc.co.uk/news';
            model.setShareUrl(shareUrl);
            expect(model.getShareUrl()).toEqual(shareUrl);
        });

        it('should have a method for setting all share networks at once', function () {
            expect(model.setMessages).toBeDefined();
        });

    });

/*
    describe('ShareTools Model - Twitter', function () {

        it('should have methods for getting and setting the Twitter message', function () {
            expect(model.getTwitterMessage).toBeDefined();
            expect(model.setTwitterMessage).toBeDefined();
        });

        it('should throw an error if I attempt to set an invalid Twitter message', function () {
            var setInvalidTwitterMessage = function () {
                model.setTwitterMessage(null);
            };
            expect(setInvalidTwitterMessage).toThrowError('ShareTools: Twitter message must be set');
        });

        it('should get and set the Twitter message as expected', function () {
            var message = 'test';
            model.setTwitterMessage(message);
            expect(model.getTwitterMessage()).toEqual(message);
        });

    });

    describe('ShareTools Model - Facebook', function () {

        it('should have methods for getting and setting the Facebook message', function () {
            expect(model.getFacebookMessage).toBeDefined();
            expect(model.setFacebookMessage).toBeDefined();
        });

        it('should throw an error if I attempt to set a null Facebook message', function () {
            var setNullFacebookMessage = function () {
                model.setFacebookMessage(null);
            };
            expect(setNullFacebookMessage).toThrowError('ShareTools: Facebook message requires a "title"');
        });

        it('should throw an error if I attempt to set a Facebook message without a title', function () {
            var setFacebookMessageWithMissingTitle = function () {
                model.setFacebookMessage({});
            };
            expect(setFacebookMessageWithMissingTitle).toThrowError('ShareTools: Facebook message requires a "title"');
        });

        it('should get and set the Facebook message defaults, requiring only a title', function () {
            var message = {
                title: 'My title'
            };
            model.setFacebookMessage(message);
            expect(model.getFacebookMessage().title).toEqual(message.title);
            expect(model.getFacebookMessage().description).toEqual('Shared via BBC News');
            expect(model.getFacebookMessage().image).toEqual('http://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png');
        });

        it('should allow me to specify the Facebook message description and image', function () {
            var message = {
                title:       'My title',
                description: 'Custom description',
                image:       'http://custom.image/url'
            };
            model.setFacebookMessage(message);
            expect(model.getFacebookMessage().title).toEqual(message.title);
            expect(model.getFacebookMessage().description).toEqual(message.description);
            expect(model.getFacebookMessage().image).toEqual(message.image);
        });

    });

    describe('ShareTools Model - Email', function () {

        it('should have methods for getting and setting the Email message', function () {
            expect(model.getEmailMessage).toBeDefined();
            expect(model.setEmailMessage).toBeDefined();
        });

        it('should throw an error if I attempt to set a null email message', function () {
            var setNullEmailMessage = function () {
                model.setEmailMessage(null);
            };
            expect(setNullEmailMessage).toThrowError('ShareTools: Email message requires a "subject" and a "message"');
        });

        it('should throw an error if I attempt to set an email message without a subject', function () {
            var setEmailMessageWithoutSubject = function () {
                model.setEmailMessage({
                    message: 'my message'
                });
            };
            expect(setEmailMessageWithoutSubject).toThrowError('ShareTools: Email message requires a "subject" and a "message"');
        });

        it('should throw an error if I attempt to set an email message without a body', function () {
            var setEmailMessageWithoutBody = function () {
                model.setEmailMessage({
                    subject: 'my subject'
                });
            };
            expect(setEmailMessageWithoutBody).toThrowError('ShareTools: Email message requires a "subject" and a "message"');
        });

        it('should get and set the Email message as expected', function () {
            var message = {
                subject: 'my subject',
                message: 'my message'
            };
            model.setEmailMessage(message);
            expect(model.getEmailMessage().subject).toEqual(message.subject);
            expect(model.getEmailMessage().message).toEqual(message.message);
        });

    });
*/
});
