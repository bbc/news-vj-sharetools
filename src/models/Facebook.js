define(['ShareToolsModel'], function (ShareToolsModel) {

    var FacebookModel = function () {};

    FacebookModel.prototype = Object.create(ShareToolsModel.prototype);

    FacebookModel.prototype.validate = function (message) {
        if (!message) {
            throw new Error('ShareTools: Facebook message must be set');
        }
        message.share_or_feed = message.share_or_feed || 'feed';

        this.shareEndpoint = 'https://www.facebook.com/dialog/' + message.share_or_feed;

        return message;
    };

    FacebookModel.prototype.popup = true;

    FacebookModel.prototype.parameters = function () {
        return {
            'app_id':       '58567469885',
            'redirect_uri': 'https://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed',
            'display':      'popup',
            'locale':       'en_GB',
            'link':         this.getShareUrl(),
            'quote':        this.getMessage().title,
        };
    };

    return FacebookModel;
});