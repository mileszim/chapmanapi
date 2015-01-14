-- Webscript.io module to parse Chapman's parking data
--
-- Usage:
-- local parking = require('mileszim/chapmanapi/modules/parking.lua')
--

local Parking = {}


-- Convert table into map with name of structure as key
function Parking.nameKey(array)
  local struct = {}
  _.each(array, function(i)
      local name = string.match(string.lower(i['name']),"%S+")
      struct[name] = i
    end)
  return struct
end


-- Parking structure levels map function
function Parking.mapLevel(l)
  return {
    name = l['SystemName'],
    capacity = l['Capacity'],
    available = l['CurrentCount']
  }
end


-- Parking structure map function
function Parking.mapStructure(s)
  return {
    name = s['Name'],
    capacity = s['Capacity'],
    available = s['CurrentCount'],
    levels = nameKey(_.map(s['Levels'], mapLevel))
  }
end


-- Convert standard format into our format
function Parking.parse(content)
  return nameKey(_.map(content, mapStructure))
end



-- Export
return Parking
