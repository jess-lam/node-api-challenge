const express = require('express');

const Action = require('../data/helpers/actionModel');
const Project = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/:id', validateActionId, (req, res) => {
    Action.get(req.params.id)
    .then((resource) => {
        res.status(200).json(resource);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving database resoures', err
        })
    })

})

//works on Postman


router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
    .then(resource => {
        res.status(200).json({
            message: 'The resource has been deleted.'
        })
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'The resource could not be deleted', err
        })
    })
})

//works on Postman

router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    const body= req.body;

    if (!body.notes || !body.description) {
        res.status(400).json({
            errorMessage: 'Please provide the notes and description.'
        })
    } else {
        Action.update(id, body)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: 'There was an error updating your resources.', err
            })
        });
    };
});

//works on Postman


//custom middleware 


function validateActionId(req, res, next) {
    const { id } = req.params;
    Action.get(id)
    .then(resource => {
        if(resource) {
            req.resource = resource;
            next();
        } else {
            res.status(404).json({
                message: 'Action ID is not available.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'exception', err
        })
    })
}

module.exports = router;