define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarKartuPiutangPerusahaanCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper', '$http',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper, $http) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
			cariData();
			function cariData(){
				///FILTER DATA
				var id = $state.params.id;
				$scope.isRouteLoading=true;
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-kartu-piutang-perusahaan?idPerusahaan=" + id).then(function(data) {
					
					// for (var i = 0; i < data.length; i++) {
					// 	var saldo =data[i].saldo;
					// }
					$scope.isRouteLoading=false;
					$scope.dataSource = {
	                    data:data[0].data,
	                    schema:{
	                        model:{
	                            fields:{
	                            	noCollect:{type:"string"},
	                                tglCollect:{type:"string"},
	                                keterangan:{type:"string"},
	                                piutang:{type:"number"},
	                                bayar:{type:"number"},
	                                adm:{type:"number"},
	                                saldo:{type:"number"},
	                            }
	                        }
	                    },
	                    aggregate:[
	                        {field:'saldo', aggregate:'sum'}
	                    ],
	                    groupable: true,
	                    group:[
	                        {
	                            field:"noCollect", aggregates:[
	                                {field:'saldo', aggregate:'sum'}
	                            ]                            
	                        },                        
	                    ],
	                }
	                $scope.kode=data[0].data[0].idrekanan;
	                $scope.namaperusahaan=data[0].data[0].namarekanan;
	    //             var saldo =data[0].totalsaldo;
	    //             $scope.saldo=saldo;
					var terbilang =data[0].terbilang;
					$scope.terbilang=terbilang+" rupiah";
					
				});
				/////END
			};

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}

			$scope.mainGridOption = {
				columns : [
					{
						"field": "noCollect",
						"title": "No Reg",
						"width":"50px"
					},
					{
						"field": "tglCollect",
						"title": "Tanggal",
						"width":"50px",
						"template": "#= moment(new Date(tglCollect)).format('DD-MM-YYYY') #",
					},
					{
						"field": "keterangan",
						"title": "Keterangan",
						"width":"100px"
					},
					{
						"field": "piutang",
						"title": "Piutang",
						"template": "<span class='style-right'>{{formatRupiah('#: piutang #', 'Rp.')}}</span>",
						"width":"50px"
					},
					{
						"field": "bayar",
						"title": "Bayar",
						"template": "<span class='style-right'>{{formatRupiah('#: bayar #', 'Rp.')}}</span>",
						"width":"50px"
					},
					{
						"field": "adm",
						"title": "Adm",
						"template": "<span class='style-right'>{{formatRupiah('#: adm #', 'Rp.')}}</span>",
						"width":"50px"
					},
					{
						field: "saldo",
						title: "Saldo",
						template: "<span class='style-right'>{{formatRupiah('#: saldo #', 'Rp.')}}</span>",
						width:"50px",
						groupFooterTemplate:"<span>Rp. {{formatRupiah('#:data.saldo.sum  #', '')}}</span>",
						footerTemplate:"<span>Rp. {{formatRupiah('#:data.saldo.sum  #', '')}}</span>",
	                    attributes: {align:"right"}    
					}
				],
	            pageable:{
	                messages: {
	                    display: "Menampilkan {2} data"
	                    // display: "Menampilkan {0} - {1} data dari {2} data"
	                  }
	            },
	            groupable :{
	            	field: "noPosting",
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
	      		var id = $state.params.id;
		        var client = new HttpClient();
		        client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-KartuPiutangPerusahaan=1'+
		          '&idPerusahaan='+ id +'&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

		        });
		    }
          ////////////////////////////////////////////////////////////
		}
	]);
});