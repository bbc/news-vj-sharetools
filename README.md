#BBC Visual Journalism ShareTools module

This module is used to add share tools to VJ content.

##Requirements
* Bower
* RequireJS/Almond

##Installation & Setup
`bower install https://github.com/bbc/news-vj-sharetools.git`

news-vj-sharetools has a template engine dependency. The reason we have kept 'template_engine' OUT of the sharetools.min.js file is to keep the filesize down - you may already have a template engine in your application and it would be a shame to have to download it twice.

You need to make sure `template_engine` is defined in your RequireJS paths. You can point to the one installed with Bower, i.e.:
```
var paths = {
    'template_engine': 'bower_components/template_engine/template_engine'
};
```

...or you can point to your own.

##Example use

###Initialising the sharetools module.

```
var sharetools = new ShareTools({
    holderEl: '.tempShareToolsHolder',
    label: 'Share this page',
    shareUrl: document.referrer,
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
        // you can also specify custom social networks, e.g.
        whatsapp123: {
            shareEndpoint: 'http://example.com',
            popup:         true,
            properties: {
                name: 'WhatsApp',
                age:  '23',
                subject: 'Testing custom networks'
            }
        }
    },
    template: '<h1><%=label%></h1>'
});
```
**Sending custom template**

The `template` property is a HTML template that will be rendered by the template engine. The renderer will pass the two values:

* label (string) - The label passed when initalising shareTools
* networks (array) - An of available network names.
* Overlay functionality. If you want more than just a list of share buttons - i.e. you want to be able to open/close a panel which has the share buttons on them - make sure your markup contains `.share__overlay` and `.share__overlay-close`.

See the examples in the bin/templates directory. You can consume these as text if you have the RequireJS Text plugin, e.g.

```javascript
define(['text!templates/buttons.tmpl'], function (buttonsTemplate) {

});
```

...or you can grab use the template.js files directly.

```javascript
define(['templates/template'], function (buttonsTemplate) {

});
```

###Updating the share messages

```
sharetools.setMessages({
    twitter: 'Updated message',
    facebook: {
        title: 'Updated facebook share message',
        description: 'Updated description',
        image: 'http://bbc.co.uk/new-some-image.png'
    },
    email: {
        subject: 'Hello',
        message: 'New info'
    },
    app: {
        title: 'New title',
        text: 'Hello world'
    }
});
```

###Updating shared url

```
sharetools.setShareUrl('http://bbc.co.uk/super-cool-new-url');
```

###Set a callback for when the user clicks on a sharetool

```
sharetools.onShareButtonClick(function (network) {
    console.log(network + ' sharetool clicked');
});
```
