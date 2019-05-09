define(	['initialize'], function(initialize) {
	'use strict';
	initialize.controller('OrderLaundryEksCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLaundry', 'FindSarpras', 'FindLaundry', '$timeout', '$window','$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageLaundry, FindSarpras, FindLaundry, $timeout, $window,$state) {
			$scope.item = {};
			ModelItem.get("Laundry/PenerimaanLinen").then(function(data) {
				$scope.item = data;
				// $scope.item.petugas = "admin";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.now = new Date();
			$scope.no=1;
            FindLaundry.getLaundry("mapping-cycle/find-nama-bahan/").then(function(dat){
            	$scope.sourceMasterProduk= dat.data;
            });
			// mapping-jenis-linen-ke-bahan/find-produk-by-kelompok-produk/
			FindSarpras.getSarpras("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat){
				$scope.sourceMasterSatuan= dat;
			});
			
		    FindLaundry.getLaundry("laundry/get-all-satuan").then(function(dat){
			$scope.sourceSatuanStandar = dat.data.data;
			});
			
			FindLaundry.getLaundry("laundry/get-satuan-potong").then(function(dat){
				$scope.sourceSatuan = dat.data.data;
			});
			
			
			// FindLaundry.getLaundry("laundry/get-produk-penerimaan-linen-external").then(function(dat){
			// $scope.sourceLinen = dat.data.data;
			// });
			

			FindLaundry.getLaundry("laundry/get-produk-pelipatan").then(function(dat){
			debugger
			$scope.sourceLinen = dat.data.data;
			for(var i=0; i<$scope.sourceLinen.length; i++){
				$scope.sourceLinen[i].hargaSatuan =  10000;
			}
			});

			$scope.satuanBahan = function() {
				debugger
				if($scope.item.namaProduk != undefined){
				var HargaSatuan = $scope.item.namaProduk.hargaSatuan;
				$scope.item.biayaSave = $scope.item.namaProduk.hargaSatuan;
				var parseHargauang = $scope.formatRupiah(HargaSatuan,'Rp.');
				$scope.item.biaya = parseHargauang; 
				}
			};

			$scope.GetNostruk = function(){
			ManageLaundry.getOrderList("laundry/generate-no-struk", true).then(function(dat) {
				$scope.listnomesin=dat.data.data;
                $scope.item.nomorOrder=dat.data.data.noStruk;
            });
			}
			$scope.GetNostruk();
			

				
			FindLaundry.getLaundry("user/get-user").then(function(dat){
				$scope.item.petugas = dat.data.data.namaUser;
			    $scope.item.petugasx=dat.data.data.pegawai.id;
				 debugger;
			});
			
			$scope.caritotal = function ()  {
				var a = $scope.item.jumlahOrder;
				var b = $scope.item.biayaSave;
				var c = a*b;
				var parseTotalUang = $scope.formatRupiah(c,'Rp.');
				$scope.item.total = parseTotalUang;
				$scope.item.totalSave = c;		
			}
			
			
			$scope.formatRupiah = function(value, currency) {
			return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}	
			
			//$scope.item.total = $scope.formatRupiah(item.total,"");
			$scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			});
			
			 $scope.mainGridOptions = {
				pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
				 filterable: {
                            extra: false,
                            operators: {
                               string: {
                                   startswith: "Dimulai dengan",
                                    contains: "mengandung kata",
                                   neq: "Tidak mengandung kata"
                                }
                            }
                        },
                columns: [
                {
                    "field": "no",
                    "title": "<h3 align=center>No<h3>",
				    "width": "40px",
					"filterable":false		
				},
                {
                    "field": "namaLinen",
                    "title": "<h3 align=center>Nama Linen<h3>",
				    "width": "200px",
					"filterable":false		
				}, 
				{
                    "field": "jumlah",
                    "title": "<h3 align=center>Jumlah<h3>",
					"filterable":false		
                  
				}, {
                    "field": "satuan",
                    "title": "<h3 align=center>Satuan<h3>",
					"filterable":false		
                    	
				}, {
                    "field": "biaya",
                    "title": "<h3 align=center>Harga Satuan<h3>",
					"filterable":false,
                    "template": "{{formatRupiah('#: biaya #', 'Rp.')}}"						
				}, {
                    "field": "total",
                    "title": "<h3 align=center>Total<h3>",
					"filterable":false,
					"template": "{{formatRupiah('#: total #', 'Rp.')}}"	
                }, {
		       command: { 
		        	text: "Hapus",
		        	width:"50px", 
	        	align:"center",
				attributes: {align:"center"},
		       	click: $scope.removeDataPenerimaanLinen 
	        	},
		        title: "Action",
		       width: "80px"
		 
				
              
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };
			
			$scope.number = 1;
			$scope.addDataPenerimaanLinen = function() {
				// var tgl = DateHelper.getTanggalFormatted($scope.item.tanggal);
				var tempDataPenerimaanLinen = {
					"no" : $scope.number++,
					"namaLinen" : $scope.item.namaProduk.namaProduk,
					"jumlah" : $scope.item.jumlahOrder,
					"satuan" : $scope.item.satuanpotong.satuanStandar,
					"satuanid" : $scope.item.satuanpotong.id,
					"biaya"  : $scope.item.biayaSave,
					"produkid" :$scope.item.namaProduk.id,
					"total" : $scope.item.totalSave
				}

				$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
				$scope.item.namaProduk="",
				$scope.item.jumlah="",
				$scope.item.jumlahOrder="",
				$scope.item.total="",
				$scope.item.satuanpotong="",
				$scope.item.biaya = "",
				$scope.item.namaProduk=undefined			
			}
			
			$scope.removeDataPenerimaanLinen= function(e) {
				e.preventDefault();
                debugger;
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);
			};

			 var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }

			$scope.cetakEtiket = function () {
				if ($scope.item.norec == undefined) {
					window.messageContainer.error('Pilih data yang ingin di Cetak')
				} else {
					var link = "http://192.168.0.26:8080/jasamedika-web/reporting/lapStrukLaundry?noRecStrukPelayanan="+$scope.item.norec+"&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJudXJoYXlhdGkubXVoaWRpbiJ9.wgys84zFup3LuRKdf_Xku-Vq7ty7ZBAS99no4klrv3NtsEZ8tBy-8dZBj0dciY1V3REwnPCXr9ErXkk80tJHVg"
					window.open(link);
            	}
            };



            $scope.Save = function(){
			debugger
		     var listRawRequired = [
	          "item.satuan|k-ng-model|Satuan",
	          "item.namaLengkap|ng-model|Nama Lengkap",
	          "item.berat|ng-model|Berat"
	          
	        ];
	         var isValid = ModelItem.setValidation($scope, listRawRequired);
	         if(isValid.status){
				var dat = $scope.dataPenerimaanLinen._data;
				if(dat[0] != undefined){
				var temporaryDetailLaundyEx = [];
				dat.forEach(function(data){
					debugger
					var dataTempPenerimaan ={ "produkId" : data.produkid,
											  "namaProduk" : data.namaLinen,
											  "hargaSatuan" : data.biaya,
											  "jumlah" : data.jumlah,
											  "satuanId" : data.satuanid,
											  "namaSatuan" : data.satuan,
											  "total" : data.total
											}
				       temporaryDetailLaundyEx.push(dataTempPenerimaan);
				      })
				 $scope.temporaryDetailLaundyEx = temporaryDetailLaundyEx;
				 var data = {
				 			  "noStruk" : $scope.item.nomorOrder,
							  "noRecStrukPelayanan": "",
							  "tglTerima": moment($scope.item.tglTerima).format("YYYY-MM-DD hh:mm:ss"),
							  "berat": $scope.item.berat,
							  "petugasId": $scope.item.petugasx,
							  "namaPetugas": $scope.item.petugas,
							  "namaPelanggan": $scope.item.namaLengkap,
							  "noTelp": $scope.item.nomorTelepon,
							  "alamat": $scope.item.alamat,
							  "satuanId": $scope.item.satuan.id,
							  "namaSatuan": $scope.item.satuan.satuanStandar,
							  "produkLinens": $scope.temporaryDetailLaundyEx
						    }

				     ManageLaundry.saveSarpras(data,"laundry/save-penerimaan-linen-external").then(function(e) {
				     	$scope.GetNostruk();
	            	});
				   }else{
				   	window.messageContainer.error('Harap Menambahkan Linen untuk order')
				   }
				 }else {
                        ModelItem.showMessages(isValid.messages);
                }
           };
         }
      ]);
      });




/*================================================================== OLD SOURCE CODE ======================================================================

$scope.Save = function(){
				var dat = $scope.dataPenerimaanLinen._data;
				//console.log(JSON.stringify(dat));
				var i=0;
				var mapLinen = [];
				dat.forEach(function(data){
					var data ={
						
						"produkId" : data.produkid,
						"namaProduk":data.namaLinen,
						"hargaSatuan":data.biaya,
						"jumlah"     :data.jumlah,
						"satuanId"   :data.satuanid,
						"namaSatuan" :data.satuan,
						"total"      :data.total
					}
					mapLinen[i] =data;
					i++;
				})
				//console.log(JSON.stringify(mapCycle));
				
				var data1 = {
					"noRecStrukPelayanan" : "",
					"noStruk" :$scope.item.nomorOrder,
					"tglTerima" :  moment($scope.item.tglTerima).format("YYYY-MM-DD hh:mm:ss"),
					"berat" : $scope.item.berat,
					"petugasId" :$scope.item.petugasx,
					"namaPetugas" : $scope.item.petugas,
					"namaPelanggan" :$scope.item.namaLengkap,
					"noTelp" : $scope.item.nomorTelepon,
					"alamat" : $scope.item.alamat,
					"satuanId"   :$scope.item.satuan.id,
				    "namaSatuan" :$scope.item.satuan.satuanStandar,
					"produkLinens":mapLinen
				}
            		// "mapCycle": $scope.daftarBahanLinen._data	
                	console.log(JSON.stringify(data1));
            		ManageLaundry.saveSarpras(data1,"laundry/save-penerimaan-linen-external").then(function(e) {
            			$scope.item.norec=e.data.data[0].noRecStrukPelayanan;
						debugger;
					
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""

            	});
            	};*/



/*
            							"produkLinens": [
											{
												"produkId": 13487,
												"namaProduk": "BOVEN LAKEN",
												"hargaSatuan": 4750,
												"jumlah": "2000",
												"satuanId": 145,
												"namaSatuan": "Potong",
												"total": 9500000
											},
											{
												"produkId": 13475,
												"namaProduk": "JAS OPERASI",
												"hargaSatuan": 4750,
												"jumlah": "2000",
												"satuanId": 145,
												"namaSatuan": "Potong",
												"total": 9500000
											}
						                ]
*/