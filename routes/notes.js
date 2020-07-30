const router = require("koa-router")();
const mysql = require("../mysql");
const config = require("../config/default.js");

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

router.post("/uploadNote", function (ctx, next) {
	console.log(ctx)

	// mysql.insertNote(ctx.request.value);
	return (ctx.body = {
		code: "200",
		data: {
			msg: "ok",
		},
	});
});

module.exports = router;
