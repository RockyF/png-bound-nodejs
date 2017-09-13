# png-bound-nodejs
get png bound with nodejs **(ES6)**

##example:
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