'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {detail,imageURL,location} = event;
	console.log(location)
	return await db.collection("article").add({
		location:location,
		posttime:Date.now(),
		imageURL:imageURL,
		...detail,
	});
};
