const express = require('express');
const Action = require('../data/helpers/actionModel.js')
const Project = require('../data/helpers/projectModel')
const router = express.Router();
// router.use(express.json());


// router.get('/:project_id', (req, res) => {
//     const { project_id } = req.params;

//     Project.getProjectActions(project_id)
//         .then(item => {
//             res.status(200).json(item)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: 'error getting projecr' })
//         })
//     console.log('user list called');
// });

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Action.get(id).then(result => {
        res.status(201).json({ result })
    })
})

router.post('/:id', (req, res) => {
    const body = req.body
    Action.insert(body).then(action => {
        res.status(201).json({ action })
    })
        .catch(err => {
            res.status(500).json({ err })
        })
})

// router.get('/:project_id/actions/:id', validateProjId, validateActionId, (req, res) => {

//     console.log('project called')

//     res.status(200).json(req.action);
//     // res.status(200).json({ message: "Hello world" });
// });

// router.post('/', validateProjId, (req, res) => {
//     // const { body } = req;
//     // const { id } = req.params

//     console.log('Action created')
//     Action.insert(req.body)
//         .then(act => {
//             res.status(200).json(act);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: 'Couldnt create the action' });

//         })
// })

router.put('/:project_id/actions/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params

    console.log('Action created')
    Action.update(id, body)
        .then(newInfo => {
            if (newInfo) {
                console.log('newInfo');
                Action.get(id)
                    .then(info => {
                        res.status(200).json(info)
                        console.log('info')
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ error: "couldnt update project" });
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Couldnt create the project' });
        })
    // console.log(info)

})

router.delete('/:project_id/actions/:id', validateActionId, validateProjId, (req, res) => {
    console.log('action has been removed')
    //     // res.status(200).json(user)
    const { id } = req.params;
    User.remove(id)
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

    // Action.get(project_id)
    //     .then(specificProj => {
    //         if (specificProj) {
    //             console.log('ValidateProject', specificProj)
    //             res.status(200).json(specificProj);
    //         } else {
    //             return res.status(404).json({ error: 'no such id exists' });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({ error: 'error occurred while retrieving project' });
    //     })

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

function validaAction(req, res, next) {
    const { body } = req;
    const { project_id } = req.params;

    if (project_id != body.project_id) {
        return res.status(400).json({ error: 'Error in this field' })
    }
}

module.exports = router;


