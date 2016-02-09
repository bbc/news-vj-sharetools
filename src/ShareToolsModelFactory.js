define(['models/Email', 'models/Facebook', 'models/Twitter'], function (Email, Facebook, Twitter) {

    var __ModelDictionary = {
        'email':    Email,
        'facebook': Facebook,
        'twitter':  Twitter
    },
    modelObjects = {};

    return {
        setMessages: function (messages, shareUrl) {
            for (var key in messages) {
                var modelObject = new __ModelDictionary[key]();
                modelObject.setShareUrl(shareUrl);
                modelObject.setMessage(messages[key]);
                modelObjects[key] = modelObject;
            }
        },
        getNetworkConfig: function (name) {
            return modelObjects[name];
        }
    };
});
