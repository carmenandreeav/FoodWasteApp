let express = require('express')
const { Op } = require('sequelize')
let router = express.Router()
const User = require("../tabele/user")
const Aliment = require('../tabele/aliment')

User.hasMany(Aliment)
User.belongsToMany(User, { through: "Relationships", as:"Prieteni", foreignKey:"prietenId"})

router.route('/validatePassword').post( async(req,res)=>{
   const {email , password } = req.body;
    try{
        const user= await User.findAll({
            where:{
                email:`${email}`,
                password:`${password}`,
            }
        })
        .then((rows)=>{
            if (rows.length>0){
                res.send({validation:true})
            } else {
                res.send({validation:false})
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

router.route('/getUsers').get(async (req, res) => {
    const {simplified} = req.query;
    const {pIsDone} = req.query;
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error){
        res.status(500).json(error);
    }
})

router.route('/addUser').post(async (req, res) => {
    try {
        const newUser = await User.create(req.body) 
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;