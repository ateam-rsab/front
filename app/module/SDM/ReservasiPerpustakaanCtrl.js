define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReservasiPerpustakaanCtrl', ['CacheHelper','$timeout','$rootScope', '$scope', 'ModelItem','$state','ManageServicePhp',
		function(cacheHelper,$timeout,$rootScope, $scope, ModelItem,$state,manageServicePhp ) {
			
			$scope.item = {};
			$scope.popup = {};
			
			$scope.now = new Date();

			$scope.dataVOloaded = true;
			$scope.item.tanggalPinjam =new Date();

			var data2= [];

			LoadCache();

			function LoadCache(){
				var cacheGet = cacheHelper.get('editReservasi');
				if(cacheGet != undefined){
					data2.push(cacheGet);

					init()
					var cacheGet =undefined
					cacheHelper.set('editReservasi', cacheGet);
				}else{
					init()
				}
			}

			function init(){
				$scope.sourceReservasi = new kendo.data.DataSource({
					data: data2
				});
			}
			getBuku();
			$scope.cariAnggota = function(){
				$scope.popupAnggota.center().open();
				getAnggota();

			}


			$scope.columnReservasi = [
			{
				"field": "no",
				"title": "No",
				"width": "10%"
			},
			{
				"field": "noanggota",
				"title": "No Anggota",
				"width": "40%"
			},
			{
				"field": "nama",
				"title": "Nama",
				"width": "40%"
			},
			{
				"field": "judulbuku",
				"title": "Judul Buku/ISSN",
				"width": "40%"
			},
			{
				"field": "kodeeksemplar",
				"title": "Kode Eksemplar",
				"width": "40%"
			},
			{
				"field": "tanggalpinjam",
				"title": "Tanggal Pinjam",
				"width": "30%",
				"template": "#= new moment(new Date(tanggalpinjam)).format('DD-MM-YYYY') #"
			},
			{
				"field": "tanggalkembali",
				"title": "Tanggal Harus Kembali",
				"width": "30%",
				"template": "#= new moment(new Date(tanggalkembali)).format('DD-MM-YYYY') #"
			},

			];

			$scope.$on("kendoWidgetCreated", function(event, widget) {
				$scope.item.nomorAnggota =''
				if (widget === $scope.grid) {
					$scope.grid.element.on('dblclick', function(e) {
						$scope.norecAnggota =	$scope.item.norec;
						$scope.popupAnggota.close();
						$scope.item.tanggalPinjam =new Date();
					}
					);
				}
			});

			$scope.columnAnggota = [
			{
				"field": "nomoranggota",
				"title": "No Anggota",

			},
			{
				"field": "tipekeanggotaan",
				"title": "Tipe Keanggotaan",

			}, {
				"field": "tanggal",
				"title": "Tanggal",
				"template": '# if( tanggal==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tanggal), "dd-MM-yyyy HH:mm") #<span>#} #',

			},
			{
				"field": "nama",
				"title": "Nama",
			}, {
				"field": "jeniskelamin",
				"title": "Jenis Kelamin",

			}, {
				"field": "tanggallahir",
				"title": "Tanggal Lahir",
				"template": '# if( tanggallahir==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tanggallahir), "dd-MM-yyyy") #<span>#} #',

			}, {
				"field": "nomorhp",
				"title": "No Hp"
			}, ];

			function getAnggota (){				
				manageServicePhp.getDataTableTransaksi("perpustakaan/get-registrasi-keanggotaan"

					).then(function (e) {
						$scope.sourceAnggota = new kendo.data.DataSource({
							data : e.data.data,
							pageSize :10,
						});
					})

				}

				var timeoutPromise;
				$scope.$watch('popup.nomorAnggota', function(newVal, oldVal){
					if(newVal  && newVal !== oldVal){
						applyFilter("nomoranggota", newVal)
					}
				})
				$scope.$watch('popup.namaAnggota', function(newVal, oldVal){
					$timeout.cancel(timeoutPromise);
					timeoutPromise = $timeout(function(){
						if(newVal && newVal !== oldVal){
							applyFilter("nama", newVal)
						}
					}, 500)
				})
				function applyFilter(filterField, filterValue){
					var dataGrid = $("#kgridAnggota").data("kendoGrid");
					var currFilterObject = dataGrid.dataSource.filter();
					var currentFilters = currFilterObject ? currFilterObject.filters : [];

					if (currentFilters && currentFilters.length > 0){
						for(var i = 0; i < currentFilters.length; i++){
							if(currentFilters[i].field == filterField){
								currentFilters.splice(i, 1);
								break;
							}
						}
					}

					if(filterValue.id){
						currentFilters.push({
							field: filterField,
							operator: "eq",
							value: filterValue.id
						});
					} else {
						currentFilters.push({
							field: filterField,
							operator: "contains",
							value: filterValue
						})
					}

					dataGrid.dataSource.filter({
						logic: "and",
						filters: currentFilters
					})
				}
				$scope.resetFilter = function(){
					var dataGrid = $("#kgridAnggota").data("kendoGrid");
					dataGrid.dataSource.filter({});
					$scope.popup = {};
				}

				function getBuku(){
					manageServicePhp.getDataTableTransaksi("perpustakaan/get-bibliography-buku"	
						).then(function (e) {
							$scope.listJudulBuku = e.data.data
						})
					}


					$scope.getEksemplar=function(data){
						$scope.item.kodeEksemplar = data.kodeeksemplar
						var idTipeAnggota= ""
						if ($scope.item.tipekeanggotaanfk != undefined)
							idTipeAnggota=$scope.item.tipekeanggotaanfk 

						var idTipeKoleksi= ""
						if (data.tipekoleksifk  != undefined)
							idTipeKoleksi=data.tipekoleksifk 

						manageServicePhp.getDataTableTransaksi("perpustakaan/get-periodepinjam-buku?"
							+ "idTipeAnggota=" + idTipeAnggota
							+ "&idTipeKoleksi=" + idTipeKoleksi
							).then(function (e) {
								$scope.periodePinjam = e.data.data[0];
								if ($scope.periodePinjam != undefined){
									var hari = $scope.periodePinjam.periodepinjam.split('hari');
									debugger
									$scope.maxHariPinjamBuku= parseFloat(hari[0])
								}
							})
						}


						$scope.tambah = function(){
							if ($scope.item.nama == undefined) {
								toastr.error("Nama Anggota harus di isi!")
								return;
							}
							if ($scope.item.judulBuku == undefined) {
								toastr.error("Judul Buku harus di pilih!")
								return;
							}
							if ($scope.item.tanggalPinjam == undefined) {
								toastr.error("Tanggal Pinjam harus di isi!")
								return;
							}
							// if ($scope.item.tanggalKembali == undefined) {
							// 	toastr.error("Tanggal Kembali harus di isi!")
							// 	return;
							// }


							var nomor =0
							if ($scope.sourceReservasi == undefined) {
								nomor = 1
							}else{
								nomor = data2.length+1
							}
							var data ={};
							if ($scope.item.no != undefined){
								for (var i = data2.length - 1; i >= 0; i--) {
									if (data2[i].no ==  $scope.item.no){
										var targetDate = new Date($scope.item.tanggalPinjam);
										var newDate = kendo.date.addDays(targetDate, $scope.maxHariPinjamBuku);
										console.log(newDate);
										data.norec_rs =	$scope.norecRs
										data.no = $scope.item.no
										data.norecanggota=	$scope.norecAnggota
										data.noanggota = $scope.item.nomoranggota
										data.nama = $scope.item.nama
										data.judulbuku = $scope.item.judulBuku.judulbuku
										data.norecbuku = $scope.item.judulBuku.norec
										data.kodeeksemplar = $scope.item.kodeEksemplar
										data.tanggalpinjam = moment($scope.item.tanggalPinjam).format('YYYY-MM-DD')
										data.tanggalkembali = moment(newDate).format('YYYY-MM-DD')//$scope.item.tanggalKembali
										data.tipekeanggotaan =$scope.item.tipekeanggotaan
										data2[i] = data;
										$scope.sourceReservasi = new kendo.data.DataSource({
											data: data2
										});
									}
								}

							}else{
								var targetDate = new Date($scope.item.tanggalPinjam);
								var newDate = kendo.date.addDays(targetDate, $scope.maxHariPinjamBuku);
								console.log(newDate);

								data={
									norec_rs:"",
									no:nomor,
									norecanggota:$scope.norecAnggota,
									noanggota : $scope.item.nomoranggota,
									nama : $scope.item.nama,
									judulbuku: $scope.item.judulBuku.judulbuku,
									norecbuku :$scope.item.judulBuku.norec,
									kodeeksemplar: $scope.item.kodeEksemplar,
									tanggalpinjam : moment($scope.item.tanggalPinjam).format('YYYY-MM-DD'),
									tanggalkembali : moment(newDate).format('YYYY-MM-DD') ,//$scope.item.tanggalKembali,
									tipekeanggotaan :$scope.item.tipekeanggotaan
								}
								data2.push(data)
								$scope.sourceReservasi = new kendo.data.DataSource({
									data: data2
								});
							}
							clear();
						}
						$scope.klikReserv = function(dataSelected){
							var dataMenu =[];

							$scope.item.no = dataSelected.no
							for (var i = $scope.listJudulBuku.length - 1; i >= 0; i--) {
								if ($scope.listJudulBuku[i].norec == dataSelected.norecbuku){
									dataMenu = $scope.listJudulBuku[i]
									break;
								}
							}
							if (dataSelected.norecanggota != undefined)
								$scope.norecAnggota=dataSelected.norecanggota 
							if (dataSelected.norec_rs != undefined)
								$scope.norecRs=dataSelected.norec_rs 
							$scope.item.nomoranggota=dataSelected.noanggota 
							$scope.item.judulBuku=dataMenu
							$scope.item.nomoranggota=dataSelected.noanggota 
							$scope.item.nama=dataSelected.nama 
							$scope.item.kodeEksemplar=dataSelected.kodeeksemplar
							$scope.item.tanggalPinjam=dataSelected.tanggalpinjam 
							$scope.item.tanggalKembali=dataSelected.tanggalkembali 
							$scope.item.tipekeanggotaan=dataSelected.tipekeanggotaan

						}
						$scope.hapus = function(){
							if ($scope.item.nama == undefined) {
								toastr.error("Nama Anggota harus di isi!")
								return;
							}
							var nomor =0
							if ($scope.sourceReservasi == undefined) {
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
										$scope.sourceReservasi = new kendo.data.DataSource({
											data: data2
										});
									}
								}

							}clear();
						}
						function clear(){
							delete $scope.item.nomoranggota
							delete $scope.item.nama
							delete $scope.item.judulBuku
							delete $scope.item.tipekeanggotaan
							delete $scope.item.kodeEksemplar
						// delete $scope.item.tanggalPinjam
						delete $scope.item.tanggalKembali
						delete $scope.item.no
					}
					$scope.batal= function(){
						data2=[]
						$scope.sourceReservasi = new kendo.data.DataSource({
							data: data2
						});
						clear();
					}
					$scope.Save = function(){		
						if (data2.length == 0) {
							toastr.error("Pilih Reservasi terlebih dahulu!!")
							return
						}

						var objSave = { 
							"details":data2,
						}  
						
						manageServicePhp.saveDataTransaksi("perpustakaan/save-reservasi-perpus",objSave).then(function (e) {
							if (e.status ==201){
								$scope.batal()
								data2= []

							}
						}); 
						

					}
					$scope.Back= function(){
						data2= []
						clear();  
					}




				}
				]);
})