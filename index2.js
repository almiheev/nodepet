const fetch = require('node-fetch');

/*fetch('https://github.com/')
    .then(res => res.text())
    .then(body => console.log(body));*/

(async function(){
    const someFetch = await fetch('https://jsonplaceholder.typicode.com/todos');
    const json = await someFetch.json();
    console.log(json[2]);
})();
