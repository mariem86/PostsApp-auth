const router = require("express").Router();

const Post = require("../models/Post");
const isAuth = require("../middlewares/isAuth");

//find Posts

router.get("/all/:start?", async (req, res) => {
  const startIndex = Number(req.query.start) || 0;
  const count = await Post.countDocuments();
  const hasMore = startIndex + 1 < count;
  console.log({ count, hasMore, startIndex });

  try {
    const posts = await Post.find()
      .skip(startIndex)
      .limit(2)
      .populate("user", ["name", "lastName", "avatarColor", "_id"])
      .sort({ date: -1 });
    res.status(200).send({ posts, hasMore });
  } catch (error) {
    res.status(501).send({ msg: "Server Error" });
    console.log(error);
  }
});

//find posts by userID
router.get("/user/:user/:startIndex?", async (req, res) => {
  const startIndex = Number(req.query.startIndex) || 0;
  const user = req.params.user;
  const count = await Post.countDocuments({ user });
  const hasMore = startIndex + 1 < count;

  try {
    if (!require("mongoose").Types.ObjectId.isValid(user)) {
      return res.status(404).send({ msg: "Not Found" });
    }
    const posts = await Post.find({ user })
      .skip(startIndex)
      .limit(2)
      .populate("user", ["name", "lastName", "avatarColor", "_id"])
      .sort({ date: -1 });

    if (!posts) {
      return res.status(404).send({ msg: "Not Found" });
    }

    res.status(200).send({ posts, hasMore, startIndex });
    console.log({ count });
  } catch (error) {
    res.status(501).send({ msg: "Server Error" });
    console.log(error);
  }
});

router.post("/", isAuth, async (req, res) => {
  const {
    body: { text },
    user: { _id: user },
  } = req;
  try {
    await new Post({ text, user }).save();
    res.status(200).send({ msg: "ok" });
  } catch (error) {
    res.status(501).send({ msg: error._message });
  }
});

router.delete("/:id", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const authUserId = req.user._id;
    const post = await Post.findById(id);
    const userID = post.user;
    if (authUserId.toString() !== userID.toString()) {
      return res.status(401).send({ msg: "Unauthorized" });
    }
    await post.remove();
    res.status(200).send({ msg: "ok" });
  } catch (error) {
    res.status(501).send({ msg: "Server Error" });
  }
});

module.exports = router;
