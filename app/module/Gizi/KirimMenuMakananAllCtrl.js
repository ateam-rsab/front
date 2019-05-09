define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KirimMenuMakananAllCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper','ManageServicePhp',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper,dateHelper,manageServicePhp) {
			
			$scope.item ={};
			$scope.dataVOloaded =true;
			$scope.now = new Date();
			// $scope.item.tglMenu = new Date();

			var norecSO ='';
			var listData ='';
			var keterangan ='';
			var dataOrderFix=[];
			var data2 = [];
			LoadCache();


			function LoadCache(){
				var cacheGet = cacheHelper.get('cacheKirimMenu');
				if(cacheGet != undefined){
					norecSO = cacheGet[0]
					listData = cacheGet[1]

					init()
				// 	var cacheGet = { 0 : '' ,
				// 	1 : '',
				// 	2 : '',
				// 	3 : '', 
				// 	4 : '',
				// 	5 : '',
				// 	6 : ''
				// }
				// cacheHelper.set('cacheKirimMenu', cacheGet);
			}else{
				init()
			}
		}

		function init() {
			manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function(data) {
				$scope.listKelas = data.data.kelas;
				$scope.listJenisDiet = data.data.jenisdiet;
				$scope.listKategoriDiet = data.data.kategorydiet;
				$scope.listJenisWaktu = data.data.jeniswaktu;
				$scope.listRuangan = data.data.ruanginap;
				$scope.listMenu = data.data.produk;
				$scope.listSatuan = data.data.satuanstandar;

				if (norecSO != '') {
					$scope.item.tglMenu = moment(listData.details[0].tglpelayanan).format('YYYY-MM-DD');
					$scope.item.noOrder = listData.noorder;
					$scope.item.tglOrder =  moment(listData.tglorder).format('YYYY-MM-DD HH:mm');
					$scope.item.jenisDiet = {id:listData.objectjenisdietfk,jenisdiet :listData.jenisdiet }
					$scope.item.jenisWaktu ={id:listData.objectjeniswaktufk,jeniswaktu :listData.jeniswaktu }
					
					for (var x=0 ;x< listData.details.length;x++){
						var element =listData.details[x];
						element.no = x + 1
						element.nocmnoreg = element.nocm + '-' + element.noregistrasi
						if (element.qtyproduk != null)
							element.qtymenu = parseFloat(element.qtyproduk)
						else
							element.qtymenu = 0
						var tanggal = $scope.now;
						var tanggalLahir = new Date(element.tgllahir);
						var umur = dateHelper.CountAge(tanggalLahir, tanggal);
						element.umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
					}

					$scope.sourceGrid = new kendo.data.DataSource({
						data: listData.details
					});
				}


				

			})

		}
		


		$scope.columnGrid = [
		{
			"template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
			"width": 30
		},
		{
			"field": "no",
			"title": "No",
			"width": "5%"
		},

		{
			"field": "nocm",
			"title": "No RM",
			"width": "8%"
		},
		{
			"field": "noregistrasi",
			"title": "No Reg",
			"width": "10%"
		},
		{
			"field": "namapasien",
			"title": "Nama Pasien",
			"width": "25%"
		},
		{
			"field": "jeniskelamin",
			"title": "JK",
			"width": "10%"
		},
		{
			"field": "ruanganasal",
			"title": "Ruangan Tujuan",
			"width": "15%"
		},
		{
			"field": "umur",
			"title": "Umur",
			"width": "10%"
		},
		{
			"field": "namakelas",
			"title": "Kelas",
			"width": "10%"
		},
		{
			"field": "qtymenu",
			"title": "Qty Menu",
			"width": "10%"
		},


		];
		$scope.klikGrid = function(dataPasienSelected){
			$scope.dataPasienSelected =dataPasienSelected
		}

		$scope.inputMenu = function (){
			if ($scope.dataPasienSelected == undefined){
				toastr.error('Pilih data dulu')
				return
			}

			$scope.item.tglOrder =$scope.dataPasienSelected.tglorder;
			$scope.item.noOrder =$scope.dataPasienSelected.noorder;
			$scope.item.noRm =$scope.dataPasienSelected.nocm;
			$scope.item.noRegistrasi =$scope.dataPasienSelected.noregistrasi

			manageServicePhp.getDataTableTransaksi("gizi/get-pasien-bynoregistrasi?noReg="+$scope.dataPasienSelected.noregistrasi)         
			.then(function (e) {
				$scope.item.pasien=e.data.data[0]; 
			})

			getHistoryKirim();

			$scope.popUpMenu.center().open();

			var actions = $scope.popUpMenu.options.actions;
			actions.splice(actions.indexOf("Close"), 1);
			$scope.popUpMenu.setOptions({ actions : actions });
		}

		// function getHistoryKirim (){
		// 	manageServicePhp.getDataTableTransaksi("gizi/get-kirim-produk?noregistrasi="+$scope.dataPasienSelected.noregistrasi)         
		// 	.then(function (z) {
		// 		debugger
		// 		data2 = z.data.data
		// 		if (data2.length == 0){
		// 			$scope.getSiklusMenu()
		// 		}else{

		// 			$scope.norecSK = data2[0].norec_sk
		// 			for (var i = 0; i < data2.length; i++) {
		// 				data2[i].no = i + 1
		// 			}


		// 			$scope.souceGridMenu = new kendo.data.DataSource({
		// 				data: data2
		// 			});
		// 		}

		// 	})
		// }
		// $scope.getSiklusMenu =function(){

		// 	var tglmenu= moment($scope.item.tglMenu).format('YYYY-MM-DD');
		// 	var arrTgl = tglmenu.split('-');
		// 	var arrKelas=[];
		// 	var details =[];

		// 	// $scope.selectedData.forEach(function(items){
		// 		manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
		// 			+ $scope.item.jenisDiet.id
		// 			+ "&kelasId=" + $scope.dataPasienSelected.objectkelasfk
		// 			+ "&siklusKe=" +  arrTgl[2]
		// 			+ "&jenisWaktuId=" +  $scope.item.jenisWaktu.id
		// 			).then(function(e){
		// 				var orderDetail = [];
		// 				e.data.data.forEach(function(a){
		// 					if($scope.dataPasienSelected.objectkelasfk === a.objectkelasfk){
		// 						orderDetail.push(a);
		// 					}
		// 				})
		// 				if (orderDetail.length>0){
		// 					data2= orderDetail;
		// 					for (var i = 0; i < data2.length; i++) {
		// 						data2[i].no = i + 1
		// 						data2[i].qtyproduk = 1
		// 					}

		// 					$scope.souceGridMenu = new kendo.data.DataSource({
		// 						data: data2
		// 					});

		// 					console.log(JSON.stringify(data2));
		// 				}

		// 			})
		// 		// })
		// 	}


		$scope.columnGridMenu = [
		{
			"field": "no",
			"title": "No",
			"width" : "10px",
		},
		{
			"field": "namaproduk",
			"title": "Nama Menu",
			"width" : "100px"
		},
		{
			"field": "qtyproduk",
			"title": "Jumlah",
			"width" : "40px",
			// "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
		},
		// {
		// 	"field": "satuanstandar",
		// 	"title": "Satuan",
		// 	"width" : "80px",
		// 	// "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
		// }

		];	

		$scope.tambah = function(){
			if ($scope.item.qtyProduk == 0) {
				toastr.error("Qty harus di isi!")
				return;
			}

			if ($scope.item.namaProduk == undefined) {
				toastr.error("Pilih Menu terlebih dahulu!!")
				return;
			}
			var nomor =0
			if ($scope.souceGridMenu == undefined) {
				nomor = 1
			}else{
				nomor = data2.length+1
			}
			var data ={};
			if ($scope.item.no != undefined){
				for (var i = data2.length - 1; i >= 0; i--) {
					if (data2[i].no ==  $scope.item.no){
						data.no = $scope.item.no

						data.produkfk = $scope.item.namaProduk.id
						data.namaproduk = $scope.item.namaProduk.namaproduk
						data.qtyproduk =parseFloat($scope.item.qtyProduk)
						data2[i] = data;
						$scope.souceGridMenu = new kendo.data.DataSource({
							data: data2
						});
					}
				}

			}else{
				data={
					no:nomor,
					produkfk:$scope.item.namaProduk.id,
					namaproduk:$scope.item.namaProduk.namaproduk,
					qtyproduk:parseFloat($scope.item.qtyProduk),
				}
				data2.push(data)
				$scope.souceGridMenu = new kendo.data.DataSource({
					data: data2
				});
			}
			clear();
		}
		$scope.klikMenu = function(dataSelectedMenu){
			var dataMenu =[];

			$scope.item.no = dataSelectedMenu.no
			for (var i = $scope.listMenu.length - 1; i >= 0; i--) {
				if ($scope.listMenu[i].id == dataSelectedMenu.produkfk){
					dataMenu = $scope.listMenu[i]
					break;
				}
			}
			$scope.item.namaProduk = dataMenu;
			$scope.item.qtyProduk = parseFloat(dataSelectedMenu.qtyproduk)
		}
		$scope.hapus = function(){
			if ($scope.item.qtyProduk == 0) {
				toastr.error("Qty harus di isi!")
				return;
			}

			if ($scope.item.namaProduk == undefined) {
				toastr.error("Pilih Data terlebih dahulu!!")
				return;
			}
			var nomor =0
			if ($scope.souceGridMenu == undefined) {
				nomor = 1
			}else{
				nomor = data2.length+1
			}
			var data ={};
			if ($scope.item.no != undefined){
				for (var i = data2.length - 1; i >= 0; i--) {
					if (data2[i].no ==  $scope.item.no){
						data2.splice(i, 1); 
						for (var i = data2.length - 1; i >= 0; i--) {
							data2[i].no = i+1
						}
						$scope.souceGridMenu = new kendo.data.DataSource({
							data: data2
						});
					}
				}

			}clear();
		}
		function clear(){
			delete $scope.item.namaProduk
			delete $scope.item.qtyProduk 
			delete $scope.item.no
		}
		$scope.batal= function(){
			data2=[]
			$scope.souceGridMenu = new kendo.data.DataSource({
				data: data2
			});
			clear();
		}

		$scope.$watch('item.qtyProduk', function(newValue, oldValue) {
			if (newValue != oldValue  ) {
				if ($scope.item.qtyProduk < 0)
				{
					$scope.item.qtyProduk="";
				}
			}
		})

		$scope.saveKirimMenu = function(){		
			if (data2.length == 0) {
				toastr.error("Pilih Menu terlebih dahulu!!")
				return
			}
			var norec_sk ="";
			if ($scope.norecSK != undefined){
				norec_sk =$scope.norecSK
			}

			var objSave = {
				"norec_sk" : norec_sk,
				"objectruanganasalfk" :listData.objectruangantujuanfk,
				"objectruangantujuanfk" :$scope.dataPasienSelected.objectruanganfk,
				"norec_pd" : $scope.item.pasien.norec_pd,
				"qtyproduk" : data2.length ,
				"details":data2,
			}  
			var post ={
				"strukkirim" :objSave
			}
			manageServicePhp.saveKirimMenuMakanan(post).then(function(e) {
				if (e.status ==201){
					var dataz ={};

					if ($scope.dataPasienSelected.noregistrasi == $scope.item.pasien.noregistrasi){
						dataz.qtymenu =data2.length	
						$scope.dataPasienSelected.qtymenu=dataz.qtymenu

						$scope.dataPasienSelected=undefined	;
						$scope.batal();

						
					}       	 
				}

			})

		}

		$scope.tutup=function(){
			$scope.popUpMenu.close();
		}
		$scope.$watch('popUpCetakLabel.qty', function(newValue, oldValue) {
			if (newValue != oldValue  ) {
				if ($scope.popUpCetakLabel.qty < 0)
				{
					$scope.popUpCetakLabel.qty="";
				}
			}
		})
		$scope.showCetak = function(){

			if ($scope.dataPasienSelected == undefined){
				toastr.error('Pilih pasien terlebih dahulu')
				return
			}
			$scope.popUpCetakLabel.center().open();
			$scope.popUpCetakLabel.qty = 1;	
		}

		$scope.cetak = function(){
			
			if ($scope.popUpCetakLabel.qty ==0)
			{
				toastr.error('qty tidak boleh nol')
				return	
			}

			var client = new HttpClient();
			client.get('http://127.0.0.1:1237/printvb/gizi?cetak-label-gizi=' + $scope.dataPasienSelected.noregistrasi + '&view=false&qty=' + $scope.popUpCetakLabel.qty, function(response) {

			});
		}


		var HttpClient = function() {
			this.get = function(aUrl, aCallback) {
				var anHttpRequest = new XMLHttpRequest();
				anHttpRequest.onreadystatechange = function() { 
					if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
						aCallback(anHttpRequest.responseText);
				}

				anHttpRequest.open( "GET", aUrl, true );            
				anHttpRequest.send( null );
			}
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
					return e.noregistrasi	 == dataItem.noregistrasi;
				});
				if (result.length == 0) {
					$scope.selectedData.push(dataItem);
				} else {
					for (var i = 0; i < $scope.selectedData.length; i++)
						if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
							$scope.selectedData.splice(i, 1);
							break;
						}
						$scope.selectedData.push(dataItem);
					}
					row.addClass("k-state-selected");
				} else {
					for (var i = 0; i < $scope.selectedData.length; i++)
						if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
							$scope.selectedData.splice(i, 1);
							break;
						}
						row.removeClass("k-state-selected");
					}
				}

				$scope.showMenus = function	(){
					if ($scope.selectedData.length == 0){
						toastr.error('Pilih data dulu')
						return
					}

					// $scope.item.tglOrder =$scope.dataPasienSelected.tglorder;
					// $scope.item.noOrder =$scope.dataPasienSelected.noorder;
					// $scope.item.noRm =$scope.dataPasienSelected.nocm;
					// $scope.item.noRegistrasi =$scope.dataPasienSelected.noregistrasi

					// manageServicePhp.getDataTableTransaksi("gizi/get-pasien-bynoregistrasi?noReg="+$scope.dataPasienSelected.noregistrasi)         
					// .then(function (e) {
					// 	$scope.item.pasien=e.data.data[0]; 
					// })

					// getHistoryKirim();
					$scope.getSiklusMenus ()

					$scope.popUpMenu.center().open();

					var actions = $scope.popUpMenu.options.actions;
					actions.splice(actions.indexOf("Close"), 1);
					$scope.popUpMenu.setOptions({ actions : actions });

				}
				$scope.getSiklusMenus =function(){
					dataOrderFix=[]
					var tglMenu= moment($scope.item.tglMenu).format('YYYY-MM-DD');
					var arrTgl = tglMenu.split('-');
					var arrKelas=[];
					var details =[];

					$scope.selectedData.forEach(function(items){
						manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
							+ $scope.item.jenisDiet.id
							+ "&kelasId=" + items.objectkelasfk 
							+ "&siklusKe=" +  arrTgl[2]
							+ "&jenisWaktuId=" +  $scope.item.jenisWaktu.id
							+ "&norec_pd=" + items.norec_pd 
							).then(function(e){
								debugger
								var orderDetail = [];
								e.data.data.forEach(function(a){

									if(items.objectkelasfk === a.objectkelasfk){
										orderDetail.push(a);

									}
								})
								if (orderDetail.length>0){
									data2=orderDetail
									for (var i = 0; i < data2.length; i++) {
										if (data2[i].produkfk == data2[i].produkfk)
											data2[i].qtyproduk = data2[i].qtyproduk + 1
										data2[i].no = i + 1
										

									}
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
								$scope.souceGridMenu = new kendo.data.DataSource({
									data: data2
								});

							})
						})
				}


				/* ---- end ---- */
			}
			]);
});