define('ShareTools', ['jquery', 'ShareToolsModel', 'ShareToolsView', 'ShareToolsNetworkConfig'], function ($, ShareToolsModel, ShareToolsView, shareToolsNetworkConfig) {

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
            this.model.setMessages(this.options.messages);
            this.model.setShareUrl(this.options.shareUrl);
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
        }

    };

    return ShareToolsController;

});
