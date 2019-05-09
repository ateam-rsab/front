//Owari Start here....
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SetoranKasirBendaharaPenerimaanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'MnKeu','DateHelper','$state','CacheHelper',
		function($q, $rootScope, $scope, modelItemAkuntansi, mnKeu,dateHelper,$state,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};

			$scope.item.tanggalAwal = $scope.now
			$scope.item.tanggalAkhir = $scope.now
			var status = ""
			loadCombo();
			//loadData();
			
			
			function loadCombo(){
				//debugger;
				var chacePeriode = cacheHelper.get('SetoranKasirBendaharaPenerimaanCtrl');
				if(chacePeriode != undefined){
					var arrPeriode = chacePeriode.split('~');
					$scope.item.tanggalAwal = new Date(arrPeriode[0]);
					$scope.item.tanggalAkhir = new Date(arrPeriode[1]);
					$scope.item.tanggalAwal2 = new Date(arrPeriode[2]);
					$scope.item.tanggalAkhir2 = new Date(arrPeriode[3]);
					$scope.item.tanggalAwal3 = new Date(arrPeriode[4]);
					$scope.item.tanggalAkhir3 = new Date(arrPeriode[5]);
				}
				else
				{              
					$scope.item.tanggalAwal = $scope.now;
					$scope.item.tanggalAkhir = $scope.now;
					$scope.item.tanggalAwal2 = $scope.now;
					$scope.item.tanggalAkhir2 = $scope.now;
					$scope.item.tanggalAwal3 = $scope.now;
					$scope.item.tanggalAkhir3 = $scope.now;
				}
				//data[2].data
				var objKasir = {}
				$scope.listStatus = [{"id":"1","namaExternal":"Semua"},{"id":"2","namaExternal":"Verifikasi"},{"id":"3","namaExternal":"Closing"}]
				$q.all([
					mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=697"),
					mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=699"),
					mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=700"),
					mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=701")	     
					]).then(function(data) {
						objKasir = data[0]
						for (var y=1;y<4;y++){
							for (var x=0;x < data[y].data.length;x++){
								objKasir.data.push(data[y].data[x])
							}
						}
						$scope.listNamaKasir = objKasir.data;
					})
				}

				$scope.SearchData1 = function(){
					if ($scope.item.namaKasir == undefined){
						alert("Kasir belum dipilih");
					}else{
						status = "-"
						loadData()
					}
				}
				$scope.SearchData2 = function(){
					status = "VERIFIKASI"
					loadData()
				}
				$scope.SearchData3 = function(){
						status = "CLOSING"
						loadData()
				}

				$scope.Closing = function(){
				debugger;
					var objNoRecSbm = []
					for (var x=0;x<$scope.dataSelectedVerif.detail.length;x++){
						var objNoRecSbm2 = {noRecSbm: $scope.dataSelectedVerif.detail[x].noRec}
						objNoRecSbm.push(objNoRecSbm2)
					}
					var objPost = {strukVerifikasi: {},
						list : objNoRecSbm
					}
					mnKeu.postData(objPost,"daftar-penerimaan/save-closing-verifikasi-setoran")
				}

				$scope.Verifikasi = function(){
				//debugger;
					var objNoRecSbm = []
					for (var x=0;x<$scope.dataSetoranKasir._data.length;x++){
						var objNoRecSbm2 = {noRecSbm: $scope.dataSetoranKasir._data[x].noRec}
						objNoRecSbm.push(objNoRecSbm2)
					}
					var objPost = {strukVerifikasi: {},
						list : objNoRecSbm
					}
					mnKeu.postData(objPost,"daftar-penerimaan/save-verifikasi-setoran")
				}
		function loadData(){
			var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
			var tglAkhir = moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
				// tglAwal = '2016-01-01'
				// tglAkhir = '2018-01-01'
				var tglAwal2 = moment($scope.item.tanggalAwal2).format('YYYY-MM-DD');
				var tglAkhir2 = moment($scope.item.tanggalAkhir2).format('YYYY-MM-DD');
				var tglAwal3 = moment($scope.item.tanggalAwal3).format('YYYY-MM-DD');
				var tglAkhir3 = moment($scope.item.tanggalAwal3).format('YYYY-MM-DD');
				var chacePeriode = tglAwal+"~"+tglAkhir +"~"+ tglAwal2+"~"+tglAkhir2 +"~"+ tglAwal3+"~"+tglAkhir3;
				cacheHelper.set('SetoranKasirBendaharaPenerimaanCtrl', chacePeriode);
              debugger;
              var Skasir = "";
              if($scope.item.namaKasir != undefined){
              	Skasir = $scope.item.namaKasir.id;
              }

              var ScaraBayar = "";
              if($scope.item.caraBayar != undefined){
              	ScaraBayar = $scope.item.caraBayar.id;
              }

              var SkelompokTransaksi = "";
              if($scope.item.kelompokTransaksi != undefined){
              	SkelompokTransaksi = $scope.item.kelompokTransaksi.id;
              }

              $q.all([
              	mnKeu.getUrlData("daftar-penerimaan/penerimaan/?"
              		+"dateStartTglSbm="+tglAwal
              		+"&dateEndTglSbm="+tglAkhir
              		+"&idPegawai="+Skasir
              		+"&idCaraBayar="+ScaraBayar
              		+"&idKelTransaksi="+SkelompokTransaksi
              		+"&status=-"),
              	mnKeu.getUrlData("tagihan-rekanan/verifikasi/?"
              		+"dateStart="+tglAwal2
              		+"&dateEnd="+tglAkhir2
              		+"&idKelTransaksi=61"),
              	mnKeu.getUrlData("daftar-penerimaan/penerimaan/?"
              		+"dateStartTglSbm="+tglAwal3
              		+"&dateEndTglSbm="+tglAkhir3
              		+"&idPegawai="+Skasir
              		+"&idCaraBayar="+ScaraBayar
              		+"&idKelTransaksi="+SkelompokTransaksi
              		+"&status=CLOSING"),
              	mnKeu.getUrlData("daftar-penerimaan/penerimaan/?"
              		+"dateStartVerif="+tglAwal2
              		+"&dateEndVerif="+tglAkhir2)
              	]).then(function(data) {
              		//debugger;
              		if (data[0].statResponse){ 
              			var result=data[0].data.result;
              			var result2=data[1].data.result;
              			var result3=data[2].data.result;
              			var result4=data[3].data.result;
              			var ttlPasien = 0;
              			var ttlKlaim = 0;
              			for (var x=0 ;x< result.length;x++){
              				var element =result[x];
              				ttlPasien = ttlPasien + 1;
              				element.tglSbm= moment(result[x].tglSbm).format('DD-MM-YYYY');
              				//element.status= "Belum Setor";
              				ttlKlaim = ttlKlaim + parseInt(result[x].totalPenerimaan);
              			}
      //         			objKasir = data[0]
						// for (var y=1;y<4;y++){
						// 	for (var x=0;x < data[y].data.length;x++){
						// 		objKasir.data.push(data[y].data[x])
						// 	}
						// }
						debugger;
						if (status = "-"){
							$scope.dataSetoranKasir = new kendo.data.DataSource({
								data: result,
								pageSize: 10,
								total: result.length,
								serverPaging: false
							});
							$scope.item.totalSubTotal2 ="Rp. " + parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							
						}
						if (status = "VERIFIKASI"){
							var dataObject=[]
							var y = 0
							for (x=0;x<result2.length;x++){
								result2[x].tglVerif = moment(result2[x].tglVerif).format('DD-MM-YYYY');
								dataObject.push(result2[x])
								dataObject[x].detail = []
								for (y=0;y<result4.length;y++){
									if (result2[x].noVerif == result4[y].noVerifikasi){
										dataObject[x].detail.push(result4[y])
									}
								}
							}


							$scope.dataVerif = new kendo.data.DataSource({
								data: dataObject,
								pageSize: 10,
								total: dataObject.length,
								serverPaging: false
							});
							$scope.item.totalSubTotal ="Rp. " + parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
						}
						if (status = "CLOSING"){
							$scope.dataClosing = new kendo.data.DataSource({
								data: result3,
								pageSize: 10,
								total: result3.length,
								serverPaging: false
							});
							$scope.item.totalSubTotal3 ="Rp. " + parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
						}

					}
				});
              	Total();
              }

              function Total(){
              	// var ttlPasien = 0;
              	// var ttlKlaim = 0;
              	// if($scope.dataSetoranKasir != undefined){
              	// 	for(var i=0; i<$scope.dataSetoranKasir.length; i++){
              	// 		ttlPasien = ttlPasien + 1;
              	// 		ttlKlaim = ttlKlaim + parseInt($scope.dataSetoranKasir[0].totalPenerimaan);
              	// 	};
              	// };
              	// $scope.item.totalSubTotal ="Rp. " + parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }

			// function showButton(){
			// 	$scope.showBtnBack = true;
			// 	$scope.showBtnBayarSetor = true;
			// };
			// showButton();

			// $scope.dataSetoranKasir = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.columnSetoranKasir = [
			{
				"field": "noSbm",
				"title": "NoSbm",
				"template": "<span class='style-center'>#: noSbm #</span>"
			},
			{
				"field": "tglSbm",
				"title": "Tanggal",
				"template": "<span class='style-center'>#: tglSbm #</span>"
			},
			{
				"field": "kelTransaksi",
				"title": "Kelompok Transaksi",
				"template": "<span class='style-left'>#: kelTransaksi #</span>"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				"template": "<span class='style-left'>#: keterangan #</span>"
			},
			{
				"field": "caraBayar",
				"title": "Cara Bayar",
				"template": "<span class='style-center'>#: caraBayar #</span>"
			},
			{
				"field": "totalPenerimaan",
				"title": "Total Penerimaan",
				"template": "<span class='style-right'>{{formatRupiah('#: totalPenerimaan #', 'Rp.')}}</span>"

			},
			{
				"field": "namaPenerima",
				"title": "Kasir",
				"template": "<span class='style-center'>#: namaPenerima #</span>"
			},
			{
				"field": "status",
				"title": "Status",
				"template": "<span class='style-center'>#: status #</span>"
			}
			];
			$scope.columnVerif = [
			{
				"field": "tglVerif",
				"title": "Tanggal",
				"template": "<span class='style-center'>#: tglVerif #</span>"
			},
			{
				"field": "noVerif",
				"title": "NoVerif",
				"template": "<span class='style-center'>#: noVerif #</span>"
			},
			{
				"field": "kelTransaksi",
				"title": "Kelompok Transaksi",
				"template": "<span class='style-left'>#: kelTransaksi #</span>"
			},
			{
				"field": "namaVerif",
				"title": "Keterangan",
				"template": "<span class='style-left'>#: namaVerif #</span>"
			},
			{
				"field": "namaPegawai",
				"title": "Nama Pegawai",
				"template": "<span class='style-center'>{{('#: namaPegawai #')}}</span>"

			}
			];
			$scope.detailGridOptions = function(dataItem) {
				return {
					dataSource: new kendo.data.DataSource({
						data: dataItem.detail
					}),
					columns: [
					{
						"field": "kelTransaksi",
						"title": "Kelompok Transaksi",
						"width":"150px"
					},
					{
						"field": "keterangan",
						"title": "Keterangan",
						"width":"360px"
					},
					{
						"field": "caraBayar",
						"title": "Cara Bayar",
						"width":"360px"
					},
					{
						"field": "totalPenerimaan",
						"title": "Jumlah Penerimaan",
						"width":"200px",
						"template": "<span class='style-right'>{{formatRupiah('#: totalPenerimaan #', 'Rp.')}}</span>"
					}]
				};
			};
			$scope.columnClosing = [
			{
				"field": "noSbm",
				"title": "NoSbm",
				"template": "<span class='style-center'>#: noSbm #</span>"
			},
			{
				"field": "tglSbm",
				"title": "Tanggal",
				"template": "<span class='style-center'>#: tglSbm #</span>"
			},
			{
				"field": "kelTransaksi",
				"title": "Kelompok Transaksi",
				"template": "<span class='style-left'>#: kelTransaksi #</span>"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				"template": "<span class='style-left'>#: keterangan #</span>"
			},
			{
				"field": "caraBayar",
				"title": "Cara Bayar",
				"template": "<span class='style-center'>#: caraBayar #</span>"
			},
			{
				"field": "totalPenerimaan",
				"title": "Total Penerimaan",
				"template": "<span class='style-right'>{{formatRupiah('#: totalPenerimaan #', 'Rp.')}}</span>"

			},
			{
				"field": "namaPenerima",
				"title": "Kasir",
				"template": "<span class='style-center'>#: namaPenerima #</span>"
			},
			{
				"field": "status",
				"title": "Status",
				"template": "<span class='style-center'>#: status #</span>"
			}
			];
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.Setor = function(){
				$scope.changePage3("SetoranKasir");
			};
			$scope.changePage3 = function(stateName){
				////debugger;
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				if ($scope.item.status != undefined){
					if($scope.item.status.namaExternal == "Belum Setor"){
						var intSubTotal = 0
						for(var i=0; i<$scope.dataSetoranKasir.length; i++){
							intSubTotal = intSubTotal + parseInt($scope.dataSetoranKasir[0].totalPenerimaan);
						};
						if(parseInt(intSubTotal) > 0)
						{
							var obj = {
								//splitString : "SetoranKasirBendaharaPenerimaan" + "~" + intSubTotal  + "~" + $scope.item.namaKasir.id + "~" + $scope.item.namaKasir.namaExternal  + "~" + tglAwal1  + "~" + tglAkhir1 
								splitString : "SetoranKasirBendaharaPenerimaan" + "~" + $scope.item.namaKasir.id + "~" + tglAwal1  + "~" + tglAkhir1 
							}

							$state.go(stateName, {
								dataFilter: JSON.stringify(obj)
							});
						}
						else
						{
							alert("Belum ada Transaksi");
						}
					}
					else{
						alert("Status harus Belum Setor !");
						return;
					}
				}
				else{
					alert("Status harus Belum Setor !");
					return;
				}
			};

///////////////////////////// -TAMAT- ///////////////////////////

}
]);
});