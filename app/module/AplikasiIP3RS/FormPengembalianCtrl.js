define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormPengembalianCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state',
		function($rootScope, $scope, ModelItem, IPSRSService, $state) {
			ModelItem.get("IPSRS/FormPengembalian").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.disdataAlat = true;
				debugger
				$scope.item.noPeminjaman=$state.params.noPeminjaman;
				$scope.item.peminjam=$state.params.peminjam;
				$scope.item.tglPeminjamanNew=$state.params.tglPeminjamanNew;
				$scope.item.ruangan= $state.params.ruangan;
				$scope.item.petugas=$state.params.petugas;
				$scope.item.namaProduk=$state.params.namaProduk;
				$scope.item.jumlah=$state.params.jumlah;
				$scope.item.tglPengembalianNew=$state.params.tglPengembalianNew;

				IPSRSService.getItem("ipsrs-peminjaman-alat/get-petugas-peminjaman-alat", true).then(function(dat){
					debugger;
					$scope.listPegawai = dat.data.data.listTeknisi;
				});
				$scope.item.tglPengembalian = new Date();
				$scope.listKondisiBarang = [
				{"id":0, "name":"Kondisi Baik"},
				{"id":1, "name":"Kondisi Rusak"},
				{"id":2, "name":"Barang Hilang"}
				]
				$scope.simpan=function()
				{
					var data = {
						"noRec": $state.params.noRec,
						"status": "Dikembalikan"
					}
	                IPSRSService.saveDataSarPras(data,"ipsrs-peminjaman-alat/update-status-peminjaman").then(function(e) {
						console.log(JSON.stringify(e.data));
	                });
	                $state.go("DaftarPeminjamanAlat");
				};
			}, function errorCallBack(err) {});
		}
	]);
});