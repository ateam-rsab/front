define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanNeracaPercobaanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.getPDF = function(selector) {
		        kendo.drawing.drawDOM($(selector)).then(function(group){
		          kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
		        });
		     }

		    
		    $scope.bikinDataNeracaPercobaan = function(){
		    	$scope.dataNeracaPercobaan = [];

		    	for(var i=0; i<10; i++){
		    		var obj = {
		    			"kode":"11110000140201",
						"namaPerkiraan":"Kas bendahara Penerimaan",
						"SaldoAwalDebit":"Rp. 1.206.875.578,00",
						"SaldoAwalkredit":"Rp. 1.206.875.578,00",
						"MutasiDebit":"Rp. 1.206.875.578,00",
						"Mutasikredit":"Rp. 1.247.994.537,00",
						"SaldoKreditDebit":"Rp. 1.206.875.578,00",
						"SaldoKreditkredit":"Rp. 1.206.875.578,00"
		    		};

		    		$scope.dataNeracaPercobaan.push(obj);
		    	}
		    }

		    $scope.bikinDataNeracaPercobaan();

		}
		]);
});