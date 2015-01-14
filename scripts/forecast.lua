local _        = require('underscore')
local firebase = require('mileszim/chapmanapi/modules/firebase.lua')

-- Setup
local node = 'forecast'

firebase:init({
  root = storage.FIREBASE_PATH,
  auth = storage.FIREBASE_SECRET
})


-- Parse
local forecast = json.parse(request.body).results.forecast
forecast = _.each(forecast, function(i) i.url = nil end)


-- Update
firebase:set(node, json.stringify(forecast))


-- Return
return 'ok'