define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailCollectingPiutangCtrl', ['$state','$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',	
		function($state,$q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

			$scope.dataParams = JSON.parse($state.params.dataCollect);
			var strFilter = $scope.dataParams.splitString;
			var arrFilter = strFilter.split('~');
			var noPostingC = arrFilter[0];

			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.item = {};
			//$scope.item.namaCollector = "Agus";
			//$scope.item.tglCollect = "31 Januari 2017";
			//$scope.item.totalKlaim = "Rp. 10.000.000,00";
			//$scope.item.totalPasien = "5";

			//http://172.16.16.118:8200/service/transaksi/piutang/collected-piutang-layanan/C000000002
				
			modelItemAkuntansi.getDataTableTransaksi("piutang/collected-piutang-layanan/" + noPostingC).then(function(data){
				$scope.dataSource = new kendo.data.DataSource({
					data: data,
					total: data.length,
					group: [
                        {field: "jenisPasien"},
                        {field: "namarekanan"}
                    ]
				});
				// $scope.dataSource = data;
				for (var i = 0; i < data.length; i++) {
					data[i].sisa =parseFloat(data[i].tarifinacbgs) - parseFloat(data[i].totalBayar);
					// data[i].totalKlaimBPJS = parseFloat(data[i].tarifselisihklaim)- parseFloat(data[i].totalKlaim);
				}
				if(data != undefined){
					$scope.item.noCollect = data[0].noPosting;
					$scope.item.namaCollector = data[0].collector;
					$scope.item.tglCollect = data[0].tglPosting;
				};
				//debugger;
				var ttlPasien = 0;
				var ttlKlaim = 0;
				for(var i=0; i<data.length; i++){
					ttlPasien = ttlPasien + 1;
					ttlKlaim = ttlKlaim + parseFloat(data[i].sisa);
				};
				$scope.item.totalPasien = ttlPasien;

				// $scope.item.totalKlaim = ttlKlaim
				$scope.item.totalKlaim = 'Rp. ' +  parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
			});

			$scope.BatalCollect = function(){
				var stt = 'false'
                if (confirm('Batalkan collecting? ')){
                    // Save it!
                    modelItemAkuntansi.getDataTableTransaksi("piutang/batal-collected-piutang-layanan?noposting=" + noPostingC).then(function(data){
					
					})
					$state.go('DaftarCollectingPiutang');	
                }else {
                    // Do nothing!
                    stt='false'
                }
				
				
			}
			// $scope.dataSource = new kendo.data.DataSource({
			// 	pageSize: 10,
			// 	data: $scope.dataCollectingPiutang,
			// 	autoSync: true
	  //       });

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}
			$scope.columCollecting = [
			{
				"field": "tglTransaksi",
				"title": "Tgl Registrasi"
			},
			{
				"field": "noRegistrasi",
				"title": "No Registrasi"
			},
			{
				"field": "namaPasien",
				"title": "Nama Pasien"
			},
			{
				"field": "totalKlaim",
				"title": "Total Verif",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"
			},
			{
				"field": "tarifinacbgs",
				"title": "Total Klaim",
				"template": "<span class='style-right'>{{formatRupiah('#: tarifinacbgs #', 'Rp.')}}</span>"
			},
			{
				"field": "tarifselisihklaim",
				"title": "Selisih Klaim",
				"template": "<span class='style-right'>{{formatRupiah('#: tarifselisihklaim #', 'Rp.')}}</span>"
			},
			{
				"field": "totalBayar",
				"title": "Total Bayar",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>"
			},
			{
				"field": "sisa",
				"title": "Sisa Piutang",
				"template": "<span class='style-right'>{{formatRupiah('#: sisa #', 'Rp.')}}</span>"
			},
			{
				"field": "keterangan",
				"title": "Keterangan"
			},
			{
				"field": "status",
				"title": "Status"
			}
			];
			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columCollecting,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.Back = function(){
            	$state.go('DaftarCollectingPiutang');	
            };

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

		    $scope.BayarTagihan = function(){
				$scope.changePage("PembayaranPiutangKasirNew");
			}

		    $scope.changePage = function(stateName){
                var obj = {
                    noPosting: noPostingC
                }

                $state.go(stateName, {
                    data: JSON.stringify(obj)
                });
		    }
            $scope.CetakTagihan = function() {
                var stt = 'false'
                if (confirm('View Tagihan? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-LaporanTagihanPenjamin=1&noposting='+$scope.item.noCollect+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
                });
	              
	        };
	        $scope.CetakKwitansi = function() {
                var stt = 'false'
                if (confirm('View Tagihan? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-kwitansiPiutang=1&noposting='+$scope.item.noCollect+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
                });
	              
	        };
	        $scope.CetakSuratTagihan = function() {
                var stt = 'false'
                if (confirm('View Tagihan? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-LaporanTagihanPenjaminSurat=1&noposting='+$scope.item.noCollect+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
                });
	              
	        };
   //          $scope.dataCollectingPiutang = [
			// {
			// 	"noRegistrasi": "173245",
			// 	"noCm": "0000000150",
			// 	"namaPasien": "Agus",
			// 	"totalKlaim": 2000000,
			// 	"jenisPenjamin": "BPJS",
			// 	"status": "Collecting"
			// },{
			// 	"noRegistrasi": "173246",
			// 	"noCm": "0000000151",
			// 	"namaPasien": "Rahman",
			// 	"totalKlaim": 2000000,
			// 	"jenisPenjamin": "BPJS",
			// 	"status": "Collecting"
			// },{
			// 	"noRegistrasi": "173247",
			// 	"noCm": "0000000152",
			// 	"namaPasien": "Miftah",
			// 	"totalKlaim": 2000000,
			// 	"jenisPenjamin": "BPJS",
			// 	"status": "Collecting"
			// },{
			// 	"noRegistrasi": "173248",
			// 	"noCm": "0000000153",
			// 	"namaPasien": "Yeni",
			// 	"totalKlaim": 2000000,
			// 	"jenisPenjamin": "BPJS",
			// 	"status": "Collecting"
			// },{
			// 	"noRegistrasi": "173249",
			// 	"noCm": "0000000154",
			// 	"namaPasien": "Rudi",
			// 	"totalKlaim": 2000000,
			// 	"jenisPenjamin": "BPJS",
			// 	"status": "Collecting"
			// }];
////////////////////////////////////////////////////////////////
		}
		]);
});