
//'lampaui batas untuk mengejar ambisi', hsbc.

define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapSubSistemCtrl', ['$q', '$rootScope', '$state','$scope', 'ModelItemAkuntansi','CacheHelper','DateHelper','ManageSarprasPhp',
		function($q, $rootScope,$state, $scope,modelItemAkuntansi,cacheHelper,dateHelper,manageSarprasPhp) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.chkBool=true;
			$scope.showIdMenu=true
			var idASEM = '';

			$scope.listChk = [
				{id:1,name:'Simpan'},
				{id:2,name:'Edit'},
				{id:3,name:'Hapus'},
				{id:4,name:'Cetak'}
			]

			var idModul =0;
			var idModulHead =0;
			var idMenu =0;
			var idMenuHead =0;

			manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=subsistem", true).then(function(dat){
				for (var i = 0; i < dat.data.length; i++) {
					dat.data[i].no = i+1;
				}
				  $scope.data1 =  new kendo.data.DataSource({
                        data:dat.data,
                        pageable: true,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    })
				
			});
			//listKelompokUser
			manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=kelompokuser", true).then(function(dat){
				$scope.listKelompokUser= dat.data;
			});
			// init2();
			$scope.column1 = [
				{
					"field": "no",
					"title": "No",
					"width": "30px"
				},
				{
					"field": "id",
					"title": "ID",
					"width": "30px"
				},
				{
					"field": "modulaplikasi",
					"title": "Sub Sistem",
					"width": "150px"
				}
			];
			$scope.column2 = [
				{
					"field": "no",
					"title": "No",
					"width": "30px"
				},
				{
					"field": "id",
					"title": "ID",
					"width": "30px"
				},
				{
					"field": "modulaplikasi",
					"title": "Nama Modul",
					"width": "150px"
				}
			];
			$scope.column3 = [
				{
					"field": "no",
					"title": "No",
					"width": "30px"
				},
				{
					"field": "id",
					"title": "ID",
					"width": "30px"
				},
				{
					"field": "objekmodulaplikasi",
					"title": "Menu",
					"width": "150px"
				}
			];
			$scope.column4 = [
				{
					"field": "no",
					"title": "No",
					"width": "50px"
				},
				{
					"field": "modulaplikasiid",
					"title": "ID Modul",
					"width": "50px"
				},
				{
					"field": "omaid",
					"title": "ID Menu",
					"width": "50px"
				},
				{
					"field": "kelompokuser",
					"title": "Kelompok User",
					"width": "200px"
				},
				{
					"field": "simpan",
					"title": "Simpan",
					"width": "60px"
				},
				{
					"field": "edit",
					"title": "Edit",
					"width": "60px"
				},
				{
					"field": "hapus",
					"title": "Hapus",
					"width": "60px"
				},
				{
					"field": "cetak",
					"title": "Cetak",
					"width": "60px"
				}
			];

			$scope.klik1 = function(current){
				initModulAplikasi();
			}	

			function initModulAplikasi(){
				$scope.data2 =[];
				idModulHead = $scope.dataSelected1.id;
				manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=modulaplikasi&id=" + $scope.dataSelected1.id, true).then(function(dat){
					for (var i = 0; i < dat.data.length; i++) {
						dat.data[i].no = i+1;
					}
					  $scope.data2 =  new kendo.data.DataSource({
                        data:dat.data,
                        pageable: true,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    })
					// $scope.data2= dat.data;
				});
				init();
			}
			$scope.klik2 = function(current){
				idModul = $scope.dataSelected2.id;
				init()
			}	
			$scope.klik4 = function(current){
				$scope.item.kelompokuser = {'id':$scope.dataSelected4.kuid,'kelompokuser':$scope.dataSelected4.kelompokuser};
				if ($scope.dataSelected4.simpan == true) {
					Simpan.checked=true
				}else{
					Simpan.checked=false
				}
				if ($scope.dataSelected4.edit == true) {
					Edit.checked=true
				}else{
					Edit.checked=false
				}
				if ($scope.dataSelected4.hapus == true) {
					Hapus.checked=true
				}else{
					Hapus.checked=false
				}
				if ($scope.dataSelected4.cetak == true) {
					Cetak.checked=true
				}else{
					Cetak.checked=false
				}
			}	


			function onSelect(e) {
				//debugger;
               //alert(this.text(e.node));
               var namaObjekSelected = this.text(e.node)
               var arrText = namaObjekSelected.split('_');
               //var idObjekmodulaplikasiHead =''
				// $scope.item.nmMenu = arrText[1];
				$scope.data4 =[];
				manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=objekmodultokelompokuser&omaid=" + arrText[0] +"&id=" + idModul , true).then(function(dat){
					if (dat.data.data1.length != 0) {
						for (var i = 0; i < dat.data.data1.length; i++) {
							dat.data.data1[i].no = i+1;
						}
						$scope.data4= dat.data.data1;
					}
					$scope.item.idMenu =dat.data.data2.omaid;
					$scope.item.idHead =dat.data.data2.kdobjekmodulaplikasihead;
					$scope.item.nmMenu = dat.data.data2.objekmodulaplikasi;
					$scope.item.fungsi =dat.data.data2.fungsi;
					$scope.item.keterangan =dat.data.data2.keterangan;
					$scope.item.noUrut2 =dat.data.data2.nourut;
					$scope.item.url =dat.data.data2.alamaturlform;

					$scope.item.idHeadMenu =dat.data.data2.kdobjekmodulaplikasihead;
					$scope.item.nmModulHead =dat.data.data2.objekmodulaplikasihead;
	            	$scope.showIdMenu=true
				});
				manageSarprasPhp.getDataTableTransaksi("pegawai/get-child-idhead?idOma="+arrText[0]).then(function (res) {

                	$scope.dataIdHead=res.data.data
             	})
            }

			function init() {
				manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=modulaplikasi&idhead=" + $scope.dataSelected2.id, true).then(function(dat){
					$scope.item.idModul= dat.data[0].id;
					$scope.item.nmModul= dat.data[0].modulaplikasi;
					$scope.item.iconImage= dat.data[0].iconimage;
					$scope.item.noUrut= dat.data[0].nourut;
				});
				$scope.treeDataMenu=[];
                manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=objekMenuRecursive&id=" + $scope.dataSelected2.id, true).then(function(dat){
                	var inlineDefault = new kendo.data.HierarchicalDataSource({
                		data: dat.data
                    ,
                    schema: {
                        model: {
                            children: "subCategories"
                        }
                    }
	                });
	                $scope.treeDataMenu = inlineDefault
                    $scope.mainTreeViewOption = {
                    	dataTextField: ["subCategoryName" ],
                    	select: onSelect,
                        // checkboxes: {
                        //     checkChildren: true,
                        //     template: "# if(item.hasChildren){# <input type='checkbox' value='true' />#}#"
                        // },
                        dragAndDrop: true
                    }
                    
                });
            }

            $scope.simpan1 = function(){
            	if($scope.item.nmModul == undefined){
                    alert("NamaModul belum di isi!");
                    return;
                }
                if($scope.item.iconImage == undefined){
                    alert("Icon Image belum di isi!");
                    return;
                }
                if($scope.item.noUrut == undefined){
                    alert("No Urut belum di isi!");
                    return;
                }
                if(idModulHead == 0){
                    alert("Pilih sub sistem");
                    return;
                }
            	var objSave = {
					"id": idModul,
					"reportdisplay": $scope.item.nmModul,
					"modulaplikasi": $scope.item.nmModul,
					"iconimage": $scope.item.iconImage,
					"nourut": $scope.item.noUrut,
					"kdmodulaplikasihead": idModulHead
				};
				manageSarprasPhp.saveDataTransaksi("pegawai/simpan-modul-aplikasi",objSave).then(function (e) {
                	initModulAplikasi(); 
             	})
            }
            $scope.hapus1 = function(){
                if(idModul == 0){
                    alert("Pilih modul aplikasi yang akan di hapus !");
                    return;
                }
            	var objSave = {
					"id": idModul
				};
            	manageSarprasPhp.saveDataTransaksi("pegawai/hapus-modul-aplikasi",objSave).then(function (e) {
                	initModulAplikasi(); 
             	})
            }
            $scope.batal1 = function(){
            	$scope.item.idModul='';
            	$scope.item.nmModul='';
            	$scope.item.iconImage='';
            	$scope.item.noUrut='';
            	idModul =0;
            }
            $scope.simpan2 = function(){
            	if($scope.item.nmMenu == undefined){
                    alert("Nama Menu belum di isi!");
                    return;
                }
                if(idModulHead == 0){
                    alert("Pilih sub sistem");
                    return;
                }
                if ($scope.showIdMenu == false) {
                	var addMap = 1
                }
                var idididididididi  = 0;
                if ($scope.item.idMenu != '') {
                	idididididididi  = $scope.item.idMenu;
                }
                var idHeadMenus=null
                if($scope.item.idHeadMenu!=undefined){
                	idHeadMenus=$scope.item.idHeadMenu
                }
                debugger
                 var url=null
                if($scope.item.url!=""){
                	url=$scope.item.url
                }
                 if(url!=undefined){
                	url=$scope.item.url
                }

            	var objSave = {
					"id": idididididididi,//$scope.item.idMenu,
					"fungsi": $scope.item.fungsi,
					"keterangan": $scope.item.keterangan,
					"objekmodulaplikasi": $scope.item.nmMenu,
					"nourut": $scope.item.noUrut2,
					"alamaturlform": url,
					"kdobjekmodulaplikasihead": idHeadMenus,
					"addMap": addMap,
					"modulaplikasiid":$scope.item.idModul
				};
				manageSarprasPhp.saveDataTransaksi("pegawai/simpan-objek-modul-aplikasi",objSave).then(function (e) {
                	initModulAplikasi(); 
                $scope.batal2();
             	})
            }
            $scope.hapus2 = function(){
            	if($scope.item.idMenu == undefined){
                    alert("Menu belum dipilih!");
                    return;
                }
                if(idModulHead == 0){
                    alert("Pilih sub sistem");
                    return;
                }
                if ($scope.showIdMenu == false) {
                	var addMap = 1
                }
                var idididididididi  = 0;
                if ($scope.item.idMenu != '') {
                	idididididididi  = $scope.item.idMenu;
                }
            	var objSave = {
					"id": idididididididi
				};
            	manageSarprasPhp.saveDataTransaksi("pegawai/hapus-objek-modul-aplikasi",objSave).then(function (e) {
                	initModulAplikasi(); 
             	})
            }
            $scope.hapus2Map = function(){
            	if($scope.item.idMenu == undefined){
                    alert("Menu belum dipilih!");
                    return;
                }
                if(idModulHead == 0){
                    alert("Pilih sub sistem");
                    return;
                }
                if(idModul == 0){
                    alert("Pilih Modul Aplikasi");
                    return;
                }
                var idididididididi  = 0;
                if ($scope.item.idMenu != '') {
                	idididididididi  = $scope.item.idMenu;
                }
            	var objSave = {
					"id": idididididididi,
					"idModul":idModul
				};
            	manageSarprasPhp.saveDataTransaksi("pegawai/hapus-map-objek-modul-aplikasi",objSave).then(function (e) {
                	initModulAplikasi(); 
             	})
            }
            $scope.batal2 = function(){
            	$scope.item.idMenu = '';
            	$scope.item.nmMenu='';
            	$scope.item.fungsi='';
            	$scope.item.keterangan='';
            	$scope.item.noUrut2='';
            	$scope.item.url='';
            	$scope.item.idHeadMenu = undefined;
				// $scope.item.nmModulHead = '';
            }
            $scope.simpan3 = function(){
            	
            	// /pegawai/map-objek-modultokelompok-user
            	if($scope.item.idMenu == undefined){
                    alert("Menu belum dipilih!");
                    return;
                }
                if($scope.item.kelompokuser.id == undefined){
                    alert("Pilih kelompok user");
                    return;
                }
                var idMenu  = 0;
                if ($scope.item.idMenu != '') {
                	idMenu  = $scope.item.idMenu;
                }
                var idMap = 0;
                if ($scope.dataSelected4 != undefined) {
                	idMap  = $scope.dataSelected4.momkuid;
                }
                var spn = 'f';
                if (Simpan.checked == true) {
					spn = 't';
				}
                var edt = 'f';
				if (Edit.checked == true) {
					 edt = 't';
				}
                var hps = 'f';
				if (Hapus.checked == true) {
					hps = 't';
				}
                var ctk = 'f';
				if (Cetak.checked == true) {
					ctk = 't';
				}
				var arrData=[]
				if ($scope.dataIdHead.length>0){
					arrData=$scope.dataIdHead
				}
            	var objSave = {
					"id": idMap,
					"objectkelompokuserfk": $scope.item.kelompokuser.id,
					"objectobjekmodulaplikasifk": idMenu,
					"cetak": ctk,
					"edit": edt,
					"hapus": hps,
					"simpan":spn,
					"array":arrData
				};

            	manageSarprasPhp.saveDataTransaksi("pegawai/map-objek-modultokelompok-user",objSave).then(function (e) {
                	initModulAplikasi(); 
                	$scope.data4=[];
             	})
            }
            $scope.hapus3= function(){
            	// /pegawai/map-objek-modultokelompok-user
            	if($scope.item.idMenu == undefined){
                    alert("Menu belum dipilih!");
                    return;
                }
                if($scope.item.kelompokuser.id == undefined){
                    alert("Pilih kelompok user");
                    return;
                }
                var idMenu  = 0;
                if ($scope.item.idMenu != '') {
                	idMenu  = $scope.item.idMenu;
                }
                var idMap = 0;
                if ($scope.dataSelected4.momkuid != undefined) {
                	idMap  = $scope.dataSelected4.momkuid;
                }
            	var objSave = {
					"idMap": idMap
				};
            	manageSarprasPhp.saveDataTransaksi("pegawai/hapus-objek-modultokelompok-user",objSave).then(function (e) {
                	//initModulAplikasi(); 
             	})
            }
            $scope.batal3 = function(){
            	
            	$scope.item.kelompokuser='';
            	Simpan.checked=false
				Edit.checked=false
				Hapus.checked=false
				Cetak.checked=false
            }
            $scope.tambahChildren = function(){
            	// if (parseInt($scope.item.idMenu) < 11 ) {
            		$scope.showIdMenu=false
            	// }else{
            	// 	$scope.showIdMenu=true
            	// }
            	idASEM='';
            	$scope.item.idHeadMenu = $scope.item.idMenu
            	$scope.item.nmModulHead = $scope.item.nmMenu
            	$scope.batal2();
            }

            $scope.cariMenuHead =function(){
            	manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=objekmodultokelompokuser&omaid=" + $scope.item.idHeadMenu  +"&id=" + idModul, true).then(function(dat){
					//$scope.item.idHeadMenu =dat.data[0].omaid;
					$scope.item.nmModulHead =dat.data.data2.objekmodulaplikasi;
				});
            }
            $scope.cariMenuid =function(){
            	manageSarprasPhp.getDataTableTransaksi("pegawai/data?jenis=objekmodultokelompokuser&omaid=" + $scope.item.idMenu  +"&id=" + idModul , true).then(function(dat){
					//$scope.item.idMenu =dat.data[0].omaid;
					if (parseInt(dat.data.data2.kdobjekmodulaplikasihead) == parseInt($scope.item.idHeadMenu)) {
						$scope.item.idHead =dat.data.data2.kdobjekmodulaplikasihead;
						$scope.item.nmMenu = dat.data.data2.objekmodulaplikasi;
						$scope.item.fungsi =dat.data.data2.fungsi;
						$scope.item.keterangan =dat.data.data2.keterangan;
						$scope.item.noUrut2 =dat.data.data2.nourut;
						$scope.item.url =dat.data.data2.alamaturlform;	
						idASEM = $scope.item.idMenu;
					}else{
						$scope.item.idMenu = idASEM;
						alert('Parent dan children tidak cocok!')
					}
					
				});
            }
// modelItemAkuntansi.getDataTableMaster("tarif/getProduk", true).then(function(dat){
// 	$scope.listproduk= dat;
// });
}
]);
});

