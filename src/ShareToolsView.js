define(['jquery', 'lib/template_engine'], function ($, templateEngine) {

    var ShareToolsView = function (options) {
        var ShareToolsView = this;
        this.controller = options.controller;

        this.config = options.config;
        this.template = options.config.template;
        this.label = options.config.label;

        this.$holderEl = options.config.holderEl;

        if (!this.template) {
            throw new Error('ShareTools: Template not found');
        }

        this.render();
        this.setElSelectors();
        this.addListeners();
    };

    ShareToolsView.prototype = {

        render: function () {
            var templateValues = {
                label: this.label,
                networks: this.controller.getNetworkNames()
            };
            var generatedElMarkup = templateEngine(this.template, templateValues);
            this.$el = $(generatedElMarkup);

            this.$holderEl.empty();
            this.$holderEl.append(this.$el);
        },

        setElSelectors: function () {
            this.$shareButton = this.$el.find('.share__button');
            this.$toggleOverlay = this.$el.find('.share__overlay');
            this.$closeButton = this.$el.find('.share__overlay-close');
            this.$networks = this.$el.find('.share__tool--network');
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

            this.controller.openShareWindow(networkClicked);
            this.toggleShareOverlay();

            return false;
        }

    };

    return ShareToolsView;

});
