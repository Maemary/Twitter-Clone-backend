import express from "express";
import  { protectRoute } from "../middleWare/protectRoute.js";
import {
	bookmarkUnbookmarkPost,
	commentOnPost,
	createPost,
	 deletePost,
	 getAllPosts,
	 getBookmarkedPosts,
	 getFollowingPosts,
	 getLikedPost,
	 getUserPosts,
	likeUnlikePost,
} from "../controllers/post.controller.js";

const router  = express.Router();

router.get("/all",protectRoute,getAllPosts)
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username",protectRoute,getUserPosts)
router.get("/likes/:id",protectRoute,getLikedPost)
router.get("/bookmarks/:id",protectRoute,getBookmarkedPosts)
router.post("/create",protectRoute,createPost)
router.post("/like/:id",protectRoute,likeUnlikePost)
router.post("/bookmark/:id",protectRoute,bookmarkUnbookmarkPost)
router.post("/comment/:id",protectRoute,commentOnPost)
router.delete("/:id",protectRoute,deletePost)

export default router;