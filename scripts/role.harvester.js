var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if((!creep.memory.part_timing && creep.carry.energy < creep.carryCapacity) ||
                creep.carry.energy == 0) {
            creep.memory.part_timing = false;
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.memory.part_timing = true;
                if(creep.room.find(FIND_CONSTRUCTION_SITES).length > 0){
                    roleBuilder.run(creep);
                } else {
                    roleUpgrader.run(creep);
                }
            }
        }
	}
};

module.exports = roleHarvester;

// vim:ts=4 sts=4 sw=4 et
