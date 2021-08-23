const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteDrink = new Schema({
    name: String,
    img_path: String,
});

const ownerSchema = new Schema({
    email: String,
    ownerDrink: [favoriteDrink],
});

// const drinkModel = mongoose.model('Favorite', favoriteDrink);
const ownerModel = mongoose.model('owner', ownerSchema);
 
const seedOwner = () => {
    const mohammad = new ownerModel({
        email:"mohammadkabbara40@gmail.com",
        ownerDrink: [
           
           
            {
                img:'https://upload.wikimedia.org/wikipedia/commons/6/6b/1984-Big-Brother.jpg',
                name: 'Nineteen Eighty-Four',
                
            }

        ]
    });

// console.log(mohammad)
  
   

    const anas = new ownerModel({
        email:"anasfuad232@gmail.com",
        ownerDrink: [
       
        {
            name: 'ٌٌThe rules of Jarteen',
            img:'https://play-lh.googleusercontent.com/SxjancQW6UXiSx9z99lznn5LZoegJz8TroeqnxOyFzKppRXjH_UcAMicnypopvPM-4HF=s1200'
        }],

})


    mohammad.save();
    anas.save();
   
}


//seedOwner();




module.exports =  ownerModel ;