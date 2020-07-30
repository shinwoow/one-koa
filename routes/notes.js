const router = require("koa-router")();
router.prefix("/api/notes");

router.get("/", function (ctx, next) {
	ctx.body = "this is a users note!";
});

module.exports = router;
