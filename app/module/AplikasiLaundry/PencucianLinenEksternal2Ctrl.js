define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PencucianLinenEksternal2Ctrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, FindSarpras) {
		$scope.item = {};
		ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
			$scope.item = data;
			$scope.no = 1;
			$scope.bahan1 = "Laudet";
			$scope.berat1 = 100;
			$scope.satuan1 = "Gram";
			$scope.namaBahan2 = "Aldet";
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});

		$scope.noRecStrukPelayanan = $state.params.noRec;

	    ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
	       $scope.dataMasterPetugas = dat.data;
	    });

       FindSarpras.getSarpras("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
		    $scope.item.ruangan = dat.data.namaRuangan;
		    $scope.item.idRuangan = dat.data.id;
		});

		$scope.sourceMasterSatuan = [{
			"id" : 1,
			"satuan" : "Kilogram",
		},
		{
			"id" : 2,
			"satuan" : "Gram",
		}]

		$scope.sourceSatuan = [
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Batang",
		      "id": 174,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "bg",
		      "id": 177,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "bln",
		      "id": 175,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Botol",
		      "id": 167,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Buah",
		      "id": 160,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Dus",
		      "id": 162,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Galon",
		      "id": 171,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "GRAM",
		      "id": 999,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Kaleng",
		      "id": 166,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Kilogram",
		      "id": 161,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Kwh",
		      "id": 262,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Lembar",
		      "id": 163,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Liter",
		      "id": 178,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "ML",
		      "id": 666,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "m2",
		      "id": 263,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "m2/bulan",
		      "id": 268,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "m³",
		      "id": 264,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Meter",
		      "id": 164,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Pasang",
		      "id": 165,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "per Hari",
		      "id": 269,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Roll",
		      "id": 168,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Sak",
		      "id": 173,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Set",
		      "id": 170,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Sus 500",
		      "id": 172,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Tube",
		      "id": 169,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    },
		    {
		      "departemenId": 7,
		      "namaSatuanStandar": "Unit",
		      "id": 176,
		      "namaDepartemen": "Inst. Prasarana Dan Sarana RS"
		    }
		  ]

		$scope.mainGridOptions = { 
			pageable: true,
			filterable: {
						  extra: false,operators: {string: {startsWith: "Pencarian"}}
					    },
            sortable: true,
            editable : true
     	}

		
	   FindSarpras.getSarpras("alat/get-mesin-laundry").then(function(dat){
		  $scope.sourceMasterMesin = dat.data.data
	   });

		FindSarpras.getSarpras("jenis-linen/find-all-jenis-linen/").then(function(dat){
			$scope.sourceMasterJenisLinen = dat.data.data;
		});

	     FindSarpras.getSarpras("proses-cuci/find-all-proses-cuci/").then(function(dat){
	    	$scope.sourceMasterProsesCuci= dat.data.data;
	    });

		FindSarpras.getSarpras("pencucian-linen/find-mapping-cycle-dengan-bahan/").then(function(dat){
			$scope.sourceBahan= dat.data.data;
		});

/*		FindSarpras.getSarpras("user/get-user").then(function(dat){
			$scope.item.petugas = dat.data.data.namaUser;
			$scope.item.petugasx=dat.data.data.pegawai.id;
		});*/



		$scope.addDataPencucianLinen = function() {
		 if($scope.item.prosesCuci != ""){
				var tempdataPencucianLinen = {
					"no": $scope.no++,
					"idProdukBahan": $scope.item.bahan.id,
					"namaProdukBahan" :{namaProduk : $scope.item.bahan.namaProduk, id : $scope.item.bahan.id},
					"jumlahBahan" : $scope.item.jumlah,
					"namaSatuanBahan" : {namaSatuanStandar : $scope.item.satuanBahan.namaSatuanStandar, id : $scope.item.satuanBahan.id},
					"idsatuanBahan" : $scope.item.satuanBahan.id,
					"keterangan" : $scope.item.keterangan,
					"prosesCuci" : $scope.item.prosesCuci.prosesCuci,
					"idprosesCuci" : $scope.item.prosesCuci.id,
					"prosesCuciSave" : $scope.item.prosesCuci.prosesCuci
				}
				var getIndex;
				for(var i=0; i<$scope.DaftarPencucianLinen._data.length; i++){
					if($scope.DaftarPencucianLinen._data[i].idprosesCuci == tempdataPencucianLinen.idprosesCuci){
						tempdataPencucianLinen.prosesCuci = "";
						getIndex = i+1;
					}
				}
				
				console.log($scope.DaftarPencucianLinen._data.join());
				if(getIndex != undefined){
					$scope.DaftarPencucianLinen._data.splice(getIndex, 0, tempdataPencucianLinen);	
				}else{
					$scope.DaftarPencucianLinen.add(tempdataPencucianLinen);	
				}
				$scope.item.bahan="",
				$scope.item.jumlah="",
				$scope.item.keterangan=""
				refreshGrid($scope.DaftarPencucianLinen._data)	
		 }else{
		 	window.messageContainer.error('Proses Cuci Harus Dipilih Terlebih dahulu')
		 }
		}

	   $scope.ChangeDataParentandRemoveRow= function(e) {
	   	debugger
			e.preventDefault();
			var grid = this;
			var row = $(e.currentTarget).closest("tr");
			var tr = $(e.target).closest("tr");
			var data = this.dataItem(tr);
			$scope.CurrentIdprosesCuci = data.idprosesCuci;
			$scope.CurrentprosesCuci = data.prosesCuci;
			$scope.tempdataPencucianLinen = $scope.DaftarPencucianLinen
			.filter(function(el){
				return el.name !== grid[0].name;
			});
			grid.removeRow(row);
			var isi = false;
			for(var i=0; i<$scope.DaftarPencucianLinen._data.length; i++){
				debugger
				if(($scope.DaftarPencucianLinen._data[i].idprosesCuci == $scope.CurrentIdprosesCuci) && $scope.CurrentprosesCuci != ""){
					if(isi == false){
						$scope.DaftarPencucianLinen._data[i].prosesCuci = $scope.CurrentprosesCuci;
						isi = true
					}else{
						$scope.DaftarPencucianLinen._data[i].prosesCuci ="";
					}
				}
			}
	   	   refreshGrid($scope.DaftarPencucianLinen._data)
	   };
	   
	   function refreshGrid(ds){
	   	$scope.noRefresh = 1;
			   	for(var i=0; i<ds.length; i++){
			   		ds[i].no = $scope.noRefresh++;
			   	}
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#grid').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
		}

	   $scope.SetTotalJam = function(){
	   	debugger
	    var tanggalAwalPencucian = new moment($scope.item.tglPencucian).format('YYYY-MM-DD');
	   	var tanggalAkhirPencucian = new moment($scope.item.tglSelesaiPencucian).format('YYYY-MM-DD');
	    var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
	   	var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
	   	var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian+" "+JamAwalPencucian, tanggalAkhirPencucian+" "+JamAkhirPencucian);
	    return $scope.item.TotalJam = TotalWaktu;
	   }
	   
       $scope.$watchGroup(['item.bobots'], function(newValued, OldValue){
         if($scope.item.bobots>$scope.item.kapasitas){
         	window.messageContainer.error('Bobot Tidak Boleh Melebihi Kapasitas Mesin');
         	$scope.item.bobots = ""
         }	
       })
	   
/*	   $scope.Latihan = function(){
	   	debugger
	   	    var a = 0, b = 1, c = 0;
	            document.write("Fibonacci<br/>");

	           while (b <=20) {
	                 document.write(c);
	                 document.write("<br/>");
	                 c = a + b;
	                 a = b;
	                 b = c;
	           }
	       return c;
	   }
	   $scope.Latihan();*/


	   	$scope.DaftarPencucianLinen = new kendo.data.DataSource({
			data: [],
			batch: true,
            schema: {
                model: {
                    id: "prosesCuci",
                    fields: {
                        prosesCuci: { editable: false, defaultValue: { id: 1, name: "Baik"}},
                        namaProdukBahan: { editable: true, defaultValue: { id: 1, name: "Baik"}},
                        jumlahBahan: { editable: true},
                        namaSatuanBahan: { editable: true},
                        no: { editable: false}
                    }
                }
           }
		});

		$scope.ChecklistDropdownProduk = function(container, options) {
	            $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({autoBind: false,
	                dataTextField: "namaProduk",
	                dataValueField: "id",
	                        dataSource: $scope.listbahan
	                });
	    }

    	$scope.ChecklistDropdownSatuanStandar = function(container, options) {
            $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({autoBind: false,
                dataTextField: "namaSatuanStandar",
                dataValueField: "id",
                        dataSource: $scope.sourceSatuan
                });
        }



		$scope.columndataBahan = [{
				"field": "no",
				"title": "<h3 align=center>No. <h3>",
				"width": "20px",
				"filterable" : false
			},
			{
				"field": "prosesCuci",
				"title": "<h3 align=center>Proses Cuci. <h3>",
				"width": "100px",
				"attributes": {
	                             "class": "table-cell",
	                              style: "text-align: center; font-size: 15px; font-weight: bold"
	                           },
	            "filterable" : false
			},

			{  field:"bahanBaku", title: "<h3 align=center>Proses Cuci. <h3>",headerAttributes: { style: "text-align : center"},
				columns :[
							{
								"field": "namaProdukBahan",
								"title": "<h3 align=center>Nama Bahan<h3>",
								"width": "100px",
								 editor: $scope.ChecklistDropdownProduk, template: "#=namaProdukBahan.namaProduk#",
								"filterable" : {search : true,multi: true}
							}, 
							{
								"field": "jumlahBahan",
								"title": "<h3 align=center>Jumlah<h3>",
								"width": "50px",
								"filterable" : {search : true, multi : true}
							}, 
							{
								"field": "namaSatuanBahan",
								"title": "<h3 align=center>Satuan<h3>",
								"width": "50px",
								 editor: $scope.ChecklistDropdownSatuanStandar, template: "#=namaSatuanBahan.namaSatuanStandar#",
								"filterable" : {search : true, multi : true}
							}
						]
			},
			{
				command: { 
					text: "Delete Bahan",
					width:"70px", 
					align:"center", 
					click: $scope.ChangeDataParentandRemoveRow 
				},
				title: "<h3 align=center>Action</h3>",
				width: "80px"
			}
		];
		

		$scope.daftar=function() {
			$state.go("DaftarPencucianLinenEks")
		}

		$scope.satuan = function() {
		 if($scope.item.mesin != undefined){
			$scope.item.kapasitas = $scope.item.mesin.kapasitasMesin;
			$scope.item.satuan = $scope.item.mesin.namaSatuanStandar;
		  }
		};

		
		$scope.batal = function(){
			$state.go('DaftarPenerimaanLinen');
		}


       	ManageSarpras.getOrderList("laundry/get-bahan-laundry", true).then(function(dat){
	       $scope.listbahan = dat.data;
	    });
	    

		$scope.listsatuan = [{"id" : 1, "name" : "Cair"},
							 {"id" : 2, "name" : "Bubuk"}]


		$scope.disProduksi = true;
		$scope.detailListProduksi = [];


		$scope.Kembali = function(){
			$state.go('DaftarPenerimaanLinenKotorInt')
		}


		$scope.Save = function(){
		debugger
		 var TanggalMulai = DateHelper.formatDate($scope.item.tglPencucian,"YYYY-MM-DD")
		 var TanggalSelesai = DateHelper.formatDate($scope.item.tglSelesaiPencucian,"YYYY-MM-DD")
		 var jamAwaldet = DateHelper.formatDate($scope.item.jamAwal,"HH:mm:ss")
		 var jamAkhirdet = DateHelper.formatDate($scope.item.jamAkhir,"HH:mm:ss")
		 $scope.item.jamAkhir
		 var kapasitasBahanMesins = [];
		 var detail = $scope.DaftarPencucianLinen._data;
		 var listRawRequired = [
          "item.tglPencucian|k-ng-model|Tanggal Awal",
          "item.tglSelesaiPencucian|k-ng-model|Tanggal Selesai",
          "item.jamAwal|k-ng-model|Jam Awal",
           "item.jamAkhir|k-ng-model|Jam Akhir",
          "item.mesin|k-ng-model|Mesin",
          "item.bobots|ng-model|Berat Linen",
          "item.prosesCuci|k-ng-model|Proses Cuci",
          "item.petugas|k-ng-model|Petugas"
        ];

         var isValid = ModelItem.setValidation($scope, listRawRequired);  
         debugger
		 detail.forEach(function(dataTemp){
		 	var dataBahanMesin = {
	 		    "bilas" : dataTemp.prosesCuciSave,
		 		"produkBahanId" : dataTemp.namaProdukBahan.id,
		 		"jumlahBahan" : dataTemp.jumlahBahan,
		 		"satuanBahanId" : dataTemp.namaSatuanBahan.id
		 	}
		 	kapasitasBahanMesins.push(dataBahanMesin)
		 })

		  if(isValid.status){
		  	debugger
				  var data = {    
				  				"noRecStrukPelayanan":$scope.noRecStrukPelayanan,
								"ruanganAsalId" :$scope.item.idRuangan,
								"ruanganAsalId" :144,
								"tglPencucianLinen":TanggalMulai+" "+jamAwaldet,
								"tglSelesaiPencucianLinen":TanggalSelesai+" "+jamAkhirdet,
					         	"beratLinen":$scope.item.bobots,
								"mesinId":$scope.item.mesin.alatId,
								"kapasitasBahanMesins":kapasitasBahanMesins,
								"petugasId":$scope.item.petugas.id,
							 }
				console.log(data);
	            ManageSarpras.saveDataUji(data, "laundry/save-proses-cuci-external").then(function (e) {
	            	$scope.item = {};
			    });
		  }else{
		  	 ModelItem.showMessages(isValid.messages);
		  }
		}
	  }
  ]);
});
