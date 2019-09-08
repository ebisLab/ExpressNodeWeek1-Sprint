const express = require('express');
const Action = require('../data/helpers/actionModel.js')
const Project = require('../data/helpers/projectModel')
const router = express.Router();
router.use(express.json());


router.get('/:project_id/actions/', validateProjId, (req, res) => {
    const { project_id } = req.params;

    Action.get()
        .then(item => {
            if (project_id.length > 0) {
                res.status(200).json(item)
            } else {
                res.status(404).json({ message: 'There are no actions' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'error getting projecr' })
        })
    console.log('user list called');
});

// router.get('/:id', validateProjId, (req, res) => {
//     console.log('project called')
//     const { id } = req.params;
//     Action.get(id)
//         .then(proj => {
//             if (proj) {
//                 res.status(200).json({ proj });
//             } else {
//                 res.status(404).json({ api: 'project with this id doesnt exist' });

//             }
//         })
//     res.status(200).json({ api: 'up' });
// });

// router.post('/', validateProj, (req, res) => {
//     const { body } = req;
//     const { id } = req.params

//     console.log('Action created')
//     Action.insert({ body })
//         .then(proj => {
//             res.status(200).json(proj);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: 'Couldnt create the project' });

//         })
// })

// router.put('/:id', (req, res) => {
//     const { body } = req;
//     const { id } = req.params

//     console.log('Action created')
//     Action.update(id, body)
//         .then(newInfo => {
//             if (newInfo) {
//                 Action.get(id)
//                     .then(info => res.status(200).json(info))
//                     .catch(err => {
//                         console.log(err)
//                         res.status(500).json({ error: "couldnt update project" });
//                     })
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: 'Couldnt create the project' });
//         })

// })


// //MIDDLEWARE
function validateProjId(req, res, next) {
    const { project_id } = req.params;
    console.log('proj id', project_id)


    Action.get(project_id)
        .then(specificProj => {
            if (specificProj) {
                console.log('ValidateProject', specificProj)
                res.status(200).json(specificProj)
            } else {
                return res.status(404).json({ error: 'no such id exists' });

            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error occurred while retrieving project' });
        })

}

// function validateProj(req, res, next) {
//     const { body } = req;

//     Action.insert(body)
//         .then(specificProj => {
//             res.status(200).json({ specificProj });
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ error: 'Couldnt create project' });

//         })
// }

module.exports = router;


