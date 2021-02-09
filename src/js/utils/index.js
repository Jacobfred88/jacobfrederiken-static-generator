export const getDistance = (x1, y1, x2, y2) => {
	var a = x1 - x2;
	var b = y1 - y2;

	return Math.sqrt(a * a + b * b);
};

export const clamp = (num, min, max) => {
	return num <= min ? min : num >= max ? max : num;
};

export const lerp = (value1, value2, amount) => {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

export const selectAll = (selector, elm, nodeList) => {
	var root = elm ? elm : document;
	return nodeList
		? root.querySelectorAll(selector)
		: Array.from(root.querySelectorAll(selector));
};

export const select = (selector, elm) => {
	var root = elm ? elm : document;
	return root.querySelector(selector);
};

export const rect = (el) => {
	return el.getBoundingClientRect();
};

export const progressBetween = (value, first, last) => {
	return clamp((value - first) / (last - first), 0, 1);
};

export const pad = (num, size) => {
	var s = num + '';
	while (s.length < size) s = '0' + s;
	return s;
};

export const getTranslate = (el) => {
	const translate = {};
	if (!window.getComputedStyle) return;

	const style = getComputedStyle(el);
	const transform =
		style.transform || style.webkitTransform || style.mozTransform;

	let mat = transform.match(/^matrix3d\((.+)\)$/);
	if (mat) return parseFloat(mat[1].split(', ')[13]);

	mat = transform.match(/^matrix\((.+)\)$/);
	translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
	translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

	return translate;
};

export const hasAttrInTree = (element, attr) => {
	if (!element) return;
	do {
		if (element.classList && element.hasAttribute(attr)) {
			return element;
		}
		element = element.parentNode;
	} while (element);
	return false;
};

export const string_to_slug = (str) => {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
	var to = 'aaaaaaeeeeiiiioooouuuunc------';

	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
};
