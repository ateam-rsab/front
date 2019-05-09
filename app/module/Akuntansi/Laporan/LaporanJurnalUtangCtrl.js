define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanJurnalUtangCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.getPDF = function(selector) {
		        kendo.drawing.drawDOM($(selector)).then(function(group){
		          kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
		        });
		     }

		    
		    $scope.bikinDataJurnal = function(){
		    	$scope.dataJurnal = [];

		    	for(var i=0; i<100; i++){
		    		var obj = {
		    			"NoJurnal":"1604BT0761",
						"Keterangan":"Penerimaan Bank Tgl 01-04-2016",
						"NoPerkiraan":"11420000140201",
						"Debit":"0,00",
						"Kredit":"63.378.713,00",
						"Saldo":"5.411.685,00",
						"Post":"N"
		    		};

		    		$scope.dataJurnal.push(obj);
		    	}
		    }

		    $scope.bikinDataJurnal();

		}
		]);
});