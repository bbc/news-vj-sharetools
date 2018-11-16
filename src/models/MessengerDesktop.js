define(['ShareToolsModel'], function (ShareToolsModel) {

    var MessengerDesktopModel = function () {};

    MessengerDesktopModel.prototype = Object.create(ShareToolsModel.prototype);

    MessengerDesktopModel.prototype.validate = function (message) {
        if (!message) {
            throw new Error('ShareTools: MessengerDesktop message must be set');
        }
        return message;
    };

    MessengerDesktopModel.prototype.shareEndpoint = 'https://www.facebook.com/dialog/feed';

    MessengerDesktopModel.prototype.popup = true;

    MessengerDesktopModel.prototype.parameters = function () {
        return {
            'app_id': '58567469885',
            'redirect_uri': 'https://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed',
            'display': 'popup',
            'locale': 'en_GB',
            'link': this.getShareUrl(),
            'text': this.getMessage().title
        }
    };

    return MessengerDesktopModel;
});
