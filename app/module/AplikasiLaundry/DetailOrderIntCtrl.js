define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailOrderIntCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras','$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, FindSarpras, $state) {
			$scope.item = {};
			ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.addBahanLinen = function() {
				var tempDataBahan = [
					{
						"bahan" : $scope.sourceBahan,
						"jumlah" : $scope.sourceBahan,
						"satuan" : $scope.sourceBahan
					}
				];
				$scope.dataBahan=tempDataBahan;
			}

			$scope.Batal = function(){
				$scope.item.jumlahCycle="";
			}

			$scope.kembali = function(){
				$state.go('DaftarPemesananLaundry')
			}

			$scope.daftarDetailOrder = new kendo.data.DataSource({
			data: [
					{
						"namaLinen": "Popok",
						"jumlahOrder": 3,
						"satuanOrder": "Buah",
						"jumlahKirim": 3,
						"satuanKirim": "Buah",
						"petugas":"admins"
					},{
						"namaLinen": "Handuk",
						"jumlahOrder": 2,
						"satuanOrder": "Buah",
						"jumlahKirim": 1,
						"satuanKirim": "Buah",
						"petugas":"admins"
					}
				]
			});
			$scope.columndaftarDetailOrder = [{
				"field": "namaLinen",
				"title": "<h3 align=center>Nama Linen</h3>",
				"width": "200px"
			}, {
				"field": "jumlahOrder",
				"title": "<h3 align=center>Jumlah Order</h3>",
				"width": "100px"
			},{
				"field": "satuanOrder",
				"title": "<h3 align=center>Satuan Order</h3>",
				"width": "100px"
			}, {
				"field": "jumlahKirim",
				"title": "<h3 align=center>Jumlah Kirim</h3>",
				"width": "100px",
				"editable": "true"
			},{
				"field": "satuanKirim",
				"title": "<h3 align=center>Satuan Kirim</h3>",
				"width": "100px"
			},{
				"field": "petugas",
				"title": "<h3 align=center>Petugas</h3>",
				"width": "200px"
		    }];

		}
		]);
});


/*================================================= OLD SOURCE CODE ===========================================================*/
/*$scope.Kirim = function(){
if($scope.item.noOrder == undefined){
toastr.error('Data Belum dipilih !!!')
}else{

}
}*/