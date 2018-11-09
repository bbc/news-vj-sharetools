define(['ShareToolsModelFactory'], function (ShareToolsModelFactory) {

    beforeEach(function() {
        this.factory = new ShareToolsModelFactory();
        this.factory.setMessages({
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
            }
        );
    });

    describe('ShareTools Model Factory', function () {

        it('should fetch the network config parameters', function () {
            var fbConfig = this.factory.getNetworkConfig('facebook');

            expect(fbConfig.shareEndpoint).toEqual('https://www.facebook.com/dialog/feed');
            expect(fbConfig.parameters().app_id).toEqual('58567469885');
            expect(fbConfig.parameters().redirect_uri).toEqual('https://www.bbc.co.uk/news/special/shared/vj_sharetools/fb_red_uri.html?st_cb=facebook#state=feed');
            expect(fbConfig.parameters().display).toEqual('popup');
            expect(fbConfig.parameters().locale).toEqual('en_GB');
        });

    });

    describe('ShareTools Model Factory - custom networks', function () {

        it('should let me define my own networks', function () {
            var customNetwork = this.factory.getNetworkConfig('custom');
            expect(customNetwork.parameters().age).toEqual('23');
            expect(customNetwork.popup).toBeTruthy();
        });

        it('should let me specify whether the shareEndpoint is opened in a popup or not', function () {

            this.factory.setMessages({
                something: {
                    shareEndpoint: 'http://example.com',
                    popup:         false
                }
            });

            var somethingNetwork = this.factory.getNetworkConfig('something');
            expect(somethingNetwork.popup).toBeFalsy();
        });

        it('should let me define my own networks', function () {

            var customNetworkWithoutShareEndpoint = function () {
                this.factory.setMessages({
                    newNetwork: {
                        // deliberately missing shareEndpoint
                        popup:         true,
                        properties: {
                            name: 'WhatsApp',
                            age:  '23',
                            subject: 'Testing custom networks'
                        }
                    }
                });
            }.bind(this);
            expect(customNetworkWithoutShareEndpoint).toThrowError('ShareTools: no shareEndpoint property supplied for custom network "newNetwork"');
        });

    });

});
