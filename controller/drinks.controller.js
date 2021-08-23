const axios = require('axios');

const  ownerModel = require('../model/drinks.model')

const getDrinks = async (req, res) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`).then(response => {
        res.send(response.data.drinks)
    }).catch(error => {
        console.log(error)
    })
}

const createFavorite = async (req, res) => {
    const {
        name,
        img_path,
        email
    } = req.body;
    console.log(email);
    ownerModel.find({ email: email }, (error, data) => {
        if (error) {
            console.log(error);
        }

        else {
            console.log(data);

           data[0].ownerDrink.push({
            name: name,
            img_path: img_path,
           })

           data[0].save();
            res.send( data[0].ownerDrink);
        }
    })
}

const getFavorite = async (req, res) => {
    const email=req.query.email
    ownerModel.find({email:email}, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send(data[0].ownerDrink);
        }
    })
}

const deleteFavorite = async (req, res) => {
    const idx = req.params.idx
    const { email } = req.query;
    console.log(email);
    ownerModel.find({email:email}, (error, data) => {
        if (error) {
            console.log(error)
        }
        
                else {
                    data[0].ownerDrink.splice(idx,1) 
                    data[0].save();
                    res.send(data[0].ownerDrink);
                }
            })
        }


const updateFavorite = async (req, res) =>{
    const idx = req.params.idx
    const {
        name,
        img_path,
        email
    } = req.body;
    console.log(email);
    ownerModel.findOne({email:email}, (error, data) => {


        if (error) {
            console.log(error)
        }
        else {
            data.ownerDrink.splice(idx,1,{
                name: name,
                img_path: img_path
            })
            
            data.save();
            res.send(data.ownerDrink)
        }
    })
}

module.exports = { getDrinks, createFavorite, getFavorite, deleteFavorite , updateFavorite }