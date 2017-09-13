# png-bound-nodejs
get png bound with nodejs **(ES6)**

## install

````
npm install --save png-bound-nodejs
````

## example
````javascript
const {getBound} = require('png-bound-nodejs');

const fs = require('fs');
fs.readFile('png file', function (err, data) {
	getBound(data).then(
		(bound)=>{
			console.log(bound);
		},
		(error)=>{
			console.log(error);
		}
	);
});
````