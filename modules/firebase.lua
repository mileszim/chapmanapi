-- Firebase module for Webscript.io
--
-- To use:
-- local firebase = require('mileszim/chapmanapi/modules/firebase.lua')
-- firebase.init({
--   root = 'https://my-firebase-ref.firebaseio.com,
--   auth = 'my-auth-token'
-- })


-- Namespace
local Firebase = {}


-- API
function Firebase:nodePath(node)
  return self.root .. '/' .. node .. '.json'
end


function Firebase:get(node)
  local req = http.request {
    method = 'GET',
    url = self:nodePath(node),
    params = {
      auth = self.auth
    }
  }
  if req.statuscode == 200 then
    return json.parse(req.content)
  else
    return req.statuscode
  end
end


function Firebase:set(node, content)
  local req = http.request {
    method = 'PUT',
    url = self:nodePath(node),
    params = {
      auth = self.auth
    },
    data = content
  }
  if req.statuscode == 200 then
    return json.parse(req.content)
  else
    return req.statuscode
  end
end


function Firebase:push(node, content)
  local req = http.request {
    method = 'POST',
    url = self:nodePath(node),
    params = {
      auth = self.auth
    },
    data = content
  }
  if req.statuscode == 200 then
    return json.parse(req.content)
  else
    return req.statuscode
  end
end


function Firebase:update(node, content)
  local req = http.request {
    method = 'PATCH',
    url = self:nodePath(node),
    params = {
      auth = self.auth
    },
    data = content
  }
  if req.statuscode == 200 then
    return json.parse(req.content)
  else
    return req.statuscode
  end
end


function Firebase:remove(node)
  local req = http.request {
    method = 'DELETE',
    url = self:nodePath(node),
    params = {
      auth = self.auth
    }
  }
  return req.statuscode
end


-- Instance Handling
function Firebase:new(o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end

function Firebase:init(params)
  self.root = params.root
  self.auth = params.auth
end


-- Export
return Firebase:new()
