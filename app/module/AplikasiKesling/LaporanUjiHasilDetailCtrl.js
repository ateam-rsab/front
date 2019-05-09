define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanUjiHasilDetailCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','TampilDataNeraca','TampilPerlakuan','TampilPerizinan','ManageSarpras',
		function($rootScope, $scope, $state, ModelItem, DateHelper,TampilDataNeraca,TampilPerlakuan,TampilPerizinan,ManageSarpras) {
			ModelItem.get("Kesling/NeracaLimbah").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.qtyproduk8 = 0;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});		
		   
			$scope.item = {};
			$scope.items = {};

			$scope.item.noRec = $state.params.noRec;
			ManageSarpras.getOrderList("laporan-uji-hasil/laporan-uji-hasil-detail?noRec=" + $scope.item.noRec).then(function(dat){
				$scope.items = dat.data.laporanUjihasilDetail;
				$scope.item = dat.data.laporanUjiHasil;
				// debugger;

				var dateStarted = new Date($scope.item.tanggalPengujianContohFrom);
				$scope.item.tanggalpengujiandari = DateHelper.getTanggalFormatted(dateStarted);

				var dateEnded = new Date($scope.item.tanggalPengujianContohTo);
				$scope.item.tanggalpengujiansampai = DateHelper.getTanggalFormatted(dateEnded);

				var dateSS = new Date($scope.item.tanggalPenerimaanContoh);
				$scope.item.tanggalditerimalab = DateHelper.getTanggalFormatted(dateSS);

				// debugger;
				var i = 1;
				$scope.items.forEach(function(data){
					data.no = i;
					$scope.sourceOrder.add(data);
					// debugger;
					i++;
				});

			});
			
			$scope.gridOptions = {
				editable: false,
				columns: [
					{
						"field": "no",
						"title":  "Nomor",
						width: "60px",
						template: "<center>#=no#</center>"
					},
					{
						"field": "bakuMutu",
						"title":  "Baku Mutu"
					},
					{
						"field": "parameter",
						"title": "Parameter"
					},
					{
						"field": "satuanStandar",
						"title": "Satuan Standar"
					},
					{
						"field": "hasilUji",
						"title": "Hasil Uji"
					}
				]
			}
				
			$scope.sourceOrder = new kendo.data.DataSource({
				data: []
			});
		}
	]);
});