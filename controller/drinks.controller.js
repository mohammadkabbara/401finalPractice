const axios = require('axios');

const { ownerModel } = require('../model/drinks.model')

const getDrinks = async (req, res) => {
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`).then(response => {
        res.send(response.data.drinks)
    }).catch(error => {
        console.log(error)
    })
}

const createFavorite = async (req, res) => {
    const {
        name: name,
        img_path: img_path,
        email:email
    } = req.body;
    ownerModel.find({ email: email }, (error, data) => {
        if (data.length > 0) {
            console.log('item already exists');
            res.send(data)
        }
        else {
            const newDrink = new ownerModel({
                name: name,
                img_path: img_path,
                email:email
            })
            newDrink.save();
            res.send(newDrink);
        }
    })
}

const getFavorite = async (req, res) => {
    ownerModel.find({email:email}, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send(data);
        }
    })
}

const deleteFavorite = async (req, res) => {
    const idx = req.params.idx
    const { email } = req.query;
    ownerModel.find({email:email}, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            data[idx].remove()
            ownerModel.find({email:email}, (error, data) => {
                if (error) {
                    console.log(error)
                }
                else {
                    res.send(data);
                }
            })
        }
    })
}

const updateFavorite = async (req, res) =>{
    const idx = req.params.idx
    const {
        name: name,
        img_path: img_path,
        email:email
    } = req.body;
    ownerModel.find({email:email}, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            data[idx].name=name;
            data[idx].img_path=img_path;
            data[idx].save();
            res.send(data)
        }
    })
}

module.exports = { getDrinks, createFavorite, getFavorite, deleteFavorite , updateFavorite }