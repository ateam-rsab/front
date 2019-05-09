define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPembayaranPiutangPerusahaanCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper', '$http',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper, $http) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
			cariData();
			function cariData(){
				///FILTER DATA
				var noposting = $state.params.noposting;
				$scope.isRouteLoading=true;
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-pembayaran-piutang-perusahaan?noposting=" + noposting).then(function(data) {
					
					// for (var i = 0; i < data.length; i++) {
					// 	var saldo =data[i].saldo;
					// }
					$scope.isRouteLoading=false;
	                $scope.dataSource = new kendo.data.DataSource({
						data: data,
						schema:{
	                        model:{
	                            fields:{
	                                noPosting:{type:"string"},
	                                tglBayar:{type:"string"},
	                                keterangan:{type:"string"},
	                                kps:{type:"string"},
	                                namarekanan:{type:"string"},
	                                adm:{type:"number"},
	                                totalBayar:{type:"number"},
	                            }
	                        }
	                    },
						aggregate:[
	                        {field:'totalBayar', aggregate:'sum'}
	                    ]
					})

	                var total = 0;
	                for (var i = data.length - 1; i >= 0; i--) {
	                	total=total+parseFloat(data[i].totalBayar)
	                }
	                var totalBayar =total;
	                $scope.totalBayar=totalBayar;
					var terbilang =data[0].terbilang;
					$scope.terbilang=terbilang+" rupiah";
					
				});
				/////END
			};

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}

			$scope.option = {
				columns : [
					{
						"field": "noPosting",
						"title": "No Reg",
						"width":"50px"
					},
					{
						"field": "tglBayar",
						"title": "Tanggal",
						"width":"50px",
						"template": "#= moment(new Date(tglBayar)).format('DD-MM-YYYY') #",
					},
					{
						"field": "keterangan",
						"title": "Keterangan",
						"width":"100px"
					},
					{
						"field": "namarekanan",
						"title": "Nama Perusahaan",
						"width":"100px"
					},
					{
						"field": "adm",
						"title": "Adm",
						"template": "<span class='style-right'>{{formatRupiah('#: 0 #', 'Rp.')}}</span>",
						"width":"50px"
					},
					{
						"field": "totalBayar",
						"title": "SubTotal",
						"template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>",
						"width":"50px",
						footerTemplate:"<span>Rp. {{formatRupiah('#:data.totalBayar.sum  #', '')}}</span>"
					}
				],
				pageable:{
	                messages: {
	                    display: "Menampilkan {2} data"
	                    // display: "Menampilkan {0} - {1} data dari {2} data"
	                  }
	            }

			}

			$scope.detail = function(){
				$scope.changePage("DetailCollectingPiutang");
			};
			$scope.changePage = function(stateName){
				if($scope.dataSelected.noPosting != undefined)
				{
					var obj = {
						splitString : $scope.dataSelected.noPosting + "~..:."
					}

					$state.go(stateName, {
						dataCollect: JSON.stringify(obj)
					});
				}
				else
				{
					alert("Silahkan pilih data Collector terlebih dahulu");
				}
			};

			var HttpClient = function () {
		        this.get = function (aUrl, aCallback) {
		          	var anHttpRequest = new XMLHttpRequest();
		          	anHttpRequest.onreadystatechange = function () {
		            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
		              aCallback(anHttpRequest.responseText);
		          	}
		          	anHttpRequest.open("GET", aUrl, true);
		          	anHttpRequest.send(null);
	        	}	
	      	}
	      	$scope.cetak = function () {
	      		var noposting = $state.params.noposting;
		        var client = new HttpClient();
		        client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-DaftarPembayaranPiutangPerusahaan=1'+
		          '&noPosting='+ noposting +'&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

		        });
		    }
          ////////////////////////////////////////////////////////////
		}
	]);
});