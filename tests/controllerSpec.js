define(['ShareTools'], function (ShareToolsController) {

    var controller;

    beforeEach(function() {
        var holderEl = document.createElement('div');
        holderEl.className = 'tempShareToolsHolder';

        controller = new ShareToolsController({
            label:    'Share this page',
            holderEl: holderEl,
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
                },
                custom: {
                    shareEndpoint: 'http://example.com',
                    popup:         true,
                    properties: {
                        name: 'WhatsApp',
                        age:  '23',
                        subject: 'Testing custom networks '
                    }
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

        it('should construct the right share url for predefined networks', function () {
            var fbShareUrl = controller.getShareTargetUrl('facebook');
            expect(fbShareUrl).toEqual('https://www.facebook.com/dialog/share?app_id=58567469885&redirect_uri=http%3A%2F%2Fwww.bbc.co.uk%2Fnews%2Fspecial%2Fshared%2Fvj_sharetools%2Ffb_red_uri.html%3Fst_cb%3Dfacebook%23state%3Dfeed&display=popup&locale=en_GB&href=http%3A%2F%2Fwww.bbc.co.uk&quote=Facebook%20share%20message');
        });

        it('should construct the right share url for custom networks', function () {
            var customShareUrl = controller.getShareTargetUrl('custom');
            expect(customShareUrl).toEqual('http://example.com?name=WhatsApp&age=23&subject=Testing%20custom%20networks%20');
        });

        it('should let me update messages at runtime', function () {
            controller.setMessages({
                twitter: 'This is my NEW Twitter message'
            });
            expect(controller.getShareTargetUrl('twitter')).toEqual('https://twitter.com/intent/tweet?text=This%20is%20my%20NEW%20Twitter%20message%20http%3A%2F%2Fwww.bbc.co.uk');
        });

        it('should let me update the share url at runtime', function () {
            controller.setShareUrl('http://google.com');
            expect(controller.getShareTargetUrl('twitter')).toEqual('https://twitter.com/intent/tweet?text=Twitter%20message%20http%3A%2F%2Fgoogle.com');
        });

        it('should let me set a callback that is called when a sharetool is clicked', function () {
            var shareClickedSpy = jasmine.createSpy('shareClickedSpy');
            controller.onShareButtonClick(shareClickedSpy);

            expect(shareClickedSpy).not.toHaveBeenCalled();

            controller.resolveShareButtonCallbacks('facebook');

            expect(shareClickedSpy).toHaveBeenCalled();
            expect(shareClickedSpy).toHaveBeenCalledWith('facebook');
        });

        it('should let me set multiple callbacks that are called when a sharetool is clicked', function () {
            var callbackOne = jasmine.createSpy('callbackOne');
            var callbackTwo = jasmine.createSpy('callbackTwo');
            controller.onShareButtonClick(callbackOne);
            controller.onShareButtonClick(callbackTwo);

            expect(callbackOne).not.toHaveBeenCalled();
            expect(callbackTwo).not.toHaveBeenCalled();

            controller.resolveShareButtonCallbacks('twitter');

            expect(callbackOne).toHaveBeenCalled();
            expect(callbackOne).toHaveBeenCalledWith('twitter');
            expect(callbackTwo).toHaveBeenCalled();
            expect(callbackTwo).toHaveBeenCalledWith('twitter');
        });

    });

});
