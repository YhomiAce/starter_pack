const url = require('url');
const myUrl = new URL('http://mywebsite.com:8000/posts/news/mag?id=100&status=active');

// Serialized url
console.log(myUrl.href);
console.log(myUrl.toString());

// host(root domain)
console.log(myUrl.host);

// Hostname(does not get port number)
console.log(myUrl.hostname);

// path name
console.log(myUrl.pathname);

// serialize query
console.log(myUrl.search);

// Params object
console.log(myUrl.searchParams);

// Add params
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);

// Loop through the object params
myUrl.searchParams.forEach((name, value) => {
    console.log(`${name}:${value}`);
})