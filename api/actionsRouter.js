const express = require('express');
const Action = require('../data/helpers/actionModel.js')
const Project = require('../data/helpers/projectModel')
const router = express.Router();
// router.use(express.json());


router.get('/:project_id', (req, res) => {
    const { project_id } = req.params;

    Project.getProjectActions(project_id)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'error getting projecr' })
        })
    console.log('user list called');
});

router.get('/', (req, res) => {
    // const { id } = req.params;

    Action.get()
        .then(result => {
            res.status(201).json(result)
        })
})

router.post('/', validateProjId, (req, res) => {
    const body = req.body
    Action.insert(body).then(action => {
        res.status(201).json({ action })
    })
        .catch(err => {
            res.status(500).json({ err })
        })
})


router.put('/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params

    console.log('Action created')
    Action.update(id, body)
        .then(newInfo => {
            res.status(202).json(newInfo)
            // if (newInfo) {
            //     console.log('newInfo');
            //     Action.get(id)
            //         .then(info => {
            //             res.status(200).json(info)
            //             console.log('info')
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "couldnt update project" });
            // })
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Couldnt create the project' });
        })
    // console.log(info)

})

router.delete('/:id', validateActionId, (req, res) => {
    console.log('action has been removed')
    //     // res.status(200).json(user)
    const { id } = req.params;
    Action.remove(id)
        .then(() => res.status(204).end())
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Error deleting user'
            })
        })
})


// //MIDDLEWARE
function validateProjId(req, res, next) {
    // const { project_id } = req.params;
    // const {body} = req;
    // console.log('proj id')

    if (req.body.notes === undefined || req.body.description === undefined || req.body.project_id === undefined) {
        return res.status(404).json({ error: 'These are undefined' });
    } else {
        next();
    }
}

function validateActionId(req, res, next) {
    const { id } = req.params;
    // console.log('proj id', project_id)


    Action.get(id)
        .then(specificAction => {
            if (specificAction) {
                console.log('Validated action')
                // req.action = specificAction;

                // res.status(200).json({ message: "Hello world" });
                next();
                // res.status(200).json(specificAction);
            } else {
                return res.status(404).json({ error: 'no such id exists' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error occurred while retrieving project' });
        })

}

module.exports = router;