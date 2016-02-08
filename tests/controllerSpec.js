define(['ShareTools'], function (ShareToolsController) {

    var controller;

    beforeEach(function() {
        controller = new ShareToolsController({
            label:    'Share this page',
            holderEl: $('.tempShareToolsHolder'),
            messages: {
                twitter: 'Twitter message',
                facebook: {
                    title: 'Facebook share message',
                    description: 'Further detailed information here', //Optional
                    image: 'http://bbc.co.uk/some-image.png' //Optional
                },
                email: {
                    subject: 'SUPER IMPORTANT EMAIL',
                    message: 'BBC News has new bespoke'
                }
            },
            shareUrl: document.referrer,
            template: '\
            <div class="share ns__share-dropdown">\
                <div class="share__button">\
                    <div class="share__png_icon"></div>\
                    <p><%= label %></p>\
                </div>\
                <span class="share__overlay">\
                    <p><%= label %></p>\
                    <ul>\
                        <% for ( var i = 0; i < networks.length; i++ ) { %>\
                            <li class="share__tool share__tool--<%=networks[i] %>">\
                                <a id="<%=networks[i] %>__share-button" data-network="<%=networks[i] %>" class="share__tool--network" href="#">\
                                    <span> <i aria-hidden="true" class="gelicon gelicon--<%=networks[i] %>"></i></span>\
                                    <%=networks[i].charAt(0).toUpperCase() + networks[i].slice(1) %>\
                                </a>\
                            </li>\
                        <% } %>\
                    </ul>\
                    <a href="#" class="share__overlay-close" tabindex="4"></a>\
                 </span>\
             </div>\
            '
        });
    });

    describe('ShareTools Controller', function () {

        it('should fetch the network config parameters', function () {
            var fbConfig = controller.getNetworkConfig('facebook');

            expect(fbConfig.name).toEqual('facebook');
            expect(fbConfig.shareEndpoint).toEqual('https://www.facebook.com/dialog/feed');
            expect(fbConfig.popup).toBeTruthy();
            expect(fbConfig.staticParameters).toBeDefined();
            expect(fbConfig.staticParameters.app_id).toEqual('58567469885');
            expect(fbConfig.staticParameters.redirect_uri).toEqual('http://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed');
            expect(fbConfig.staticParameters.display).toEqual('popup');
            expect(fbConfig.staticParameters.locale).toEqual('en_GB');
            expect(fbConfig.dynamicParameters).toBeDefined();
        });

        it('should construct the right share url', function () {
            var fbShareUrl = controller.getShareTargetUrl('facebook');
            expect(fbShareUrl).toEqual('https://www.facebook.com/dialog/feed?app_id=58567469885&redirect_uri=http%3A%2F%2Fwww.bbc.co.uk%2Fnews%2Fspecial%2Fshared%2Fvj_sharetools%2Ffb_red_uri.html%3Fst_cb%3Dfacebook%23state%3Dfeed&display=popup&locale=en_GB&link=http%3A%2F%2Fwww.bbc.co.uk&name=Facebook%20share%20message&description=Further%20detailed%20information%20here&picture=http%3A%2F%2Fbbc.co.uk%2Fsome-image.png');
        });

    });

});
