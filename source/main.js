import greet from './greet.js';
import xmldom from 'xmldom';

greet('Thomas').then((welcome) => {
	const doc = new DOMParser().parseFromString(welcome, 'text/html');

	document.body.appendChild(doc.documentElement);
});
