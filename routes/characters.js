const express = require('express');
const router = express.Router();
const Character = require('../models/character')
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//get all
router.get('/', async(req,res)=> {
    try{
        const characters = await Character.find()
        res.json(characters)
    } catch(err){
      res.status(500).json({message:err.message})
    }

});

//create new
router.post('/',async (req,res)=>{

    const character = new Character( {
        name: req.body.name,
        age: req.body.age,
        description: req.body.description,
        type: req.body.type,
        facts: req.body.facts,
        img: req.body.description,
})
try{
    const newCharacter = await character.save()
    res.status(201).json(newCharacter)
}catch(err)
{
    res.status(400).json({message: err.message})
}

})

//get single
router.get('/:id',getCharacter, (req,res)=> {res.send(res.character)
})

//delete
router.delete('/:id',getCharacter, async (req,res)=>{

try {
    await res.character.remove()
    res.json({message:'Character deleted !'})
    } 
    catch (err) {
    res.status(500).json({message:err.message})    
}
})


//update 

router.patch('/:id', getCharacter, async(req,res)=>{
    
    if(req.body.name != null)
    {
        res.character.name = req.body.name
    }
    if(req.body.age != null)
    {
        res.character.age = req.body.age
    }
    if(req.body.description != null)
    {
        res.character.description = req.body.description
    }
    if(req.body.type != null)
    {
        res.character.type = req.body.type
    }
    if(req.body.facts != null)
    {
        res.character.facts = req.body.facts
    }

    try {
        const updatedCharacter = await res.character.save()
        res.json(updatedCharacter)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


//middleware
async function getCharacter(req, res, next )
{
    let character
    try{
        character = await Character.findById(req.params.id)
        if(character == null){
            return res.status(404).json({message:'Character not found'})
        }
    }catch(err)
    {
        res.status(500).json({message: err.message})
    }
    res.character = character
    next()
}

module.exports = router