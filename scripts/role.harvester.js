var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if((!creep.memory.part_timing && creep.carry.energy < creep.carryCapacity) ||
                creep.carry.energy == 0) {
            creep.memory.part_timing = false;
            var sources = creep.room.find(FIND_SOURCES);
            var i = creep.name.charCodeAt(0) % sources.length;
            if(creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i]);
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
                var i = creep.name.charCodeAt(0) % targets.length;
                if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[i]);
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
