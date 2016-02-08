#BBC Visual Journalism ShareTools module

This module is used to add share tools to VJ content.

##Example use

###Initialising the sharetools module.

```
var sharetools = new ShareTools({
    label: 'Share this page',
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
    template: 'dropdown', // Optional
    templateMarkup: '<h1><%=label%></h1>', // Optional
});
```
**Sending custom template**

You can optionally provide templateMarkup, this is a HTML template that will be rendered by the template engine. The renderer will pass the two values:

* label (string) - The label passed when initalising shareTools
* networks (array) - An of available network names.
* Overlay functionality. If you want more than just a list of share buttons - i.e. you want to be able to open/close a panel which has the share buttons on them - make sure your markup contains `.share__overlay` and `.share__overlay-close`.

See the examples in the bin/templates directory.


###Updating the share messages

```
sharetools.setMessages({
    twitter: 'Updated messaage',
    facebook: {
        title: 'Updated facebook share message',
        description: 'Updated descritpion',
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
