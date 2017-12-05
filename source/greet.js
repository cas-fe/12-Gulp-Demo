export default function(name) {
	console.log(name);

	return Promise.resolve(`<h1>Hello ${name}!</h1>`);
}