define(['models/Facebook'], function (FacebookModel) {

    var model;

    beforeEach(function() {
        model = new FacebookModel();
    });

    describe('ShareTools Model - Facebook', function () {

        it('should have methods for getting and setting the Facebook message', function () {
            expect(model.setShareUrl).toBeDefined();
            expect(model.getShareUrl).toBeDefined();
            expect(model.setMessage).toBeDefined();
            expect(model.getMessage).toBeDefined();
        });

        it('should get and set the Facebook message defaults', function () {
            var message = {
                title: 'My title'
            };
            model.setMessage(message);
            expect(model.getMessage().title).toEqual(message.title);
        });

        it('should allow me to specify the Facebook message description and image', function () {
            var message = {
                title:       'My title',
                description: 'Custom description',
                image:       'http://custom.image/url'
            };
            model.setMessage(message);
            expect(model.getMessage().title).toEqual(message.title);
            expect(model.getMessage().description).toEqual(message.description);
            expect(model.getMessage().image).toEqual(message.image);
        });

    });

});