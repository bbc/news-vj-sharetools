define(['bootstrap', 'TemplateEngine', 'sharetools/templates/templates'], function (news, templateEngine, templates) {

    var SharetoolsView = function (options) {
        var SharetoolsView = this;
        this.controller = options.controller;
        this.model = options.model;

        this.label = options.config.label;
        this.template = templates[options.config.template];
        this.$holderEl = options.config.holderEl;

        if (!this.template) {
            throw new Error('ShareTools: Template (' + options.template + ') not found');
        }

        this.render();
        this.setElSelectors();
        this.addListeners();
    };

    SharetoolsView.prototype = {

        render: function () {
            var templateValues = {
                label: this.label,
                networks: this.controller.getNetworks()
            };
            var generatedElMarkup = templateEngine(this.template, templateValues);
            this.$el = news.$(generatedElMarkup);

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
            this.$toggleOverlay.toggle();

            return false;
        }

    };

    return SharetoolsView;

});
