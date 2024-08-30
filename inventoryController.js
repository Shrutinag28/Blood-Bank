const inventoryModel = require("../models/inventoryModel");
const userModel= require("../models/userModel");

const createInventoryController = async(req,res) => {
    try{
        const {email, inventoryType} = req.body
        //validation
        const user=await userModel.findOne({email});
        if(!user){
            throw new Error('User not found');     
        }
        if(inventoryType === "in" && user.role !== 'donor'){
            throw new Error('Not a donor account');
        }
        if(inventoryType === "out" && user.role !== 'hospital'){
            throw new Error('Not a hospital');
        }
        //save record
        const inventory = new inventoryModel(req.body);;
        await inventory.save();
        return res.status(201).send({
            success:true,
            message: "New Blood Record Added",
        });
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in create Inventory API',
            error,
        });
    }
};

//GET ALL BLOOD RECORDS
const getInventoryController = async(req,res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.body.userId
          }).populate("donor").populate("hospital").sort({ createdAt: -1 }); //latest records will be at top
        return res.status(200).send({
          success: true,
          message: "get all records successfully",
          inventory,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error In Get All Inventory",
          error,
        });
      }
};

module.exports={createInventoryController,getInventoryController};