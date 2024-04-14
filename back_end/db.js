const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://rahul_kharwar:Arjundeep30@cluster0.zqb9onv.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_item").find({}).toArray();
        const foodcategory = await mongoose.connection.db.collection("foodcategory").find({}).toArray();
        //console.log(foodcategory);
        

        global.food_item = fetched_data;
        global.foodcategory = foodcategory;

        console.log("Data fetched successfully:", {/* food_item: global.food_item, foodcategory: global.foodcategory */});
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Throw error to handle in the calling function
    }
};

module.exports = mongoDB;
