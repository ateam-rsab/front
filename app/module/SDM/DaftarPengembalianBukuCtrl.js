define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengembalianBukuCtrl', ['CacheHelper','$timeout','$rootScope', '$scope', 'ModelItem','$state','ManageServicePhp',
		function(cacheHelper,$timeout,$rootScope, $scope, ModelItem,$state,manageServicePhp ) {
			
			$scope.item = {};

			
			$scope.now = new Date();
			$scope.isRouteLoading=false;
			$scope.dataVOloaded = true;
			$scope.item.periodeAwal =new Date();
			$scope.item.periodeAkhir =new Date();
			loadCombo();
			loadData();

			// $scope.$on("kendoWidgetCreated", function(event, widget) {
			// 	debugger	
			// 	if (widget === $scope.kGrid) {
			// 		$scope.kGrid.element.on('dblclick', function(e) {

			// 			if ($state.current.name === 'CariBuku') {

			// 				var param = $state.params;
			// 				param.judulBuku= $scope.dataSelected.judulbuku;
			// 				param.kodeEksemplar=$scope.dataSelected.kodeeksemplar;
			// 				param.noReg= $scope.dataSelected.norec;

			// 				$state.go('PengembalianRev', param);
			// 			}
			// 		});
			// 	}
			// });	
			function loadCombo (){
				var chacePeriode = cacheHelper.get('cacheReserv');
				if(chacePeriode != undefined){
					
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);	

				}else{
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;

				}
				manageServicePhp.getDataTableTransaksi("perpustakaan/get-combo")
				.then(function(e) {
					$scope.listTipeKeanggotaan = e.data.tipekeanggotaan

				})

				manageServicePhp.getDataTableTransaksi("perpustakaan/get-bibliography-buku")
				.then(function(da) {
					$scope.listJudulBuku= da.data.data
				})

			}
			$scope.Search = function(){
				loadData()
			}
			$scope.Clear = function(){
				delete $scope.item.judulBuku
				delete $scope.item.tipeAnggota
				delete $scope.item.nama
				delete $scope.item.namaPengarang
				loadData()

			}
			function loadData(){
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var judulBuku =""
				if ($scope.item.judulBuku != undefined){
					judulBuku ="&judulBuku=" +$scope.item.judulBuku
				}
				var tipeAnggota =""
				if ($scope.item.tipeAnggota != undefined){
					tipeAnggota ="&tipeAnggota=" +$scope.item.tipeAnggota
				}	
				var nama =""
				if ($scope.item.nama != undefined){
					nama ="&nama=" +$scope.item.nama
				}
				var namaPengarang =""
				if ($scope.item.namaPengarang != undefined){
					namaPengarang ="&namaPengarang=" +$scope.item.namaPengarang
				}


				manageServicePhp.getDataTableTransaksi("perpustakaan/get-daftar-pengembalian?"+
					"tglAwal="+tglAwal+
					"&tglAkhir="+tglAkhir+
					judulBuku
					+tipeAnggota
					+nama
					+namaPengarang)
				.then(function(data) {
					$scope.isRouteLoading=false;
					var result=data.data.data
					for (var i = 0; i < result.length; i++) {
						result[i].no = i+1;
						debugger
						var tkembali = new Date(result[i].tanggalkembali);
						var tglPengembalian =  new Date(result[i].tanggalpengembalian);
						var dateRange = (tglPengembalian - tkembali)/ 86400000
		
						result[i].haritelat =dateRange + ' Hari'
						result[i].judulbuku = result[i].judulbuku + ' - ' + result[i].issn
					}
					$scope.sourceReservasi = new kendo.data.DataSource({
						data: result,
						pageSize: 20,
						serverPaging: true,
					});

					var chacePeriode = tglAwal + "~" + tglAkhir;
					cacheHelper.set('cacheReserv', chacePeriode);
				});

			}  ;
			$scope.columnReservasi = [
			{
				"field": "no",
				"title": "No",
				"width": "10%"
			},
			{
				"field": "nomoranggota",
				"title": "No Anggota",
				"width": "40%"
			},
			{
				"field": "nama",
				"title": "Nama Peminjam",
				"width": "40%"
			},
			{
				"field": "tipekeanggotaan",
				"title": "Tipe Anggota",
				"width": "40%"
			},
			{
				"field": "judulbuku",
				"title": "Judul Buku/ISSN",
				"width": "40%"
			},
			{
				"field": "namapengarang",
				"title": "Pengarang ",
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
			
			{
				"field": "tanggalpengembalian",
				"title": "Tanggal Pengembalian",
				"width": "30%",
				"template": "#= new moment(new Date(tanggalpengembalian)).format('DD-MM-YYYY') #"
			},
			{
				"field": "haritelat",
				"title": "Telat",
				"width": "30%",
			
			},
			{
				"field": "dendaharian",
				"title": "Denda Harian",
				"width": "30%",
				"template": "<span class='style-right'>{{formatRupiah('#: dendaharian #', '')}}</span>"
			},
			{
				"field": "jumlahdenda",
				"title": "Jumlah Denda",
				"width": "30%",
				"template": "<span class='style-right'>{{formatRupiah('#: jumlahdenda #', '')}}</span>"
			}



			];
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
			$scope.Hapus = function(){
				if ($scope.dataSelected == undefined){
					toastr.error('Pilih data Dulu')
					return
				}
				if($scope.dataSelected.status == 'dikembalikan'){
					toastr.error('Tidak bisa di hapus, sudah dikembalikan')
					return
				}
				var itemDelete = {
					"norec": $scope.dataSelected.norec_rs
				}

				manageServicePhp.saveDataTransaksi("perpustakaan/delete-reservasi-perpus",itemDelete).then(function(e){
					if(e.status === 201){
						loadData();

					}
				})
			}
			$scope.Edit= function(){
				if ($scope.dataSelected == undefined){
					toastr.error('Pilih data Dulu')
					return
				}

				
				manageServicePhp.getDataTableTransaksi("perpustakaan/get-reservasi-perpus?"
					+ "reservasiFk=" + $scope.dataSelected.reservasifk 
					).then(function(e){
						if (e.data.data.length > 0){
							var cache =e.data.data[0];
							cacheHelper.set('cachePengembalian', cache);
							cacheHelper.set('cacheNorec', 	$scope.dataSelected.norec);

							$state.go('PengembalianRev');
						}

					})



				} 






			}
			]);
})