define(['models/Twitter'], function (TwitterModel) {

    var model;

    beforeEach(function() {
        model = new TwitterModel();
    });

    describe('ShareTools Model - Twitter', function () {

        it('should have methods for getting and setting the Twitter message', function () {
            expect(model.setShareUrl).toBeDefined();
            expect(model.getShareUrl).toBeDefined();
            expect(model.getMessage).toBeDefined();
            expect(model.setMessage).toBeDefined();
        });

        it('should throw an error if I attempt to set an invalid Twitter message', function () {
            var setInvalidTwitterMessage = function () {
                model.setMessage(null);
            };
            expect(setInvalidTwitterMessage).toThrowError('ShareTools: Twitter message must be set');
        });

        it('should get and set the Twitter message as expected', function () {
            var message = 'test';
            model.setMessage(message);
            expect(model.getMessage()).toEqual(message);
        });

    });

});