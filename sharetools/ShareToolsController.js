define('ShareTools', ['bootstrap', 'ShareToolsModel', 'ShareToolsView', 'ShareToolsNetworkConfig', 'bind.polyfill'], function (news, ShareToolsModel, ShareToolsView, shareToolsNetworkConfig) {
    
    var ShareToolsController = function (options) {
        this.options = options;
        this.model = new ShareToolsModel();
        this.view = new ShareToolsView({
            model: this.model,
            controller: this,
            config: options
        });

        this.init();
    };

    ShareToolsController.prototype = {

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
            this.model.setAppMessage(messages.app);
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
            return shareToolsNetworkConfig(this);
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

        getNetworkNames: function () {
            var networksList = this.getNetworkConfigList();
            var networks = [];

            for (var i = 0; i < networksList.length; i++) {
                networks.push(networksList[i].name);
            }

            return networks;
        }, 

        openNewsAppShare: function () {
            var appMessage = this.model.getAppMessage();
            news.pubsub.emit('app-share', [appMessage]);
        }

    };

    return ShareToolsController;
        
});
