define(function () {

    var SharetoolsModel = function () {};

    SharetoolsModel.prototype = {

        setShareUrl: function (shareUrl) {
            if (!shareUrl) {
                throw new Error('ShareTools: Share URL must be set');
            }

            this.shareUrl = shareUrl;
        },

        getShareUrl: function () {
            return this.shareUrl;
        },
        
        setFacebookMessage: function (facebookMessage) {
            if (!facebookMessage || !facebookMessage.title) {
                throw new Error('ShareTools: Facebook message requires a "title"');
            }

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
            if (!emailMessage || !emailMessage.subject || !emailMessage.subject) {
                throw new Error('ShareTools: Email message requires a "subject" and a "message`"');
            }

            this.emailMessage = emailMessage;
        },

        getEmailMessage: function () {
            return this.emailMessage;
        }
        
    };

    return SharetoolsModel;
        
});
