local firebase = require('mileszim/chapmanapi/modules/firebase.lua')


-- Setup
local FB_NODE    = 'social'
local SOCIAL_URL = 'https://social.chapman.edu/posts.json'

firebase:init({
  root = storage.FIREBASE_PATH,
  auth = storage.FIREBASE_SECRET
})


-- Fetch
local posts = http.request { url = SOCIAL_URL }
if posts.statuscode ~= 200 then
  log('Bad fetch: ' .. posts.statuscode)
  return posts.statuscode
end


-- Update
firebase:set(FB_NODE, posts.content)


-- Return
return 'ok'