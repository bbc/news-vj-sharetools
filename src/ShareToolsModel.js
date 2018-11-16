define(function () {

    var ShareToolsModel = function () {};

    ShareToolsModel.prototype = {

        setShareUrl: function (shareUrl) {
            this.shareUrl = shareUrl || 'https://www.bbc.co.uk';
        },

        getShareUrl: function () {
            return this.shareUrl;
        },

        setMessage: function (message) {
            if (this.validate) {
                message = this.validate(message);
            }
            this.message = message;
        },

        getMessage: function () {
            return this.message;
        }

    };

    return ShareToolsModel;
});
