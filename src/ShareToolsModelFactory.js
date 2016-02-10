define(['ShareToolsModel', 'models/Email', 'models/Facebook', 'models/Twitter'], function (ShareToolsModel, Email, Facebook, Twitter) {

    var KnownModels = {
        'email':    Email,
        'facebook': Facebook,
        'twitter':  Twitter
    },
    modelObjects = {};

    return {

        setMessages: function (messages) {
            if (Object.keys(modelObjects).length === 0) {
                this.initialiseModels(messages);
            }
            else {
                var networkConfig,
                    networkName;

                for (networkName in messages) {
                    networkConfig = messages[networkName];
                    if (!modelObjects[networkName]) { // new network was added AFTER initialisation
                        this.initialiseModel(networkName, networkConfig);
                    }
                    modelObjects[networkName].setMessage(networkConfig);
                }
            }
        },

        setShareUrl: function (shareUrl) {
            var modelName,
                modelObject;

            for (modelName in modelObjects) {
                modelObject = modelObjects[modelName];
                modelObject.setShareUrl(shareUrl);
            }
        },

        initialiseModels: function (messages) {
            for (var networkName in messages) {
                this.initialiseModel(networkName, messages[networkName]);
            }
        },

        initialiseModel: function (networkName, networkConfig) {
            var modelObject;

            if (!KnownModels[networkName]) {
                KnownModels[networkName] = this.defineCustomNetwork(networkName, networkConfig);
            }

            modelObject = new KnownModels[networkName]();
            modelObject.setMessage(networkConfig);
            modelObjects[networkName] = modelObject;
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

            return CustomNetwork;
        },

        getNetworkConfig: function (name) {
            return modelObjects[name];
        }
    };
});
