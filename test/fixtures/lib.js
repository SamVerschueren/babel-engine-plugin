import getUrls from 'get-urls';

const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';
export function process() {
	getUrls(text);
}
