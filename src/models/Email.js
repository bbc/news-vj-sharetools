define(['ShareToolsModel'], function (ShareToolsModel) {

    var EmailModel = function () {};

    EmailModel.prototype = Object.create(ShareToolsModel.prototype);

    EmailModel.prototype.validate = function (message) {
        if (!message || !message.subject || !message.message) {
            throw new Error('ShareTools: Email message requires a "subject" and a "message"');
        }
        return message;
    };

    EmailModel.prototype.shareEndpoint = 'mailto:';

    EmailModel.prototype.popup = false;

    EmailModel.prototype.parameters = function () {
        return {
            'subject': this.getMessage().subject,
            'body':    this.getMessage().message + ' ' + this.getShareUrl()
        };
    };

    return EmailModel;
});
