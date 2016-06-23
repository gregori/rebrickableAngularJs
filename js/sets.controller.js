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
            vm.getSets = getSets;

            function getSets() {
                return RebrickableService.getSets(vm.search)
                    .then(function(data) {
                        vm.sets = data;
                        return vm.sets;
                    });
           } 
        }

})();
