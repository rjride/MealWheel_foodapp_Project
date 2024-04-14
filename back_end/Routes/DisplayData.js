const express = require("express");
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
        console.log({food_item:global.food_item,foodcategory:global.foodcategory});
        res.send([global.food_item,global.foodcategory]);
    }
    catch(error){
        console.error(error.message);
        res.send("server Error")
    }
})
module.exports = router;