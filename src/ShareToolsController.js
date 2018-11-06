define('ShareTools', ['ShareToolsView', 'ShareToolsModelFactory'], function (ShareToolsView, ShareToolsModelFactory) {

    var ShareToolsController = function (options) {
        this.options = options;
        this.factory = new ShareToolsModelFactory();
        this.view = new ShareToolsView({
            networkNames: this.getNetworkNames(),
            config:       options
        });
        this.shareButtonCallbacks = [];
        this.setMessages(this.options.messages);
        this.setShareUrl(this.options.shareUrl);
        this.setElSelectors();
        this.addListeners();
    };

    ShareToolsController.prototype = {

        setMessages: function (messages) {
            this.factory.setMessages(messages);
        },

        setShareUrl: function (shareUrl) {
            this.factory.setShareUrl(shareUrl);
        },

        openShareWindow: function (network) {
            var isCucumber     = navigator.userAgent.match(/^cucumber$/i);
            var shareTargetUrl = this.getShareTargetUrl(network);
            var networkConfig  = this.factory.getNetworkConfig(network);

            if (isCucumber) {
                // required for automated testing. @TODO - come up with a better solution
                window.locations_visited = window.locations_visited || [];
                window.locations_visited.push(shareTargetUrl);
            } else if (networkConfig.popup) {
                var windowOpener = window.open(shareTargetUrl, '_blank', 'width=626,height=235');
                windowOpener.opener = null;
                windowOpener.location = shareTargetUrl;
            } else {
                var windowOpener = window.location.href = shareTargetUrl;
                windowOpener.opener = null;
            }
        },

        getShareTargetUrl: function (network) {
            var networkConfig  = this.factory.getNetworkConfig(network);
            if (!networkConfig) {
                throw new Error('Could not find network config for network ' + network);
            }
            var parameters     = networkConfig.parameters();
            var urlQueryString = this.buildQueryStringFrom(parameters);

            return networkConfig.shareEndpoint + urlQueryString;
        },

        buildQueryStringFrom: function (parameters) {
            var queryString = '?';
            for (var parameterName in parameters) {
                if (parameters.hasOwnProperty(parameterName)) {
                    var parameterValue = parameters[parameterName];
                    queryString += parameterName + '=' + encodeURIComponent(parameterValue) + '&';
                }
            }
            // Remove trailing & or ?
            return queryString.slice(0, -1);
        },

        getNetworkNames: function () {
            var networks = [];

            for (var key in this.options.messages) {
                if (this.options.messages.hasOwnProperty(key)) {
                    networks.push(key);
                }
            }

            return networks;
        },

        setElSelectors: function () {
            var holderEl = this.view.getHolderElement();
            this.shareButton   = holderEl.querySelector('.share__button');
            this.toggleOverlay = holderEl.querySelector('.share__overlay');
            this.closeButton   = holderEl.querySelector('.share__overlay-close');
            this.networks      = holderEl.querySelectorAll('.share__tool--network');
        },

        addListeners: function () {
            var self = this;
            if(this.shareButton && this.toggleOverlay) {
                this.shareButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    self.toggleShareOverlay();
                    return false;
                });
                this.closeButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    self.toggleShareOverlay();
                    return false;
                });
            }
            if (this.networks) {
                for (var i = 0; i < this.networks.length; i++) {
                    this.networks[i].addEventListener('click', function (e) {
                        self.networkClicked(e);
                    });
                }
            }
        },

        toggleShareOverlay: function () {
            if (this.toggleOverlay) {
                this.toggleOverlay.style.display = (this.toggleOverlay.style.display === 'block') ? 'none' : 'block';
            }
        },

        onShareButtonClick: function (callback) {
            this.shareButtonCallbacks.push(callback);
        },

        resolveShareButtonCallbacks: function (network) {
            for (var i = 0; i < this.shareButtonCallbacks.length; i++) {
                var shareButtonCallback = this.shareButtonCallbacks[i];
                shareButtonCallback(network);
            }
        },

        networkClicked: function (e) {
            e.preventDefault();
            var network = e.currentTarget.getAttribute('data-network');
            this.openShareWindow(network);
            this.toggleShareOverlay();
            this.resolveShareButtonCallbacks(network);
            return false;
        }

    };

    return ShareToolsController;

});
