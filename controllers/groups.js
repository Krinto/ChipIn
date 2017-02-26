var _ = require('lodash');
var Group = require('../models/group.js');

exports.createGroup = function (req, res){
    var newGroup = new Group(req.body);
    newGroup.save(function (err) {
        if (err) {
            res.status(400).json({message: 'error during group create', error: err});
        };
        res.json({message: 'group created successfully'});
    });
};

exports.getAllGroups = function (req, res){
    Group.find(function (err, groups) {
        if (err) {
            res.status(400).json({message: 'error during find groups', error: err});
        };
        res.json({message: 'groups found successfully', data: groups});
    });
};

exports.getGroup = function (req, res){
    Group.findById(req.params.id, function (err, group) {
        if (err) {
            res.status(400).json({message: 'error during group find', error: err});
        };
        if (group) {
            res.json({message: 'group found successfully', data: group});
        }
        else {
            res.json({message: 'group not found'});
        }
    });
};

exports.updateGroup = function (req, res){
    Group.findById(req.params.id, function (err, group) {
        if (err) {
            res.status(400).json({message: 'error during group find', error: err});
        };
        if (group) {
            _.merge(group, req.body);
            group.save(function (err) {
                if (err) {
                    res.status(400).json({message: 'error during group update', error: err});
                };
                res.json({message: 'group updated successfully'});
            });
        }
        else {
            res.json({message: 'group not found'});
        }
    });
};

exports.deleteGroup = function (req, res){
    Group.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(400).json({message: 'error during remove group', error: err});
        };
        res.json({message: 'group removed successfully'});
    });
};