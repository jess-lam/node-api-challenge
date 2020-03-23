const express = require('express');

const Action = require('../data/helpers/actionModel');
const Project = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', validateProjectId, (req, res) => {
    const body = req.body;

    if(!body.name || !body.description) {
        res.status(400).json({
            errorMessage: 'Please provide a name and description for the project.'
        })
    } else {
        Project.insert(body)
        .then(body => {
            res.status(201).json(body)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: 'There was an error while saving the project to the database.'
            })
        })
    }
  })
//works on Postman


router.get('/:id', validateProjectId, (req, res) => {
    Project.get(req.params.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'There was error retrieving hte project.', err
        })
    });
});

//works on Postman

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
    .then(project => {
        res.status(200).json({
            message: 'The project has been deleted.'
        })
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'The project could not be deleted.'
        })
    })
})

//works on Postman

router.put('/:id', validateProjectId, (req, res) => {
    const body = req.body;
    console.log(body);
    const { id } = req.params;

    if(!body.name || !body.description) {
        res.status(400).json({
            errorMessage: 'Please provide a name and description for the project.'
        });
    } else{
        Project.update(id, body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: 'There was an error updating your project', err
            })
        });
    };
});

//works on Postman

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Project.get(id)
    .then(project => {
        if(project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({
                message: 'Project ID is not available.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'exception', err
        })
    })
}


module.exports = router