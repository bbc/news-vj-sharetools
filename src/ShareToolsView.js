define(['jquery', 'lib/template_engine'], function ($, templateEngine) {

    var ShareToolsView = function (options) {
        this.networks  = options.networkNames;
        this.template  = options.config.template;
        this.label     = options.config.label;
        this.$holderEl = options.config.holderEl;

        if (!this.template) {
            throw new Error('ShareTools: Template markup was not supplied');
        }

        this.render();
    };

    ShareToolsView.prototype = {

        render: function () {
            var templateValues = {
                label: this.label,
                networks: this.networks
            };
            var generatedElMarkup = templateEngine(this.template, templateValues);
            this.$el = $(generatedElMarkup);

            this.$holderEl.empty();
            this.$holderEl.append(this.$el);
        },

        getHolderElement: function () {
            return this.$el;
        }

    };

    return ShareToolsView;

});
