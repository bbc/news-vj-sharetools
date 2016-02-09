define(['ShareToolsModel'], function (ShareToolsModel) {

    var EmailModel = function () {};

    EmailModel.prototype = Object.create(ShareToolsModel.prototype);

    EmailModel.prototype.validate = function (message) {
        if (!message || !message.subject || !message.message) {
            throw new Error('ShareTools: Email message requires a "subject" and a "message"');
        }
    };

    EmailModel.prototype.shareEndpoint = 'mailto:';

    EmailModel.prototype.popup = false;

    EmailModel.prototype.parameters = {
        'subject': function getSubject () {
            return this.getMessage().subject;
        },
        'body': function getMessage () {
            return this.getMessage().message + ' ' + this.getShareUrl();
        }
    };

    return EmailModel;
});
