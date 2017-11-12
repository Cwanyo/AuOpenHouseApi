'use strict';

var student = require('../controllers/studentController');

var express = require('express');
//RESTful route
var router = express.Router();

/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(student.Authetication);

//Welcome route
router.route('/')
    .get(student.welcome_page);

router.route('/login')
    .put(student.login)

router.route('/events')
    .get(student.list_events);

router.route('/events/:event_id')
    .get(student.event_info);

router.route('/faculties')
    .get(student.list_faculties);

router.route('/faculties/:faculty_id')
    .get(student.faculty_info);

module.exports = router;