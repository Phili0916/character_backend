const express = require('express')
const uuid = require('uuid');
const router = express.Router();
const heros = require('../../Heros');

//create a route creating a simple rest api
//Gets all heros
router.get('/', (req, res) => {
    res.json(heros)
})

//Get single hero
router.get('/:id', (req, res) => {
    //some gives us a true or false based on this condition. Does the id exist?
    const found = heros.some(hero => hero.id === parseInt(req.params.id))

    if(found) {
        res.json(heros.filter(hero => hero.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Hero not found with the id of ${req.params.id}`});
    }
    
});

//create a hero
router.post('/', (req, res) => {
    const newHero = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        job: req.body.job
    }

    if(!newHero.name || !newHero.email || !newHero.job) {
       return res.status(400).json({ msg: 'Please fill in all the required fields'})
    }

    heros.push(newHero);
    res.json(heros)
    //res.redirect('/');

});

//update hero
router.put('/:id', (req, res) => {
    
    //check to see if member exists
    const found = heros.some(hero => hero.id === parseInt(req.params.id))

    if(found) {
        const updateHero = req.body;
        heros.forEach(hero => {
            if(hero.id === parseInt(req.params.id)) {
                hero.name = updateHero.name ? updateHero.name : hero.name;
                hero.email = updateHero.email ? updateHero.email : hero.email;
                hero.job = updateHero.job ? updateHero.job: hero.job;

                res.json({ msg: 'Your hero has been updated', hero });
            }
        })
    } else {
        res.status(400).json({ msg: `Hero not found with the id of ${req.params.id}`});
    }
    
});

//delete hero 
router.delete('/:id', (req, res) => {
    //some gives us a true or false based on this condition. Does the id exist?
    const found = heros.some(hero => hero.id === parseInt(req.params.id))

    if(found) {
        res.json({ msg: 'hero deleted', heros: heros.filter(hero => hero.id !== parseInt(req.params.id))})
    } else {
        res.status(400).json({ msg: `Hero not found with the id of ${req.params.id}`});
    }
    
});

module.exports = router;