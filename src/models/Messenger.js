define(['ShareToolsModel'], function (ShareToolsModel) {

    var MessengerModel = function () {};

    MessengerModel.prototype = Object.create(ShareToolsModel.prototype);

    MessengerModel.prototype.validate = function (message) {
        if (!message) {
            throw new Error('ShareTools: Messenger message must be set');
        }
    };

    MessengerModel.prototype.shareEndpoint = 'fb-messenger://share';

    MessengerModel.prototype.popup = true;

    MessengerModel.prototype.parameters = function () {
        return {
            'app_id': '58567469885',
            'redirect_uri': 'https://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed',
            'display': 'popup',
            'locale': 'en_GB',
            'link':         this.getShareUrl(),
            'text': this.getMessage().title
        }
    };

    return MessengerModel;
});
