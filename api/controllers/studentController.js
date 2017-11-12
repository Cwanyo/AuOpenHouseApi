'use strict';

exports.Authetication = function(req, res, next) {
    console.log(req.method, req.url);
    next();
}

exports.welcome_page = function(req, res, next) {
    res.send("Welcome to AuOpenHouse-Student Api");
}

exports.login = function(req, res, next) {

    //validation
    req.assert("sid", "UUID is required").notEmpty();
    req.assert("name", "Name is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    var data = {
        sid: req.body.sid,
        name: req.body.name,
        image: req.body.image,
        email: req.body.email
    };

    req.getConnection(function(err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO `heroku_8fddb363146ffaf`.`student` (`SID`, `Name`, `Image`, `Email`) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Image=?;", [data.sid, data.name, data.image, data.email, data.name, data.image], function(err, results, fields) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.sendStatus(200);
        });
    });

}

exports.list_events = function(req, res, next) {

    req.getConnection(function(err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM heroku_8fddb363146ffaf.event;", function(err, results, fields) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.json(results);
        });
    });

}

exports.event_info = function(req, res, next) {

    var event_id = req.params.event_id;

    req.getConnection(function(err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM heroku_8fddb363146ffaf.event WHERE eid = ?;", [event_id], function(err, results, fields) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            if (results.length < 1) {
                return res.send("Event Not found");
            }

            res.json(results);
        });
    });

}

exports.list_faculties = function(req, res, next) {

    req.getConnection(function(err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM heroku_8fddb363146ffaf.faculty;", function(err, results, fields) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.json(results);
        });
    });

}

exports.faculty_info = function(req, res, next) {

    var faculty_id = req.params.faculty_id;

    req.getConnection(function(err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM heroku_8fddb363146ffaf.faculty WHERE fid = ?;", [faculty_id], function(err, results, fields) {
            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            if (results.length < 1) {
                return res.send("Faculty Not found");
            }

            res.json(results);
        });
    });

}