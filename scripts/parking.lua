local firebase = require('mileszim/chapmanapi/modules/firebase.lua')
local parking  = require('mileszim/chapmanapi/modules/parking.lua')


-- Setup
local REQUEST_URL = 'https://webfarm.chapman.edu/parkingservice/parkingservice/counts'
local FB_NODE = 'parking'

firebase:init({
  root = storage.FIREBASE_PATH,
  auth = storage.FIREBASE_SECRET
})


-- Fetch
local req = http.request { url = REQUEST_URL }
if req.statuscode ~= 200 then
  log('Bad request: ' .. req.statuscode)
  return req.statuscode
end


-- Parse
local response   = json.parse(req.content).Structures
local structures = parking.parse(response)


-- Update
firebase:update(FB_NODE, json.stringify(structures))


-- Return
return 'ok'