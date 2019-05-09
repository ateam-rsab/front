define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('RollPressExternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','ManageSarpras','FindSarpras','$timeout', '$window',
		function($rootScope, $scope,$state, ModelItem , DateHelper,ManageSarpras,FindSarpras,$timeout, $window){
			$scope.item = {};
			$scope.now = new Date();
			$scope.awal = $scope.now;
			$scope.akhir = $scope.now;
			$scope.item.tglCariAwal=$scope.now;
			$scope.item.tglCariAkhir=$scope.now;
			$scope.dataPost=[];
			$scope.no = 1;
			$scope.isShowPopUp = false;
			$scope.TruePelipatan = false;


		/*Daftar Pelipatan*/
		$scope.Cari = function(){
		var TanggalAwal = new moment(new Date($scope.item.tglCariAwal)).format('YYYY-MM-DD');
		var TanggalAkhir = new moment(new Date($scope.item.tglCariAkhir)).format('YYYY-MM-DD');
		ManageSarpras.getOrderList("laundry/get-proses-pelipatan-external?startDate="+TanggalAwal+"&endDate="+TanggalAkhir).then(function(dat){
			debugger
			$scope.dataLipat= dat.data.data;
			$scope.nomor = 1;
			for(var i = 0; i<$scope.dataLipat.length; i++){
				var tanggalawal = new moment(new Date($scope.dataLipat[i].tglplanning)).format('DD-MM-YYYY hh:mm:ss'); 
				var tanggalakhir = new moment(new Date($scope.dataLipat[i].tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
				if($scope.dataLipat[i].petugas[0] != undefined){
					var petugas = $scope.dataLipat[i].petugas[0].namapegawai;
				}else{
					var petugas = "....................";
				}
				$scope.dataLipat[i].pegawai = petugas; 
				$scope.dataLipat[i].tanggalawal = tanggalawal;
				$scope.dataLipat[i].tanggalakhir = tanggalakhir;
				$scope.dataLipat[i].no = $scope.nomor+++".";
				$scope.dataLipat[i].statCheckbox = false;

               /*Generate CountTotalWaktu.......................*/
			     var TanggalMulaiwkt = new moment($scope.dataLipat[i].tglplanning).format('DD');
	             var TanggalSelesaiwkt = new moment($scope.dataLipat[i].tglPlanningAkhir).format('DD');
	             var LamaSelesaiwkt = TanggalSelesaiwkt - TanggalMulaiwkt ;
	             var MulaiFormatJam = new moment($scope.dataLipat[i].tglplanning).format('HH');
	             var SelesaiFormatJam = new moment($scope.dataLipat[i].tglPlanningAkhir).format('HH');
	             var formatLamaJam = SelesaiFormatJam - MulaiFormatJam ;
	             var MulaiFormatMenit = new moment($scope.dataLipat[i].tglplanning).format('mm');
	             var SelesaiFormatMenit = new moment($scope.dataLipat[i].tglPlanningAkhir).format('mm');
	             var formatLamaMenit = SelesaiFormatMenit - MulaiFormatMenit;
	             var totalwaktu = LamaSelesaiwkt+" Hari, "+formatLamaJam+" Jam, "+formatLamaMenit+" Menit";
	             /*End Generate*/
				 
				 $scope.dataLipat[i].totwaktu = totalwaktu;
			}
		 });
		}
		$scope.Cari();

		/*Daftar Pencarian Pegawai.......................*/

		$scope.initPegawai = function(){
			debugger
			var TanggalAwal = new moment(new Date($scope.awal)).format('YYYY-MM-DD');
			var TanggalAkhir = new moment(new Date($scope.akhir)).format('YYYY-MM-DD');
			ManageSarpras.getOrderList("laundry/get-proses-rollpress-external?startDate="+TanggalAwal+"&endDate="+TanggalAkhir).then(function(dat){
			debugger
			$scope.dataPegawai= dat.data.data;
			$scope.nomor = 1;
			for(var i = 0; i<$scope.dataPegawai.length; i++){
				var tanggalawal = new moment(new Date($scope.dataPegawai[i].tglplanning)).format('DD-MM-YYYY hh:mm:ss'); 
				var tanggalakhir = new moment(new Date($scope.dataPegawai[i].tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
				if($scope.dataPegawai[i].petugas[0] != undefined){
					var petugas = $scope.dataPegawai[i].petugas[0].namapegawai;
				}else{
					var petugas = "....................";
				}
				$scope.dataPegawai[i].pegawai = petugas; 
				$scope.dataPegawai[i].tanggalawal = tanggalawal;
				$scope.dataPegawai[i].tanggalakhir = tanggalakhir;
				$scope.dataPegawai[i].no = $scope.nomor+++".";
				$scope.dataPegawai[i].statCheckbox = false;

				 /*Generate CountTotalWaktu*/
			     var TanggalMulaiwkt = new moment($scope.dataPegawai[i].tglplanning).format('DD');
	             var TanggalSelesaiwkt = new moment($scope.dataPegawai[i].tglPlanningAkhir).format('DD');
	             var LamaSelesaiwkt = TanggalSelesaiwkt - TanggalMulaiwkt ;
	             var MulaiFormatJam = new moment($scope.dataPegawai[i].tglplanning).format('HH');
	             var SelesaiFormatJam = new moment($scope.dataPegawai[i].tglPlanningAkhir).format('HH');
	             var formatLamaJam = SelesaiFormatJam - MulaiFormatJam ;
	             var MulaiFormatMenit = new moment($scope.dataPegawai[i].tglplanning).format('mm');
	             var SelesaiFormatMenit = new moment($scope.dataPegawai[i].tglPlanningAkhir).format('mm');
	             var formatLamaMenit = SelesaiFormatMenit - MulaiFormatMenit;
	             var totalwaktu = LamaSelesaiwkt+" Hari, "+formatLamaJam+" Jam, "+formatLamaMenit+" Menit";
	             /*End Generate*/
				 
				 $scope.dataPegawai[i].totwaktu = totalwaktu;
			}
		 });
	    }
	    $scope.initPegawai();


		   ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
           	$scope.dataMasterPetugas = dat.data;
           });

		   $scope.getPetugas =  function(){
		    FindSarpras.getSarpras("user/get-user").then(function(dat){
				$scope.item.petugas = dat.data.data.namaUser;
			    $scope.petugasId=dat.data.data.pegawai.id;
		    });
		   }
		   $scope.getPetugas();

		   FindSarpras.getSarpras("alat/get-mesin-laundry").then(function(dat){
               $scope.sourceMasterMesin = dat.data.data
            });


			 $scope.no = 1;
			 $scope.no2 = 1;

			 /*Get Total Jam awal s/d jam akhir...............*/

	       $scope.SetTotalJam = function(){
		   	debugger
		    var tanggalAwalPencucian = new moment($scope.item.tglAwalRoll).format('YYYY-MM-DD');
		   	var tanggalAkhirPencucian = new moment($scope.item.tglAkhirRoll).format('YYYY-MM-DD');
		    var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
		   	var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
		   	var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian+" "+JamAwalPencucian, tanggalAkhirPencucian+" "+JamAkhirPencucian);
		    return $scope.item.totalwaktu = TotalWaktu;
		   }


			$scope.satuan = function() {
			 if($scope.item.mesin != undefined){
				$scope.item.kapasitas = $scope.item.mesin.kapasitasMesin;
				$scope.item.satuan = $scope.item.mesin.namaSatuanStandar;
			  }
			};


			$scope.cancelData = function(){
	        $scope.StatusCek = false;
	        $scope.id;
	        var dataSelect = _.find($scope.dataPegawai, function(data){
				return data.noRec == $scope.NorecPegawai; 
		    });
		    if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
				}
			else{
				    dataSelect.statCheckbox = true;
				}
		        var myWindow = $("#winPopUp");
		        myWindow.data("kendoWindow").close();	
		        refreshGridPegawai($scope.dataPegawai);
	        }

			function refreshGridPegawai(ds){
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});
				var grid = $('#gridpegawai').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}



		   	$scope.selectRow = function(dataItem){
		   	debugger
		   	 $scope.dataBaru = true;
		   	 $scope.remove = false;
		   	 $scope.item = {};
		   	 $scope.getPetugas();
		   	 $scope.item.totroll = 0;
		   	 $scope.item.totakhirberat = 0;
		   	 $scope.dataPenerimaanLinen.data([]);
		   	 $scope.TruePelipatan = true;
			 if($scope.noRec != undefined){
				   var dataSelect = _.find($scope.dataLipat, function(data){
						return data.noRec == $scope.noRec; 
			          });
				    if(dataSelect.statCheckbox){
							dataSelect.statCheckbox = false;
						}
					else{
						    dataSelect.statCheckbox = true;
						}
			  }

			   var dataSelect = _.find($scope.dataLipat, function(data){
					return data.noRec == dataItem.noRec; 
				});

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
				}
				else
				{
					dataSelect.statCheckbox = true;
				}
				$scope.noRec = dataItem.noRec;
				$scope.noRecstrukPelayanan = dataItem.noRecstrukPelayanan;

				ManageSarpras.getOrderList("laundry/get-proses-pelipatan-external-by-norec?noRec="+$scope.noRec).then(function(dat){
			  	$scope.SourceData = dat.data.data[0];
			  		if($scope.SourceData.petugas[0] != undefined){
			  		$scope.item.petugasdet = $scope.SourceData.petugas[0].namapegawai;
			  		}
			  		$scope.item.tglplanningdet = new moment(new Date($scope.SourceData.tglplanning)).format('DD-MM-YYYY hh:mm:ss'); 
			  		$scope.item.tglPlanningAkhirdet = new moment(new Date($scope.SourceData.tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
			  		$scope.SourceData.noRecstrukPelayanan;
			  		$scope.SourceData.noRec;
			  		$scope.number = 1
					$scope.sourceMasterJenisLinen = $scope.SourceData.detail;
					var TotalBeratLinen = 0;
					var TotalJmlLipat = 0;
					for(var i=0; i<$scope.sourceMasterJenisLinen.length; i++){
						debugger
						var beratLinen = $scope.sourceMasterJenisLinen[i].beratLinen;
						var jmlLipatan = $scope.sourceMasterJenisLinen[i].jmlLipatan;
						TotalBeratLinen += (beratLinen * 1);
						TotalJmlLipat += (jmlLipatan * 1);
					}
					$scope.item.TotalLipat = TotalJmlLipat;
					$scope.item.TotalberatLinen =  TotalBeratLinen;
					refreshGrid($scope.dataLipat);
				  });
			}



			function refreshGrid(ds){
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#gridLipat').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
				$scope.countTotal();
			}


		   $scope.mainGridOptionsLipat = {
				pageable:true,
				pageSize:2,
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
               columns : [{field:"DaftarHasilPelipatan",title:"<h3 align=center>Daftar Hasil Pelipatan<h3>",headerAttributes: { style: "text-align : center"},
              		  columns: [
				        {
				            "field": "no",
				            "title": "No.",
						    "width": "20px",
							"filterable":false,
							 attributes: {
				                     "class": "table-cell",
				                        style: "text-align: center;"
				                     }
				            	
						},
						{ 
				    		title: "<h3 align=center>✔<h3>",
				    		template: "# if (statCheckbox) { #"+
				    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
				    		"# } else { #"+
				    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
				    		"# } #",
				    		width:"10px"
					    },
						{ 
						field:"TanggalPelipatan",title:"<h3 align=center>Tanggal Pelipatan<h3>",headerAttributes: { style: "text-align : center"},
					    columns:[
								{  field:"tanggalawal",
								   title:"<h3 align=center>Tanggal Awal<h3>",
								   width:70, filterable: false,
								   attributes: {
				                         "class": "table-cell",
				                            style: "text-align: center;"
				                         },
							    },
								{  field:"tanggalakhir",
								   title:"<h3 align=center>Tanggal Akhir<h3>", width:70, filterable: false,
								   attributes:{
								   	"class" : "table-cell",
								   	stle : "text-align : center"
								}
							  }], 
							       width:"200px", filterable: false 
					    },
					    {
				            "field": "totwaktu",
				            "title": "<h3 align=center>Total Waktu<h3>",
						    "width": "70px",
							"filterable":false
				            	
						},
					    {
				            "field": "pegawai",
				            "title": "<h3 align=center>Pegawai<h3>",
						    "width": "70px",
							"filterable":false
				            	
						},
				        {
				            "field": "keteranganlainnya",
				            "title": "<h3 align=center>Keterangan<h3>",
				            "width": "70px",
							"filterable":false
				        }
				       ],
		                pageable: true,
		                sortable: false,
		                selectable: "row",
		                editable: "popup"
		            }]
            };

			
			$scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			});

			$scope.dataLipat = new kendo.data.DataSource({
				data: []
			});


		   $scope.JenisLinenChange = function(){
				debugger
				var TotalLipatbyjenis = $scope.item.jenisLinen.jmlLipatan;
				var totalberatbyjenis = $scope.item.jenisLinen.beratLinen;
				
				$scope.item.jumlahLinen = TotalLipatbyjenis;
				$scope.item.beratLinen = ( totalberatbyjenis / TotalLipatbyjenis );
			     
			     //Cek Stok Penyimpanan dan cek  juga dari Inputan daftar distribusi
	           	if($scope.dataPenerimaanLinen._data.length != 0){
	           	var TotalRoll = 0;
		           	for(var i=0; i<$scope.dataPenerimaanLinen._data.length; i++){
		           		debugger
		           		if($scope.item.jenisLinen.idLinen == $scope.dataPenerimaanLinen._data[i].IdProduk){
		           			debugger
		           			TotalRoll += parseInt($scope.dataPenerimaanLinen._data[i].roll);
		           		}
		           	}
		           	   var result = (parseInt($scope.item.jumlahLinen) - TotalRoll);
		           	    return $scope.item.jumlahLinen = result 
	           	}
			}

		   $scope.addDataPenerimaanLinen = function() {
				debugger
				var tempDataPenerimaanLinen = {
					"no": $scope.no+++".",
					"IdProduk" : $scope.item.jenisLinen.idLinen,
					"namaProduk" : $scope.item.jenisLinen.namaLinen,
					"beratLinen" : $scope.item.totgram,
					"roll" : $scope.item.jumlahRoll					
				}
				if($scope.item.jumlahRoll>$scope.item.jumlahLinen){
					window.messageContainer.error('Data Tidak Boleh Melebihi Jumlah Lipat')
				}
				$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
				$scope.CountLipat(tempDataPenerimaanLinen);

			}

			var totalrollresut = 0;
			var totalberatrollresult = 0;
			$scope.CountLipat = function(bucket){
				if ($scope.dataBaru == true){
					totalrollresut = 0;
					totalberatrollresult = 0;
					$scope.dataBaru = false;
				}
				var resultMinusJumlahLinen = $scope.item.jumlahLinen - bucket.roll;
			 	$scope.item.jumlahLinen = resultMinusJumlahLinen;
			 	var resultMinusTotalLinen = $scope.item.TotalLipat - bucket.roll;
				$scope.item.TotalLipat = resultMinusTotalLinen;
			 	var resultMinusTotalBeratAwal = $scope.item.TotalberatLinen - bucket.beratLinen;
			 	$scope.item.TotalberatLinen = resultMinusTotalBeratAwal;

			 	debugger
			 	$scope.item.jumlahRoll = "";
			     if($scope.remove == true){
			     		totalrollresut =  $scope.item.totroll;
			 		    totalberatrollresult = $scope.item.totakhirberat;
			   		    totalrollresut += parseInt(bucket.roll);
			 		    totalberatrollresult += parseInt(bucket.beratLinen);
			 		    $scope.item.totroll = totalrollresut;
			 		    $scope.item.totakhirberat = totalberatrollresult;
			 	 }else{
			 	         totalrollresut += parseInt(bucket.roll);
			 		     totalberatrollresult += parseInt(bucket.beratLinen);
			 	    	 $scope.item.totroll = totalrollresut;
     			 		 $scope.item.totakhirberat = totalberatrollresult;
			 	 }

			}

			$scope.removeDataPenerimaanLinen= function(e) {
				debugger
				$scope.remove = true;
				e.preventDefault();
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    var tr = $(e.target).closest("tr");
			    var data = this.dataItem(tr);

			    //SET stok
			    if(data.IdProduk == $scope.item.jenisLinen.idLinen){
			    	var OldTotalLipat = $scope.item.TotalLipat;
			    	var OldJumlahLinen = $scope.item.jumlahLinen;
			    	var BackLinen = parseInt(data.roll);
			    	$scope.item.jumlahLinen = (OldJumlahLinen + BackLinen);
			    }

			    var kurangBeratRoll = ($scope.item.totakhirberat - data.beratLinen);
			    $scope.item.totakhirberat = kurangBeratRoll;

			    var kurangiTotRoll = ($scope.item.totroll - parseInt(data.roll));
			    $scope.item.totroll = kurangiTotRoll ;

			    var OldTotalLipat = $scope.item.TotalLipat;
			    var BackLinen = parseInt(data.roll);
			    $scope.item.TotalLipat = (OldTotalLipat + BackLinen);

			    debugger
			    var OldTotalBerat = $scope.item.TotalberatLinen;
			    var BackLinenBerat = parseInt(data.beratLinen);
			    $scope.item.TotalberatLinen = (OldTotalBerat + BackLinenBerat);

			    $scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			  });
			    grid.removeRow(row);
			};

			$scope.countTotal = function(){
				$scope.dataPenerimaanLinen._data;
				var TotalRoll = 0;
				var SisaLipat = 0;
				for(var i=0; i<$scope.dataPenerimaanLinen._data.length; i++){
					var isiroll = $scope.dataPenerimaanLinen._data[i].roll;
					TotalRoll += (isiroll * 1);
				}
				$scope.item.totroll = TotalRoll;
				if($scope.item.TotalLipat == undefined){
					$scope.item.sisaLipatan = SisaLipat;
				}
			   $scope.item.sisaLipatan = ($scope.item.TotalLipat - $scope.item.totroll);
			}
			$scope.countTotal();
      

	      $scope.Cari = function(caripetugas){
		      var q = caripetugas.namaLengkap;
		      var grid = $("#gridpegawai").data("kendoGrid");
		     	  grid.dataSource.query({
		          page:1,
		          pageSize:10,
		          filter:{
		          	logic:"or",
		         		 filters:[
		            		       {field:"pegawai", operator:"contains",value:q}
		           				 ]
		           }
		      });
		   }

		   $scope.ClearCari = function(){
		   	 	$scope.Pencarians = "";
		   	 	$scope.item.caripetugas = "";
		   	 	var gridData = $("#gridpegawai").data("kendoGrid");
		   	 	gridData.dataSource.filter({});
		    }



			$scope.AddmainGridOptions = {
				pageable:true,
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
               columns : [{field:"DaftarHasilPelipatan",title:"<h3 align=center>(+)Add Roll Press<h3>",headerAttributes: { style: "text-align : center"},
                columns: [{
					"field": "no",
					"title": "<h3 align=center>No.<h3>",
					"width": "30px",
					attributes: {
                             "class": "table-cell",
                                style: "text-align: center"
                                },
					"filterable" : false
				},{
                    "field": "namaProduk",
                    "title": "<h3 align=center>Jenis Linen<h3>",
                    "width": "250px",
					"filterable":true		
                },
                {
                    "field": "beratLinen",
                    "title": "<h3 align=center>Berat Linen<h3>",
                    "width": "170px",
					"filterable":false		
                },
                {
                    "field": "roll",
                    "title": "<h3 align=center>Qty Roll Press<h3>",
                    "width": "90px",
					"filterable":false
                },
                {
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
               }]
            };



	 $scope.mainGridOptionsPegawai = {
		 	editable: "popup",
			pageable:true,
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
	            "title": "No.",
			    "width": "20px",
				"filterable":false,
				 attributes: {
	                     "class": "table-cell",
	                        style: "text-align: center;"
	                     }
	            	
			},
			{ 
	    		title: "<h3 align=center>✔<h3>",
	    		template: "# if (statCheckbox) { #"+
	    		"<input type='checkbox' class='checkbox' ng-disabled='StatusCek' ng-click='selectRowPegawai(dataItem)' checked/>"+
	    		"# } else { #"+
	    		"<input type='checkbox' class='checkbox' ng-disabled='StatusCek' ng-click='selectRowPegawai(dataItem)' />"+
	    		"# } #",
	    		width:"10px"
		    },
			{ 
			field:"TanggalPelipatan",title:"Tanggal Pelipatan",headerAttributes: { style: "text-align : center"},
		    columns:[
					{  field:"tanggalawal",
					   title:"Tanggal Awal",
					   width:70, filterable: false,
					   attributes: {
	                         "class": "table-cell",
	                            style: "text-align: center;"
	                         },
				    },
					{  field:"tanggalakhir",
					   title:"Tanggal Akhir", width:70, filterable: false,
					   attributes:{
					   	"class" : "table-cell",
					   	stle : "text-align : center"
					}
				  }], 
				       width:"200px", filterable: false 
		    },
		    {
	            "field": "totwaktu",
	            "title": "Total Waktu",
			    "width": "70px",
				"filterable":false
	            	
			},
		    {
	            "field": "pegawai",
	            "title": "Pegawai",
			    "width": "70px",
				"filterable":false
	            	
			},
	        {
	            "field": "keteranganlainnya",
	            "title": "Keterangan",
	            "width": "70px",
				"filterable":false
	        }
	       ]
	    };

	  //Converte Perkalian Jumlah Roll
      $scope.$watchGroup(['item.jumlahRoll'], function(newValued, OldValue){
      	var valuedataRoll = parseInt(newValued[0]);
      		$scope.item.totgram = (valuedataRoll * $scope.item.beratLinen);
		 	if($scope.item.jumlahLinen<$scope.item.jumlahRoll){
		 		window.messageContainer.error('Data Melebihi Jumlah Lipat');
		 	    $scope.item.jumlahRoll = "";
		 	}
       })


		   	$scope.selectRowPegawai = function(dataItem){
		   		debugger
		   	  $scope.StatusCek = true;
			   var dataSelect = _.find($scope.dataPegawai, function(data){
					return data.noRec == dataItem.noRec; 
				});

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
				}
				else
				{
					dataSelect.statCheckbox = true;
				}

				$scope.NorecPegawai = dataItem.noRec;
				$scope.item.tglplanningdet = new moment(new Date(dataItem.tglplanning)).format('DD-MM-YYYY hh:mm:ss'); 
			  	$scope.item.tglPlanningAkhirdet = new moment(new Date(dataItem.tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');

	            var myWindow = $("#winPopUp");
			    myWindow.data("kendoWindow").open();
			     $scope.isShowPopUp = true;
				$scope.NorecPegawai = dataItem.noRec;
                if($scope.NorecPegawai != undefined){
                debugger
			 	ManageSarpras.getOrderList("laundry/get-proses-rollpress-external-by-norec?noRec="+$scope.NorecPegawai).then(function(dat){
			  	debugger
			  	$scope.SourceData = dat.data.data[0];
			    if($scope.SourceData.petugas[0] != undefined){
			  		$scope.item.petugasdet = $scope.SourceData.petugas[0].namapegawai;
			  	}
			 
			  	$scope.SourceData.noRecstrukPelayanan;
			  	$scope.SourceData.noRec;
			  	$scope.number = 1
			  	$scope.SourceDataDetail = $scope.SourceData.detail;
			  	for(var i=0; i<$scope.SourceDataDetail.length; i++){
			  		debugger
			  		$scope.SourceDataDetail[i].no = $scope.number+++"."
			  	}
				  var myWindow = $("#winPopUp");
			          myWindow.data("kendoWindow").open();
			          $scope.isShowPopUp = true;
			          $scope.countTotalPegawai($scope.SourceDataDetail);
				  });
		      }else{
		      	 toastr.warning('Data Harus dipilih terlebih dahulu')
		      }
		  }

		 $scope.countTotalPegawai = function(GetDataDetail){
         	debugger
         	var TotalBerat = 0;
         	var TotalLinen = 0;
         	for(var i=0; i<GetDataDetail.length; i++){
         		var BeratLinen = GetDataDetail[i].beratLinen
         		var JumlahLinen = GetDataDetail[i].jmlLipatan
         		TotalBerat += (BeratLinen*1);
         		TotalLinen += (JumlahLinen*1);
         	}
         	$scope.item.totalBerat = TotalBerat;
         	$scope.item.totalRoll =  TotalLinen;
         	return $scope.item.totalBerat;
         }

            $scope.mainGridOptionsPegawaiDetail = {
				pageable:true,			
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
                columns: [{
					"field": "no",
					"title": "<h3 align=center>No. <h3>",
					"width": "20px",
					"filterable" : false
				},
				{
                    "field": "namaLinen",
                    "title": "<h3 align=center>Jenis Linen<h3>",
                    "width": "250px",
					"filterable":false		
                },
                {
                    "field": "beratLinen",
                    "title": "<h3 align=center>Berat Linen<h3>",
                    "width": "80px",
					"filterable":false		
                },
                {
                    "field": "jmlLipatan",
                    "title": "<h3 align=center>Jumlah Roll<h3>",
                    "width": "80px",
					"filterable":false		
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };

			$scope.DaftarPenyimpanan = function(){
				$state.go('DaftarPackageEks');
			}
		

			$scope.Save = function() {
			 $scope.noRec = $state.params.noRec;
				var TanggalAwal = moment($scope.item.tglAwalRoll).format("YYYY-MM-DD");
				var TanggalAkhir = moment($scope.item.tglAkhirRoll).format("YYYY-MM-DD");
				var JamAwal = moment($scope.item.jamAwal).format("HH:mm:ss");
				var JamAkhir = moment($scope.item.jamAkhir).format("HH:mm:ss");
		    var listRawRequired = [
              "item.tglAwalRoll|k-ng-model|Tanggal Awal",
              "item.tglAkhirRoll|k-ng-model|Tanggal Akhir",
              "item.jamAwal|k-ng-model|Jam Mulai",
              "item.jamAkhir|k-ng-model|Jam Selesai",
              "item.mesin|k-ng-model|Nama Mesin"
            ];
            var isValid = ModelItem.setValidation($scope, listRawRequired);
            if(isValid.status){
              var dat = $scope.dataPenerimaanLinen._data;
				var i=0;
				var mapLinen = [];
				dat.forEach(function(data){
					var data ={
						"produkDetailId" : data.IdProduk,
						"beratLinen":data.beratLinen,
						"jumlahLipat":data.roll
					}
					mapLinen[i] =data;
					i++;
				})
				var data = {
							"tgl":TanggalAwal+" "+JamAwal,
							"tglKerja":TanggalAkhir+" "+JamAkhir,
							"petugasId":$scope.petugasId,
							"noRecStrukPelayanan": $scope.noRec,
							"jumlahCycle" : $scope.item.totroll, //Total Roll
							"produkDetails" : mapLinen
						   }
              ManageSarpras.savePengeringan(data,"laundry/save-proses-rollpress-external").then(function (e){
              	$scope.initPegawai();
              });
       		}else{
                ModelItem.showMessages(isValid.messages);
            } 

            };
		  }
	 ])
})