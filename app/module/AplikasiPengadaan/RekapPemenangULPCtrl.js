define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapPemenangULPCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService, ManageSarpras) {
			ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.dataSource = new kendo.data.DataSource({
		        data: []
		    });

			ManageSarpras.getDetailPemenang($state.params.noRec).then(function(data){
				$scope.items = data.data.kartuPengendali;
				$scope.dataDetail = data.data.supplier;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;
					spek.tanggal = DateHelper.getTanggalFormatted(new Date(spek.tanggal));
					// spek.noRec = {
					// 	"noRec": spek.noRec,
					// 	"kdProfile": spek.kdProfile
					// }

					$scope.dataSource.add(spek);
					i++;
				});
			});
		    /*data: [
		        	{"no": "1", "namaPemenang": "PT IGM", "nilaiPenetapan": "Nilai Penetapan Pemenang"},
		        	{"no": "2", "namaPemenang": "PT BUANALINTAS", "nilaiPenetapan": "Nilai Penetapan Pemenang"},
		        	{"no": "3", "namaPemenang": "PT CAKRA KEMBAR", "nilaiPenetapan": "Nilai Penetapan Pemenang"},
		        	{"no": "4", "namaPemenang": "PT LINTAS BUANA", "nilaiPenetapan": "Nilai Penetapan Pemenang"},
		        	{"no": "5", "namaPemenang": "PT BIRU", "nilaiPenetapan": "Nilai Penetapan Pemenang"},
		        	{"no": "6", "namaPemenang": "PT SAMUDERA", "nilaiPenetapan": "Nilai Penetapan Pemenang"},
		        	{"no": "7", "namaPemenang": "PT IGM", "nilaiPenetapan": "Nilai Penetapan Pemenang"}
		        ],
		    */

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        pageable: true,
		        selectable: "row",
		        columns: [
		          	{
						field: "no",
						title: "<h3 align=center>No</h3>",
						width: 30
					},
					{
						field: "namaRekanan",
						title: "<h3 align=center>Nama Pemenang</h3>",
						width: 180,
						type: "string"
					},
					{
						field: "hargaString",
						title: "<h3 align=center>Nilai Penetapan</h3>",
						width: 180,
						//template: "<input style=\"width: 100%\" kendo-date-time-picker k-ng-model=\"item.tanggalAwal\" placeholer=\"{{item.now}}\"/>"
					}
					// {
					// 	title: "&nbsp;",
					// 	width: "75px",
					// 	command: {
					// 		name: "edit",
					// 		text: "Lihat Detil Barang"
					// 	}
					// }
				]
	      	};

	      	$scope.kl = function(current) {
	      		$scope.current = current;
	      		console.log(current)
	      	}

			$scope.navToDetailPemenang = function(){
				$state.go('RekapPemenangULPDetail', {
	                noRec: $scope.current.kartuPengendaliId,
	                supplierId: $scope.current.supplierId
	            });

	            debugger;
			}


		}
	]);
});