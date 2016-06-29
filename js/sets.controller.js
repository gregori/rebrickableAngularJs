(function() {
    'use strict';

    angular
        .module('app')
        .controller('SetsController', SetsController);

        SetsController.$inject = [ 'RebrickableService' ];

        function SetsController(RebrickableService) {
            var vm = this;
            vm.search = "";
            vm.sets = [];
            vm.partTypes = [];
            vm.types = [];
            vm.getSets = getSets;

            getPartTypes();
            getTypes();

            function getTypes() {
                return RebrickableService.getTypes()
                    .then(function(data) {
                        vm.types = data;
                        return vm.types;
                    });
            }

            function getSets() {
                var id = typeof vm.partType !== 'undefined' ? vm.partType.part_type_id : ''; 
                return RebrickableService.getSets(vm.search, id)
                    .then(function(data) {
                        vm.sets = data.results;
                        return vm.sets;
                    });
            } 

            function getPartTypes() {
                return RebrickableService.getPartTypes()
                    .then(function(data) {
                        vm.partTypes = data.part_types;
                        return vm.partTypes;
                    });
            }

        }

})();
