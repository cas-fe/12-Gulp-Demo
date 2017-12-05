import greet from './greet.js';

greet('Thomas').then((welcome) => {
	document.body.innerHTML += welcome;
});
