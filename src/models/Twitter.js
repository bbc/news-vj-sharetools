define(['ShareToolsModel'], function (ShareToolsModel) {

    var TwitterModel = function () {};

    TwitterModel.prototype = Object.create(ShareToolsModel.prototype);

    TwitterModel.prototype.validate = function (message) {
        if (!message) {
            throw new Error('ShareTools: Twitter message must be set');
        }
    };

    TwitterModel.prototype.shareEndpoint = 'https://twitter.com/intent/tweet';

    TwitterModel.prototype.popup = true;

    TwitterModel.prototype.parameters = {
        'text': function getTweetText () {
            return this.getMessage() + ' ' + this.getShareUrl();
        }
    };

    return TwitterModel;
});
