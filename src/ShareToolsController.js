define('ShareTools', ['ShareToolsView', 'ShareToolsModelFactory'], function (ShareToolsView, ShareToolsModelFactory) {

    var ShareToolsController = function (options) {
        this.options = options;
        this.view = new ShareToolsView({
            controller: this,
            config: options
        });
        this.setMessages(this.options.messages, this.options.shareUrl);
    };

    ShareToolsController.prototype = {

        setMessages: function (messages, shareUrl) {
            ShareToolsModelFactory.setMessages(messages, shareUrl);
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
            var parameters = {};

            // Get the current values of the dynamic parameters
            for (var dynamicParameterName in networkConfig.parameters) {
                if (networkConfig.parameters.hasOwnProperty(dynamicParameterName)) {
                    parameters[dynamicParameterName] = networkConfig.parameters[dynamicParameterName]();
                }
            }
            return parameters;
        },

        getNetworkConfig: function (network) {
            return ShareToolsModelFactory.getNetworkConfig(network);
        },

        getNetworkNames: function () {
            var networks = [];

            for (var key in this.options.messages) {
                networks.push(key);
            }

            return networks;
        }

    };

    return ShareToolsController;

});
