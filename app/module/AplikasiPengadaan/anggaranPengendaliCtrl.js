define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('anggaranPengendaliCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','DataAnggaran','TampilDataAnggaran','ManageSarpras',
        function($rootScope, $scope, $state, ModelItem, DateHelper, DataAnggaran, TampilDataAnggaran, ManageSarpras) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.item.tanggalPengajuanAwal;
		$scope.item.tanggalPengajuanAhir;
		$scope.messages = {};

		DataAnggaran.getOrderList("service/list-generic/?view=Pengendali&select=*", true).then(function(dat){
			$scope.ListDataAnggaran = dat;
		});

		var init = function() {

			DataAnggaran.getOrderList("anggaran/get-pengendali", true).then(function(dat){
				$scope.item.pengendali = dat.data.data;
			});
			TampilDataAnggaran.getOrderList("anggaran/grid-detail-anggaran/?gridFor=pengendali").then(function(dat){
				$scope.sourceOrder = dat.data.data;

				$scope.sourceOrder.forEach(function(data){
					var date = new Date(data.tanggalPengajuan);
					data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date);

					data.jumlahBiaya = data.hargaSatuan * data.volume;
				})
			});
		}
		
		init();
		
		$scope.arrPengadaan = new kendo.data.DataSource({
			data: [],
            pageSize: 10,
            serverPaging: true,
            serverSorting: true,
            sort: { field: 'jumlahBiaya', dir: 'asc' },
            serverFiltering: true,
		    sortable: true,
		    autoSync: true,
            schema: {
              model: {
                id: "noRec",
                fields: {
                  kegiatan: { editable: false, type: "string", validation: { required: true} },
                  kegiatanDetail: { editable: false, type: "string", validation: { required: true} },
                  spesifikasi: { editable: false, type: "string", validation: { required: true} },
                  namaProduk: { editable: false, type: "string", validation: { required: true} },
                  isVerifikasi: { editable: false, type: "string", validation: { required: true} },
                  tahunAnggaran: { editable: false, type: "number", validation: { required: true} },
                  tanggalPengajuan: { editable: false, type: "date", validation: { required: true} },
                  namaSatuan: { editable: false, type: "string", validation: { required: true} },
                  volume: { type: "number", validation: { required: true, min: 1} },
                  hargaSatuan: { type: "number", validation: { required: true, min: 1} },
                  jumlahBiaya: { type: "number", validation: { required: true, min: 1} },
                  sumberDana: { editable: false, type: "string", validation: { required: true} },
                  statusCode: { editable: false, type: "string", validation: { required: true} },
                }
              }
            }
		})
		$scope.mainGridOptions = {
		    pageable: true,
		    columns:[
				{
					"field": "kegiatan",
					"title": "Kegiatan",
					"width": "400px"
				}, {
					"field": "kegiatanDetail",
					"title": "Detil Kegiatan",
					"width": "300px"
				}, {
					"field": "spesifikasi",
					"title": "Nama Paket Pengadaan",
					"width": "200px"
				}, {
					"field": "namaProduk",
					"title": "Nama Produk",
					"width": "250px"	
				}, {
					"field": "tahunAnggaran",
					"title": "Tahun Anggaran",
					"width": "100px"

				}, {
					"field": "tanggalPengajuan",
					"title": "Tanggal Pengajuan",
					"width": "100px"		
		        },{
					"field": "namaSatuan",
					"title": "Satuan",
					"width": "100px",
				}, {
					"title": "Perhitungan per Tahun",
					"columns": [{
						"field": "volume",
						"title": "Volume",
						"width": "100px",
					    attributes: {
					      "class": "table-cell",
					      style: "text-align: right"
					    },
					    type: "number",
						format: "{0:n0}"
			        }, {
						"field": "hargaSatuan",
						"title": "Harga Satuan",
						"width": "100px",
					    attributes: {
					      "class": "table-cell",
					      style: "text-align: right"
					    },
					    type: "number",
						format: "{0:n0}",						
					}, {
						"field": "jumlahBiaya",
						"title": "Jumlah Biaya",
						"width": "100px",
					    attributes: {
					      "class": "table-cell",
					      style: "text-align: right"
					    },
					    type: "number",
						format: "{0:n0}",					
					}]
				}, {
					"field": "sumberDana",
					"title": "Sumber Dana",
					"width": "200px"	
		        }, {
					"field": "isVerifikasi",
					"title": "Status",
					"width": "200px",
		        }
		    ]
		};
	
		$scope.batal = function() {
			$scope.item= {};
		}
	
		$scope.cari = function() {

			var awal, akhir, tahun, pengendali;
			if ($scope.item.tanggalPengajuanAwal !== undefined) {
				var formatAwal = DateHelper.getPeriodeFormatted($scope.item.tanggalPengajuanAwal);
				awal = "&dateStart="+formatAwal
			} else {
				awal = "&dateStart="
			}

			if ($scope.item.tanggalPengajuanAwal !== undefined) {
				var formatAhir = DateHelper.getPeriodeFormatted($scope.item.tanggalPengajuanAhir);
				akhir = "&dateEnd="+formatAhir
			} else {
				akhir = "&dateEnd="
			}

			if ($scope.item.pengendali !== undefined) {
				pengendali = "&pengendaliId="+$scope.item.pengendali.id
			} else {
				pengendali = "&pengendaliId="
			}

			if ($scope.item.tahun !== undefined) {
				tahun= "&tahun="+$scope.item.tahun
			} else {
				tahun = "&tahun="
			}
			debugger;

			TampilDataAnggaran.getOrderList("anggaran/grid-detail-anggaran?gridFor=pengendali&"+tahun+pengendali+awal+akhir).then(function(dat){
				$scope.sourceOrder = dat.data.data;

				$scope.sourceOrder.forEach(function(data){
					var date = new Date(data.tanggalPengajuan);
					data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date);

					data.jumlahBiaya = data.hargaSatuan * data.volume;
				})
			});	
		}
		
		$scope.kl = function(current){
			$scope.current = current;
			console.log(current);
		}

		$scope.tempVerifikasi = [];

		$scope.handleChange = function(data, dataItem, columns) {
	      	$scope.data = data;
	      	$scope.columns = columns;
	      	$scope.dataItem = dataItem;
	    };

	    $scope.notf1Options = {
            position: {
                pinned: true,
            	top: 30,
                right: 30
            },
            autoHideAfter: 3000,
            stacking: "down",
            templates: [{
                type: "ngTemplate",
                template: $("#notificationTemplate").html()
            }]
        };

        $scope.showPopup = function () {
            $scope.notf1.show({
                title: "Informasi",
                message: $scope.messages
            }, "ngTemplate");
        }

	    $scope.verifikasiBaru = function(data) {
	    	var arrVerifikasi = [];

	    	$scope.data.forEach(function(data){
	    		if (data.keterangan === undefined) {
	    			data.keterangan = "-";
	    		}

	    		if (data.isVerifikasi == "PENGAJUAN" || data.isVerifikasi == "UNVERIFIKASI_PENGENDALI") {

					var temp = {
		    			"noRec": data.noRec,
		    			"keterangan": data.keterangan,
		    			"isVerifikasi": data.isVerifikasi
		    		}

	    			arrVerifikasi.push(temp)

	    		} else {
	    			$scope.messages = "Data sudah di verifikasi!";
	    			$scope.showPopup();
	    		}
	    	})

	    	if (arrVerifikasi.length > 0) {

		    	var data = {
					"detailSpekAnggaran": arrVerifikasi
				}

				ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
					// console.log(JSON.stringify(e.data));
					// debugger;

	    			init();
				})
	    	}
	    }
	    
		$scope.clear = function(){
			$scope.item = {};
			init();
		}

	    $scope.unverifikasiBaru = function(data) {
	    	var arrVerifikasi = [];

	    	$scope.data.forEach(function(data){
	    		if (data.keterangan === undefined) {
	    			data.keterangan = "";
	    		}

	    		if (data.isVerifikasi !== "UNVERIFIKASI_PENGENDALI") {

					var temp = {
		    			"noRec": data.noRec,
		    			"keterangan": data.keterangan
		    		}

		    		arrVerifikasi.push(temp)

	    		} else {
	    			$scope.messages = "Data sudah di Unverifikasi!";
	    			$scope.showPopup();
	    		}
	    		// console.log(JSON.stringify(arrVerifikasi));
	    		// debugger;
	    	})

	    	if (arrVerifikasi.length > 0) {

	    		var data = {
					"detailSpekAnggaran": arrVerifikasi
				}
				// console.log(JSON.stringify(data));

				ManageSarpras.saveDataSarPras(data, "anggaran/save-un-verifikasi-spek-anggaran").then(function(e){
					// console.log(JSON.stringify(e.data));

		    		init();
				})
	    	}
	    }
	    $scope.edit = function() {
			window.messageContainer.error("Fitur belum tersedia");
		}
		// $scope.Save = function() {};
		}
	]);
});