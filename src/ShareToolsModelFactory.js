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

        getModel: function (network, networkConfig) {
            if (KnownModels[network]) {
                return new KnownModels[network]();
            }
            else {
                return this.defineCustomNetwork(network, networkConfig);
            }
        },

        defineCustomNetwork: function (network, networkConfig) {
            var CustomNetwork = function () {};
            CustomNetwork.prototype = Object.create(ShareToolsModel.prototype);

            // @TODO define .validate(), .popup, etc. Throw Error if required properties are missing.

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
