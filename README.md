#BBC Visual Journalism ShareTools module

This module is used to add share tools to VJ content.

##Example use

###Initialising the sharetools module.

```
var sharetools = new ShareTools({
    holderEl: $('.tempShareToolsHolder'),
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

See the examples in the bin/templates directory.


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
