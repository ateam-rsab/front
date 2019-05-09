define(['initialize'], function(initialize) { 
	'use strict';
	initialize.controller('PenyusunanRUPCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', 'dataRupService',
		function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, dataRupService){
			$scope.item = {};
			$scope.now = new Date();
			$scope.messages = {};
			// $scope.dataItem = {};

			ManageSarpras.getDataSpek($state.params.noRec).then(function(data){
				$scope.spek = data.data.data;

				var i = 1;
				$scope.spek.forEach(function(spek){
					spek.tanggalPengajuan = DateHelper.getTanggalFormatted(new Date(spek.tanggalPengajuan));
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}
					spek.no = i;
					i++;
				})

				$scope.dataSpek = new kendo.data.DataSource({
					data: $scope.spek,
					editable: true
				});
			});

			dataRupService.getData("Pengadaan&select=*", true).then(function(dat){
				$scope.listPengadaan = dat.data;
			});

			// $scope.item.pengadaan = [];

			// $scope.pengadaanArray = function() {

			// 	console.log('list item.pengadaan : ' + $scope.item.pengadaan);
			// };

			$scope.columnPenyusunanRUP = [
				{
					"title": "No",
					"template": "#=no#",
					width: "50px"
				},
				{
					"title": "Tanggal Pengajuan",
					"template": "#=tanggalPengajuan#",
					width: "150px"
				},
				{
					"title": "Nama Paket Pengadaan",
					"template": "#=spesifikasi#",
					width: "300px"
				},
				{
					"title": "Output",
					"template": "#=output#",
					width: "150px"
				},
				{
					"title": "Komponen",
					"template": "#=namaKomponen#",
					width: "150px"
				},
				{
					"title": "Sumber Dana",
					"template": "#=sumberDana#",
					width: "200px"
				},
				{
					"title": "Item",
					"template": "#=namaProduk#",
					width: "300px"
				},
				{

					"title": "Total Harga",
					"format": "{0:n0}",
					"template": "<div class=\"pull-right\">#=kendo.toString(jumlahBiaya, \"n0\")#</div>",
					width: "100px"
				},
			];

		    $scope.notf1Options = {
	            position: {
	                pinned: true,
	            	top: 30,
	                right: 30
	            },
	            autoHideAfter: 0,
	            stacking: "down",
	            templates: [{
	                type: "ngTemplate",
	                template: $("#notificationTemplate").html()
	            }]
	        }

	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Peringatan",
	                message: $scope.messages
	            }, "ngTemplate");
	        }
			$scope.Save = function(){
				var listRawRequired = [
                    "item.pengadaan|ng-model|Metode Pengadaan",
                    "item.awalPemilihan|k-ng-model|Tanggal Pemilihan Awal",
                    "item.akhirPemilihan|k-ng-model|Tanggal Pemilihan Akhir",
                    "item.awalPekerjaan|k-ng-model|Tanggal Pelaksanaan Awal",
                    "item.akhirPekerjaan|k-ng-model|Tanggal Pelaksanaan Akhir"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
					var tempSpek = [];
					var tempPengadaan= [];

					// Fungsi untuk pilih detil produk terlebih dahulu sebelum proses penyusunan RUP
					$scope.dataSpek._view.forEach(function(data){
			    		// var temp = {
			    		// 	"noRec": data.noRec
			    		// }
			    		tempSpek.push(data.noRec)
			    	})
					
					var elemenPengadaan = $scope.item.pengadaan;
					var obj = {
						"pengadaan": elemenPengadaan
					}
					tempPengadaan.push(obj);

					var tempMessageValidasi = [];
					if ($scope.item.akhirPemilihan < $scope.item.awalPemilihan) {
						tempMessageValidasi.push('<b>waktu pemilihan akhir</b> tidak sesuai');
					}
					if ($scope.item.awalPekerjaan <= $scope.item.akhirPemilihan) {
						tempMessageValidasi.push('<b>waktu pelaksanaan awal</b> tidak sesuai');
					}
					if ($scope.item.akhirPekerjaan < $scope.item.awalPekerjaan) {
						tempMessageValidasi.push('<b>waktu pelaksanaan akhir</b> tidak sesuai');
					}

					if (tempMessageValidasi.length > 0) {
						tempMessageValidasi.forEach(function(tempData){
							$scope.messages = tempData;
	    					$scope.showPopup();
						})

					} else {
						var data = {
							"detailSpekAnggaran": tempSpek,
							"detailPengadaan": tempPengadaan,
							"pelaksanaanPemilihanAwal": DateHelper.getPeriodeFormatted(new Date($scope.item.awalPemilihan)),
							"pelaksanaanPemilihanAhir": DateHelper.getPeriodeFormatted(new Date($scope.item.akhirPemilihan)),
							"keterangan": $scope.item.keterangan,
							"pelaksanaanPekerjaanAwal": DateHelper.getPeriodeFormatted(new Date($scope.item.awalPekerjaan)),
							"pelaksanaanPekerjaanAhir": DateHelper.getPeriodeFormatted(new Date($scope.item.akhirPekerjaan)),
						}

						// console.log(JSON.stringify(data));
						ManageSarpras.saveDataSarPras(data, "detail-rup/save-detail-rup").then(function(e){
							console.log(JSON.stringify(e.data));
						});

						setTimeout(function(){history.back();}, 5000);
					}
				} else {
                    ModelItem.showMessages(isValid.messages);
                }
			}

			$scope.batal = function() {
			  	window.history.back();
			}
		}
	]);
});