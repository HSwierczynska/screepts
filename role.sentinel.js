const actions = require('creeps.actions');
const bodies = require('creeps.bodies');


function getOppositeDirection(direction) {
  return ((direction + 3) % 8) + 1;
}

/*
  Sentinels guard their rooms
*/
module.exports = {
  run: function(creep) {
    var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    var attacking = false;
    if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
      attacking = true;
    }

    // Get away from the spawn if we're not chasing an invader
    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    if (!attacking) {
      actions.rallyAtFlag(creep, creep.room.find(FIND_FLAGS)[0]);
    }

  },

  create: function(spawn) {
    spawn.createCreep(bodies.sentinel, memory = {
      role: 'sentinel'
    });
  }
}
