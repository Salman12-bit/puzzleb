import express from "express";
import {authLoginController, authRegisterController, uploadImage, authArticleController, authForgetpasswordController} from "../controllers/authController.js";
import  {autharticleDeleteController,authChangeroleController,authCommentController,authGettingcommentController,authratingDeleteController} from "../controllers/authController.js" 
import upload from "../middleware/upload.js";



const router = express.Router();


// Website Controller Fields
router.post("/register",authRegisterController)
router.post("/login", authLoginController)
router.post("/forgetpassword", authForgetpasswordController)

//Article Posting Controller Fields
router.post("/upload", upload.single('image'), uploadImage)
router.get("/article",  authArticleController)
router.delete("/delarticle/:id",autharticleDeleteController)
router.post("/changerule", authChangeroleController)

// User Comment Controller
router.post("/usercomment",authCommentController)
router.get("/getusercomment",authGettingcommentController)
router.delete("/delrating/:id",authratingDeleteController)






export default router