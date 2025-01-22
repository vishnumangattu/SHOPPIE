import { Router } from "express";
import * as user from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/verifyemail").post(user.verifyEmail);
router.route("/signup").post(user.signUp); 
router.route("/signin").post(user.signIn);
router.route("/home").get(Auth,user.home);
router.route("/profile").get(Auth,user.profile);
router.route("/edituser").post(Auth,user.editUser);
router.route("/editaddress").post(Auth,user.editAddress);
router.route("/company").get(Auth,user.company); 
router.route("/editcompany").post(Auth,user.editCompany);
router.route("/editcategory").post(Auth,user.editCategory);
router.route("/addproduct").post(Auth,user.addProduct);
router.route("/products/:category").get(Auth,user.products);
router.route("/getproduct/:_id").get(Auth,user.getProduct);
router.route("/editproduct/:_id").put(Auth,user.editProduct);
router.route("/product/:_id").get(Auth,user.product);
router.route("/addtocart").post(Auth,user.addToCart);
router.route("/getcart").get(Auth,user.getCart); 
router.route("/getsinglecart/:pid").get(Auth,user.getSingleCart); 
router.route("/editquantity").post(Auth,user.editQuantity);
router.route("/addtowishlist").post(Auth,user.addToWishlist);
router.route("/removefromwishlist").delete(Auth,user.removeFromWishlist);
router.route("/getwishlists").get(Auth,user.getWishlists);
router.route("/placeorder").post(Auth,user.addOrders);
router.route("/buynow").post(Auth,user.addOrder);
router.route("/getorders").get(Auth,user.getOrders);
router.route("/getsellorders").get(Auth,user.getsellOrders);
router.route('/search').get(user.searchItemZ);
router.route("/updateorderstatus").post(Auth,user.updateorderstatus);


export default router;