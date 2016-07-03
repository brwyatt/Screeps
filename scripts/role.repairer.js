var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }

	    if(creep.memory.repairing) {
	        var targets = creep.room.find(FIND_MY_STRUCTURES,{
                filter: (structure) => {
                    return (structure.hitsMax - structure.hits) > 0;
                }
            });
            if(targets.length) {
                var i = creep.name.charCodeAt(0) % targets.length;
                if(creep.repair(targets[i]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[i]);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            var i = creep.name.charCodeAt(0) % targets.length;
            if(creep.harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[i]);
            }
	    }
	}
};

module.exports = roleRepairer;

// vim:ts=4 sts=4 sw=4 et
