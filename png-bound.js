/**
 * Created by rockyl on 17/8/21.
 *
 * get png bound with nodejs (ES6)
 */

const PNG = require('pngjs').PNG;

exports.getBound = function(data) {
	return new Promise((resolve, reject)=>{
		let png = new PNG();
		png.parse(data, function (err, imgData) {
			if(err){
				reject(err);
			}else{
				resolve(process(imgData));
			}
		});
	});
};

function process(imgData) {
	let {width, height, data} = imgData;
	let bound = {
		x: 0, y: 0, width, height,
	};

	let h = getBorders(false, 0, width, 0, height);
	let v = getBorders(true, 0, width, 0, height);

	if(h.length > 1){
		if(h[0].transparent){
			bound.x = h[1].p;
		}
		let lh = h.length - 1;
		bound.width = (h[lh].transparent ? h[lh].p : width) - bound.x;
	}
	if(v.length > 1){
		if(v[0].transparent){
			bound.y = v[1].p;
		}
		let lv = v.length - 1;
		bound.height = (v[lv].transparent ? v[lv].p : height) - bound.y;
	}

	return bound;

	function getBorders(isVertical, x0, x1, y0, y1) {
		let i, j, transparentLine, borders = [];

		let fromJ = isVertical ? y0 : x0;
		let toJ = isVertical ? y1 : x1;
		let fromI = isVertical ? x0 : y0;
		let toI = isVertical ? x1 : y1;
		for (j = fromJ; j < toJ; j++) {
			transparentLine = true;
			for (i = fromI; i < toI; i++) {
				let transparent = isVertical ? isTransparent(i, j) : isTransparent(j, i);
				if (!transparent) {
					transparentLine = false;
				}
			}

			let last = borders[borders.length - 1];
			if (borders.length === 0 || last.transparent !== transparentLine) {
				borders.push({
					p: j,
					transparent: transparentLine,
				})
			}
		}

		return borders;
	}

	function getOffset(x, y) {
		return y * width * 4 + x * 4;
	}

	function getPixel(x, y) {
		let from = getOffset(x, y);
		return {
			r: data[from],
			g: data[from + 1],
			b: data[from + 2],
			a: data[from + 3],
		}
	}

	function isTransparent(x, y) {
		let from = getOffset(x, y);

		return data[from + 3] === 0;
	}
}