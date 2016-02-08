define(['jquery', 'lib/template_engine'], function ($, templateEngine) {

    var ShareToolsView = function (options) {
        var ShareToolsView = this;
        this.controller = options.controller;
        this.model = options.model;

        this.config = options.config;
        this.template = this.getTemplate();
        this.label = options.config.label;

        this.$holderEl = options.config.holderEl;

        if (!this.template) {
            throw new Error('ShareTools: Template (' + options.template + ') not found');
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

        getTemplate: function () {
            var template;
            if (this.config.template && this.config.templateMarkup) {
                throw new Error('ShareTools: You cannot set a template and templateMarkup, please remove one');
            }

            if (this.config.templateMarkup) {
                template = this.config.templateMarkup;
            } else if (this.config.template) {
                template = '';//@TODO open file ( this.config.template );
            }

            return template;
        },

        setElSelectors: function () {
            this.$shareButton = this.$el.find('.share__button');
            this.$toggleOverlay = this.$el.find('.share__overlay');
            this.$closeButton = this.$el.find('.share__overlay-close');
            this.$networks = this.$el.find('.share__tool--network');
        },

        addListeners: function () {
            if(this.$shareButton && this.$toggleOverlay) {
                this.$shareButton.on('click', this.toggleShareOverlay.bind(this));
                this.$closeButton.on('click', this.toggleShareOverlay.bind(this));
            }
            this.$networks.on('click', this.networkClicked.bind(this));
        },

        toggleShareOverlay: function () {
            this.$toggleOverlay.toggle();
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
