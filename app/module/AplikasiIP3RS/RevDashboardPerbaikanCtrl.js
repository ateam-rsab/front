define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RevDashboardPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'DateHelper', '$state', '$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.listRuangan = ModelItem.kendoHttpSource('service/list-generic/?view=Ruangan&select=namaRuangan,id', true);
			$scope.listAlat = ModelItem.kendoHttpSource('service/list-generic/?view=Produk&select=namaProduk,id', true);
			
			$scope.init = function () {
				debugger
				$scope.now = new Date();
				var Triwulans = DateHelper.getTriwulan($scope.now);
				var tanggals = DateHelper.getDateTimeFormatted($scope.now)
				$scope.item.tanggalAwal = Triwulans;
				$scope.item.tanggalAkhir = tanggals;
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-monitoring-perbaikan?startDate="+$scope.item.tanggalAwal+"&endDate="+$scope.item.tanggalAkhir).then(function(dat){
				    $scope.dataMaster = dat.data.data;
				    $scope.nomor = 1;
				    $scope.dataMaster.forEach(function (data) {
				    	data.pemeriksaanFisik = "✔ (TES)";
				    	data.pemeriksaanAlat = "✖ (TES)";
				    	data.statCheckbox  = false;
				    	var date1 = new Date(data.tanggalKonfirmasi);
				    	var date2 = new Date(data.tanggalRespon);
				    	var date3 = new Date(data.tanggalMulai);
				    	// var date4 = new Date(data.tanggalLapor);
				    	var date4 = new Date(data.tanggalOrder);
				    	var date5 = new Date(data.tanggalSelesai);
				    	data.mulai = DateHelper.getTanggalFormatted(date3);
				    	if (data.tanggalSelesai == null) {
				    		data.selesai = "-";
				    	} else {
				    		data.selesai = DateHelper.getTanggalFormatted(date5);
				    	}
				        if(data.statusPekerjaan != null){
					    
					    	if(data.statusPekerjaan.statusPekerjaan == null){
					 	       data.statusPekerjaan.statusPekerjaan = "-";
					        }
					    	if(data.statusPekerjaan == null){
					    	data.statusPekerjaan = "-";
					   		 }
					   	data.stat = data.statusPekerjaan.statusPekerjaan;
						
						}else if(data.statusPekerjaan == null){
						   		 if(data.statusPekerjaan == null){
						     		data.statusPekerjaan = "-";
						  		 }
					   	 data.stat = data.statusPekerjaan;
					     }else{
						 data.stat = data.statusPekerjaan;
						 }
				   				 	
				    	data.lapor = DateHelper.getDateTimeFormatted(date4);
				    	data.respon = DateHelper.getDateTimeFormatted(date2);
				    	data.tiba = DateHelper.getDateTimeFormatted(date1);
				    	data.no = $scope.nomor++
				    })
					$scope.dataGrid = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
					 var grid = $('#kGrid').data("kendoGrid");
            			 grid.setDataSource($scope.dataGrid);
           		   		 grid.refresh();
				    });
			  }
			$scope.init()

			$scope.cari = function () {
				if ($scope.item.ruangan == undefined) {
					$scope.ruangan = "";
				} else {
					$scope.ruangan = $scope.item.ruangan.id;
				}
				if ($scope.item.noAsset == undefined) {
					$scope.noAsset = "";
				} else {
					$scope.noAsset = $scope.item.noAsset;
				}
				if ($scope.item.alat == undefined) {
					$scope.produk = "";
				} else {
					$scope.produk = $scope.item.alat.id;
				}
				if ($scope.item.tanggalAwal == undefined) {
					$scope.tanggalAwal = "";
				} else {
					var tglAwal = new Date($scope.item.tanggalAwal);
					$scope.tanggalAwal = DateHelper.getTanggalFormattedNew(tglAwal);
				}
				if ($scope.item.tanggalAkhir == undefined) {
					$scope.tanggalAkhir = "";
				} else {
					var tglAkhir = new Date($scope.item.tanggalAwal);
					$scope.tanggalAkhir = DateHelper.getTanggalFormattedNew(tglAkhir);
				}
				IPSRSService.getItem("psrsPermintaanPerbaikan/monitoring?ruanganId="+$scope.ruangan+"&noAset="+$scope.noAsset+"&produkId="+$scope.produk+"&dateStart="+$scope.tanggalAwal+"&dateEnd="+$scope.tanggalAkhir).then(function(dat){
				    debugger
				    $scope.dataMaster = dat.data.data;
				    $scope.nomor = 1;
				    $scope.dataMaster.forEach(function (data) {
				    	debugger
				    	data.pemeriksaanFisik = "✔ (TES)";
				    	data.pemeriksaanAlat = "✖ (TES)";
				    	data.statCheckbox  = false;
				    	var date1 = new Date(data.tanggalKonfirmasi);
				    	var date2 = new Date(data.tanggalRespon);
				    	var date3 = new Date(data.tanggalMulai);
				    	//var date4 = new Date(data.tanggalLapor);
				    	var date4 = new Date(data.tanggalOrder);
				    	var date5 = new Date(data.tanggalSelesai);
				    	data.mulai = DateHelper.getTanggalFormatted(date3);
				    	if (data.tanggalSelesai == null) {
				    		data.selesai = "-";
				    	} else {
				    		data.selesai = DateHelper.getTanggalFormatted(date5);
				    	}
				    	
				    	data.lapor = DateHelper.getDateTimeFormatted(date4);
				    	data.respon = DateHelper.getDateTimeFormatted(date2);
				    	data.tiba = DateHelper.getDateTimeFormatted(date1);
				    	data.no = $scope.nomor++
				    })
					$scope.dataGrid = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				});
			};



            function UbahGrid(ds)
            {

                var newDs = new kendo.data.DataSource({
                    data: ds,
                    pageSize: 10,
                    total: ds.length,
                    serverPaging: false,
                });

                var grid = $('#kGrid').data("kendoGrid");

                grid.setDataSource(newDs);
                grid.refresh();
                $scope.dataVOloaded = true;
            }

            $scope.selectRow = function(dataItem)
             {
             	debugger
	             var dataSelect = _.find($scope.dataGrid._data, function(data){
	                 return data.no == dataItem.no; 
	              });

	              if(dataSelect.statCheckbox){
	                 dataSelect.statCheckbox = false;
	              }
	              else
	              {
	                 dataSelect.statCheckbox = true;
	              }
	              $scope.tempCheckbox = dataSelect.statCheckbox; 
	              //UbahGrid($scope.dataGrid._data);
             }



			var onDataBound = function() {
			debugger
    		$('td').each(function(){
    			if($(this).text()=="Pending")
    				{$(this).addClass('yellow')}});
    		$('td').each(function(){
    			if($(this).text()=="Selesai")
    			    {$(this).addClass('green')}
    		 });
    		$('td').each(function(){
    			if($(this).text()=="Belum Beres")
    				{$(this).addClass('red')}
    		})};

			$scope.mainGridOptions = { 
			pageable: true,
				filterable: {
                   extra: false,
                   operators: {
                      string: {
                      startsWith: "Pencarian"
                      }
                   }
                },
                sortable: true,
				 toolbar: ["excel"],
		            excel: {
		                fileName: "DashboardPerbaikan.xlsx",
		                filterable: false
		         },
				dataBound: onDataBound,
				columns: [
				// { 
    			// // "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
    			//  template: "# if (statCheckbox) { #"+
    			//"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
    			  //"# } else { #"+
    			//"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
    			//"# } #",
    			//width:"50px"
    			// },
				{ field:"no",title:"No",   template: '<span style="float:center">#= no #</span>', width: "40px", headerAttributes: { "class": "center-header"}, filterable: false},
				{ field:"ruanganPemesan",title:"Ruangan", width:"100px"},
				{ field:"namaProduk",title:"Nama Alat",width:"100px" },
				{ field:"merkProduk",title:"Merk",width:"100px" },
				{ field:"typeProduk",title:"Type",width:"100px" },
				{ field:"noOrder",title:"No Seri", width:"100px" },
				{ field:"userPemesan",title:"Nama Teknisi",width:"100px" },
				{ field:"userPemesan",title:"Nama Pelapor",width:"100px" },
				{ field:"namaVerifikator",title:"Nama Verifikator",width:"100px" },
				{ field:"keteranganOrder",title:"Proses Pelaksanaan",width:"150px" },
				{ field:"stat",title:"Finalisasi Hasil Pekerjaan",width:"100px" },
				{ field:"tanggal",title:"Tanggal",headerAttributes: { style: "text-align : center"},
					columns:[
							{ field:"mulai", title:"Mulai", width:100, filterable: false},
							{ field:"selesai", title:"Selesai", width:100, filterable: false}], width:"200px", filterable: false },
				{ field:"waktu",title:"Waktu", headerAttributes: { style: "text-align : center"},
					columns:[
							{ field:"lapor", title:"Lapor", width:100, filterable: false},
							{ field:"respon", title:"Respon",width:100, filterable: false},
							{ field:"tiba", title:"Tiba", width:100, filterable: false}], width:"300px" },
			   { field:"keteranganLainnya",title:"Keluhan",width:"80px"},
			   { field:"",title:"Jenis Kerusakan",width:"80px"},
			   { field:"",title:"Analisa Kerusakan",width:"80px"},
			   { field:"",title:"Pelaksanaan Pekerjaan",width:"80px"},
			   { field:"",title:"Pemeliharaan",headerAttributes: { style: "text-align : center"},
			    	columns:[
						{ field:"", title:"Kebutuhan Alat", width:100},
						// { field:"pemeriksaanAlat", template: '<span style="float:center">#= pemeriksaanAlat #</span>', title:"Pemeriksaan Alat",width:100},
						{ field:"", template: '<span style="float:center">#= pemeriksaanAlat #</span>', title:"Pemeriksaan Alat",width:100},
						// { field:"pemeriksaanFisik", title:"Pemeriksaan Fisik", width:100}], width:"300px" },
						{ field:"pemeriksaanFisik", title:"Pemeriksaan Fisik", width:100}], width:"300px" },
			   { field:"",title:"Spare Part",headerAttributes: { style: "text-align : center"},
			   		columns:[
						{ field:"", title:"Nama Barang", width:100},
						{ field:"", title:"Satuan",width:100},
						{ field:"", title:"Qty", width:100}], width:"300px" },
			  { field:"noVerifikasi",title:"Serah Terima Setelah Selesai Pekerjaan",width:"100px"}]
				
			};

			$scope.tutup = function(){
				$state.go("home");
			}

		     //$scope.dbltes = function(tes){
			//// kendo.window;
			//  debugger
			//  window.messageContainer.error('Tes Double Click !!');
			// }


			// $scope.detail = function () {
			// debugger
			//   var dataTemps = [];
			//   for(var i = 0; i<$scope.dataGrid._data.length; i++){
			//   	if($scope.dataGrid._data[i].statCheckbox == true){
			//   		dataTemps.push($scope.dataGrid._data[i]) 
			//   	}
			//   }

			//   if(dataTemps.length==1){
			//   	debugger
			//    if (dataTemps[0].noRec == undefined) {
			// 		window.messageContainer.error('Silahkan pilih data')
			// 	}else{
			// 		$state.go('DetailDashboardPerbaikan',{
			// 			strukOrderId: dataTemps[0].noRec,
			// 			noRegistrasiAset: dataTemps[0].noRecRegistrasiAset
			// 		})
			// 	 }
			//    }else{
			//    	debugger
			//    	window.messageContainer.error('Pilih Hanya 1 Data di checkbox')
			//    }
			//  }

			$scope.click = function(current){
				$scope.current = current;
				$scope.strukOrderId = current.noRec;
				$scope.noRegistrasiAset = current.noRecRegistrasiAset;
			};

			$scope.detail = function () {
				if ($scope.strukOrderId == undefined) {
					window.messageContainer.error('Silahkan pilih data')
				} else {
					$state.go('DetailDashboardPerbaikan',{
						strukOrderId: $scope.strukOrderId,
						noRegistrasiAset: $scope.noRegistrasiAset
					})
				}
			}
		    $scope.detailpemeliharaan = function () {
				if ($scope.strukOrderId == undefined) {
					window.messageContainer.error('Silahkan pilih data')
				} else {
					$state.go('DetailPemeliharaanRespon',{
						strukOrderId: $scope.strukOrderId,
						noRegistrasiAset: $scope.noRegistrasiAset
					})
				}
			}
		    $scope.detailsparepart = function () {
				if ($scope.strukOrderId == undefined) {
					window.messageContainer.error('Silahkan pilih data')
				} else {
					$state.go('DetailSparePart',{
						strukOrderId: $scope.strukOrderId,
						noRegistrasiAset: $scope.noRegistrasiAset
					})
				}
			}
		}
		]);
});