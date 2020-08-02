const router = require("koa-router")();
const mysql = require("../mysql");
const config = require("../config/default.js");
const {
	format
} = require("mysql");

router.prefix("/api/notes");

if (process.env.NODE_ENV == "development") {
	baseUrl = config.apiPathDev;
} else if (process.env.NODE_ENV == "production") {
	baseUrl = config.apiPathPro;
} else {
	baseUrl = config.apiPathDev;
}

router.get("/", function (ctx, next) {
	ctx.body = "this is a users note!";
});
router.get('/getNoteList', async (ctx, next) => {
	let data = await mysql.getNoteList();

	return (ctx.body = {
		code: "200",
		data: data,
	});
})

router.post("/uploadNote", async (ctx, next) => {
	console.log(ctx.request.body.param);
	let result = {};
	let str = ctx.request.body.param
	if (str.length > 200) {
		return (ctx.body = {
			code: "???还要什么状态码",
			data: {
				msg: "随笔啊！打这么多字干什么",
			},
		})
	}
	let date = new Date();
	result.username = str.search("shin") === 0 ? "shin" : "other";
	result.detail = str.search("shin") === 0 ? str.slice(5) : str;
	result.createDate = date.toLocaleDateString();
	result.createFullDate = date.toLocaleTimeString()
	mysql.insertNote(result);
	return (ctx.body = {
		code: "200",
		data: {
			msg: "ok",
		},
	});
});

module.exports = router;