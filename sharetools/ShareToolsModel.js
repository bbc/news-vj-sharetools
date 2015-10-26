define(function () {

    var ShareToolsModel = function () {};

    ShareToolsModel.prototype = {

        setShareUrl: function (shareUrl) {
            this.shareUrl = shareUrl || 'http://www.bbc.co.uk';
        },

        getShareUrl: function () {
            return this.shareUrl;
        },
        
        setFacebookMessage: function (facebookMessage) {
            if (!facebookMessage || !facebookMessage.title) {
                throw new Error('ShareTools: Facebook message requires a "title"');
            }

            facebookMessage.description = facebookMessage.description || 'Shared via BBC News';
            facebookMessage.image = facebookMessage.image || 'http://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png';

            this.facebookMessage = facebookMessage;
        },

        getFacebookMessage: function () {
            return this.facebookMessage;
        },
        
        setTwitterMessage: function (twitterMessage) {
            if (!twitterMessage) {
                throw new Error('ShareTools: Twitter message must be set');
            }

            this.twitterMessage = twitterMessage;
        },

        getTwitterMessage: function () {
            return this.twitterMessage;
        },
        
        setEmailMessage: function (emailMessage) {
            if (!emailMessage || !emailMessage.subject || !emailMessage.message) {
                throw new Error('ShareTools: Email message requires a "subject" and a "message`"');
            }

            this.emailMessage = emailMessage;
        },

        getEmailMessage: function () {
            return this.emailMessage;
        },
        
        setAppMessage: function (appMessage) {
            if (!appMessage || !appMessage.title || !appMessage.text) {
                throw new Error('ShareTools: App message requires a "title" and a "text`"');
            }

            this.appMessage = appMessage;
        },

        getAppMessage: function () {
            return this.appMessage;
        }
        
    };

    return ShareToolsModel;
        
});
