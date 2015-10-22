#BBC Visual Journalism ShareTools module

This module is used to add share tools to VJ content.

##Example use

Initialising the sharetools module.

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
    template: 'buttons'
});
```

Updating the share messages

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
    }
});
```

Updating shared url

```
sharetools.setShareUrl('http://bbc.co.uk/super-cool-new-url');
```
