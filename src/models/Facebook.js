define(['ShareToolsModel'], function (ShareToolsModel) {

    var FacebookModel = function () {};

    FacebookModel.prototype = Object.create(ShareToolsModel.prototype);

    FacebookModel.prototype.validate = function (message) {
        if (!message || !message.title) {
            throw new Error('ShareTools: Facebook message requires a "title"');
        }

        message.description = message.description || 'Shared via BBC News';
        message.image = message.image || 'http://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png';
    };

    FacebookModel.prototype.shareEndpoint = 'https://www.facebook.com/dialog/feed';

    FacebookModel.prototype.popup = true;

    FacebookModel.prototype.staticParameters = {
        'app_id': '58567469885',
        'redirect_uri': 'http://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed',
        'display': 'popup',
        'locale': 'en_GB'
    };

    FacebookModel.prototype.parameters = {
        'app_id': function getAppId () {
            return '58567469885';
        },
        'redirect_uri': function getRedirectUri () {
            return 'http://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed';
        },
        'display': function getDisplay () {
            return 'popup';
        },
        'locale': function getLocale () {
            return 'en_GB';
        },
        'link': function getLink () {
            return this.getShareUrl();
        },
        'name': function getTitle () {
            return this.getMessage().title;
        },
        'description': function getDescription () {
            return this.getMessage().description;
        },
        'picture': function getPicture () {
            return this.getMessage().image;
        }
    };

    return FacebookModel;
});

