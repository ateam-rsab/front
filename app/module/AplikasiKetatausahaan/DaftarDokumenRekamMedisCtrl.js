define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarDokumenRekamMedisCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras) {
			ModelItem.get("Ketatausahaan/CetakPengatarSurat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			FindSarpras.getSarpras("service/list-generic/?view=LoginUser&select=id,namaUser").then(function(dat){
				$scope.sourcePenerimaSurat = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=TipePengirimSurat&select=id,name").then(function(dat){
				$scope.sourceTipePengirim = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=SifatSurat&select=id,name").then(function(dat){
				$scope.sourceSifatSurat = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=StatusBerkas&select=id,name").then(function(dat){
				$scope.sourceStatusBerkas = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=JenisSurat&select=id,name").then(function(dat){
				$scope.sourceJenisSurat = dat;
			});
			FindSarpras.getSarpras("user/get-all-user/").then(function(dat){
				$scope.sourceNamaPengirim = dat.data.data.data;
			});

			$scope.Save = function(){
				
            	var data = {
            		"perihalSurat": $scope.item.perihalSurat,
            		"tipePengirimSurat": $scope.item.tipePengirimSurat,
            		"namaPengantar": $scope.item.namaPengantar,
            		"jamDiterima": $scope.item.jamDiterima,
            		"jamDiserahkan" : $scope.item.jamDiserahkan,
            		"statusBerkas" : $scope.item.statusBerkas,
            		"statusDiterima": $scope.item.statusDiterima,
            		"tanggalSuratDiserahkan" : $scope.item.tanggalSuratDiserahkan,
            		"namaPenerima" : $scope.item.namaPenerima
            		// "UploadFile": $scope.item.uploadFile

            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"/pengantar-surat/save-pengantar-surat/").then(function(e) {
            		$scope.item = {};
            	});
			};
		}
	]);
});