local firebase = require('mileszim/chapmanapi/modules/firebase.lua')


-- Setup
local node = 'weather'

firebase:init({
	root = storage.FIREBASE_PATH,
	auth = storage.FIREBASE_SECRET
})


-- Parse
local forecast = json.parse(request.body).results.forecast
local weather  = forecast[1]

weather.url  = nil
weather.day  = nil
weather.time = nil



-- Update
firebase:set(node, json.stringify(weather))


-- Return
return 'ok'