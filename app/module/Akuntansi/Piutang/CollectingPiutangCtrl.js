//Owari Start here....
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CollectingPiutangCtrl', ['$state','$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','$http','ManageKasir','DateHelper','MnKeu','CacheHelper',
		function($state,$q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,DateHelper,$http,manageKasir,dateHelper,mnKeu,cacheHelper) {

			$scope.dataParams = JSON.parse($state.params.dataFilter);
			var dariSini = "";


			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			var dataAya = [];
			var datatemp = [];
			var datas =[];
			var noposting=''

			//$scope.item.tglCollect = new Date();
			$scope.item.tanggalAwal = $scope.now
			$scope.item.tanggalAkhir = $scope.now

			modelItemAkuntansi.getDataTableTransaksi("piutang/get-data-combo-piutang").then(function(data){
				$scope.listPenjamin=data.rekanan;
				$scope.listjenisPenjamin=data.kelompokpasien;
				var chacePeriode = cacheHelper.get('periodeTransaksiPencatatanPiutangDaftarLayanan');
				if(chacePeriode != undefined){
					var arrPeriode = chacePeriode.split(':');
					if (arrPeriode[9] == 'as@epic') {//EDIT START HERE :)
						noposting=arrPeriode[1]
						modelItemAkuntansi.getDataTableTransaksi("piutang/collected-piutang-layanan/" + noposting).then(function(data){
							var datadita = data;

							var total = parseInt(0);
							var jumlahPasien = parseInt(0);
							for (var i = 0; i < datadita.length; i++) {
								total = total + parseInt(datadita[i].totalKlaim);
								jumlahPasien = jumlahPasien + 1
								// datadita[i].tglTransaksi =datadita[i].tglTransaksi
								datadita[i].rekanan = datadita[i].namarekanan
								datadita[i].umur =datadita[i].umur
								datadita[i].sisa =datadita[i].totalKlaim
								// datadita[i].status =''
							};
							$scope.item.tanggalAwal = new Date(datadita[0].tglTransaksi);
							$scope.item.tanggalAkhir = new Date(datadita[0].tglTransaksi);
							$scope.item.penjamin = {id:datadita[0].rknid,namarekanan:datadita[0].namarekanan}
							$scope.item.jenisPenjamin = {id:datadita[0].kpid,kelompokpasien:datadita[0].jenisPasien}

							$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
							$scope.item.totalPasien =  jumlahPasien;

							$scope.dataSource = new kendo.data.DataSource({
                                data: datadita
                            });

                            loadData()
						});
					}else if(arrPeriode[9] == 'nengepic'){
						var txtFileName=arrPeriode[8]
						modelItemAkuntansi.getDataTableTransaksi("piutang/collecting-from-txt-inacbgs?txtFileName=" + txtFileName).then(function(data){
							var datadita = data;

							var total = parseInt(0);
							var jumlahPasien = parseInt(0);
							for (var i = 0; i < datadita.length; i++) {
								total = total + parseInt(datadita[i].totalKlaim);
								jumlahPasien = jumlahPasien + 1
								// datadita[i].tglTransaksi =datadita[i].tglTransaksi
								// datadita[i].rekanan = datadita[i].namarekanan
								// datadita[i].umur =datadita[i].umur
								datadita[i].sisa =datadita[i].totalKlaim
								datadita[i].no = i+1
								// datadita[i].status =''
							};
							$scope.item.tanggalAwal = new Date(datadita[0].tglTransaksi);
							$scope.item.tanggalAkhir = new Date(datadita[0].tglTransaksi);
							$scope.item.penjamin = {id:datadita[0].rknid,namarekanan:datadita[0].namarekanan}
							$scope.item.jenisPenjamin = {id:datadita[0].kpid,kelompokpasien:datadita[0].jenisPasien}

							$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
							$scope.item.totalPasien =  jumlahPasien;
							$scope.dataSource = new kendo.data.DataSource({
                                data: datadita
                            });

                            // loadData()
						});
					}else{//NEW COLLECTING START HERE :)
						$scope.item.tanggalAwal = new Date(arrPeriode[0]);
						$scope.item.tanggalAkhir = new Date(arrPeriode[1]);

						var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
						var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
						if (arrPeriode[2] != "undefined"){
							$scope.item.namaReg = arrPeriode[2];
						};
						if (arrPeriode[4] != "undefined"){
							$scope.item.status = {"namaStatus":arrPeriode[4]} ;
						};

						if (arrPeriode[5] != 'undefined') {
							$scope.item.jenisPenjamin = {id:arrPeriode[5],kelompokpasien:arrPeriode[6]}
						}
						if (arrPeriode[7] != 'undefined') {
							$scope.item.penjamin = {id:arrPeriode[7],namarekanan:arrPeriode[8]}
						}

						loadData()
					}
				}
				else
				{
					$scope.item.tanggalAwal = $scope.now;
					$scope.item.tanggalAkhir = $scope.now;
				};
			})
			// if($scope.dataParams.splitString != undefined){
			// 	var strFilter = $scope.dataParams.splitString;
			// 	var arrFilter= strFilter.split('~');

			// 	$scope.item.tanggalAwal = new Date(arrFilter[0]);
			// 	$scope.item.tanggalAkhir = new Date(arrFilter[1]);
			// 	// if(arrFilter[2] != "undefined"){
			// 	// 	$scope.item.jenisPenjamin = {"namaRekanan":arrFilter[2]} ;
			// 	// };
			// 	if(arrFilter[3] != "undefined"){
			// 		$scope.item.namaReg = arrFilter[3];
			// 	};
			// 	dariSini = arrFilter[4];
			// };


			function showButton(){
				$scope.showBtnCetak = true;
				
				$scope.showBtnSave = true;
				$scope.showBtnBack = true;
			};
			
			showButton();

			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY');
			}

			$scope.Back = function(){
				Kembali()
			};

			function Kembali(){
				window.history.back();
			};

			// $scope.item = {};
			$scope.item.namaCollector = "Janu Pamungkas, S.kom";
			// $scope.item.tglCollect = "31 Januari 2017";
			//$scope.item.totalKlaim = 0;
			//$scope.item.totalPasien = "5";
			$scope.dataCollectingPiutang = [
			];
			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 10,
				data: $scope.dataCollectingPiutang,
				autoSync: true,
				serverPaging: true
	                    /*schema: {
	                      	model: {
	                        	id: "asetId",
	                        	fields: {
	                            	
	                        	}   
	                    	}
	                    }	*/
	                });

			$scope.dataAdd = new kendo.data.DataSource({
				data: [],
				editable: true
			});
			$scope.dataSource = new kendo.data.DataSource({
				data: [],
				editable: true
			});
			
			$scope.Hapus = function(){
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					if ($scope.dataSelected2.noRegistrasi == $scope.dataSource._data[i].noRegistrasi) {
						$scope.dataSource._data.splice(i,1)
					}
				};
				var total = parseInt(0);
				var jumlahPasien = parseInt(0);
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					total = total + parseInt($scope.dataSource._data[i].sisa);
					jumlahPasien = jumlahPasien + 1
				};

				$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
				$scope.item.totalPasien =  jumlahPasien;
			}

			$scope.HapusAll = function(){
				// for (var i = $scope.dataSource._data.length; i = 0; i--) {
				// 	$scope.dataSource._data.splice(i,1)	
				// };


				var datadono = []
				$scope.dataSource = new kendo.data.DataSource({
                    data: datadono
                });
				var total = parseInt(0);
				var jumlahPasien = parseInt(0);
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					total = total + parseInt($scope.dataSource._data[i].sisa);
					jumlahPasien = jumlahPasien + 1
				};

				$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
				$scope.item.totalPasien =  jumlahPasien;
			}

			$scope.tambahAll = function(){
				for (var i = 0; i < $scope.dataPencatatanPiutang.length; i++) {
					var bool = false;
					for (var j = 0; j < $scope.dataSource._data.length; j++) {
						if($scope.dataPencatatanPiutang[i].noRegistrasi == $scope.dataSource._data[j].noRegistrasi){
							bool = true
							break
						}
					}
					if (bool == false){
							$scope.dataSource.add($scope.dataPencatatanPiutang[i]);
						}
				};

				
				//debugger;
				var total = parseInt(0);
				var jumlahPasien = parseInt(0);
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					total = total + parseInt($scope.dataSource._data[i].sisa);
					jumlahPasien = jumlahPasien + 1
				};

				$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
				$scope.item.totalPasien =  jumlahPasien;
			}

			$scope.pushDataKegiatan = function(dataAdd){
				// if (dataAdd.status == 'Collecting') {
				// 	alert("Pasien sudah collecting !");
				// 		return;
				// }
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					if($scope.dataSource._data[i].noRegistrasi == dataAdd.noRegistrasi){
						alert("Pasien dengan NoRegistrasi ini sudah di tambah !");
						return;
					};	
				};

				$scope.dataSource.add(dataAdd);
				//debugger;
				var total = parseInt(0);
				var jumlahPasien = parseInt(0);
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					total = total + parseInt($scope.dataSource._data[i].sisa);
					jumlahPasien = jumlahPasien + 1
				};

				$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
				$scope.item.totalPasien =  jumlahPasien;
			};

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			};
			$scope.columCollecting = [
			{
				"field": "no",
				"title": "No",
				"width":"50px"
			},
			{
				"field": "noRegistrasi",
				"title": "No Reg",
				"width":"150px",
				"template": "<span class='style-center'>#: noRegistrasi #</span>"
			},
			// {
			// 	"field": "tglTransaksi",
			// 	"title": "Tanggal",
			// 	"width":"150px",
			// 	"template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
			// },
			{
				"field": "namaPasien",
				"title": "Nama",
				"width":"200px",
				"template": "<span class='style-left'>#: namaPasien #</span>"
			},
			{
				"field": "jenisPasien",
				"title": "Jenis Penjamin",
				"width":"150px",
				"template": "<span class='style-left'>#: jenisPasien #</span>"
			},
			{
				"field": "namarekanan",
				"title": "Nama Rekanan",
				"width":"150px",
			},
			{
				"field": "sisa",
				"title": "Total Klaim",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: sisa #', '')}}</span>"
			}//,
			// {
			// 	"field": "umur",
			// 	"title": "Umur",
			// 	"width":"250px",
			// 	"template": "<span class='style-left'>#: umur #</span>"
			// },
			// {
			// 	"field": "status",
			// 	"title": "Status",
			// 	"width":"150px",
			// 	"template": "<span class='style-center'>#: status #</span>"
			// }
			];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columCollecting,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			$scope.$watch('item.jenisPenjamin', function(newValue, oldValue) {
				if(newValue != undefined ){
					var kdKelompokPasien=""
					if ($scope.item.jenisPenjamin.kelompokpasien === "BPJS") {
						$scope.bpjs = true;
					}
					else{
						$scope.bpjs = false;
					}
				}
			});
			
			// manageKasir.getItem("list-generic/getRekanan").then(function(data){
			// 	$scope.listPenjamin=data;
			// });
			// manageKasir.getDataGeneric("KelompokPasien&select=id,kelompokPasien").then(function(data){
			// 	//debugger;
			// 	$scope.listjenisPenjamin=data.data;
			// })

			$scope.Cari = function(){
				if (datas != undefined) {
					$scope.dataGrid = new kendo.data.DataSource({
	                    data: datas,
	                });
				}
				if($scope.item.jenisPenjamin==undefined)
					alert('Pilih dulu kelompok Pasien !!!')
				else
					loadData()
			}
			function loadData(){
				// if($scope.item.penjamin == undefined){
				// 	alert("Nama Penjamin belum dipilih!");
				// 	return;
				// }
				
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD"); 
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var np = "&namaPasien=" + $scope.item.namaReg;
				if($scope.item.namaReg == undefined){
					var np = "";
				};
				var noregistrasi = "&noregistrasi=" + $scope.item.noRegistrasi;
				if($scope.item.noRegistrasi == undefined){
					var noregistrasi = "";
				};
				var noMR = "&nocm=" + $scope.item.noMR;
				if($scope.item.noMR == undefined){
					var noMR = "";
				};
				//jenisPasien.id
				var jp = "";
				if($scope.item.jenisPenjamin != undefined){
					var jp = "&kelompokpasienfk=" + $scope.item.jenisPenjamin.id;
				};
				var jpp = "";
				if($scope.item.penjamin != undefined){
					var jpp = "&rekananfk=" + $scope.item.penjamin.id;
				};
				
				//debugger;
				var stt =""// "&status=Piutang"
				var $status ="Piutang";
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-piutang-layanan?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 
					+ np + jp + stt + jpp + '&status=Piutang'+noregistrasi+noMR).then(function(data){
					//$scope.dataPencatatanPiutang=data;
					var dat =[];
					// for (var i = 0; i < data.length; i++) {
					// 	if (data[i].status == $status){
					// 		dat.push(data[i]);	
					// 	}
					// }
					$scope.dataPencatatanPiutang=data;
					for (var i = 0; i < $scope.dataPencatatanPiutang.length; i++) {
						$scope.dataPencatatanPiutang[i].sisa =parseFloat($scope.dataPencatatanPiutang[i].totalKlaim) - parseFloat($scope.dataPencatatanPiutang[i].totalBayar);
					}
				});
			};

			$scope.columnPencatatanPiutang = [
			{
				"field": "noRegistrasi",
				"title": "No Reg",
				"width":"100px",
				"template": "<span class='style-center'>#: noRegistrasi #</span>"
			},
			{
				"field": "tglTransaksi",//**
				"title": "Tanggal",
				"width":"100px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
			},
			{
				"field": "namaPasien",
				"title": "Nama",
				"width":"160px",
				"template": "<span class='style-left'>#: namaPasien #</span>"
			},
			// {
			// 	"field": "ruangan",
			// 	"title": "Ruangan",
			// 	"width":"160px",
			// 	"template": "<span class='style-left'>#: ruangan #</span>"
			// },
			{
				"field": "jenisPasien",
				"title": "Jenis Penjamin",
				"width":"100px",
				"template": "<span class='style-left'>#: jenisPasien #</span>"
			},
			{
				"field": "rekanan",//**
				"title": "Penjamin",
				"width":"170px",
				"template": "<span class='style-left'>#: rekanan #</span>"
			},
			{
				"field": "totalBilling",
				"title": "Total Tagihan",
				"width":"120px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBilling #', '')}}</span>"
			},
			{
				"field": "totalKlaim",
				"title": "Total Klaim",
				"width":"120px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', '')}}</span>"
			},
			{
				"field": "totalBayar",
				"title": "Total Bayar",
				"width":"120px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', '')}}</span>"
			},
			{
				"field": "sisa",//**
				"title": "Sisa Piutang",
				"width":"120px",
				"template": "<span class='style-right'>{{formatRupiah('#: sisa #', '')}}</span>"
			},
			// {
			// 	"field": "umur",//**
			// 	"title": "Umur",
			// 	"width":"100px",
			// 	"template": "<span class='style-left'>#: umur #</span>"
			// },
			{
				"field": "status",//**
				"title": "Status",
				"width":"100px",
				"template": "<span class='style-center'>#: status #</span>"
			}
			];

			$scope.Save = function(){
				// $scope.item.idPenjamin = $scope.item.tahun.FieldTahun
				// $scope.item.periodeAwal = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAwal),"YYYY-MM-DD"); 
				// $scope.item.periodeAkhir = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAkhir),"YYYY-MM-DD"); 
				// $scope.item.status = $scope.item.status.Status

				//debugger;
				// if($scope.item.jenisPenjamin == undefined){
				// 	alert("Nama Penjamin belum dipilih!");
				// 	return;
				// }

				if ($scope.dataSource._data.length == 0) {
				// if ($scope.dataSource.length == 0) {
					alert('Belum ada adata yang di pilih !')
					return
				}
				// if (noposting != '') {
				// 	modelItemAkuntansi.getDataTableTransaksi("piutang/batal-collected-piutang-layanan?noposting=" + noposting).then(function(data){
					
				// 	})
				// }

				var dataObjPost = {};
				var dataObjloop = {};
				var arrObjPembayaran = [];
				var penjamin='';
				if ($scope.item.penjamin != undefined) {
					penjamin = $scope.item.penjamin.id
				}
				
				for(var i=0; i<$scope.dataSource._data.length; i++){
				// for(var i=0; i<$scope.dataSource.length; i++){					
					// arrObjPembayaran.push($scope.dataSource._data[i].noRec)
					dataObjloop = {norec : $scope.dataSource._data[i].noRec,
								   totalKlaim : $scope.dataSource._data[i].totalKlaim};
					// dataObjloop = {norec : $scope.dataSource[i].noRec,
					// 			   totalKlaim : $scope.dataSource[i].totalKlaim};
					arrObjPembayaran.push(dataObjloop)
				}
				dataObjPost = {
					idPenjamin: penjamin,
					nopostings: noposting,
					strukPenjamin: arrObjPembayaran
				}
				manageKasir.collecting(dataObjPost).then(function(e) {
				})
				Kembali();
			};

			/***Upload Excel */
            $("#upload").kendoUpload({
                localization: {
                    "select": "Pilih File Excel..."
                },
                
                select: function(e) {
                    $scope.isRouteLoading = true;
                    var ALLOWED_EXTENSIONS = [".xlsx"];
                    var extension = e.files[0].extension.toLowerCase();
                    if (ALLOWED_EXTENSIONS.indexOf(extension) == -1) {
                        toastr.error('Mohon Pilih File Excel (.xls)')
                        e.preventDefault();
                        // return
                    }
                    var file = e.files[0];
                    var stringFile = e.files[0].name
                    var strFile = stringFile.split('.')
                    var nmFileArr = strFile[0].split('_')
                    if (nmFileArr[1] != undefined && nmFileArr[2] != undefined && nmFileArr[3] != undefined) {
                        $scope.item.tanggal = new Date(moment(nmFileArr[1]).format('YYYY-MM-DD HH:mm'));
                        $scope.item.ruangan = { id: nmFileArr[2], namaruangan: nmFileArr[3] }
                    } else {
                        toastr.info('UMPAN BALIK_RITL_BULAN_TAHUN_TAHAP_1.xls', 'Contoh Nama File');
                        toastr.error('Nama File Tidak Sesuai', 'Info');
                       
                        return;
                    }
                    for (var i = 0; i < e.files.length; i++) {
                        var file = e.files[i].rawFile;
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var data = e.target.result;
                                var workbook = XLSX.read(data, {
                                    type: 'binary'
                                });
                                
                                workbook.SheetNames.forEach(function (sheetName) {
                                    // Here is your object
                                    debugger;
                                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                    var json_object = JSON.stringify(XL_row_object);
                                    console.log(XL_row_object);
                                    datatemp = workbook.Strings; //XL_row_object;
                                    dataAya = $scope.dataSource._data
                                    for (var i = datatemp.length - 1; i >= 0; i--) {
                                    	for (var j = dataAya.length - 1; j >= 0; j--) {
                                    		if (datatemp[i].h == dataAya[j].sep) {
                                    			datas.push({
                                    				"collector": dataAya[j].collector,
													"jenisPasien": dataAya[j].jenisPasien,
													"kelasPenjamin": dataAya[j].kelasPenjamin,
													"kelasRawat": dataAya[j].kelasRawat,
													"keterangan": dataAya[j].keterangan,
													"kpid": dataAya[j].kpid,
													"namaPasien": dataAya[j].namaPasien,
													"namarekanan": dataAya[j].namarekanan,
													"noPosting": dataAya[j].noPosting,
													"noRec": dataAya[j].noRec,
													"noRegistrasi": dataAya[j].noRegistrasi,
													"rknid": dataAya[j].rknid,
													"sep": datatemp[i].h,
													"status": dataAya[j].status,
													"tarifinacbgs": dataAya[j].tarifinacbgs,
													"tarifselisihklaim": dataAya[j].tarifselisihklaim,
													"tglPosting": dataAya[j].tglPosting,
													"tglTransaksi": dataAya[j].tglTransaksi,
													"totalBayar": dataAya[j].totalBayar,
													"totalBilling": dataAya[j].totalBilling,
													"totalKlaim": dataAya[j].totalKlaim,
													"umur": dataAya[j].umur
												},)
                                    		}
                                    	}
                                    }
	        							var total = parseInt(0);
										var jumlahPasien = parseInt(0);
										for (var i = 0; i < datas.length; i++) {
											total = total + parseInt(datas[i].totalKlaim);
											jumlahPasien = jumlahPasien + 1											
											datas[i].sisa =datas[i].totalKlaim
											datas[i].no = i+1
										};
										$scope.item.tanggalAwal = new Date(datas[0].tglTransaksi);
										$scope.item.tanggalAkhir = new Date(datas[0].tglTransaksi);
										$scope.item.penjamin = {id:datas[0].rknid,namarekanan:datas[0].namarekanan}
										$scope.item.jenisPenjamin = {id:datas[0].kpid,kelompokpasien:datas[0].jenisPasien}

										$scope.item.totalKlaim = 'Rp. ' +  parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
										$scope.item.totalPasien =  jumlahPasien;
										$scope.dataSource = datas;
                                })
                            };
    
                            reader.onerror = function (ex) {
                                console.log(ex);
                            };
    
                            reader.readAsBinaryString(file);
                        }
                    }

                    $scope.dataGrid = datatemp
                    $scope.isRouteLoading = false;
                   
                },
                
             })
            /***END Upload Excel */

///////////////////////////////////////// -TAMAT- ///////////////////////////////////////////////

}
]);
});