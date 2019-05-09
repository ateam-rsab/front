define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPiutangPasienCtrl', ['$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening','ManageSdm',
		function($timeout, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening,manageSdm) {

			// function showButton(){
			// 	$scope.showBtnCetak = true;
			// 	$scope.showBtnVerifikasi = true;
			// 	// $scope.showBtnBatalVerifikasi = true;
			// 	$scope.showBtnPerbaharui = true;
			// }
			// showButton();
			
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.dataPasienSelected = {};
			loadCombo();
			$scope.cboDefault = true;
			$scope.cboRekanan = false;

			$scope.UbahRekanan = function(){
				$scope.cboDefault = false;
				$scope.cboRekanan = true;
			}
			$scope.simpanRekanan = function(){
				if($scope.dataPasienSelected.norec_pd != undefined){
					var length = $scope.dataPasienPiutang._data.length + 1;
					var updateDokter = {
						"norec_pd": $scope.dataPasienSelected.norec_pd,
						"objectrekananfk": $scope.item.namaRekanan.id,
						"objectkelompokpasienlastfk": $scope.item.kelompokPasien.id
					}
					manageTataRekening.saveUpdateRekanan(updateDokter).then(function(e){
						$scope.SearchData();
						$scope.batalRekanan();
					})
				}else{
					messageContainer.error('Data belum dipilih')
				}
			}
			$scope.batalRekanan = function(){
				$scope.cboRekanan = false
				$scope.cboDefault=true
			}

			$scope.tagihan = function(){
				if($scope.dataPasienSelected.noRegistrasi != undefined){
				   	var obj = {
				    	noRegistrasi : $scope.dataPasienSelected.noRegistrasi
				  	}

				  	$state.go('RincianTagihan', {
				    	dataPasien: JSON.stringify(obj)
				  	});
				}
			}

			$scope.listStatus = [
			{id:3, namaExternal:"Semua"},
			{id:1, namaExternal:"Verifikasi"},
			{id:2, namaExternal:"Belum Verifikasi"} 
			];
			
			function loadCombo(){
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
				    $scope.listDepartemen = data.data.departemen;
				    $scope.listKelompokPasien = data.data.kelompokpasien;
				});

				modelItemAkuntansi.getDataTableTransaksi("tatarekening/get-data-combo-piutang").then(function(data) {		    		
		    		debugger;
		    		$scope.listRekanan = data.rekanan;		    	
		    	});

			}

			 $scope.$watch('item.kelompokPasien', function(newValue, oldValue) {
	            if (newValue != oldValue  ) {

	            	if ($scope.item.kelompokPasien.id != undefined || $scope.item.kelompokPasien.id != '') {
	            		modelItemAkuntansi.getDataTableTransaksi("piutang/get-data-rekanan?IdKelompokPasien=" + $scope.item.kelompokPasien.id).then(function(data) {		    		
				    		$scope.listRekanan = data;		    	
				    	});
	            	}
	                
	            }
	        });


			$scope.getIsiComboRuangan = function(){
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}
			$scope.item.status = $scope.listStatus[0];
		    	$scope.item.awalPeriode = $scope.now;
		    	$scope.item.akhirPeriode = $scope.now;
		    	loadData();
		    	//$scope.SearchData();
		    // $q.all([
		    // 	//modelItemAkuntansi.getDataTableTransaksi("tatarekening/daftar-piutang-pasien/?noReg=&namePasien=&status&tglAwal="+moment($scope.item.awalPeriode).format('YYYY-MM-DD')+"&tglAkhir="+moment($scope.item.akhirPeriode).format('YYYY-MM-DD')+"&ruanganId=&instalasiId="),		
		    // 	manageSdm.getOrderList("ruangan/get-all-ruangan-for-tagihan"), //Ambil data ruangan
		    // 	manageSdm.getOrderList("departemen/get-all-departemen-for-tagihan"), //Ambil data departemen
		    	// modelItemAkuntansi.getDataTableTransaksi("tatarekening/get-data-combo-piutang"), //Ambil data departemen
		    	// ]).then(function(data) {
		    	// 	$scope.listRekanan = data[2].rekanan;		    	
		    	// });

		    	$scope.formatTanggal = function(tanggal)
		    	{
		    		return moment(tanggal).format('DD-MMM-YYYY');
		    	}

		    	$scope.formatRupiah = function(value, currency) {
		    		return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		    	}

		    	$scope.columnDataPasienPiutang = [
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
		    		"field": "tglpulang",
		    		"title": "Tanggal",
		    		"width":"100px",
		    		// "template": "<span class='style-center'>{{formatTanggal('#: tglpulang #')}}</span>"
		    	},
		    	{
		    		"field": "noRegistrasi",
		    		"title": "No. Registrasi",
		    		"width":"150px",
		    		// "template": "<span class='style-center'>#: noRegistrasi #</span>"
		    		
		    	},
		    	{
		    		"field": "namaPasien",
		    		"title": "Nama",
		    		"width":"200px",
		    		// "template": "<span class='style-left'>#: namaPasien #</span>"
		    	},
		    	{
		    		"field": "jenisPasisen",
		    		"title": "Jenis Pasien",
		    		"width":"120px",
		    		// "template": "<span class='style-center'>#: jenisPasisen #</span>"
		    	},
		    	{
		    		"field": "rekanan",
		    		"title": "Penjamin",
		    		"width":"170px"
		    	},
		    	// {
		    	// 	"field": "kelasRawat",
		    	// 	"title": "Kelas Rawat",
		    	// 	"width":"150px",
		    	// 	"template": "<span class='style-left'>#: kelasRawat #</span>"
		    	// },
		    	// {
		    	// 	"field": "kelasPenjamin",
		    	// 	"title": "Kelas Penjamin",
		    	// 	"width":"150px",
		    	// 	"template": "<span class='style-center'>#: kelasPenjamin #</span>"
		    	// },
		    	{
		    		"field": "totalBilling",
		    		"title": "Total Billing",
		    		"width":"120px",
		    		// "template": "<span class='style-right'>{{formatRupiah('#: totalBilling #', 'Rp.')}}</span>"
		    	},
		    	{
		    		"field": "totalBayar",
		    		"title": "Total Bayar",
		    		"width":"120px",
		    		// "template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>"
		    	},
		    	{
		    		"field": "totalKlaim",
		    		"title": "Total Klaim",
		    		"width":"120px",
		    		// "template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"
		    	},
		    	{
		    		"field": "tarifselisihklaim",
		    		"title": "Selisih Klaim",
		    		"width":"120px",
		    		// "template": "<span class='style-center'>#: statusVerifikasi #</span>"
		    		
		    	},
		    	{
		    		"field": "noposting",
		    		"title": "No Collect",
		    		"width":"120px",
		    		// "template": "<span class='style-center'>#: noposting #</span>"
		    		
		    	}
		    	];

		    	$scope.Cetak = function(){

		    	}

		    	$scope.Verifikasi = function(){
		    		
		    		var dataPost = [];
		    		for(var i=0; i<$scope.dataPasienPiutang._data.length; i++){
		    			if($scope.dataPasienPiutang._data[i].statCheckbox){
		    				dataPost.push($scope.dataPasienPiutang._data[i].noRec)
		    			}
		    		}

		    		if(dataPost.length>0){
		    			manageTataRekening.verifikasiPiutang(dataPost)
		    			.then(function(e) {
		    				$scope.loadNewData();
		    			}, function(){
		    				
		    			});
		    		}
		    		else
		    		{
		    			alert("Belum ada data yang dipilih");
		    		}
		    	}

		    	$scope.BatalVerifikasi = function(){
		    		var dataPost = [];
		    		for(var i=0; i<$scope.dataPasienPiutang._data.length; i++){
		    			if($scope.dataPasienPiutang._data[i].statCheckbox){
		    				if ($scope.dataPasienPiutang._data[i].noposting != null) {
		    					alert('Sudah collecting Instalasi Piutang, Tidak bisa di UnVerifikasi!!')
		    					return
		    				}
		    				dataPost.push($scope.dataPasienPiutang._data[i].noRec)
		    			}
		    		}

		    		if(dataPost.length>0){
		    			manageTataRekening.cancelVerifikasiPiutang(dataPost)
		    			.then(function(e) {
		    				$scope.loadNewData();
		    			}, function(){
		    				
		    			});
		    		}
		    		else
		    		{
		    			alert("Belum ada data yang dipilih");
		    		}
		    	}

		    	$scope.loadNewData = function(){
		    		modelItemAkuntansi.getDataTableTransaksi("tatarekening/daftar-piutang-pasien?nameOrNoReg="+ $scope.item.namaOrReg +"&status=" + $scope.item.status.namaExternal +"&tglAwal="+ $scope.item.awalPeriode +"&tglAkhir="+ $scope.item.akhirPeriode )
		    		.then(function(data) {
		    			var dataPasien = data;
		    			for(var i=0; i<dataPasien.length; i++)
		    			{
		    				dataPasien[i].statCheckbox = false;
		    			}

		    			$scope.dataPasienPiutang = new kendo.data.DataSource({
		    				data: dataPasien,
		    				pageSize: 10,
		    				total: dataPasien.length,
		    				serverPaging: false,
		    				schema:  {
		    					model: {
		    						fields: {
		    							tglTransaksi: { type: "date" }
		    						}
		    					}
		    				}  
		    			});

		    			var grid = $('#kGrid').data("kendoGrid");

		    			grid.setDataSource($scope.dataPasienPiutang);
		    			grid.refresh();

		    		}, function(){
		    			
		    		});
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
				$scope.item.awalPeriode = $scope.now;
				$scope.item.akhirPeriode = $scope.now;
				$scope.SearchData();
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
			//fungsi search data
			$scope.SearchData = function(){
				loadData();
			}
			function loadData()
			{
			  /*//kriteria pencarian
			  var nameOrReg = checkValue($scope.item, ["namaOrReg"]);
			  var tanggalAwal = checkValue($scope.item, ["awalPeriode"]);
			  var tanggalAkhir = checkValue($scope.item, ["akhirPeriode"]);
			  var status = checkValue($scope.item, ["status", "namaExternal"]);
			  
			  tanggalAwal = (moment(tanggalAwal, "DD-MM-YYYY").subtract('days', 1))._d;
			  tanggalAkhir = (moment(tanggalAkhir, "DD-MM-YYYY").add('days', 1))._d;


			  if(tanggalAwal != ""){
			  	//tanggalAwal = moment(tanggalAwal).format('DD-MM-YYYY')
			  }

			  if(tanggalAkhir != ""){
			  	//tanggalAkhir = moment(tanggalAkhir).format('DD-MM-YYYY')
			  }

			  var kriteriaFilter = [
			  { text:"noRegistrasi", operator:"contains",value:nameOrReg },
			  { text:"nama", operator:"contains", value:nameOrReg },
			  { text:"statusVerifikasi", operator:"eq", value:status },
			  { text:"tglTransaksi", operator:"gte", value:tanggalAwal },
			  { text:"tglTransaksi", operator:"lte", value:tanggalAkhir }
			  ];
				
			  prosesSearch(kriteriaFilter);*/
			  //debugger;
			  $scope.isRouteLoading=true;
			  var tglAkhir = moment($scope.item.akhirPeriode).format('YYYY-MM-DD');
			  var tglAwal = moment($scope.item.awalPeriode).format('YYYY-MM-DD');
			  var instalasiId= undefinedCheckerObject($scope.item.instalasi);
			  var ruanganId= undefinedCheckerObject($scope.item.ruangan);
			  var kelompokPasienId= undefinedCheckerObject($scope.item.kelompokPasien);
			  var $status ="";
			  if ($scope.item.status != undefined) {
			  	$status= "=" + $scope.item.status.namaExternal
			  }
			   $q.all([
		    	modelItemAkuntansi.getDataTableTransaksi("tatarekening/daftar-piutang-pasien?"
		    		+"noReg="+undefinedChecker($scope.item.noReg)
		    		+"&namePasien="+undefinedChecker($scope.item.namaPasien)
		    		+"&status" + $status
		    		+"&tglAwal="+tglAwal
		    		+"&tglAkhir="+tglAkhir
		    		+"&ruanganId="+ruanganId
		    		+"&instalasiId="+instalasiId
		    		+"&kelompokpasienlastfk="+kelompokPasienId),
		    		//modelItemAkuntansi.getDataGeneric("ruangan"), //Ambil data ruangan
		    		//modelItemAkuntansi.getDataGeneric("departemen"), //Ambil data departemen
		    	]).then(function(data) {
		    		$scope.isRouteLoading=false;
		    		var dataPasien = [];
		    		if (data[0].statResponse){
		    			dataPasien = data[0].data;
		    			for(var i=0; i<dataPasien.length; i++)
		    			{
		    				dataPasien[i].statCheckbox = false;
		    			}
		    			// $scope.dataPasienPiutang = dataPasien
		    			$scope.dataPasienPiutang = new kendo.data.DataSource({
		    				data: dataPasien,
		    				pageSize: 10,
		    				total: dataPasien.length,
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
		    			$scope.dataPasienPiutang = new kendo.data.DataSource({
		    				data: dataPasien,
		    				pageSize: 10,
		    				total: dataPasien.length,
		    				serverPaging: false,
		    				schema:  {
		    					model: {
		    						fields: {
		    							tglTransaksi: { type: "date" }
		    						}
		    					}
		    				}  
		    			});

		    		}

		    		
		    		var grid = $('#kGrid').data("kendoGrid");

		    			grid.setDataSource($scope.dataPasienPiutang);
		    			grid.refresh();
		    		//$timeout($scope.SearchData, 500);
		    	});
			}
			//$scope.SearchData();
			// function prosesSearch(kriteriaFilter){
			// 	var arrFilter = [];
			// 	for(var i=0; i<kriteriaFilter.length; i++){
			// 		if(kriteriaFilter[i].value != "")
			// 		{
			// 			if(kriteriaFilter[i].value == "Semua"){
			// 				continue;
			// 			}

			// 			if(kriteriaFilter[i].text == "nama" && isInt(kriteriaFilter[i].value))
			// 				continue;

			// 			if(kriteriaFilter[i].text == "noRegistrasi" && !isInt(kriteriaFilter[i].value))
			// 				continue;

			// 			var obj = {
			// 				field: kriteriaFilter[i].text, 
			// 				operator: kriteriaFilter[i].operator, 
			// 				value: kriteriaFilter[i].value
			// 			};

			// 			arrFilter.push(obj);
			// 		}
			// 	}

			// 	var grid = $("#kGrid").data("kendoGrid");
			// 	grid.dataSource.query({
			// 		page:1,
			// 		pageSize: 10,
			// 		filter:{
			// 			logic: "and",
			// 			filters: arrFilter
			// 		}
			// 	});
			// }
			
			//refresh data grid
			// function reloadDataGrid(ds)
			// {

			// 	var newDs = new kendo.data.DataSource({
			// 		data: ds,
			// 		pageSize: 10,
			// 		total: ds.length,
			// 		serverPaging: false,
			// 		schema:  {
			// 			model: {
			// 				fields: {
			// 					tglTransaksi: { type: "date" }
			// 				}
			// 			}
			// 		}  
			// 	});

			// 	var grid = $('#kGrid').data("kendoGrid");

			// 	grid.setDataSource(newDs);
			// 	grid.refresh();
			// 	$scope.dataVOloaded = true;
			// }

			$scope.selectRow = function(dataItem)
			{
				var dataSelect = _.find($scope.dataPasienPiutang._data, function(data){
					return data.noRec == dataItem.noRec; 
				});

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
				}
				else
				{
					dataSelect.statCheckbox = true;
				}
				
				
				reloadDataGrid($scope.dataPasienPiutang._data);
			}

			var isCheckAll = false
			$scope.selectUnselectAllRow = function()
			{
				var tempData = $scope.dataPasienPiutang._data;

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

        $scope.CetakSurat = function() {
            debugger;
            if ($scope.dataPasienSelected.noRegistrasi == undefined) {
            	alert("data belum di pilih !!!")
            }else if ($scope.dataPasienSelected.jenisPasisen == "BPJS"){
            	alert("Piih jenis pasien asuransi lain atau perusahaan")
            }else{
            	var noreg = $scope.dataPasienSelected.noRegistrasi
            	var stt = 'false'
	            if (confirm('View Surat? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-LaporanTagihanSuratPasien=1&norec='+noreg+ '&view='+ stt, function(response) {
	                // do something with response
	            });
            }
            
	    }
	    $scope.CetakKwitansi = function() {
            debugger;
            if ($scope.dataPasienSelected.noRegistrasi == undefined) {
            	alert("data belum di pilih !!!")
            }else if ($scope.dataPasienSelected.jenisPasisen == "BPJS"){
            	alert("Piih jenis pasien asuransi lain atau perusahaan")
            }else{
            	var noreg = $scope.dataPasienSelected.noRegistrasi
            	var stt = 'false'
	            if (confirm('View Kwitansi? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-kwitansiPiutangPasien=1&norec='+noreg+ '&view='+ stt, function(response) {
	                // do something with response
	            });
            }
            
	    }

		}
	]);
});