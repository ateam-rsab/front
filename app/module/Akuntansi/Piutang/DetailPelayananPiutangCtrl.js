define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailPelayananPiutangCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			
			debugger;	
			$scope.dataParams = JSON.parse($state.params.dataPasien);
			var dariSini = "";
			var noRegistrasi = "";
			if($scope.dataParams.splitString != undefined){
				var strFilter = $scope.dataParams.splitString;
				var arrFilter= strFilter.split('~');
				noRegistrasi = arrFilter[0];
				dariSini = arrFilter[1];
			};

			modelItemAkuntansi.getDataTableTransaksi("tatarekening/detail-tagihan/"+ noRegistrasi ).then(function(data){
				$scope.dataDetailPelayanan=data.details;
				$scope.item.nama = data.namaPasien;
				$scope.item.total = data.totalKlaim;
				$scope.item.jenisPiutang = data.jenisPasien;
				$scope.item.ruangan = data.lastRuangan;
			});

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};

			$scope.columnDetailPelayanan = [
			{
				"field": "tglPelayanan",
				"title": "Tanggal",
				"width":"150px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglPelayanan #')}}</span>"
			},
			{
				"field": "namaPelayanan",
				"title": "Nama Pelayanan",
				"width":"200px",
			},
			{
				"field": "dokter",
				"title": "Dokter",
				"width":"150px",
			},
			{
				"field": "jumlah",
				"title": "Jumlah",
				"width":"70px",
				"template": "<span class='style-right'>#: jumlah #</span>"
			},
			{
				"field": "harga",
				"title": "Harga",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
			},
			{
				"field": "total",
				"title": "Total",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
			}
			];


			function showButton(){
				$scope.showBtnCetak = true;
				$scope.showBtnBack = true;
			}

			showButton();

			$scope.Back = function(){
				$state.go(dariSini);
			};
			//////////////////////////////////////////

		}
		]);
});