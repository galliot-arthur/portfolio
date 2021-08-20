$('#div1')
    .css({
        "background": "red"
    })
    .html('Hello World!')
    .click( () => {
        alert()
    });

setInterval( () => {
    alert()
}, 3000)