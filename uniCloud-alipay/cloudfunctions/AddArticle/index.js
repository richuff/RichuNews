'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {detail,imageURL} = event;
	return await db.collection("article").add({
		posttime:Date.now(),
		imageURL:imageURL,
		...detail,
	});
};
