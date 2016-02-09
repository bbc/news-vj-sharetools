define(['ShareToolsModelFactory'], function (ShareToolsModelFactory) {

    beforeEach(function() {
        ShareToolsModelFactory.setMessages({
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
            document.referrer
        );
    });

    describe('ShareTools Model Factory', function () {

        it('should fetch the network config parameters', function () {
            var fbConfig = ShareToolsModelFactory.getNetworkConfig('facebook');

            expect(fbConfig.shareEndpoint).toEqual('https://www.facebook.com/dialog/feed');
            expect(fbConfig.parameters().app_id).toEqual('58567469885');
            expect(fbConfig.parameters().redirect_uri).toEqual('http://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed');
            expect(fbConfig.parameters().display).toEqual('popup');
            expect(fbConfig.parameters().locale).toEqual('en_GB');
        });

    });

});