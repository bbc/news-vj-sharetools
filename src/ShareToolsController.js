define('ShareTools', ['jquery', 'ShareToolsView', 'ShareToolsModelFactory'], function ($, ShareToolsView, ShareToolsModelFactory) {

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
            var $el = this.view.getHolderElement();
            this.$shareButton   = $el.find('.share__button');
            this.$toggleOverlay = $el.find('.share__overlay');
            this.$closeButton   = $el.find('.share__overlay-close');
            this.$networks      = $el.find('.share__tool--network');
        },

        addListeners: function () {
            var self = this;
            if(this.$shareButton && this.$toggleOverlay) {
                this.$shareButton.on('click', function () {
                    self.toggleShareOverlay();
                });
                this.$closeButton.on('click', function () {
                    self.toggleShareOverlay();
                });
            }
            this.$networks.on('click', function (e) {
                self.networkClicked(e);
            });
        },

        toggleShareOverlay: function () {
            if (this.$toggleOverlay) {
                this.$toggleOverlay.toggle();
            }
        },

        networkClicked: function (event) {
            var networkClicked = $(event.currentTarget).data('network');

            this.openShareWindow(networkClicked);
            this.toggleShareOverlay();

            return false;
        }

    };

    return ShareToolsController;

});