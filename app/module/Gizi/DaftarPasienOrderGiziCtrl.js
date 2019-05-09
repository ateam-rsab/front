define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPasienOrderGiziCtrl', ['CacheHelper','$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening','ManageSdm','ManageGiziPhp', 'ManageLogistikPhp',
		function(cacheHelper,$timeout, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening, manageSdm, manageGiziPhp, manageLogistikPhp) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.dataPasienSelected = {};
			$scope.cboDefault = true;
			$scope.cboOrder = false;
			$scope.showInputObat =true
			$scope.item.TglPesan = new Date();
			$scope.saveShow=true;

			var norec_apd = '';
            var noOrder = '';
            var norecResep = '';
            var dataProdukDetail=[];
            var noTerima ='';
            var data2 = [];
            var data2R = [];
            var hrg1 = 0
            var hrgsdk = 0
            var racikan = 0


			//date time today
			var chacePeriode = cacheHelper.get('DaftarPasiendiRawatInap');
			if(chacePeriode != undefined){
				var arrPeriode = chacePeriode.split(':');
				$scope.item.periodeAwal = new Date(arrPeriode[0]);
				$scope.item.periodeAkhir = new Date(arrPeriode[1]);
				// $scope.item.TglPesan = new Date(arrPeriode[2]);
				loadData()
			}
			else
			{
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;
				// $scope.item.TglPesan = $scope.now;
				loadData()
            }

            loadCombo()

			// function loadCombo(){
			// 	modelItemAkuntansi.getDataGeneric("ruangan", false).then(function(data) {
			// 		$scope.listRuanganRanap = data;
			// 	})
			// }

		    	$scope.formatTanggal = function(tanggal)
			{
				if(tanggal != "null")
				{
					return moment(tanggal).format('DD-MMM-YYYY');
				}
				else
				{
					return "-";
				}

			}

			function loadCombo() {
            // 
            manageGiziPhp.getDataTableTransaksi("gizi/get-data-combo-gizi", true).then(function(dat){
                $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]
                $scope.listProduk = dat.data.produk;
                $scope.listjenisWaktu = dat.data.jeniswaktu
                $scope.listjenisDiet = dat.data.jenisdiet
                $scope.listkategoryDiet = dat.data.kategorydiet
                $scope.listRuanganRanap = dat.data.ruanganranap
                $scope.listRuangan = dat.data.ruangGizi
                $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                $scope.item.jenisKirim = {id:2,jenis:'Transfer'}
            	loadData()
                if (noOrder != '') {
                    if (noOrder == 'EditOrder') {
                        // manageLogistikPhp.getDataTableTransaksi("kasir/get-detail-obat-bebas?norecResep="+norecResep, true).then(function(data_ih){
                        //     $scope.isRouteLoading=false;
                        //     $scope.item.resep = data_ih.data.detailresep.nostruk
                        //     $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                        //     $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                        //     $scope.item.nocm = data_ih.data.detailresep.nocm
                        //     $scope.item.namapasien = data_ih.data.detailresep.nama
                        //     $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                        //     $scope.item.noTelepon = data_ih.data.detailresep.notlp
                        //     $scope.item.alamat = data_ih.data.detailresep.alamat

                        //     data2 = data_ih.data.pelayananPasien

                        //     $scope.dataGrid = new kendo.data.DataSource({
                        //         data: data2
                        //     });

                        //     var subTotal = 0 ;
                        //     for (var i = data2.length - 1; i >= 0; i--) {
                        //         subTotal=subTotal+ parseFloat(data2[i].total)
                        //     }
                        //     $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        // });
                    }
                }
            });

        }

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
		    	$scope.columnDataPasienDiRawat = [
		    	{ 
		    		"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
		    		template: "# if (statCheckbox) { #"+
		    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
		    		"# } else { #"+
		    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
		    		"# } #",
		    		width:"50px"
		    	},
		    	{
		    		"field": "tglregistrasi",
		    		"title": "Tanggal Masuk",
		    		"width":"100px",
		    		// "template": "<span class='style-center'>{{formatTanggal('#: tglpulang #')}}</span>"
		    	},
		    	{
		    		"field": "nocm",
		    		"title": "No. Rekam Medis",
		    		"width":"100px",
		    		// "template": "<span class='style-center'>#: noRegistrasi #</span>"
		    		
				},
				{
		    		"field": "noregistrasi",
		    		"title": "No. Registrasi",
		    		"width":"100px",
		    		// "template": "<span class='style-center'>#: noRegistrasi #</span>"
		    		
		    	},
		    	{
		    		"field": "namapasien",
		    		"title": "Nama",
		    		"width":"200px",
		    		// "template": "<span class='style-left'>#: namaPasien #</span>"
		    	},
		    	{
		    		"field": "umur",
		    		"title": "Umur",
		    		"width":"50px",
		    		// "template": "<span class='style-center'>#: jenisPasisen #</span>"
		    	},
		    	{
		    		"field": "jeniskelamin",
		    		"title": "Jenis Kelamin",
		    		"width":"100px"
                },
                {
		    		"field": "namakelas",
		    		"title": "kelas",
		    		"width":"100px"
                },
                {
		    		"field": "namaruangan",
		    		"title": "Ruangan",
		    		"width":"170px"
		    	}
		    	];

		    	$scope.Cetak = function(){

		    	}

		    	$scope.Perbaharui = function(){
		    		$scope.ClearSearch();
		    	}

		    	$scope.changePage = function(stateName){
		    		if($scope.dataPasienSelected.id != undefined)
		    		{
		    			$state.go(stateName, {
		    				dataPasien: JSON.stringify($scope.dataPasienSelected)
		    			});
		    		}
		    		else
		    		{
		    			alert("Silahkan pilih data pasien terlebih dahulu");
		    		}
		    	}

		    	function checkValue(obj, param){
		    		var res="";
		    		var data = undefined;

		    		if(param.length > 1){
		    			if(obj[param[0]] != undefined)
		    				data = obj[param[0]][param[1]]; 
		    		}
		    		else
		    		{
		    			data = obj[param[0]];
		    		}

		    		if(data != undefined)
		    			var res = data;
		    		
		    		return res;
		    	}

		    	function isInt(value) {
		    		var er = /^-?[0-9]+$/;

		    		return er.test(value);
		    	}

			//fungsi clear kriteria search
			$scope.ClearSearch = function(){
				$scope.item = {};
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;
				$scope.item.ruanganRanap = {namaExternal:""};
				$scope.SearchData();
			}

		    function isInt(value) {
		    	var er = /^-?[0-9]+$/;

		    	return er.test(value);
		    }

			//fungsi search data
			$scope.SearchData = function(){
				loadData()
			}

			$scope.TransaksiPelayanan = function(){
				var dataPost = [];
		    		for(var i=0; i<$scope.dataPasienPasienDiRawat._data.length; i++){
		    			if($scope.dataPasienPasienDiRawat._data[i].statCheckbox){
		    				dataPost.push({

									      "noregistrasi" : {"noregistrasi" : $scope.dataPasienPasienDiRawat._data[i].noregistrasi},
										  "norec" : {"norec" : $scope.dataPasienPasienDiRawat._data[i].norec},
										  "ruanganId" : {"ruanganId" : $scope.dataPasienPasienDiRawat._data[i].kderuangan},
										  "namaruangan" : {"namaruangan" : $scope.dataPasienPasienDiRawat._data[i].namaruangan},
										  "namapasien" : {"namapasien" : $scope.dataPasienPasienDiRawat._data[i].namapasien},
										  "namakelas" : {"namakelas" : $scope.dataPasienPasienDiRawat._data[i].namakelas},
										  "namakelas" : {"namakelas" : $scope.dataPasienPasienDiRawat._data[i].namakelas},
										  "umur" : {"umur" : $scope.dataPasienPasienDiRawat._data[i].umur},
										  // "statusEnabled" : "true" 

										},)
		    			}
		    		}
		    		if(dataPost.length>0){
		    			$scope.cboOrder = true
						$scope.cboDefault = false
						
						GetSelectPasien(0)
		    		}
		    		else
		    		{
		    			alert("Belum ada data yang dipilih");
		    		}
			}

			//PENGECEKAN UNTUK DATA/PARAMETER KOSONG
			function undefinedChecker(data){
				var temp="";
				  
				if (! _.isUndefined(data)){
					temp=data;
				} 
				return temp;
			}

			function undefinedCheckerObject(data){
				var temp="";
				  
				if (! _.isUndefined(data)){
					temp=data.id;
				} 
				return temp;
			}

			function loadData(){
                $scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
				if ($scope.item.ruanganRanap == undefined){
					var rg =""
				}else{
					var rg ="&ruanganId=" +$scope.item.ruanganRanap.id
				}
				if ($scope.item.noReg == undefined){
					var reg =""
				}else{
					var reg ="&noReg=" +$scope.item.noReg
				}
				if ($scope.item.nama == undefined){
					var nm =""
				}else{
					var nm ="namaPasien=" +$scope.item.nama
                }
                
			   $q.all([
		    	modelItemAkuntansi.getDataTableTransaksi("gizi/get-datapasien-dirawat?"
                    + nm + reg + rg
                    + "&tglAwal="+ tglAwal +"&tglAkhir="+ tglAkhir),
		    	]).then(function(data) {
		    		$scope.isRouteLoading=false;
		    		var dataPasien = [];
		    		if (data[0].statResponse){
		    			dataPasien = data[0];
		    			for(var i=0; i<dataPasien.length; i++)
		    			{
		    				dataPasien[i].statCheckbox = false;
                        }
		    			// $scope.dataPasienPasienDiRawat = dataPasien
		    			$scope.dataPasienPasienDiRawat = new kendo.data.DataSource({
		    				data: dataPasien,
		    				pageSize: 10,
                            total: dataPasien,
		    				serverPaging: false,
		    				schema:  {
		    					model: {
		    						fields: {
		    							tglTransaksi: { type: "date" }
		    						}
		    					}
		    				}  
		    			});
		    		}else{
		    			$scope.dataPasienPasienDiRawat = new kendo.data.DataSource({
		    				data: dataPasien,
		    				pageSize: 10,
                            total: dataPasien,
		    				serverPaging: false,
		    				schema:  {
		    					model: {
		    						fields: {
		    							tglTransaksi: { type: "date" }
		    						}
		    					}
		    				}  
		    			});
                        var chacePeriode = tglAwal + ":" + tglAkhir;
				        cacheHelper.set('DaftarPasiendiRawatInap', chacePeriode);
		    		}

		    		var grid = $('#kGrid').data("kendoGrid");

		    			grid.setDataSource($scope.dataPasienPasienDiRawat);
		    			grid.refresh();
		    		//$timeout($scope.SearchData, 500);
		    	});
			}

			$scope.selectRow = function(dataItem)
			{
				var dataSelect = _.find($scope.dataPasienPasienDiRawat._data, function(data){
					return data.noregistrasi == dataItem.noregistrasi; 
				});

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
				}
				else
				{
					dataSelect.statCheckbox = true;
				}
				
				
				reloadDataGrid($scope.dataPasienPasienDiRawat._data);
			}

			var isCheckAll = false
			$scope.selectUnselectAllRow = function()
			{
				var tempData = $scope.dataPasienPasienDiRawat._data;

				if(isCheckAll)
				{
					isCheckAll = false;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = false;
					}
				}
				else{
					isCheckAll = true;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = true;
					}
				}
				
				reloadDataGrid(tempData);
				
			}

			$scope.cekData = function()
			    {
				var tempData = $scope.dataPasienPasienDiRawat._data;

				if(isCheckAll)
				{
					isCheckAll = false;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = false;
					}
				}
				else{
					isCheckAll = true;
					for(var i=0; i<5; i++)
					{
						tempData[i].statCheckbox = true;
					}
				}
				
				reloadDataGrid(tempData);
				
			}

			function reloadDataGrid(ds)
			{

				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#kGrid').data("kendoGrid");

				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}

        	function GetSelectPasien(jml){
        		var dataPost = [];
		    		for(var i=0; i<$scope.dataPasienPasienDiRawat._data.length; i++){
		    			if($scope.dataPasienPasienDiRawat._data[i].statCheckbox)
		    			dataPost.push({

									      "noregistrasi" : {"noregistrasi" : $scope.dataPasienPasienDiRawat._data[i].noregistrasi},
									      "nocm" : {"nocm" : $scope.dataPasienPasienDiRawat._data[i].nocm},
										  "norec" : {"norec" : $scope.dataPasienPasienDiRawat._data[i].norec},
										  "ruanganId" : {"ruanganId" : $scope.dataPasienPasienDiRawat._data[i].kderuangan},
										  "namaruangan" : {"namaruangan" : $scope.dataPasienPasienDiRawat._data[i].namaruangan},
										  "namapasien" : {"namapasien" : $scope.dataPasienPasienDiRawat._data[i].namapasien},
										  "namakelas" : {"namakelas" : $scope.dataPasienPasienDiRawat._data[i].namakelas},
										  "namakelas" : {"namakelas" : $scope.dataPasienPasienDiRawat._data[i].namakelas},
										  "umur" : {"umur" : $scope.dataPasienPasienDiRawat._data[i].umur},
										  // "statusEnabled" : "true" 

									},)
		    			}			
		    if(dataPost.length>0){
    //         	if (dataPost == undefined){
				// 	return
				// }else{
				// 	var ruangan ="&ruanganId=" +dataPost
				// }
				// if (dataPost == undefined){
				// 	return
				// }else{
				// 	var ruangan ="&noReg=" +dataPost[2]
				// }
            	// manageGiziPhp.getDataTableTransaksi("gizi/get-detailpasien?"+
             //   		"noReg="+ dataPost[2] +
             //    	"&ruanganId="+ dataPost[8], true).then(function(dat){
             //        	// detailpasien = dat.data.data;
             //        var datas = dat.data;
             debugger;
                    $scope.dataGrid = dataPost;
                }
		    		// $scope.dataPasienPasienDiRawat = dataPasien
		    		// $scope.dataGrid = new kendo.data.DataSource({
		    		// data: datas,
		    		// pageSize: 10,
        //             total: dataPasien,
		    		// serverPaging: false,
        //     		});
			}

		$scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                // if ($scope.item.jenisKemasan == undefined) {
                //     return
                // }
                if ($scope.item.stok == 0 ) {
                    $scope.item.jumlah = 0
                    //alert('Stok kosong')

                    return;
                }
                var ada = false;
                for (var i = 0; i < dataProdukDetail.length; i++) {
                    ada = false
                    if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
                        hrg1 = parseFloat(dataProdukDetail[i].hargajual)* parseFloat($scope.item.nilaiKonversi)
                        hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
                        $scope.item.hargaSatuan = hrg1 
                        $scope.item.hargadiskon = hrgsdk 
                        $scope.item.total = parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)
                        noTerima = dataProdukDetail[i].norec
                        $scope.item.asal={id:dataProdukDetail[i].objectasalprodukfk,asalproduk:dataProdukDetail[i].asalproduk}
                        ada=true;
                        break;
                    }
                }
                if (ada == false) {
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon =0
                    $scope.item.total = 0
                    
                    noTerima = ''
                }
                if ($scope.item.jumlah == 0) {
                    $scope.item.hargaSatuan = 0
                }
            }
        });
	
			$scope.columnGrid = [
				{
					"field": "nocm.nocm",
					"title": "No Rekam Medis",
					"width" : "100px",
				},
				{
					"field": "noregistrasi.noregistrasi",
					"title": "No Registrasi",
					"width" : "100px",
				},
				{
					"field": "namapasien.namapasien",
					"title": "Nama Pasien",
					"width" : "150px",
				},
				{
					"field": "namakelas.namakelas",
					"title": "Kelas",
					"width" : "80px",
				},
				{
					"field": "umur.namakelas",
					"title": "Umur",
					"width" : "80px",
				},
				// {
				// 	"field": "",
				// 	"title": "Jenis Waktu",
				// 	"width" : "100px",
				// },
				// {
				// 	"field": "",
				// 	"title": "Jenis Diet",
				// 	"width" : "100px",
				// },
				// {
				// 	"field": "",
				// 	"title": "Kategory Diet",
				// 	"width" : "100px",
				// },
				{
					"field": "namaruangan.namaruangan",
					"title": "Ruangan",
					"width" : "150px",
				}
			];

				$scope.formatRupiah = function(value, currency) {
					return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				}
				$scope.kembali=function(){
					//$state.go("TransaksiPelayananApotik")
					window.history.back();
				}
	
				$scope.simpan = function(){
					if ($scope.item.ruangan == undefined) {
						alert("Pilih Ruanganan Pengirim!!")
						return
					}
					if ($scope.dataPasienSelected.kderuangan == undefined) {
						alert("Pilih Ruanganan Tujuan!!")
						return
					}
					if ($scope.item.jenisKirim == undefined) {
						alert("Pilih Jenis Kiriman!!")
						return
					}
					if (data2.length == 0) {
						alert("Pilih Produk terlebih dahulu!!")
						return
					}
					var strukorder = {
								pegawaiorderfk: pegawaiUser.id,
								ruanganfk: $scope.item.ruangan.id,
								ruangantujuanfk: $scope.dataPasienSelected.kderuangan,
								jenispermintaanfk: $scope.item.jenisKirim.id,
								keteranganorder: 'Order Barang',
								qtyjenisproduk: data2.length,
								tglorder: moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm:ss'),
							}
					var objSave = 
						{
							strukorder:strukorder,
							details:data2
						}
					
					manageLogistikPhp.postorderbarang(objSave).then(function(e) {
						$scope.item.noKirim = e.data.nokirim.nokirim
						$scope.saveShow=false;
					})					
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
		}
	]); 
});
