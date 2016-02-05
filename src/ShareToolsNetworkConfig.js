define(function () {
    return function (ShareToolsController) {
        return [
            {
                'name': 'facebook',
                'shareEndpoint': 'https://www.facebook.com/dialog/feed',
                'popup': true,
                'staticParameters': {
                    'app_id': '58567469885',
                    'redirect_uri': 'http://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed',
                    'display': 'popup',
                    'locale': 'en_GB'
                },
                'dynamicParameters': {
                    'link': function getLink () {
                        return ShareToolsController.model.getShareUrl();
                    },
                    'name': function getTitle () {
                        return ShareToolsController.model.getFacebookMessage().title;
                    },
                    'description': function getDescription () {
                        return ShareToolsController.model.getFacebookMessage().description;
                    },
                    'picture': function getPicture () {
                        return ShareToolsController.model.getFacebookMessage().image;
                    }
                }
            },

            {
                'name': 'twitter',
                'shareEndpoint': 'https://twitter.com/intent/tweet',
                'popup': true,
                'dynamicParameters': {
                    'text': function getTweetText () {
                        return ShareToolsController.model.getTwitterMessage() +
                            ' ' + ShareToolsController.model.getShareUrl();
                    }
                }
            },

            {
                'name': 'email',
                'shareEndpoint': 'mailto:',
                'popup': false,
                'dynamicParameters': {
                    'subject': function getSubject () {
                        return ShareToolsController.model.getEmailMessage().subject;
                    },
                    'body': function getMessage () {
                        return ShareToolsController.model.getEmailMessage().message +
                            ' ' + ShareToolsController.model.getShareUrl();
                    }
                }
            }
        ];  
    };
});
