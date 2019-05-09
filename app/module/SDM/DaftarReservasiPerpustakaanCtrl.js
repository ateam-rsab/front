define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarReservasiPerpustakaanCtrl', ['CacheHelper','$timeout','$rootScope', '$scope', 'ModelItem','$state','ManageServicePhp',
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
					judulBuku ="&judulBuku=" +$scope.item.judulBuku.norec
				}
				var tipeAnggota =""
				if ($scope.item.tipeAnggota != undefined){
					tipeAnggota ="&tipeAnggota=" +$scope.item.tipeAnggota.id
				}	
				var nama =""
				if ($scope.item.nama != undefined){
					nama ="&nama=" +$scope.item.nama
				}
				var namaPengarang =""
				if ($scope.item.namaPengarang != undefined){
					namaPengarang ="&namaPengarang=" +$scope.item.namaPengarang
				}


				manageServicePhp.getDataTableTransaksi("perpustakaan/get-reservasi-perpus?"+
					"tglAwal="+tglAwal+
					"&tglAkhir="+tglAkhir+
					judulBuku
					+tipeAnggota
					+nama
					+namaPengarang)
				.then(function(data) {
					$scope.isRouteLoading=false;
					for (var i = 0; i < data.data.data.length; i++) {
						data.data.data[i].no = i+1
					}
					$scope.sourceReservasi = new kendo.data.DataSource({
						data: data.data.data,
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
				"field": "namapengarang",
				"title": "Pengarang ",
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
			{
				"field": "status",
				"title": "Status",
				"width": "30%",
				// "template": "#= new moment(new Date(tanggalkembali)).format('DD-MM-YYYY') #"
			},
			{
				"field": "tipekeanggotaan",
				"title": "Tipe Anggota",
				"width": "40%"
			},

			];
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
				if($scope.dataSelected.status == 'dikembalikan'){
					toastr.error('Tidak bisa di edit, sudah dikembalikan')
					return
				}
				var cache= $scope.dataSelected 
				cacheHelper.set('editReservasi', cache);
				$state.go('ReservasiPerpustakaan');


			} 
			$scope.Kembali = function(){

				if ($scope.dataSelected == undefined){
					toastr.error('Pilih data Dulu')
					return
				}
				if($scope.dataSelected.status == 'dikembalikan'){
					toastr.error('Sudah Dikembalikan')
					return
				}
				var cache= $scope.dataSelected 
				cacheHelper.set('cachePengembalian', cache);
				$state.go('PengembalianRev');
			}






		}
		]);
})