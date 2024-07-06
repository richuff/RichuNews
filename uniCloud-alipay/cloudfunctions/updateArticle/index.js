'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {detail,imageURL} = event;
	detail.posttime = 0;
	detail.posttime = Date.now();
	detail.imageURL = 0;
	return await db.collection("article").doc(detail._id).update({
		...detail,
		imageURL:imageURL
	});
};
