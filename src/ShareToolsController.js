define('ShareTools', ['ShareToolsView', 'ShareToolsModelFactory'], function (ShareToolsView, ShareToolsModelFactory) {

    var ShareToolsController = function (options) {
        this.options = options;
        this.view = new ShareToolsView({
            networkNames: this.getNetworkNames(),
            config:       options
        });
        this.setMessages(this.options.messages);
        this.setShareUrl(this.options.shareUrl);
        this.setElSelectors();
        this.addListeners();
    };

    ShareToolsController.prototype = {

        setMessages: function (messages) {
            ShareToolsModelFactory.setMessages(messages);
        },

        setShareUrl: function (shareUrl) {
            ShareToolsModelFactory.setShareUrl(shareUrl);
        },

        openShareWindow: function (network) {
            var shareTargetUrl = this.getShareTargetUrl(network);
            var networkConfig  = ShareToolsModelFactory.getNetworkConfig(network);

            if (networkConfig.popup) {
                window.open(shareTargetUrl, '_blank', 'width=626,height=235');
            } else {
                window.location.href = shareTargetUrl;
            }
        },

        getShareTargetUrl: function (network) {
            var networkConfig  = ShareToolsModelFactory.getNetworkConfig(network);
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
            this.shareButton   = document.querySelector(holderEl + ' .share__button');
            this.toggleOverlay = document.querySelector(holderEl + ' .share__overlay');
            this.closeButton   = document.querySelector(holderEl + ' .share__overlay-close');
            this.networks      = document.querySelectorAll(holderEl + ' .share__tool--network');
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

        networkClicked: function (e) {
            e.preventDefault();
            this.openShareWindow(e.target.getAttribute('data-network'));
            this.toggleShareOverlay();
            return false;
        }

    };

    return ShareToolsController;

});