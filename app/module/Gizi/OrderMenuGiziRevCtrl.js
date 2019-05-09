define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('OrderMenuGiziRevCtrl', ['$mdDialog', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper', 'ModelItem','CetakHelper','ModelItemAkuntansi', 'ManageServicePhp',
		function($mdDialog, $state, $q, $rootScope, $scope, cacheHelper,dateHelper, ModelItem, cetakHelper, modelItemAkuntansi, manageServicePhp) {
			$scope.isRouteLoading=false;

			$scope.now = new Date();
			$scope.item = {};
			$scope.listJenisOrder =[{"id" : 1,"name": "Order Makan"}, {"id" : 2,"name": "Order Susu"}];
			$scope.item.periodeAwal = $scope.now;
			$scope.item.periodeAkhir = $scope.now;
			$scope.item.tanggalOrderGizi =$scope.now
			var dataOrderFix=[];
			var data2 =[]
 			$scope.item.jenisOrder=$scope.listJenisOrder[0]
			loadData()
			loadCombo()
    		$scope.array = [{
                id: 1,
                tgl: "",
                isDuplicate: false
            }]


			function loadCombo(){
				
				manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function(data) {
					$scope.listRuangan = data.data.ruanginap;
					$scope.listKelas = data.data.kelas;
					$scope.listJenisDiet = data.data.jenisdiet;
					$scope.listKategoriDiet = data.data.kategorydiet;
					$scope.listJenisWaktu = data.data.jeniswaktu;
				})
			

			}
			$scope.panjangPopup =250
			//  $scope.$watch('item.jenisOrder', function(e) {
            //     if (e === undefined) return;
			// 	if (e.id ==2 ){
			// 		$scope.panjangPopup =500
			// 	}else
			// 		$scope.panjangPopup =250
            //  })

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
			$scope.selectRow = function(dataItem)
			{
				var dataSelect = _.find($scope.dataSourceGrid._data, function(data){
					return data.norec_pd == dataItem.norec_pd; 
				});

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
					for (let i = 0; i < $scope.selectedData.length; i++) {
						if (dataSelect.norec_pd ==$scope.selectedData[i].norec_pd){
							$scope.selectedData.splice([i],1)
							break
						}	
					}
				}
				else
				{
					dataSelect.statCheckbox = true;
					$scope.selectedData.push(dataSelect)
				}
				console.log($scope.selectedData)
			}
			var isCheckAll = false
			$scope.selectUnselectAllRow = function()
			{
				var tempData = $scope.dataSourceGrid._data;

				if(isCheckAll)
				{
					isCheckAll = false;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = false;
						$scope.selectedData=[]
					}
				}
				else{
					isCheckAll = true;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = true;
						$scope.selectedData.push(tempData[i])
					}
				}

				console.log($scope.selectedData)
				reloaddataSourceGrid(tempData);         
			}

			function reloaddataSourceGrid(ds)
			{
		
				var newDs = new kendo.data.DataSource({
					data:ds,
					pageSize: 20,
					total:ds.length,
					serverPaging: true,

				});

				var grid = $('#kGrid').data("kendoGrid");

				grid.setDataSource( newDs);
				grid.refresh();

			}

			$scope.columnOrder = [
			{
				"field": "no",
				"title": "No",
				"width":"40px",
			},
			{
				"field": "tglmenu",
				"title": "Tgl Menu",
				"width":"130px",
				// "template": "<span class='style-left'>{{formatTanggal('#: tglmenu #')}}</span>"
			},

			{
				"field": "jenisdiet",
				"title": "Jenis Diet",
				"width":"80px",
				"template": "<span class='style-center'>#: jenisdiet #</span>"
			},
			{
				"field": "kategorydiet",
				"title": "Kategori Diet",
				"width":"80px",
				"template": "<span class='style-center'>#: kategorydiet #</span>"
			},
			{
				"field": "volume",
				"title": "Frekuensi",
				"width":"50px",
				"template": "<span class='style-left'>#: volume #</span>"
			},
			{
				"field": "cc",
				"title": "CC",
				"width":"50px",
				"template": "<span class='style-left'>#: cc #</span>"
			},
			{
				"field": "keterangan",
				"title": "Ket",
				"width":"100px",
				"template": "<span class='style-left'>#: keterangan #</span>"
			}
			];
			$scope.columnGrid = [
			// {
			// 	"template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
			// 	"width": 30
			// },
	
			{
			"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
			template: "# if (statCheckbox) { #" +
				"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
				"# } else { #" +
				"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
				"# } #",
			width: "30px"
			},
			{
				"field": "tglregistrasi",
				"title": "Tgl Registrasi",
				"width":"130px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
			},

			{
				"field": "nocm",
				"title": "No RM",
				"width":"80px",
				"template": "<span class='style-center'>#: nocm #</span>"
			},
			{
				"field": "noregistrasi",
				"title": "No Registrasi",
				"width":"100px",
				"template": "<span class='style-center'>#: noregistrasi #</span>"
			},
			{
				"field": "namapasien",
				"title": "Nama Pasien",
				"width":"200px",
				"template": "<span class='style-left'>#: namapasien #</span>"
			},
			{
				"field": "umur",
				"title": "Umur",
				"width":"150px",
				"template": "<span class='style-left'>#: umur #</span>"
			},
			{
				"field": "namadokter",
				"title": "Dokter",
				"width":"150px",
				// "template": "<span class='style-left'>#: namadokter #</span>"
				"template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
			},
			{
				"field": "jeniskelamin",
				"title": "JK",
				"width":"80px",
				"template": "<span class='style-left'>#: jeniskelamin #</span>"
			},
			{
				"field": "namaruangan",
				"title": "Ruangan",
				"width":"150px",
				"template": "<span class='style-left'>#: namaruangan #</span>"
			},
			{
				"field": "namakelas",
				"title": "Kelas",
				"width":"80px",
				"template": "<span class='style-left'>#:  namakelas #</span>"
			},
			{
				"field": "kelompokpasien",
				"title": "Tipe Pembayaran",
				"width":"150px",
				"template": "<span class='style-center'>#: kelompokpasien #</span>"
			},
			{
				"field": "statusorder",
				"title": "Status Order",
				"width":"80px",
				"template": "<span class='style-center'>#: statusorder #</span>"
			},
			];


			$scope.Perbaharui = function(){
				$scope.ClearSearch();
			}

			$scope.tambahData = function(){
				if ($scope.item.jenisDiet == undefined) {
					toastr.error("Pilih Jenis Diet")
					return;
				}
				if ($scope.item.kategoriDiet == undefined) {
					toastr.error("Pilih Kategori Diet")
					return;
				}
				if ($scope.item.volume == undefined) {
					toastr.error("Volume belum di isi")
					return;
				}
				if ($scope.item.cc == undefined) {
					toastr.error("CC belum di isi")
					return;
				}
				if ($scope.item.keterangan == undefined) {
					$scope.item.keterangan ='-'
				}
				var nomor =0
				// if ($scope.souceGridMenu == undefined) {
				// 	nomor = 1
				// }else{
					nomor = data2.length+1
				// }
				var data ={};
				if ($scope.item.no != undefined){
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no ==  $scope.item.no){
							data.no = $scope.item.no
							data.tglmenu = moment ($scope.item.tanggalOrderGizi).format('YYYY-MM-DD HH:mm')
							data.jenisdietfk = $scope.item.jenisDiet.id
							data.jenisdiet = $scope.item.jenisDiet.jenisdiet
							data.kategorydietfk = $scope.item.kategoriDiet.id
							data.kategorydiet = $scope.item.kategoriDiet.kategorydiet
							data.volume = $scope.item.volume
							data.cc = $scope.item.cc
							data.keterangan = $scope.item.keterangan
							data2[i] = data;
							$scope.souceOrder = new kendo.data.DataSource({
								data: data2
							});
						}
					}

				}else{
					data={
						no:nomor,
						tglmenu: moment ($scope.item.tanggalOrderGizi).format('YYYY-MM-DD HH:mm'),
						jenisdietfk : $scope.item.jenisDiet.id,
						jenisdiet: $scope.item.jenisDiet.jenisdiet,
					    kategorydietfk : $scope.item.kategoriDiet.id,
						kategorydiet : $scope.item.kategoriDiet.kategorydiet,
						volume : $scope.item.volume,
						cc : $scope.item.cc,
						keterangan : $scope.item.keterangan,
					}
					data2.push(data)
					$scope.souceOrder = new kendo.data.DataSource({
						data: data2,
						pageSize:10
					});
				}
				clear();
			}
			$scope.hapusData = function(){
				if ($scope.item.no == undefined) {
					toastr.error("Pilih Data yg mau dihapus")
					return;
				}

				
				var nomor =0
				// if ($scope.souceGridMenu == undefined) {
				// 	nomor = 1
				// }else{
					nomor = data2.length+1
				// }
				var data ={};
				if ($scope.item.no != undefined){
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no ==  $scope.item.no){
							data2.splice(i, 1); 
							for (var i = data2.length - 1; i >= 0; i--) {
								data2[i].no = i+1
							}
							$scope.souceOrder = new kendo.data.DataSource({
								data: data2,
								pageSize:10
							});
						}
					}

				}
				clear();
			}
			$scope.klik = function(dataSelect){
				$scope.item.no = dataSelect.no
				var dataJenisDiet =[];
				for (var i = $scope.listJenisDiet.length - 1; i >= 0; i--) {
					if ($scope.listJenisDiet[i].id == dataSelect.jenisdietfk){
						dataJenisDiet = $scope.listJenisDiet[i]
						break;
					}
				}
				var dataKatDiet =[];
				for (var i = $scope.listKategoriDiet.length - 1; i >= 0; i--) {
					if ($scope.listKategoriDiet[i].id == dataSelect.kategorydietfk){
						dataKatDiet = $scope.listKategoriDiet[i]
						break;
					}
				}
				$scope.item.jenisDiet = dataJenisDiet;
				$scope.item.tanggalOrderGizi= dataSelect.tglmenu
				$scope.item.kategoriDiet=dataKatDiet
				$scope.item.volume= dataSelect.volume
				$scope.item.cc= dataSelect.cc
				$scope.item.keterangan= dataSelect.keterangan
			}
			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MM-YYYY HH:mm');
			}
			function clear(){
				delete $scope.item.no
				$scope.item.tanggalOrderGizi = $scope.now
				delete $scope.item.jenisDiet
				delete $scope.item.kategoriDiet
				delete $scope.item.volume
				delete $scope.item.cc
				delete $scope.item.keterangan
			}
			//fungsi clear kriteria search
			$scope.ClearSearch = function(){
				$scope.item = {};
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;
				$scope.item.ruangan = {namaExternal:""};
				$scope.SearchData();
			}

			//fungsi search data
			$scope.SearchData = function(){
				loadData()
			}
			function loadData(){
				$scope.selectedData =[];

				var tglAwal = moment($scope.item.periodeAwal).format('DD-MMM-YYYY HH:mm');
				var tglAkhir = moment($scope.item.periodeAkhir).format('DD-MMM-YYYY HH:mm');
				
				if ($scope.item.ruangan == undefined){
					var rg =""
				}else{
					var rg ="&ruanganId=" +$scope.item.ruangan.id
				}
				if ($scope.item.noReg == undefined){
					var reg =""
				}else{
					var reg ="&noReg=" +$scope.item.noReg
				}
				if ($scope.item.noRm == undefined){
					var rm =""
				}else{
					var rm ="&noRm=" +$scope.item.noRm
				}
				if ($scope.item.nama == undefined){
					var nm =""
				}else{
					var nm ="namaPasien=" +$scope.item.nama
				}

				var kls=""
				if ($scope.item.kelas!=undefined)
					kls= "&kelasId=" +$scope.item.kelas.id

				$scope.isRouteLoading=true;
				$q.all([
					modelItemAkuntansi.getDataTableTransaksi("gizi/get-daftar-pasien?"
						+ nm + reg + rg + rm
						+ kls
						// + "&tglAwal="+ tglAwal +"&tglAkhir="+ tglAkhir
						),
					]).then(function(data) {

						if (data[0].statResponse){
							for (var i = 0; i < data[0].data.length; i++) {
							// data.data[i].no = i+1
							if (data[0].data[i].norecorder != null &&data[0].data[i].keteranganlainnya_quo =='Order Gizi'  ){
								data[0].data[i].statusorder ='Sudah Order' 
							}else{
								data[0].data[i].statusorder ='-' 
							}
	                        data[0].data[i].statCheckbox = false;
	                        var tanggal = $scope.now;
	                        var tanggalLahir = new Date(data[0].data[i].tgllahir);
	                        var umur = dateHelper.CountAge(tanggalLahir, tanggal);
	                        data[0].data[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'

	                    }
	                    $scope.isRouteLoading=false;
	                    $scope.dataSourceGrid = new kendo.data.DataSource({
	                    	data: data[0].data,
	                    	pageSize: 20,
	                    	total: data[0].length,
	                    	serverPaging: true,


	                    });
	                }
	            });
				// var chacePeriode = tglAwal + ":" + tglAkhir;
				// cacheHelper.set('DaftarPasienAktif', chacePeriode);
			}

			$scope.selectedData = [];
			$scope.onClick = function(e){
				var element =$(e.currentTarget);

				var checked = element.is(':checked'),
				row = element.closest('tr'),
				grid = $("#kGrid").data("kendoGrid"),
				dataItem = grid.dataItem(row);
				if (checked) {
					var result = $.grep($scope.selectedData, function(e) { 
						return e.norec_pd == dataItem.norec_pd;
					});
					if (result.length == 0) {
						$scope.selectedData.push(dataItem);
					} else {
						for (var i = 0; i < $scope.selectedData.length; i++)
							if ($scope.selectedData[i].norec_pd === dataItem.norec_pd) {
								$scope.selectedData.splice(i, 1);
								break;
							}
							$scope.selectedData.push(dataItem);
						}
						row.addClass("k-state-selected");
					} else {
						for (var i = 0; i < $scope.selectedData.length; i++)
							if ($scope.selectedData[i].norec_pd === dataItem.norec_pd) {
								$scope.selectedData.splice(i, 1);
								break;
							}
							row.removeClass("k-state-selected");
						}
		 }
		 $scope.selectAll = function(e){
			var element =$(e.currentTarget);

			var checked = element.is(':checked'),
			row = element.closest('tr'),
			grid = $("#kGrid").data("kendoGrid"),
			dataSouce = grid._data;
			// dataItem = grid.dataItem(row);			
			if (checked) {
				// var result = $.grep($scope.selectedData, function(e) { 
				// 	return e.norec_pd == dataItem.norec_pd;
				// });
				// if (result.length == 0) {
					for (let index = 0; index < dataSouce.length; index++) {
						$scope.selectedData.push(dataSouce[index])
						row.addClass("k-state-selected");
					}
			
				// } else {
				// 	for (var i = 0; i < $scope.selectedData.length; i++)
				// 		if ($scope.selectedData[i].norec_pd === dataItem.norec_pd) {
				// 			$scope.selectedData.splice(i, 1);
				// 			break;
				// 		}
				// 		$scope.selectedData.push(dataItem);
				// 	}
			
				} else {
					for (var i = 0; i < $scope.selectedData.length; i++)
						// if ($scope.selectedData[i].norec_pd === dataItem.norec_pd) {
							$scope.selectedData.splice(i, 1);
							// break;
						// }
						row.removeClass("k-state-selected");
					}
	 }
					$scope.Order=function(){
						var tempData=[];
						if($scope.selectedData.length > 0){
							$scope.selectedData.forEach(function(items){
								var item = {
									"noRec": items.norec_pd,
								}
								tempData.push(item);
							})
							$scope.popUpOrder.center().open();

							var actions = $scope.popUpOrder.options.actions;
							actions.splice(actions.indexOf("Close"), 1);
							$scope.popUpOrder.setOptions({ actions : actions });
							
						
							data2=[]
							$scope.souceOrder = new kendo.data.DataSource({
								data: data2
							});
							clear();
							toastr.info(tempData.length+' data di pilih ')
						}
						if (tempData.length == 0) {
							toastr.error('Belum ada data yang di pilih !')
							return;
						}

					}
					$scope.getSiklusMenu =function(){
						dataOrderFix=[]
						var tglOrder= moment($scope.item.tanggalOrderGizi).format('YYYY-MM-DD');
						var arrTgl = tglOrder.split('-');
						var arrKelas=[];
						var details =[];
                		// var dataOrderFix=[];
                		$scope.selectedData.forEach(function(items){
                			manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
                				+ $scope.item.jenisDiet.id
                				+ "&kelasId=" + items.objectkelasfk 
                				+ "&siklusKe=" +  arrTgl[2]
                				+ "&norec_pd=" + items.norec_pd 
                				).then(function(e){

                					var orderDetail = [];
                					e.data.data.forEach(function(a){
                						if(items.objectkelasfk === a.objectkelasfk){
                							orderDetail.push(a);
                						}
                					})
                					if (orderDetail.length>0){
                						dataOrderFix.push({
                							"nocmfk": items.nocmfk ,
                							"objectkelasfk": items.objectkelasfk ,
                							"noregistrasifk": items.norec_pd,
                							"tglorder": new moment($scope.item.tanggalOrderGizi).format('YYYY-MM-DD HH:mm'),
                							"qtyproduk" : e.data.data.length,
                							"objectruangantujuanfk": items.objectruanganlastfk,                					
                							"details" : orderDetail,
                						});
                						console.log(JSON.stringify(dataOrderFix));
                					}
                					
                				})
                			})
                	}


                	$scope.BatalOrder=function(){

						data2=[]
						$scope.souceOrder = new kendo.data.DataSource({
							data: data2
						});
						clear();
				
                		$scope.popUpOrder.close();
                		kosongkan ();
                		dataOrderFix =[];
                	}
                	// $scope.SaveOrder=function(){
                	// 	if ($scope.item.jenisDiet==undefined){
                	// 		toastr.error('Jenis Diet belum di pilih !')
                	// 		return
                	// 	}
                	// 	if ($scope.item.kategoriDiet==undefined){
                	// 		toastr.error('Kategori Diet belum di pilih !')
                	// 		return
                	// 	}


                	// 	var objSave = {
                	// 		"order":dataOrderFix,
                	// 		"objectkategorydietfk" : $scope.item.kategoriDiet.id,
                	// 	}

                	// 	manageServicePhp.saveOrderGizi(objSave).then(function(result) {
                	// 		if (result.status == 201){
                	// 			dataOrderFix =[];
                	// 		}
                	// 		$scope.popUpOrder.close();
                	// 		kosongkan ();

                	// 	})
                	// }

                	$scope.SaveOrderFix=function(){
                		if ($scope.item.jenisOrder == undefined){
                			toastr.error('Pilih jenis order')
                			return
                		}
                		var jnsOrder = ""
            			if ($scope.item.jenisOrder.id ==1 ){
            				jnsOrder = "Order Makan"
            				if ($scope.item.jenisDiet==undefined){
	                			toastr.error('Jenis Diet belum di pilih !')
	                			return
                			}
	                		if ($scope.item.kategoriDiet==undefined){
	                			toastr.error('Kategori Diet belum di pilih !')
	                			return
	                		}
	                		// if ($scope.item.jenisWaktu==undefined){
	                		// 	toastr.error('Jenis Waktu belum di pilih !')
	                		// 	return
	                		// }
	                		var ket =''
	                		if ($scope.item.keterangan!=undefined){
	                			ket =$scope.item.keterangan
	                		}
	                		$scope.tombolSimpanVis = true;
	                		for (var i = 0; i < $scope.selectedData.length; i++) {
	                			$scope.selectedData[i].keterangan =ket
	                			$scope.selectedData[i].volume =null
	                			$scope.selectedData[i].cc =null
	                			$scope.selectedData[i].objectjenisdietfk =$scope.item.jenisDiet.id
	                			$scope.selectedData[i].objectkategorydietfk =$scope.item.kategoriDiet.id
	                		}
	                		var objSave = {
	                			"norec_so" : "",
	                			"jenisorder": jnsOrder,
	                			"tglnow" : new moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
	                			"tglorder" : new moment($scope.item.tanggalOrderGizi).format('YYYY-MM-DD HH:mm'),
	                			// "objectjenisdietfk" :$scope.item.jenisDiet.id,
	                			// "objectkategorydietfk" :$scope.item.kategoriDiet.id,
	                			// "keterangan" :ket,
	                			"objectjeniswaktufk" :null,
	                			"details" : $scope.selectedData,
	                			"qtyproduk" : $scope.selectedData.length,
	                		}
	                		var data ={
	                			"strukorder" :objSave
	                		}
            			}else if ($scope.item.jenisOrder.id ==2 ){
            				jnsOrder = "Order Susu"
	                		if (data2.length == 0){
	                			toastr.error('Data order belum diisi')
	                			return
	                		}
	                		$scope.tombolSimpanVis = true;
	                		var details = []
                			for (var j = 0; j < $scope.selectedData.length; j++) {
                				for (var i = 0; i < data2.length; i++) {
                					details.push( {
                					"nocmfk" :$scope.selectedData[j].nocmfk,
                					"norec_pd" :$scope.selectedData[j].norec_pd,
                					"objectkelasfk" :$scope.selectedData[j].objectkelasfk,
                					"objectruanganlastfk" :$scope.selectedData[j].objectruanganlastfk,
                					"objectjenisdietfk":data2[i].jenisdietfk,
                					"objectkategorydietfk":data2[i].kategorydietfk,
                					"volume":data2[i].volume,
                					"cc":data2[i].cc,
                					"keterangan":data2[i].keterangan
                					})
                				}
	                		}
	                		var objSave = {
	                			"norec_so" : "",
	                			"jenisorder": jnsOrder,
	                			"tglnow" : new moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
	                			"tglorder" : new moment($scope.item.tanggalOrderGizi).format('YYYY-MM-DD HH:mm'),
	                			// "objectjenisdietfk" :$scope.item.jenisDiet.id,
	                			// "objectkategorydietfk" :$scope.item.kategoriDiet.id,
	                			"objectjeniswaktufk" :null,
	                			"details" : details,
	                			"qtyproduk" : details.length,
	                		}

	                		var data ={
	                			"strukorder" :objSave
	                		}
            			}
                	

                		manageServicePhp.saveOrderGizi(data).then(function(result) {
                			if (result.status == 201){
                				$scope.tombolSimpanVis = false;
                				$scope.selectedData =[];
                			}
                			$scope.popUpOrder.close();
                			kosongkan ();
                			loadData()

                		})
                	}
                	function kosongkan (){
                		delete $scope.item.jenisDiet
                		delete $scope.item.kategoriDiet
                		delete $scope.item.jenisWaktu
                	}
                	$scope.Edit= function(){
                		$state.go('DaftarOrderGiziSuster');
                	}
                	


// ** END **//


}
]);
});