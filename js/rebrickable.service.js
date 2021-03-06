(function() {
   'use strict'; 

    angular
        .module('app')
        .factory('RebrickableService', RebrickableService);

    RebrickableService.$inject = ['$http', '$q'];

    function RebrickableService($http, $q) {
        var url = 'https://rebrickable.com/api';
        var params = {
            key: 'EWAKwlOdek',
            format: 'json'
        };

        var types = [
            {id: 'S', name: 'Set'},
            {id: 'M', name: 'MOC'},
            {id: 'P', name: 'Part'}
        ];


        return {
            getSets: getSets,
            getSet: getSet,
            getPartTypes: getPartTypes,
            getTypes: getTypes
        };

        function getTypes() {
            return $q(function(resolve, reject){
                resolve(types);
            });
        }

        function getResults(uri, params) {
            return $http.get(url + uri, {params: params})
                .then(getResultsComplete)
                .catch(getResultsFailed);

            function getResultsComplete(response) {
                return response.data;
            }
            function getResultsFailed(error) {
                console.error('Erro ao buscar: ' + error.data);
            }
        }

        function getPartTypes() {
            return getResults('/get_part_types', params);
        }

        function getSets(type, queryStr, partType) {
            var _params = params;
            _params.type = type;
            _params.query = queryStr;
            _params.part_type_id = partType;
            
            return getResults('/search', _params);
        }

        function getSet(id) {
            var _params = params;
            _params.set_id = id;

            return getResults('/get_set', _params);
        }
    }

})();