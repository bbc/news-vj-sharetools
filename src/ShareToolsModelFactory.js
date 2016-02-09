define(['ShareToolsModel', 'models/Email', 'models/Facebook', 'models/Twitter'], function (ShareToolsModel, Email, Facebook, Twitter) {

    var KnownModels = {
        'email':    Email,
        'facebook': Facebook,
        'twitter':  Twitter
    },
    modelObjects = {};

    return {

        setMessages: function (messages, shareUrl) {
            var networkConfig,
                networkName;

            for (networkName in messages) {
                networkConfig = messages[networkName];

                var modelObject = this.getModel(networkName, networkConfig);
                this.hydrateModel(modelObject, shareUrl, networkConfig);
                modelObjects[networkName] = modelObject;
            }
        },

        getModel: function (networkName, networkConfig) {
            if (KnownModels[networkName]) {
                return new KnownModels[networkName]();
            }
            else {
                return this.defineCustomNetwork(networkName, networkConfig);
            }
        },

        defineCustomNetwork: function (networkName, networkConfig) {
            var CustomNetwork = function () {};
            CustomNetwork.prototype = Object.create(ShareToolsModel.prototype);
            CustomNetwork.prototype.popup         = ( networkConfig.popup === true ) || false;
            CustomNetwork.prototype.shareEndpoint = networkConfig.shareEndpoint;

            if (!networkConfig.shareEndpoint) {
                throw new Error('ShareTools: no shareEndpoint property supplied for custom network "' + networkName + '"');
            }

            var parameters = {};
            for (var parameter in networkConfig.properties) {
                if (networkConfig.properties.hasOwnProperty(parameter)) {
                    parameters[parameter] = networkConfig.properties[parameter];
                }
            }

            CustomNetwork.prototype.parameters = function () {
                return parameters;
            }

            return new CustomNetwork();
        },

        hydrateModel: function (model, shareUrl, networkConfig) {
            model.setShareUrl(shareUrl);
            model.setMessage(networkConfig);
        },

        getNetworkConfig: function (name) {
            return modelObjects[name];
        }

    };
});
