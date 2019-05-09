define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('VerifikasiPengajuanAnggaranCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state',
		function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.item = {};
			ManageSarpras.getDataSpek($state.params.filter, $state.params.noRec).then(function(data){
			//ManageSarpras.getDataSpek($state.params.noRec).then(function(data){
				$scope.spek = data.data.data.kegiatanAnggaran;
				$scope.dataSpe = data.data.data.detailSpekAnggaran
				$scope.dataSpe.forEach(function(spek){
					spek.detailAnggaran.tanggalPengajuan = DateHelper.getTanggalFormatted(new Date(spek.detailAnggaran.tanggalPengajuan));
					spek.noRec = {
						"noRec": spek.noRec,
						"keterangan": spek.keterangan
					}
				})
				//debugger;

				$scope.dataSpek = new kendo.data.DataSource({
					data: $scope.dataSpe,
					editable: true
				});
				// $scope.dataSpek = new kendo.data.DataSource({
				// 	data: temp,
				// 	editable: true
				// })
				// debugger;
			})

			$scope.columnSpek = [
				{
					"template": '<input type="checkbox" ng-click="cek(dataItem.noRec.noRec)"/>',
					width: "50px"
				},
				{
					"title": "Verifikasi",
					"template": "#=isVerifikasi#",
					width: "200px"
				},
				{
					"title": "Tanggal",
					"template": "#=detailAnggaran.tanggalPengajuan#",
					width: "150px"
				},
				{
					"title": "Output",
					"template": "#=detailAnggaran.kegiatanAnggaran.output.namaOutput#",
					width: "150px"
				},
				{
					"title": "Komponen",
					"template": "#=detailAnggaran.komponen.namaKomponen#",
					width: "150px"
				},
				{
					"title": "Akun",
					"template": "#=detailAnggaran.akun.namaAccount#",
					width: "200px"
				},
				{
					"title": "Sumber Dana",
					"template": "#=detailAnggaran.asalProduk.asalProduk#",
					width: "150px"
				},
				{
					"title": "Detail",
					"template": "#=spesifikasi#",
					width: "150px"
				},
				{
					"title": "Spesifikasi",
					"template": "#=produk.namaProduk#",
					width: "200px"
				},
				{
					"title": "Keterangan",
					"field": "noRec.keterangan",
					width: "200px"
				}
			];

			$scope.cek = function(rec){
				$scope.dataSpek._view.forEach(function(data){
					if(data.noRec.noRec == rec) 
					if(data.noRec.isVerifikasi){
						data.noRec.isVerifikasi = false;
						return;
					} else {
						data.noRec.isVerifikasi = true;
						return;
					}
					debugger;
				})
				// var idx = _.indexOf(_.pluck($scope.dataSpek, "noRec"), id);
				// if($scope.dataSpek[idx].noRec.isVerifikasi)
				// 	$scope.dataSpek[idx].noRec.isVerifikasi = false;
				// else $scope.dataSpek[idx].noRec.isVerifikasi = true;
				// console.log(JSON.stringify(idx));
				// console.log(JSON.stringify(_.pluck($scope.dataSpek, "noRec")));
				
			}

			$scope.Save = function(){
				var temp = [];
				$scope.dataSpek._view.forEach(function(data){
					temp.push(data.noRec);
				});
				var data = {
					"detailSpekAnggaran": temp
				}
					console.log(JSON.stringify(data));

				ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
					console.log(JSON.stringify(e.data));
				})

			}

	}])
})