var roleRecycle = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN)
                    structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0) {
            if(targets[0].recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            } else {
                if(Memory.globals.debug_level >= 1){
                    console.log("Recycled "+creep.name+"!");
                }
            }
        }
    }
};

module.exports = roleRecycle;

// vim:ts=4 sts=4 sw=4 et
