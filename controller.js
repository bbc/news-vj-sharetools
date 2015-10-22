define(['lib/news_special/sharetools/model', 'lib/news_special/sharetools/view'], function (SharetoolsModel, SharetoolsView) {
    
    var SharetoolsController = function (options) {
        this.options = options;
        this.model = new SharetoolsModel();
        this.view = new SharetoolsView({
            model: this.model,
            controller: this,
            config: options
        });

        this.init();
    };

    SharetoolsController.prototype = {

        init: function () {
            this.setMessages(this.options.messages);
            this.setShareUrl(this.options.shareUrl);
        },

        setShareUrl: function (url) {
            this.model.setShareUrl(url);
        },

        setMessages: function (messages) {
            this.model.setFacebookMessage(messages.facebook);
            this.model.setTwitterMessage(messages.twitter);
            this.model.setEmailMessage(messages.email);
        }, 

        openShareWindow: function (network) {
            var shareTargetUrl = this.getShareTargetUrl(network);
            var networkConfig = this.getNetworkConfig(network); 

            if (networkConfig.popup) {
                window.open(shareTargetUrl, '_blank', 'width=626,height=235');
            } else {
                window.location.href = shareTargetUrl;
            }
        },

        getShareTargetUrl: function (network) {
            var networkConfig = this.getNetworkConfig(network); 
            var parameters = this.getNetworkParameters(networkConfig);
            var urlQueryString = this.buildQueryStringFrom(parameters);

            return networkConfig.shareEndpoint + urlQueryString;
        },

        buildQueryStringFrom: function (parameters) {
            var queryString = '?'
            for (var parameterName in parameters) {
                if (parameters.hasOwnProperty(parameterName)) {
                    var parameterValue = parameters[parameterName];
                    queryString += parameterName + '=' + encodeURIComponent(parameterValue) + '&'; 
                }
            }
            // Remove trailing & or ?
            return queryString.slice(0, -1);
        },

        getNetworkParameters: function (networkConfig) {
            var parameters = networkConfig.staticParameters || {};

            // Get the current values of the dynamic parameters 
            for (var dynamicParameterName in networkConfig.dynamicParameters) {
                if (networkConfig.dynamicParameters.hasOwnProperty(dynamicParameterName)) {
                    parameters[dynamicParameterName] = networkConfig.dynamicParameters[dynamicParameterName]();
                }
            }
            return parameters;
        },

        getNetworkConfigList: function () {
            var SharetoolsController = this;
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
                            return SharetoolsController.model.getShareUrl();
                        },
                        'name': function getTitle () {
                            return SharetoolsController.model.getFacebookMessage().title;
                        },
                        'description': function getDescription () {
                            return SharetoolsController.model.getFacebookMessage().description;
                        },
                        'picture': function getPicture () {
                            return SharetoolsController.model.getFacebookMessage().image;
                        }
                    }
                },

                {
                    'name': 'twitter',
                    'shareEndpoint': 'https://twitter.com/intent/tweet',
                    'popup': true,
                    'dynamicParameters': {
                        'text': function getTweetText () {
                            return SharetoolsController.model.getTwitterMessage() +
                                ' ' + SharetoolsController.model.getShareUrl();
                        }
                    }
                },

                {
                    'name': 'email',
                    'shareEndpoint': 'mailto:',
                    'popup': false,
                    'dynamicParameters': {
                        'subject': function getSubject () {
                            return SharetoolsController.model.getEmailMessage().subject;
                        },
                        'body': function getMessage () {
                            return SharetoolsController.model.getEmailMessage().message +
                                ' ' + SharetoolsController.model.getShareUrl();
                        }
                    }
                }
            ];  
        },

        getNetworkConfig: function (network) {
            var networkConfigList = this.getNetworkConfigList();
            for (var i = 0; i < networkConfigList.length; i++) {
                var networkConfig = networkConfigList[i];
                if (networkConfig.name === network) {
                    return networkConfig;
                }
            }
            return null;
        },

        getNetworks: function () {
            var networksList = this.getNetworkConfigList();
            var networks = [];

            for (var i = 0; i < networksList.length; i++) {
                networks.push(networksList[i].name);
            }

            return networks;
        }


    };

    return SharetoolsController;
        
});
