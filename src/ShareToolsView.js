define(['bootstrap', 'lib/template_engine'], function (news, templateEngine) {

    var ShareToolsView = function (options) {
        var ShareToolsView = this;
        this.controller = options.controller;
        this.model = options.model;

        this.config = options.config;
        this.template = this.getTemplate();
        this.label = options.config.label;
        this.isInTheNewsApp = options.config.isInTheNewsApp;

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
                isInTheNewsApp: this.isInTheNewsApp,
                networks: this.controller.getNetworkNames()
            };
            var generatedElMarkup = templateEngine(this.template, templateValues);
            this.$el = news.$(generatedElMarkup);

            this.$holderEl.empty();
            this.$holderEl.append(this.$el);
        },

        getTemplate: function () {
            var template;
            if (this.config.template && this.config.templateMarkup) {
                throw new Error('ShareTools: You cannot set a template and templateMarkup, please remove one');
            }

            if (this.isInTheNewsApp) {
                template = '<div class="share ns__share-dropdown">\
                                <div class="share__button">\
                                    <div class="share__png_icon"></div>\
                                    <p><%= label %></p>\
                                    </div>\
                                </div>\
                            </div>';
            } else if (this.config.templateMarkup) {
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
            if (!this.isInTheNewsApp) {
                this.$toggleOverlay.toggle();
            } else {
                this.controller.openNewsAppShare();
            }
        },

        networkClicked: function (event) {
            var networkClicked = news.$(event.currentTarget).data('network');

            this.controller.openShareWindow(networkClicked);
            this.$toggleOverlay.toggle();

            return false;
        }

    };

    return ShareToolsView;

});
