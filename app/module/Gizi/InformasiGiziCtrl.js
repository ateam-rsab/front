define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InformasiGiziCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, $state, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
				$scope.number = 1;
			}, function errorCallBack(err) {});

			//Produk Id
			$scope.produkId = $state.params.produkId


			//FindPasienGizi.getKalori($state.params.produkId).then(function(e){
			FindPasienGizi.getKalori($scope.produkId).then(function(e){
				debugger;
				$scope.dataKalori = e.data.data.list;
				if($scope.dataKalori == null){
					window.messageContainer.error('Data Kalori Tidak ada');
				}
				$scope.dataKalori.forEach(function(e){
					e.no = $scope.number++;
				})

				$scope.sourceDataKalori = new kendo.data.DataSource({
					pageSize: 10,
					data:$scope.dataKalori
				});
			});



			$scope.mainGridOptions1 = {
                pageable: true,
                scrollable:false,
                columns: [
                {
                	"field" : "no",
                	"title" : "<h3 align=center>No.<h3>",
                	"width" : "20px"
                },{
					"field": "menu",
					"title": "<h3 align=center>Nama Menu</h3>",
					"width": "200px"
				}, {
					"field": "kalori",
					"title": "<h3 align=center>Berat (gr)<h3>",
					"width": "100px"
				}, {
					"field": "jumlahPorsi",
					"title": "<h3 align=center>Qty<h3>",
					"width": "70px"
				}, {
					"field": "satuanStandar",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "100px"
					// footerTemplate: "Jumlah:"
				}, {
					"field": "energi",
					"title": "<h3 align=center>Energi (Kkal)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "protein",
					"title": "<h3 align=center>Protein (gr)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "lemak",
					"title": "<h3 align=center>Lemak (gr)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "karbohidrat",
					"title": "<h3 align=center>Karbohidrat (gr)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "keterangan",
					"title": "<h3 align=center>Keterangan<h3>",
					"width": "200px"
				}]
			}

			$scope.navToPemesananPasien = function(){
            	$state.go("DaftarPemesananPasien")
            }


            $scope.NoKomposisi = 1;
            //FindPasienGizi.getKomposisiMakanan($state.params.produkId).then(function(dat){
            FindPasienGizi.getKomposisiMakanan($scope.produkId).then(function(dat){
            	$scope.dataKomposisiMakanan = dat.data.data.list;
            	if($scope.dataKomposisiMakanan == null){
            		window.messageContainer.error('Data Komposisi Makanan Tidak ada');
            	}
            	$scope.dataKomposisiMakanan.forEach(function(e){
            		e.no = $scope.NoKomposisi++
            	})
            	$scope.sourceKomposisiMakanan = new kendo.data.DataSource({
					pageSize: 10,
					data: dat.data.data.list
				})
			});
			$scope.mainGridOptions2 = {
                pageable: true,
                scrollable:false,
                columns: [
                {
                   "field" : "no",
                   "title" : "<h3 align=center>No.</h3>",
                   "width" : "20px"
                },
				{
					"field": "menu",
					"title": "<h3 align=center>Menu</h3>",
					"width": "200px"
				}, {
					"field": "bahan",
					"title": "<h3 align=center>Bahan<h3>",
					"width": "100px"
				},{
					"field": "jumlahPorsi",
					"title": "<h3 align=center>Jumlah<h3>",
					"width": "100px"
				},{
					"field": "satuanStandar",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "100px"
				}]
			};

			$scope.back = function(){
				$state.go('DaftarPemesananPasien')
			};

			$scope.NumberFormula = 1;
			//FindPasienGizi.getKomposisiFormula($state.params.produkId).then(function(dat){
			FindPasienGizi.getKomposisiFormula($scope.produkId).then(function(dat){
			debugger
			$scope.SouceDataKomposisiFormula = dat.data.data.list;
			if($scope.SouceDataKomposisiFormula == null){
				window.messageContainer.error('Data Komposisi Formula Tidak ada')
			}
			$scope.SouceDataKomposisiFormula.forEach(function(x){
				x.no = $scope.NumberFormula++;
			})
            	$scope.sourceKomposisiFormula = new kendo.data.DataSource({
					pageSize: 10,
					data: dat.data.data.list
				})
			});
			$scope.mainGridOptions3 = {
                pageable: true,
                scrollable:false,
                columns: [
                {
					"field": "no",
					"title": "<h3 align=center>No. </h3>",
					"width": "20px"
				},
				{
					"field": "jenisMakananCair",
					"title": "<h3 align=center>Jenis Makanan Cair</h3>",
					"width": "200px"
				}, {
					"field": "frekuensi",
					"title": "<h3 align=center>Frekuensi<h3>",
					"width": "100px"
				},{
					"field": "jumlah",
					"title": "<h3 align=center>Jumlah<h3>",
					"width": "100px"
				},{
					"field": "per1000ml",
					"title": "<h3 align=center>Per 1000 ML<h3>",
					"width": "700px",
					"columns":[
					{
						"field": "energi",
						"title": "<h3 align=center>Energi<h3>",
						"width": "100px"
					}, {
						"field": "protein",
						"title": "<h3 align=center>Protein</h3>",
						"width": "100px"
					}, {
						"field": "laktosa",
						"title": "<h3 align=center>Laktosa<h3>",
						"width": "100px"
					},{
						"field": "kalium",
						"title": "<h3 align=center>Kalium<h3>",
						"width": "100px"
					}, {
						"field": "natrium",
						"title": "<h3 align=center>Natrium</h3>",
						"width": "100px"
					}, {
						"field": "magnesium",
						"title": "<h3 align=center>Magnesium<h3>",
						"width": "100px"
					},{
						"field": "seng",
						"title": "<h3 align=center>Seng<h3>",
						"width": "100px"
					}, {
						"field": "tembaga",
						"title": "<h3 align=center>Tembaga(cu)</h3>",
						"width": "100px"
					}, {
						"field": "energiprotein",
						"title": "<h3 align=center>% Energi Protein<h3>",
						"width": "100px"
					},{
						"field": "energiLemak",
						"title": "<h3 align=center>% Energi Lemak<h3>",
						"width": "100px"
					},{
						"field": "osmolantus",
						"title": "<h3 align=center>Osmolantus<h3>",
						"width": "100px"
					}]
				}]
			}
			$scope.back = function(){
				$state.go('DaftarPemesananPasien')
			};
		}
	]);
});