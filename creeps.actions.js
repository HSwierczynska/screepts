/*
  Attempts to pick up the nearest piece of dropped energy.
  Returns true if there is dropped energy somewhere in the room,
  false otherwise
*/
function collectNearestDroppedEnergy(creep) {
  var dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  if (dropped) {
    if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
      creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffff00'}});
    }
    return true;
  } else {
    return false;
  }
}

/*
  Attempts to approach the nearest container and withdraw energy from it
  Returns true if there is a container with non-zero energy reserves anywhere
  in the room, false otherwise
*/
function withdrawFromNearestContainer(creep) {
  var containers = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return structure.structureType == STRUCTURE_CONTAINER &&
        structure.store[RESOURCE_ENERGY] > 0
    }
  });

  var closest = _.sortBy(containers, [target => {
    creep.pos.getRangeTo(target.pos);
  }])[0];

  if (closest && creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffff00'}});
  }
}

/*
  Attempts to build the nearest construction site
*/
function buildNearestConstructionSite(creep) {
  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

  var closest = _.sortBy(targets, [target => {
    creep.pos.getRangeTo(target.pos);
  }])[0];

  if (closest && creep.build(closest) === ERR_NOT_IN_RANGE) {
    creep.moveTo(closest, {visualizePathStyle: {stroke: '#00ff00'}});
  }
}

module.exports = {
  collectNearestDroppedEnergy,
  withdrawFromNearestContainer
};