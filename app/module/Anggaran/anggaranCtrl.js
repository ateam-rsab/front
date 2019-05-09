define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('AnggaranCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','DataAnggaran','TampilDataAnggaran','ManageSarpras',
        function($rootScope, $scope, $state, ModelItem, DateHelper, DataAnggaran, TampilDataAnggaran, ManageSarpras) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.item.tanggalPengajuanAwal;
		$scope.item.tanggalPengajuanAhir;
		$scope.dataPasienSelected = {};
		DataAnggaran.getOrderList("service/list-generic/?view=Pengendali&select=*", true).then(function(dat){
			$scope.ListDataAnggaran = dat;
		});

		var init = function () {
			TampilDataAnggaran.getOrderList("anggaran/daftar-detail-anggaran").then(function(dat){
				debugger;
				$scope.sourceOrder = dat.data.data;

				$scope.sourceOrder.forEach(function(data){
					var date = new Date(data.tanggalPengajuan);
					data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date);

					data.jumlahBiaya = data.hargaSatuan * data.volume;
					$scope.arrPengadaan.add(data);
				})
			});
		}
		init();

		$scope.arrPengadaan = new kendo.data.DataSource({
			data: [],
            pageSize: 20,
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
		    sortable: true,
		    autoSync: true,
            schema: {
              model: {
                id: "noRec",
                fields: {
					noRec: { editable: false, validation: { required: true} },
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
            // editable: {
            // 	mode: "popup",
            // 	template: kendo.template($("template").html())
            // }
		})
		
		$scope.mainGridOptions = {
		    pageable: true,
		    // rowTemplate: '<tr data-uid="#: uid #" ng-class="{approved: \'#:isVerifikasi#\' ==\'VERIFIKASI_PENGENDALI\', unapproved: \'#:isVerifikasi#\' ==\'UNVERIFIKASI_PENGENDALI\'}"><td>#:kegiatan #</td><td>#:kegiatanDetail #</td><td>#:spesifikasi #</td><td>#:namaProduk #</td><td>#:tahunAnggaran #</td><td>#:tanggalPengajuan #</td><td>#:namaSatuan #</td><td>#:volume #</td><td>#:hargaSatuan #</td><td>#:jumlahBiaya #</td><td>#:sumberDana #</td><td>#:isVerifikasi #</td></tr>',
		    // toolbar: ["create"],
		    editable: {
				mode: "popup",
				template: kendo.template($("#popup-editor").html())
			},
		    columns:[
		    	{
		    		"field": "noRec",
		    		"title": " ",
		    		hidden: true
		    	},
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
					"width": "300px"
				}, {
					"field": "namaProduk",
					"title": "Nama Produk",
					"width": "250px"	
				}, {
					"field": "namaSatuan",
					"title": "Satuan",
					"width": "100px",
				}, {
					"field": "tahunAnggaran",
					"title": "Tahun Anggaran",
					"width": "100px"

				}, {
					"field": "tanggalPengajuan",
					"title": "Tanggal Pengajuan",
					"width": "100px"		
		        },{
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
					      style: "text-align: right;"
					    },
					    type: "number",
						format: "{0:n0}"						
					}, {
						"field": "jumlahBiaya",
						"title": "Jumlah Biaya",
						"width": "100px",
					    attributes: {
					      "class": "table-cell",
					      style: "text-align: right"
					    },
					    type: "number",
						format: "{0:n0}"					
					}]
				}, {
					"field": "sumberDana",
					"title": "Sumber Dana",
					"width": "200px"	
		        }, {
					"field": "isVerifikasi",
					"title": "Status",
					"width": "200px",
					// "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.statusCode\" k-data-text-field=\"'name'\" k-data-value-field=\"'id'\" k-data-source=\"listStatus\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
		        }
		        /*,
                { 	"command": { text: "Edit", click: showDetails }, title: " ", width: "180px" }*/
                //,
		        // { command: ["edit"], title: " ", width: "82px" }
		    ]
		};
		function showDetails(e) {
                    e.preventDefault();
                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                    /*wnd.content(detailsTemplate(dataItem));
                    wnd.center().open();*/
                    function_name(dataItem);
                }
            function function_name(argument) {
            	$state.go('PengajuanUsulanAnggaranEdit', {
                        noRec: argument.noRec
                    });
            		/*window.open('#/PengajuanUsulanAnggaran/:noRec');*/
            	/*$state.go('dashboardpasien.Integumen');*/
            	
            }
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

			TampilDataAnggaran.getOrderList("anggaran/grid-detail-anggaran/?gridFor=ruangan"+tahun+pengendali+awal+akhir).then(function(dat){
				$scope.sourceOrder = dat.data.data;

				$scope.arrPengadaan = new kendo.data.DataSource({
					data: []
				})

				$scope.sourceOrder.forEach(function(data){
					var date = new Date(data.tanggalPengajuan);
					data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date);
					data.jumlahBiaya = data.hargaSatuan * data.volume;
					$scope.arrPengadaan.add(data);
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

	      	// console.log(data);
	      	// debugger;
	    };

	 //    $scope.Save = function(){
		// 	var temp = [];
		// 	$scope.dataSpek._view.forEach(function(data){
		// 		temp.push(data.noRec);
		// 	});
		// 	var data = {
		// 		"detailSpekAnggaran": temp
		// 	}
		// 		console.log(JSON.stringify(data));

		// 	ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
		// 		console.log(JSON.stringify(e.data));
		// 	})

		// }

	    $scope.verifikasiBaru = function(data) {
	    	var arrVerifikasi = [];

	    	$scope.data.forEach(function(data){
	    		if (data.keterangan === undefined) {
	    			data.keterangan = "";
	    		}

	    		var temp = {
	    			"noRec": data.noRec,
	    			"keterangan": data.keterangan
	    		}

	    		arrVerifikasi.push(temp)
	    		console.log(JSON.stringify(arrVerifikasi));
	    		debugger;
	    	})

	    	var data = {
				"detailSpekAnggaran": arrVerifikasi
			}
				console.log(JSON.stringify(data));

			ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// console.log(JSON.stringify(e.data));
				$scope.sourceOrder.read();
				$scope.sourceOrder.sync();
			})
	    }

	    // navigasi ke halaman verifikasi (sudah direvisi dan tidak digunakan lagi)
		// $scope.NavToVerifikasi = function() {
		// 	if ($scope.item.filters.kd == "noRec") 
  //           $state.go('VerifikasiPengajuanAnggaran', {
  //               noRec: $scope.current.noRec,
  //               filter: $scope.item.filters.kd
  //           });

  //       	if ($scope.item.filters.kd == "detail") 
  //           $state.go('VerifikasiPengajuanAnggaran', {
  //               noRec: $scope.current.noRecDetail,
  //               filter: $scope.item.filters.kd
  //           });

  //       	if ($scope.item.filters.kd == "spek") 
  //           $state.go('VerifikasiPengajuanAnggaran', {
  //               noRec: $scope.current.noRecSpek,
  //               filter: $scope.item.filters.kd
  //           });

  //       	if ($scope.item.filters.kd == "kegiatan") 
  //           $state.go('VerifikasiPengajuanAnggaran', {
  //               noRec: $scope.current.noRecKegiatan,
  //               filter: $scope.item.filters.kd
  //           });
  //           //debugger;
  //       };

		$scope.clear = function(){
			$scope.item = {};
			init();
		}
		//http://localhost:9090/jasamedika-web/informasi-tarif-layanan/get-harga-netto-by-nama-produk?namaProduk="....."
		$scope.edit = function() {
			debugger;
			$state.go('PengajuanUsulanAnggaranEdit', {
                        noRec: $scope.dataPasienSelected.noRecSpekParent
                    });
			/*window.messageContainer.error("Fitur belum tersedia");*/
		 //    var arrDataRup = [];

		 //    $scope.data.forEach(function(data){
		 //    	// var temp = {
		 //    	// 	"noRec": data.noRec
		 //    	// }

		 //    	arrDataRup.push(data.noRecSpek)
		 //    	console.log(JSON.stringify(arrDataRup));
		 //    		// debugger;
		 //    })

			// $state.go('EditPengajuan', {
	  //           noRec: arrDataRup
	  //       });

	            // debugger;

				// ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// 	console.log(JSON.stringify(e.data));
				// })
		}

		}
	]);
});