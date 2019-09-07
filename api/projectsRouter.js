const express = require('express');
const Project = require('../data/helpers/projectModel')
const router = express.Router();
router.use(express.json());


router.get('/', (req, res) => {

    Project.get()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json({ error: 'error getting projecr' })
        })
    console.log('user list called');
});

router.get('/:id', validateProjId, (req, res) => {
    console.log('project called')
    const { id } = req.params;
    Project.get(id)
        .then(proj => {
            if (proj) {
                res.status(200).json({ proj });
            } else {
                res.status(404).json({ api: 'project with this id doesnt exist' });

            }
        })
    res.status(200).json({ api: 'up' });
});

router.post('/', validateProj, (req, res) => {
    const { body } = req;
    const { id } = req.params

    console.log('Project created')
    Project.insert({ body })
        .then(proj => {
            res.status(200).json(proj);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Couldnt create the project' });

        })
})



//MIDDLEWARE
function validateProjId(req, res, next) {
    const { id } = req.params;

    Project.get(id)
        .then(specificProj => {
            res.status(200).json({ specificProj });

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error retrieving project' });
        })

}

function validateProj(req, res, next) {
    const { body } = req;

    Project.insert(body)
        .then(specificProj => {
            res.status(200).json({ specificProj });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Couldnt create project' });

        })
}
module.exports = router;


