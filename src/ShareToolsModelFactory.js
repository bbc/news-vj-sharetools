define(['ShareToolsModel', 'models/Email', 'models/Facebook', 'models/Twitter', 'models/Messenger', 'models/MessengerDesktop', 'models/Whatsapp'], function (ShareToolsModel, Email, Facebook, Twitter, Messenger, MessengerDesktop, Whatsapp) {

    function ShareToolsModelFactory() {
        this.knownModels = {
            'email': Email,
            'facebook': Facebook,
            'twitter': Twitter,
            'messenger': Messenger,
            'messenger_desktop': MessengerDesktop,
            'whatsapp': Whatsapp
        };
        this.modelObjects = {};
    }

    ShareToolsModelFactory.prototype = {

        setMessages: function (messages) {
            if (Object.keys(this.modelObjects).length === 0) {
                this.initialiseModels(messages);
            }
            else {
                var networkConfig,
                    networkName;

                for (networkName in messages) {
                    if (messages.hasOwnProperty(networkName)) {
                        networkConfig = messages[networkName];
                        if (!this.modelObjects[networkName]) { // new network was added AFTER initialisation
                            this.initialiseModel(networkName, networkConfig);
                        }
                        this.modelObjects[networkName].setMessage(networkConfig);
                    }
                }
            }
        },

        setShareUrl: function (shareUrl) {
            var modelName,
                modelObject;

            for (modelName in this.modelObjects) {
                if (this.modelObjects.hasOwnProperty(modelName)) {
                    modelObject = this.modelObjects[modelName];
                    modelObject.setShareUrl(shareUrl);
                }
            }
        },

        initialiseModels: function (messages) {
            for (var networkName in messages) {
                this.initialiseModel(networkName, messages[networkName]);
            }
        },

        initialiseModel: function (networkName, networkConfig) {
            var ModelClass,
                modelObject;

            if (!this.knownModels[networkName]) {
                this.knownModels[networkName] = this.defineCustomNetwork(networkName, networkConfig);
            }
            ModelClass = this.knownModels[networkName]
            modelObject = new ModelClass();
            modelObject.setMessage(networkConfig);
            this.modelObjects[networkName] = modelObject;
        },

        defineCustomNetwork: function (networkName, networkConfig) {
            var CustomNetwork = function () {};
            CustomNetwork.prototype = Object.create(ShareToolsModel.prototype);
            CustomNetwork.prototype.popup         = ( networkConfig.popup === true );
            CustomNetwork.prototype.shareEndpoint = networkConfig.shareEndpoint;

            if (!networkConfig.shareEndpoint) {
                throw new Error('ShareTools: no shareEndpoint property supplied for custom network "' + networkName + '"');
            }

            CustomNetwork.prototype.parameters = function () {
                var parameters = {};
                for (var parameter in networkConfig.properties) {
                    if (networkConfig.properties.hasOwnProperty(parameter)) {
                        parameters[parameter] = networkConfig.properties[parameter];
                    }
                }
                return parameters;
            }

            return CustomNetwork;
        },

        getNetworkConfig: function (name) {
            return this.modelObjects[name];
        }

    };


    return ShareToolsModelFactory;

});
