const router = require("koa-router")();
router.prefix("/api/note");

router.get("/", function (ctx, next) {
	ctx.body = "this is a users note!";
});

module.exports = router;
