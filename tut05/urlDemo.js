const url = require('url');

const urlString = 'https://www.google.com/search?q=oh+yes+like+it';

const urlObj = new URL(urlString);

// console.log(urlObj);

const myObj = {
	id: 1,
	name: 'John',
	age: 40,
	job: 'Programmer',
	city: 'San Francisco',
};

const entries = Object.entries(myObj);
console.log(entries);
const searchParams = new URLSearchParams(entries);
console.log(searchParams);
const myUrl = `http://mywebsite.com/people?${searchParams.toString()}`;
console.log(myUrl);

// const myUrl = `http://mywebsite.com/people?${new URLSearchParams(
// 	Object.entries(myObj)
// ).toString()}`;
// console.log(myUrl);
