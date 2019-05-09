define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JadwalSeleksiPrakualifikasiCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;

			// 	$scope.item.pengadaan = "LELANG";
			// 	$scope.item.noUsulan = "016000100c";
			// 	$scope.item.tanggal = "2016-9-27";
			// 	$scope.item.total = "121000";
			// 	$scope.item.jumlah = 21;
				

			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.dats = {};
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
		        data: [],
		        editable: "inline"
		    });

		    ManageSarpras.getDataJadwal($state.params.noRec).then(function(data){
				$scope.items = data.data.kartuPengendaliHeader;

				$scope.items.total = $scope.items.total.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				$scope.items.totalPpn = $scope.items.ppn.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				$scope.items.totalPembulatan = $scope.items.totalPembulatan.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				$scope.items.tanggal = DateHelper.getTanggalFormatted(new Date($scope.items.tanggal));

				$scope.dataDetail = data.data.jadwal;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;
					spek.tanggalMulai = new Date();
					spek.tanggalSelesai = new Date();
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}

					$scope.dataSource.add(spek);
					i++;
				});

				// init();
			});

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        schema: {
		        	model: {
		        		id: "noRec",
		        		field: {
			        		noRec: {editable: false},
			        		no: {editable: false},
			        		keterangan: {editable: false}
		        		}
		        	}
		        },
		        pageable: false,
		  //       toolbar: ["create"],
		  //       editable: {
				//     mode: "popup",
				//     template: kendo.template($("#popup-editor").html())
				// },
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 50,
						// attributes: {
						// 	style: "text-align:center"
						// }
					},
					{
						field: "name",
						title: "Tahap",
						width: 300,
						editable: false
					},
					{
						field: "tanggalMulai",
						title: "Mulai",
						format: "{0: yyyy-MM-dd}",
						width: 150,
						template: "<input style=\"width: 100%\" kendo-date-picker k-ng-model=\"dataItem.tanggalMulai\" placeholer=\"{{item.now}}\" k-on-change=\"update(data, columns, dataItem)\" />"
					},
					{
						field: "tanggalSelesai",
						title: "Selesai",
						format: "{0: yyyy-MM-dd}",
						width: 150,
						template: "<input style=\"width: 100%\" kendo-date-picker k-ng-model=\"dataItem.tanggalSelesai\" placeholer=\"{{item.now}}\" k-format=\"'dd-MM-yyyy'\"/>"
					},
					{
						field: "keterangan",
						title: "Keterangan",
						width: 400,
						// template: "<textarea k-ng-model=\"dataItem.keterangan\" filter=\"varchar\" rows=\"4\" cols=\"10\" k-on-change=\"update(data, dataItem, columns)\"></textarea>",
					} //,
					// {
					// 	field: "status",
					// 	title: "<h3 align=center>status</h3>",
					// 	type: "string",
					// 	width: "150px"
					// 	//"template": "<input kendo-drop-down-list k-ng-model=\"dataItem.status\" k-data-text-field=\"''\" k-data-value-field=\"''\" k-data-source=\"listStatus\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
					// },
					// {
					// 	command: ["edit", "destroy"],
					// 	title: "&nbsp;",
					// 	width: "150px"
					// }
				]
	      	};

            $scope.update = function(data, dataItem, columns) {
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
            };

            $scope.simpan = function(){
            	var arrJadwalSeleksi = [];

            	$scope.dataSource._data.forEach(function(data){

            		var listJadwal = {
            			"tanggalMulai" : DateHelper.getPeriodeFormatted(new Date(data.tanggalMulai)),
            			"tanggalSelesai": DateHelper.getPeriodeFormatted(new Date(data.tanggalSelesai)),
            			"noRec" : data.noRec.noRec,
            			"keterangan" : data.keterangan
            		}

            		arrJadwalSeleksi.push(listJadwal);
            	});

            	$scope.dats.listJadwal = arrJadwalSeleksi;

            	ManageSarpras.saveDataSarPras($scope.dats, "kartu-pengendali/update-jadwal/").then(function(e){
					console.log(JSON.stringify(e));
				});
            }
		}
	]);
});