define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarKirimMenuCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper','ManageServicePhp',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper,dateHelper,manageServicePhp) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal =  new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang= new Date();
			$scope.dataPasienSelected = {};
			// $scope.cboDokter =false;	
			// $scope.pasienPulang =false;		
			// $scope.cboUbahDokter =true;
			$scope.isRouteLoading=false;

			var data2 = {};

			loadCombo();
			loadData();

			function loadCombo(){
				var chacePeriode = cacheHelper.get('cacheDaftarKirimGizi');
				if(chacePeriode != undefined){
					//debugger;
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);	
					$scope.item.tglpulang = new Date(arrPeriode[2]);				
				}else{
					$scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;					
				}
				
				manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function(data) {
					$scope.listKelas = data.data.kelas;
					$scope.listJenisDiet = data.data.jenisdiet;
					$scope.listKategoriDiet = data.data.kategorydiet;
					$scope.listJenisWaktu = data.data.jeniswaktu;
					$scope.listRuangan = data.data.ruanginap;
					$scope.listMenu = data.data.produk;
					$scope.listSatuan = data.data.satuanstandar;
				})
				// $scope.listStatus = manageKasir.getStatus();
			}
			$scope.getIsiComboRuangan = function(){
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.SearchData = function(){
				loadData()
			}
			function loadData(){
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg =""
				if ($scope.item.noReg != undefined){
					var reg ="&noreg=" +$scope.item.noReg
				}
				var rm =""
				if ($scope.item.noRms != undefined){
					var rm ="&norm=" +$scope.item.noRms
				}	
				var nm =""
				if ($scope.item.nama != undefined){
					var nm ="&nama=" +$scope.item.nama
				}
				var ins =""
				if ($scope.item.instalasi != undefined){
					var ins ="&deptId=" +$scope.item.instalasi.id
				}
				var rg =""
				if ($scope.item.ruangan != undefined){
					var rg ="&ruangId=" +$scope.item.ruangan.id
				}
				var kp =""
				if ($scope.item.kelompokpasien != undefined){
					var kp ="&kelId=" +$scope.item.kelompokpasien.id
				}
				var dk =""
				if ($scope.item.dokter != undefined){
					var dk ="&dokId=" +$scope.item.dokter.id
				}
				var noorder =""
				if ($scope.item.noKirims != undefined){
					noorder ="&nokirim=" +$scope.item.noKirims
				}
				var jenisDietId =""
				if ($scope.item.jenisDiets != undefined){
					jenisDietId ="&jenisDietId=" +$scope.item.jenisDiets.id
				}
				var jenisWaktuId =""
				if ($scope.item.jenisWaktu != undefined){
					jenisWaktuId ="&jenisWaktuId=" +$scope.item.jenisWaktu.id
				}
				

				$q.all([
					manageServicePhp.getDataTableTransaksi("gizi/get-daftar-kirim?"+
						"tglAwal="+tglAwal+
						"&tglAkhir="+tglAkhir+
						reg+rm+nm+ins+rg+kp+dk+noorder
						+jenisDietId+jenisWaktuId),
					]).then(function(data) {
						$scope.isRouteLoading=false;
						$scope.sourceGrid = new kendo.data.DataSource({
							data: data[0].data.data,
							pageSize: 10,
							total: data[0].data.data.length,
							serverPaging: true,


						});

						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('cacheDaftarKirimGizi', chacePeriode);
					});

				};
				$scope.selectedOnCheck = [];
				$scope.onClick = function(e){
					var element =$(e.currentTarget);

					var checked = element.is(':checked'),
					row = element.closest('tr'),
					grid = $("#kGrid").data("kendoGrid"),
					dataItem = grid.dataItem(row);


					if (checked) {
						var result = $.grep($scope.selectedOnCheck, function(e) { 
							return e.norec_so == dataItem.norec_so;
						});
						if (result.length == 0) {
							$scope.selectedOnCheck.push(dataItem);
						} else {
							for (var i = 0; i < $scope.selectedOnCheck.length; i++)
								if ($scope.selectedOnCheck[i].norec_so === dataItem.norec_so) {
									$scope.selectedOnCheck.splice(i, 1);
									break;
								}
								$scope.selectedOnCheck.push(dataItem);
							}
							row.addClass("k-state-selected");
						} else {
							for (var i = 0; i < $scope.selectedOnCheck.length; i++)
								if ($scope.selectedOnCheck[i].norec_so === dataItem.norec_so) {
									$scope.selectedOnCheck.splice(i, 1);
									break;
								}
								row.removeClass("k-state-selected");
							}
						}
						$scope.columnGrid = [
						// {
						// 	"template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
						// 	"width": 30
						// },
						{
							"field": "tglkirim",
							"title": "Tgl Kirim",
							"width":"80px",
							"template": "<span class='style-left'>{{formatTanggal('#: tglkirim #')}}</span>"
						},
						{
							"field": "nokirim",
							"title": "No Kirim",
							"width":"80px"
						},
						// {
						// 	"field": "noregistrasi",
						// 	"title": "No Reg",
						// 	"width":"80px"
						// },
						// {
						// 	"field": "nocm",
						// 	"title": "No RM",
						// 	"width":"60px"
						// },
						// {
						// 	"field": "namapasien",
						// 	"title": "Nama Pasien",
						// 	"width":"100px"
						// },

						{
							"field": "ruanganasal",
							"title": "Ruangan Asal",
							"width":"150px",
							"template": "<span class='style-left'>#: ruanganasal #</span>"
						},
						// {
						// 	"field": "ruangantujuan",
						// 	"title": "Ruangan Tujuan",
						// 	"width":"150px",
						// 	"template": "<span class='style-left'>#: ruangantujuan #</span>"
						// },
						{
							"field": "pegawaikirim",
							"title": "Petugas",
							"width":"130px",
							"template": "<span class='style-left'>#: pegawaikirim #</span>"
						},
						{
							"field": "keterangan",
							"title": "Keterangan",
							"width":"80px"
						},
						


						];
						$scope.data2 = function(dataItem) {
							for (var i = 0; i < dataItem.details.length; i++) {
								dataItem.details[i].no = i+1

							}
							return {  
								dataSource: new kendo.data.DataSource({
									data: dataItem.details,

								}),
								
								selectable: true,
								columns: [
								
								{
									"field": "noregistrasi",
									"title": "No Regstrasi",
									"width" : "70px",
									// "template": "<span class='style-center'>{{formatTanggal('#: namaproduk #')}}</span>"
								},
								{
									"field": "nocm",
									"title": "No RM",
									"width" : "50px",
								},

								{
									"field": "namapasien",
									"title": "Nama Pasien",
									"width" : "100px",
								},

								{
									"field": "jenisdiet",
									"title": "Jenis Diet",
									"width" : "50px",
								},

								{
									"field": "jeniswaktu",
									"title": "Jenis Waktu",
									"width" : "50px",
								},
								

							// 	{
							// 		"command":[{
							// 			text: "Details", 
							// 			click: detailsKirim, 
							// 			imageClass: "k-icon k-search"
							// 		}
							// // ,{
							// // 	text: "Edit", 
							// // 	click: editOrder, 
							// // 	imageClass: "k-icon k-i-pencil"
							// // }
							// ],
							// title: "",
							// width: "40px",
						// }


						]
					}
				};  
				// 	$scope.data3 = function(dataItem) {
				// 			for (var i = 0; i < dataItem.details2.length; i++) {
				// 				dataItem.details2[i].no = i+1

				// 			}
				// 			return {  
				// 				dataSource: new kendo.data.DataSource({
				// 					data: dataItem.details2,

				// 				}),
								
				// 				selectable: true,
				// 				columns: [
								
				// 				{
				// 					"field": "namaproduk",
				// 					"title": "Nama Menu",
				// 					"width" : "100px",
				// 					// "template": "<span class='style-center'>{{formatTanggal('#: namaproduk #')}}</span>"
				// 				},
				// 				{
				// 					"field": "qtyproduk",
				// 					"title": "Jumlah",
				// 					"width" : "50px",
				// 				},				

				// 			// 	{
				// 			// 		"command":[{
				// 			// 			text: "Details", 
				// 			// 			click: detailsKirim, 
				// 			// 			imageClass: "k-icon k-search"
				// 			// 		}
				// 			// // ,{
				// 			// // 	text: "Edit", 
				// 			// // 	click: editOrder, 
				// 			// // 	imageClass: "k-icon k-i-pencil"
				// 			// // }
				// 			// ],
				// 			// title: "",
				// 			// width: "40px",
				// 		// }


				// 		]
				// 	}
				// };  

				function detailsKirim(e){
					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if(!dataItem){
						toastr.error("Data Tidak Ditemukan");
						return;
					}




				}
				function editOrder(e){
					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if(!dataItem){
						toastr.error("Data Tidak Ditemukan");
						return;
					}
					var tglOrder= moment(dataItem.tglpelayanan).format('YYYY-MM-DD');
					var arrTgl = tglOrder.split('-');
					manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
						+ dataItem.objectjenisdietfk
						+ "&kelasId=" + dataItem.objectkelasfk 
						+ "&siklusKe=" +  arrTgl[2]

						).then(function(z){
							$scope.listMenu=z.data.data;

							$scope.norecOp=dataItem.norec_op;
							$scope.item.tglPelayanan =dataItem.tglpelayanan;
							$scope.item.jenisWaktu = {id:dataItem.objectjeniswaktufk,jeniswaktu:dataItem.jeniswaktu};
							$scope.item.namaMenu = {id:dataItem.objectprodukfk,namaproduk:dataItem.namaproduk};
							$scope.item.jumlah = parseInt(dataItem.qtyproduk);
							$scope.item.jenisDiet = {id:dataItem.objectjenisdietfk,jenisdiet:dataItem.jenisdiet};
							$scope.item.kategoriDiet = {id:dataItem.objectkategorydietfk,kategorydiet:dataItem.kategorydiet};
							$scope.popUpEdit.center().open();

						})


					}
					$scope.updateOrder =function(){
						if ($scope.item.namaMenu==undefined){
							toastr.error('Nama Menu belum dipilih')
							return
						}
						if ($scope.item.jumlah==undefined || $scope.item.jumlah==0 ){
							toastr.error('Jumlah tidak boleh kosong')
							return
						}
						var objUpdate ={
							"norec_op" : $scope.norecOp,
							"tglpelayanan" : $scope.item.tglPelayanan,
							"objectjeniswaktufk" : $scope.item.jenisWaktu != undefined ? $scope.item.jenisWaktu.id : null,
							"objectprodukfk" : $scope.item.namaMenu.id,
							"qtyproduk" :  $scope.item.jumlah ,
							"objectjenisdietfk" : $scope.item.jenisDiet != undefined ? $scope.item.jenisDiet.id : null,
							"objectkategorydietfk" : $scope.item.kategoriDiet != undefined ? $scope.item.kategoriDiet.id : null,
						}
						manageServicePhp.updateOrderPelayananGizi(objUpdate).then(function(res){
							if(res.status === 201){
								loadData();

							}
						})

					}

					function hapusOrder(e){
						e.preventDefault();
						var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

						if(!dataItem){
							toastr.error("Data Tidak Ditemukan");
							return;
						}
						var itemDelete = {
							"norec_op": dataItem.norec_op
						}

						manageServicePhp.deleteOrderPelayananGizi(itemDelete).then(function(e){
							if(e.status === 201){
								loadData();
								grid.removeRow(row);
							}
						})

					}

					$scope.OrderBarangLogistik=function(){
						if ($scope.selectedOnCheck.length == 0 ){
							toastr.error('Pilih Data Dulu')
							return
						}
						var a = ''
						var b = ''
						for (var i =  $scope.selectedOnCheck.length - 1; i >= 0; i--) {
							var c = $scope.selectedOnCheck[i].norec_so
							b = ','+ c
							a = a + b
						}
						var listNorec = a.slice(1, a.length)
						
						var chacePeriode ={ 0 : listNorec ,
							1 : 'OrderGizi',
							2 : '',
							3 : '', 
							4 : '',
							5 : '',
							6 : ''
						}
						cacheHelper.set('OrderBarangGiziCtrl', chacePeriode);

						$state.go('OrderBarangGizi');

					}


					$scope.kirimMenu =function(){
						if ($scope.dataPasienSelected != undefined){
							var cache ={ 0 : $scope.dataPasienSelected.norec_so ,
								1 : $scope.dataPasienSelected,
								2 : 'Kirim Menu',
								3 : '', 
								4 : '',
								5 : '',
								6 : ''
							}
							cacheHelper.set('cacheKirimMenu', cache);
							$state.go('KirimMenuMakananPasienRev');
						}
						else{
							toastr.error('Pilih Data Dulu')

						}
					}

					$scope.showCetak = function(){

						if ($scope.dataPasienSelected == undefined){
							toastr.error('Pilih data terlebih dahulu')
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
						client.get('http://127.0.0.1:1237/printvb/gizi?cetak-label-gizi=' + $scope.dataPasienSelected.norec_sk + '&view=false&qty=' + $scope.popUpCetakLabel.qty, function(response) {

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



					$scope.ubahKirim = function (){
						if ($scope.dataPasienSelected == undefined){
							toastr.error('Pilih data dulu')
							return
						}

						$scope.item.tglKirim =$scope.dataPasienSelected.tglkirim;
						$scope.item.noKirim =$scope.dataPasienSelected.nokirim;
						$scope.item.pengirim =$scope.dataPasienSelected.pegawaikirim;
						$scope.item.jumlahKirim =$scope.dataPasienSelected.qtyproduk

						// manageServicePhp.getDataTableTransaksi("gizi/get-pasien-bynoregistrasi?noReg="+$scope.dataPasienSelected.noregistrasi)         
						// .then(function (e) {
						// 	$scope.item.pasien=e.data.data[0]; 
						// })
						data2 =$scope.dataPasienSelected.details2
						$scope.norecSK =$scope.dataPasienSelected.norec_sk
						for (var i = 0; i < data2.length; i++) {
							data2[i].no = i + 1
						}

						$scope.souceGridMenu = new kendo.data.DataSource({
							data: data2
						});

						

						$scope.popUpMenu.center().open();

						var actions = $scope.popUpMenu.options.actions;
						actions.splice(actions.indexOf("Close"), 1);
						$scope.popUpMenu.setOptions({ actions : actions });
					}

					
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

					},


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
							"objectruanganasalfk" :$scope.dataPasienSelected.objectruanganasalfk,
							// "objectruangantujuanfk" :$scope.dataPasienSelected.objectruangantujuanfk,
							// "norec_pd" : $scope.item.pasien.norec_pd,
							"qtyproduk" : data2.length ,
							"details":data2,
						}  
						var post ={
							"strukkirim" :objSave
						}
						manageServicePhp.saveKirimMenuMakanan(post).then(function(e) {
							if (e.status ==201){
								$scope.batal();   
								loadData   	 
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
					/*END */


				}
				]);
});