-- Firebase module for Webscript.io

local Firebase = {}

function Firebase:nodePath(node)
  return self.root .. '/' .. node .. '.json'
end

function Firebase:get(node)
  local req = http.request {
	  method = 'GET',
	  url = self:nodePath(node),
	  params = {
	    auth = self.authtoken
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
	    auth = self.authtoken
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
	    auth = self.authtoken
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
	    auth = self.authtoken
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
	    auth = self.authtoken
	  }
	}
	
	return req.statuscode
end

function Firebase:new(o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end


-- Export
local function init(root, authtoken)
  return Firebase:new({ root = root, authtoken = authtoken })
end

return { init = init }
