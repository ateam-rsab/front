define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPembayaranPiutangPerusahaanPeriodeCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper', '$http', 'ManageTataRekening',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper, $http, manageTataRekening) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			ComboLoad();
			$scope.monthSelectorOptions = {
	            start: "year",
	            depth: "year"
	        };
	        $scope.item.tgl=$scope.now;
			$scope.item.tglawal=$scope.now;
			$scope.item.tglakhir=$scope.now;
			$scope.isRouteLoading=false;
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
			$scope.listPeriode=[{id: 1,name: "Per Tanggal"},{id: 2,name: "Per Bulan"}];
			// $q.all([
			// 	modelItemAkuntansi.getDataTableTransaksi("tatarekening/get-data-combo-piutang"), //Ambil data departemen
		 //    	]).then(function(data) {
		 //    		$scope.listRekanan = data[0].rekanan;
			// });
		    $scope.klikPeriode=function(ss){
		    	if(ss.id==1){
		    		$scope.isDate=true
		    		$scope.isMonth=false
		    	}else{
		    		$scope.isDate=false
		    		$scope.isMonth=true
		    	}
		    }

		    function ComboLoad(){
		    	manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-piutang", false).then(function(data) {
	                var datas = data.data; //piutang/get-data-rekanan-piutang
	                $scope.listRekanan = datas.rekanan;
	            });

	             // modelItemAkuntansi.getDataDummyPHP("piutang/get-data-rekanan-piutang", true, true, 20).then(function(data) {
              //       $scope.listRekanan = data;
              //   })
		    }

		    $scope.cari=function(){
		    	cariData();
		    }
			function cariData(){
				var perusahaan = ''
		        if ($scope.item.namaPerusahaan != undefined) {
		          perusahaan = $scope.item.namaPerusahaan.id
		        }
		        var noCollect = ''
		        if ($scope.item.noCollect != undefined) {
		          noCollect = $scope.item.noCollect
		        }
		        if($scope.isDate==true){
			        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
			        var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');
			    }
			    if($scope.isMonth==true){
		        	var tgl = new Date($scope.item.tgl.getFullYear(), $scope.item.tgl.getMonth()+1, 0).getDate();
					var tglAwal = moment($scope.item.tgl).format('YYYY-MM-01 00:00:00');
					var tglAkhir = moment($scope.item.tgl).format('YYYY-MM-'+tgl+' 23:59:59');
				}
				$scope.isRouteLoading=true;
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-pembayaran-piutang-perusahaan-periode?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&noPosting=" + noCollect+ "&idPerusahaan="+perusahaan).then(function(data) {
					$scope.isRouteLoading=false;
					                             
	                $scope.dataSource = {
	                    data:data[0].data,
	                    schema:{
	                        model:{
	                            fields:{
	                            	no:{type:"number"},
	                                noPosting:{type:"string"},
	                                tglBayar:{type:"string"},
	                                keterangan:{type:"string"},
	                                namarekanan:{type:"string"},
	                                adm:{type:"number"},
	                                totalBayar:{type:"number"},
	                            }
	                        }
	                    },
	                    group:[
	                        {
	                            field:"namarekanan", aggregates:[
	                                {field:'totalBayar', aggregate:'sum'}
	                            ]                            
	                        },                        
	                    ],
	                    groupable: true,
	                    selectable: true,
	                    refresh: true,
	                    // groupable:true,
	                    aggregate:[
	                        {field:'totalBayar', aggregate:'sum'}
	                    ],

	                };
	                for (var i = 0; i < data[0].rekap.length; i++) {
	                    data[0].rekap[i].no = i+1
	                }   
	                $scope.dataSourceRekap = {
	                    data:data[0].rekap,
	                    schema:{
	                        model:{
	                            fields:{
	                            	no:{type:"number"},
	                                tglBayar:{type:"string"},
	                                adm:{type:"number"},
	                                totalBayar:{type:"number"},
	                            }
	                        }
	                    },
	                    aggregate:[
	                        {field:'totalBayar', aggregate:'sum'}
	                    ],
	                }    
	                
	    //             var total = 0;
	    //             for (var i = data.length - 1; i >= 0; i--) {
	    //             	total=total+parseFloat(data[i].totalBayar)
	    //             }
	    //             var totalBayar =total;
	    //             $scope.totalBayar=totalBayar;
					// var terbilang =data[0].terbilang;
					// $scope.terbilang=terbilang+" rupiah";
					
				});
				/////END
			};
			
			$scope.mainGroupOption = {
	            toolbar: "<button type='button' class='k-button' data-toggle='tooltip' title='cetak laporan' style='width:10%' ng-click='cetak()'><i class='fa fa-print'></i>&nbsp;Cetak</button>",
	            columns : [
	                // {
	                //     field: "no",
	                //     title: "No",
	                //     width:"20px",	
	                //     attributes: {align:"center"}
	                // },
	                {
						field: "noPosting",
						title: "No Reg",
						width:"50px"
					},
					{
						field: "tglBayar",
						title: "Tanggal",
						width:"50px",
						template: "#= moment(new Date(tglBayar)).format('DD-MM-YYYY') #",
					},
					{
						field: "keterangan",
						title: "Keterangan",
						width:"150px"
					},
					{
						hidden: true,
						field: "namarekanan",
						title: "Nama Perusahaan",
						width:"100px"
					},
					{
						field: "",
						title: "Adm",
						template: "<span>{{formatRupiah('#: 0 #', 'Rp.')}}</span>",
						width:"50px",
						footerTemplate:"Total",
						attributes: {align:"right"}
					},
					{
						field: "totalBayar",
						title: "SubTotal",
						template: "<span>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>",
						width:"100px",
						groupFooterTemplate:"<span>Rp. {{formatRupiah('#:data.totalBayar.sum  #', '')}}</span>",
	                    footerTemplate:"<span class='style-right'>Rp. {{formatRupiah('#:data.totalBayar.sum  #', '')}}</span>",
	                    attributes: {align:"right"}    
	                }           	                
	            ],
	            sortable: {
	                mode: "single",
	                allowUnsort: false,
	            },
	            pageable:{
	                messages: {
	                    display: "Menampilkan {2} data"
	                    // display: "Menampilkan {0} - {1} data dari {2} data"
	                  }
	            }, 
	            groupable :{
	            	field: "namarekanan",
	            }
	           
	        }

	        $scope.mainGroupOptionRekap = {
	            toolbar: "<button type='button' class='k-button' data-toggle='tooltip' title='cetak laporan' style='width:10%' ng-click='cetakRekap()'><i class='fa fa-print'></i>&nbsp;Cetak Rekap</button>",
	            columns : [
	                {
	                    field: "no",
	                    title: "No",
	                    width:"5px",	
	                    attributes: {align:"center"}
	                },	                
					{
						field: "tglBayar",
						title: "Tanggal",
						width:"50px"
					},					
					{
						field: "adm",
						title: "Adm",
						template: "<span class='style-right'>{{formatRupiah('#: adm #', 'Rp.')}}</span>",
						width:"50px",
						footerTemplate:"Total"
					},
					{
						field: "totalBayar",
						title: "SubTotal",
						template: "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>",
						width:"50px",
	                    footerTemplate:"<span>Rp. {{formatRupiah('#:data.totalBayar.sum  #', '')}}</span>"          
	                }           	                
	            ],
	            sortable: {
	                mode: "single",
	                allowUnsort: false,
	            },
	            pageable:{
	                messages: {
	                    display: "Menampilkan {2} data"
	                    // display: "Menampilkan {0} - {1} data dari {2} data"
	                }
	            }
	           
	        }

			// $scope.detail = function(){
			// 	$scope.changePage("DetailCollectingPiutang");
			// };
			// $scope.changePage = function(stateName){
			// 	if($scope.dataSelected.noPosting != undefined)
			// 	{
			// 		var obj = {
			// 			splitString : $scope.dataSelected.noPosting + "~..:."
			// 		}

			// 		$state.go(stateName, {
			// 			dataCollect: JSON.stringify(obj)
			// 		});
			// 	}
			// 	else
			// 	{
			// 		alert("Silahkan pilih data Collector terlebih dahulu");
			// 	}
			// };

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}

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
	      		var perusahaan = ''
		        if ($scope.item.namaPerusahaan != undefined) {
		          perusahaan = $scope.item.namaPerusahaan.id
		        }
		        var noCollect = ''
		        if ($scope.item.noCollect != undefined) {
		          noCollect = $scope.item.noCollect
		        }
		        if($scope.isDate==true){
			        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
			        var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');
			    }
			    if($scope.isMonth==true){
		        	var tgl = new Date($scope.item.tgl.getFullYear(), $scope.item.tgl.getMonth()+1, 0).getDate();
					var tglAwal = moment($scope.item.tgl).format('YYYY-MM-01 00:00:00');
					var tglAkhir = moment($scope.item.tgl).format('YYYY-MM-'+tgl+' 23:59:59');
				}
		        var stt = 'false'
	            if (confirm('View Laporan? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
		        var client = new HttpClient();
		        client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-DaftarPembayaranPiutangPerusahaanPeriode=1'+
		          '&tglAwal='+ tglAwal +'&tglAkhir=' + tglAkhir +'&idPerusahaan='+ perusahaan +'&noPosting='+ noCollect +'&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {

		        });
		    }
		    $scope.cetakRekap = function () {
	      		var perusahaan = ''
		        if ($scope.item.namaPerusahaan != undefined) {
		          perusahaan = $scope.item.namaPerusahaan.id
		        }
		        if($scope.isDate==true){
			        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
			        var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');
			    }
			    if($scope.isMonth==true){
		        	var tgl = new Date($scope.item.tgl.getFullYear(), $scope.item.tgl.getMonth()+1, 0).getDate();
					var tglAwal = moment($scope.item.tgl).format('YYYY-MM-01 00:00:00');
					var tglAkhir = moment($scope.item.tgl).format('YYYY-MM-'+tgl+' 23:59:59');
				}
		        var stt = 'false'
	            if (confirm('View Laporan? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
		        var client = new HttpClient();
		        client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-DaftarRekapPembayaranPiutangPerusahaanPeriode=1'+
		          '&tglAwal='+ tglAwal +'&tglAkhir=' + tglAkhir +'&idPerusahaan='+ perusahaan +'&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {

		        });
		    }
          ////////////////////////////////////////////////////////////
		}
	]);
});