const actions = require('creeps.actions');
const bodies = require('creeps.bodies');

module.exports = {
  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    } else {
      // Find a container and get energy from it
      actions.withdrawFromNearestContainer(creep);
    }
  },

  /** @param {StructureSpawn} spawn**/
  create: function(spawn) {
    spawn.createCreep(bodies.basic, memory = {
      role: 'upgrader'
    });
  }
}
