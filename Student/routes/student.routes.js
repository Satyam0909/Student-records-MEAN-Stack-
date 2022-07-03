const express = require('express');
const app = express();
const studentExpressRoute = express.Router();
let studentSchema = require('../model/student.model');

studentExpressRoute.route('/').get((req, res) => {
    studentSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

studentExpressRoute.route('/student/:id').get((req, res) => {
    studentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});
studentExpressRoute.route('/add-student').post((req, res, next) => {
    studentSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data)
        }
    });
});
studentExpressRoute.route('/del-student/:id').delete((req, res, next) => {
    studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.status(200).json({
                msg: data
            })
        }
    });
});

studentExpressRoute.route('/update-student/:id').put((req, res, next) => {
    studentSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data);{
                console.log('Updated Data Successfully!')
            }

        }
    });
});



module.exports = studentExpressRoute;