define(['initialize'], function(initialize) {
    initialize.controller('HomeCtrl', ['$state', 'socket', '$window', '$location', '$scope', 'R', '$rootScope', 'MenuService', 'LoginHelper',
        function($state, socket, $window, $location, $scope, r, $rootScope, MenuService, LoginHelper) {

        	$scope.dataWelcome = JSON.parse(window.localStorage.getItem("dataWelcome"));

        	var lDataRuangan = JSON.parse(window.localStorage.getItem("dataRuangan"));
    		var modulAplikasiId = JSON.parse(window.localStorage.getItem("modulAplikasiId"));
        	

        	$scope.goToHome = function()
        	{        		

        		$rootScope.socketOffruanganId(lDataRuangan);

        		MenuService.getDataMenu("modul-aplikasi/keluar-ruangan/"+modulAplikasiId) 
                    .then(function(result) {

                    	window.localStorage.removeItem('dataRuangan');
		        		window.localStorage.removeItem('modulAplikasiId');
		        		window.localStorage.removeItem('dataWelcome');

		        		$rootScope.menu = [];

		        		$rootScope.showMenuUtama  = true;     

		        		
		        		socket.emit("keluar-ruangan", lDataRuangan.ruanganId);


		        		$state.go("home");

                    });

        	}
    }]);
});