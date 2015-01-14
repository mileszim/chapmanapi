local _        = require('underscore')
local firebase = require('mileszim/chapmanapi/modules/firebase.lua')


-- Setup
local node = 'jobs'

firebase:init({
	root = storage.FIREBASE_PATH,
	auth = storage.FIREBASE_SECRET
})


-- Parse
local results = json.parse(request.body).results
local jobtype = _.keys(results)[1]
local jobs = {}
jobs[jobtype] = {}
_.each(results[jobtype], function(j) jobs[jobtype][j.id] = j end)


-- Update
firebase:update(node, json.stringify(jobs))


-- Return
return 'ok'