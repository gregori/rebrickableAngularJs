(function() {
   'use strict'; 

    angular
        .module('app')
        .factory('RebrickableService', RebrickableService);

    RebrickableService.$inject = ['$http'];

    function RebrickableService($http) {
        var url = 'https://rebrickable.com/api';

        return {
            getSets: getSets
        };

        function getSets(queryStr) {
            return $http.get(url + '/search', {
                params: { 
                    key: 'EWAKwlOdek',
                    format: 'json',
                    type: 'S',
                    query: queryStr
                }  
            })
                .then(getSetsComplete)
                .catch(getSetsFailed);

            function getSetsComplete(response) {
                return response.data.results;
            }
            function getSetsFailed(error) {
                console.error('Erro ao buscar conjuntos: ' + error.data);
            }
        }
    }

})();