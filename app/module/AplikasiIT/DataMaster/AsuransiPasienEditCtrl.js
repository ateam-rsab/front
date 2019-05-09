define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AsuransiPasienEditCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp','$state','CacheHelper',
	function($q, $rootScope, $scope,ManagePhp,$state,cacheHelper) {
		$scope.item = {};
		$scope.dataVOloaded = true;
		$scope.now = new Date();

	 	var init = function () {
			loadData();	
		}


		init();

		function loadData() {

			var cache=cacheHelper.get('CacheFormAsuransiPasien')	
				if (cache != undefined){
						$scope.item.id= cache.id
						
						
						// $scope.item.account = {id:cache.objectaccountfk,namaaccount:cache.namaaccount};

						
						$scope.item.alamatlengkap = cache.alamatlengkap;

						// $scope.item.golonganasuransi = cache.golonganasuransi;
						// $scope.item.golonganasuransiId = cache.golonganasuransiid;
						$scope.item.golonganasuransi = {id:cache.objectgolonganasuransifk,golonganasuransi:cache.golonganasuransi};
						

						// $scope.item.hubunganpeserta = cache.hubunganpeserta;
						// $scope.item.hubunganpesertaid = cache.hubunganpesertaid;
						$scope.item.hubunganpeserta = {id:cache.objecthubunganpesertafk,hubunganpeserta:cache.hubunganpeserta};

						$scope.item.kdinstitusiasal = cache.kdinstitusiasal;

						// $scope.item.jeniskelamin = cache.jeniskelamin;
						// $scope.item.jeniskelaminid = cache.jeniskelaminid;
						$scope.item.jeniskelamin = {id:cache.objectjeniskelaminfk,jeniskelamin:cache.jeniskelamin};

						// $scope.item.kelasdijamin = cache.kelasdijamin;
						// $scope.item.kelasdijaminid = cache.kelasdijaminid;
						$scope.item.kelasdijamin = {id:cache.objectkelasdijaminfk,namakelas:cache.namakelas};
						

						$scope.item.kdLastunitbagian = cache.kdLastunitbagian;
						$scope.item.pegawai = cache.pegawai;
						$scope.item.pegawaiid = cache.pegawaiid;
						
						// $scope.item.kdpenjaminpasien = cache.kdpenjaminpasien;
						$scope.item.penjaminpasien = {id:cache.kdpenjaminpasien,namarekanan:cache.namarekanan};

						$scope.item.lastunitbagian = cache.lastunitbagian;
						$scope.item.namapeserta = cache.namapeserta;
						$scope.item.nikinstitusiasal = cache.nikinstitusiasal;
						$scope.item.nippns = cache.nippns;
						$scope.item.noasuransi = cache.noasuransi;
						$scope.item.noasuransihead = cache.noasuransihead;
						// $scope.item.nocm = cache.nocm;
						$scope.item.nocmfk = cache.nocmfk;
						$scope.item.noidentitas = cache.noidentitas;
						$scope.item.notelpfixed = cache.notelpfixed;
						$scope.item.notelpmobile = cache.notelpmobile;
						$scope.item.qasuransi = cache.qasuransi;
						$scope.item.tglakhirberlakulast = cache.tglakhirberlakulast;
						$scope.item.tgllahir = cache.tgllahir;
						$scope.item.tglmulaiberlakulast = cache.tglmulaiberlakulast;
						$scope.item.id = cache.id;
						$scope.item.noRec = cache.norec;
						$scope.item.reportdisplay = cache.reportdisplay;

						$scope.item.kdprovider = cache.kdprovider;
						$scope.item.nmprovider = cache.nmprovider;

						$scope.item.kodeexternal = cache.kodeexternal;
						$scope.item.namaexternal = cache.namaexternal;
						$scope.item.statusenabled = cache.statusenabled;

				}
		}


		$scope.cari = function () {
			
			loadData()
		}  

		$scope.hapus = function () {
			ManagePhp.getData("asuransi-pasien/hapus-asuransi-pasien?id="+$scope.item.id).then(function (e) {
			
				if (e.Status=400){
					toastr.error(e.data.message);
				}else{
					$scope.item = {};
					toastr.success(e.data.message);
					init();
					
				}
					

				});
		}

		ManagePhp.getData("asuransi-pasien/get-data-for-combo-in-form-asuransi-pasien").then(
			function(dat){
				$scope.listjeniskelamin= dat.data.jeniskelamin;
				$scope.listhubunganpeserta= dat.data.hubunganpeserta;
				$scope.listpenjaminpasien= dat.data.penjaminpasien;
				$scope.listgolonganasuransi= dat.data.golonganasuransi;
				$scope.listkelasdijamin= dat.data.kelasdijamin;
				// $scope.listnocm= dat.data.nocm;
			}
		);

		
		function enableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				

				ManagePhp.getData("asuransipasien/update-status-enabled-asuransi-pasien?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
						toastr.success(dat.data.message);
						init();
				 });
			}

		function disableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				var itemDelete = {
					"id": dataItem.id
				}

				ManagePhp.getData("asuransipasien/update-status-enabled-asuransi-pasien?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 toastr.success(dat.data.message);
				 init();
				 });
		} 


		//// save 
		$scope.simpan = function(){
				
					var noasuransi=null;
					var jeniskelaminid=null;

					var hubunganpesertaid=null;
					var kdpenjaminpasien=null;
					var golonganasuransiid=null;
					var kelasdijaminid=null;


					if ($scope.item.noasuransi == undefined || $scope.item.noasuransi=="") {
						alert("Nomor asuransi harus di isi!")
						return
					}else{
						noasuransi = $scope.item.noasuransi
					}
					
					if ($scope.item.jeniskelamin.id == undefined || $scope.item.jeniskelamin.id=="") {
						alert("Jenis kelamin harus di isi!")
						return
					}else{
						jeniskelaminid = $scope.item.jeniskelamin.id
					}

					if ($scope.item.hubunganpeserta.id == undefined || $scope.item.hubunganpeserta.id=="") {
						alert("Hubungan peserta harus di isi!")
						return
					}else{
						hubunganpesertaid = $scope.item.hubunganpeserta.id
					}

					if ($scope.item.penjaminpasien.id == undefined || $scope.item.penjaminpasien.id=="") {
						alert("Penjamin pasien harus di isi!")
						return
					}else{
						kdpenjaminpasien = $scope.item.penjaminpasien.id
					}

					if ($scope.item.golonganasuransi.id == undefined || $scope.item.golonganasuransi.id=="") {
						alert("Golongan asuransi harus di isi!")
						return
					}else{
						golonganasuransiid = $scope.item.golonganasuransi.id
					}

					if ($scope.item.kelasdijamin.id == undefined || $scope.item.kelasdijamin.id=="") {
						alert("Kelas dijamin harus di isi!")
						return
					}else{
						kelasdijaminid = $scope.item.kelasdijamin.id
					}

					
					debugger
					var data = {

						alamatlengkap:$scope.item.alamatlengkap,
						golonganasuransiid:$scope.item.golonganasuransi.id,
						hubunganpesertaid:$scope.item.hubunganpeserta.id,
						kdinstitusiasal:$scope.item.kdinstitusiasal,
						jeniskelaminid:$scope.item.jeniskelamin.id,
						kelasdijaminid:$scope.item.kelasdijamin.id,
						kdpenjaminpasien:$scope.item.penjaminpasien.id,
						namapeserta:$scope.item.namapeserta,
						nikinstitusiasal:$scope.item.nikinstitusiasal,
						nippns:$scope.item.nippns,
						noasuransi:$scope.item.noasuransi,
						// nocmid:$scope.item.nocmid,
						// nocm:$scope.item.nocm,
						nocmfk:$scope.item.nocmfk,
						noidentitas:$scope.item.noidentitas,
						notelpfixed:$scope.item.notelpfixed,
						notelpmobile:$scope.item.notelpmobile,
						qasuransi:$scope.item.qasuransi,
						tglakhirberlakulast:$scope.item.tglakhirberlakulast,
						tgllahir:$scope.item.tgllahir,
						tglmulaiberlakulast:$scope.item.tglmulaiberlakulast,
						id:$scope.item.id,
						reportdisplay:$scope.item.reportdisplay,
						
						kdprovider:$scope.item.kdprovider,
						nmprovider:$scope.item.nmprovider,

						kodeexternal:$scope.item.kodeexternal,
						namaexternal:$scope.item.namaexternal,
						
					}

					var objSave =
					{
						asuransipasien: data

					}
				
					ManagePhp.postData2("asuransi-pasien/post-asuransi-pasien",objSave).then(function (e) {

						loadData();
						$scope.item = {};
						

					});
				
			}
		 
		


		$scope.batal = function () {
			$scope.showEdit = false;
			cacheHelper.set('CacheFormAsuransiPasien','');
			$scope.item = {};
		}

		$scope.hapus = function () {
			debugger
			ManagePhp.getData("asuransi-pasien/hapus-asuransi-pasien?id="+$scope.item.id).then(
				function (e) {
					
					debugger
					if (e.data.status==201){
						$scope.item = {};
						toastr.success(e.data.message);
						init();
					}else{
						toastr.error(e.data.message);
						
						
					}
					

				}
			);
		}


}
]);
});
