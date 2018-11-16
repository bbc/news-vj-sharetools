define(['ShareToolsModel'], function (ShareToolsModel) {

    var WhatsappModel = function () {};

    WhatsappModel.prototype = Object.create(ShareToolsModel.prototype);

    WhatsappModel.prototype.validate = function (message) {
        if (!message) {
            throw new Error('ShareTools: Whatsapp message must be set');
        }
        message.title = message.title || '';
        return message;
    };

    WhatsappModel.prototype.shareEndpoint = 'whatsapp://send';

    WhatsappModel.prototype.popup = false;

    WhatsappModel.prototype.parameters = function () {
        return {
            'text': this.getMessage().title + ' - ' + this.getShareUrl()
        }
    };

    return WhatsappModel;
});