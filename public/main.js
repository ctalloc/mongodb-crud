'use strict';
const update = document.querySelector('#update-button');
const deletion = document.querySelector('#delete-button');
console.log(update);

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
        
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response);
    })
});

deletion.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload();
    })
})