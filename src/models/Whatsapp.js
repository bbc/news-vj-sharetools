define(['ShareToolsModel'], function (ShareToolsModel) {

    var WhatsappModel = function () {};

    WhatsappModel.prototype = Object.create(ShareToolsModel.prototype);

    WhatsappModel.prototype.validate = function (message) {
        if (!message) {
            throw new Error('ShareTools: Whatsapp message must be set');
        }
    };

    WhatsappModel.prototype.shareEndpoint = 'whatsapp://send';

    WhatsappModel.prototype.popup = true;

    WhatsappModel.prototype.parameters = function () {
        return {
            'link':         this.getShareUrl(),
            'text': this.getMessage().title + ' - ' + this.getShareUrl()
        }
    };

    return WhatsappModel;
});
