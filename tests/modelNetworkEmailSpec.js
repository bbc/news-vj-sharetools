define(['models/Email'], function (EmailModel) {

    var model;

    beforeEach(function() {
        model = new EmailModel();
    });

    describe('ShareTools Model - Email', function () {

        it('should have methods for getting and setting the Email message', function () {
            expect(model.setShareUrl).toBeDefined();
            expect(model.getShareUrl).toBeDefined();
            expect(model.setMessage).toBeDefined();
            expect(model.getMessage).toBeDefined();
        });

        it('should throw an error if I attempt to set a null email message', function () {
            var setNullEmailMessage = function () {
                model.setMessage(null);
            };
            expect(setNullEmailMessage).toThrowError('ShareTools: Email message requires a "subject" and a "message"');
        });

        it('should throw an error if I attempt to set an email message without a subject', function () {
            var setEmailMessageWithoutSubject = function () {
                model.setMessage({
                    message: 'my message'
                });
            };
            expect(setEmailMessageWithoutSubject).toThrowError('ShareTools: Email message requires a "subject" and a "message"');
        });

        it('should throw an error if I attempt to set an email message without a body', function () {
            var setEmailMessageWithoutBody = function () {
                model.setMessage({
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
            model.setMessage(message);
            expect(model.getMessage().subject).toEqual(message.subject);
            expect(model.getMessage().message).toEqual(message.message);
        });

    });

});