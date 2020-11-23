define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KehamilanSekarangRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien', 'DateHelper', 'ManagePhp' , 'CacheHelper', 
		function($rootScope, $scope, ModelItem, $state, findPasien, managePasien, dateHelper, ManagePhp, cacheHelper) {
			$scope.title = "Tanda Vital";
			$rootScope.showMenu = true;
			$scope.noCM = $state.params.noCM;
			$scope.formId = 437;
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.item = {};
            $scope.numberPicker = {
            	format: "{0:n0}"
            }

            $scope.now = new Date();
 			$scope.getKehamilanNow=function(){
                var objectfk = "KHS";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData ("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                      + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                    $scope.dataKehilanSekarang= e.data.data;
                    if ($scope.dataKehilanSekarang.length >0){
                        for (var i = 0; i < $scope.dataKehilanSekarang.length; i++) {
                            if($scope.dataKehilanSekarang[i].objectfk == "KHS-000001"){
                                $scope.norecGpaG = $scope.dataKehilanSekarang[i].norec
                                $scope.item.GpaG = $scope.dataKehilanSekarang[i].nilai
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000002"){
                                $scope.norecGpaP = $scope.dataKehilanSekarang[i].norec
                                $scope.item.GpaP = $scope.dataKehilanSekarang[i].nilai
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000003"){
                                $scope.norecGpaA = $scope.dataKehilanSekarang[i].norec
                                $scope.item.GpaA = $scope.dataKehilanSekarang[i].nilai
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000004"){
                                $scope.norecAtenatalTeratur= $scope.dataKehilanSekarang[i].norec
                                  for (var k = 0; k < $scope.ListYaTidak.length; k++) {
                                	if ($scope.ListYaTidak[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.atenatalTeratur = $scope.ListYaTidak[k]
                                	}
                                }
                              
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000005"){
                                $scope.norecPemeriksaanAtenatal = $scope.dataKehilanSekarang[i].norec
                                for (var k = 0; k < $scope.ListAntenatal.length; k++) {
                                	if ($scope.ListAntenatal[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.pemeriksaanAtenatal = $scope.ListAntenatal[k]
                                	}
                                }
                               
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000006"){
                                $scope.norecKelainan0= $scope.dataKehilanSekarang[i].norec
                     
                            	$scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                                         
                                                    
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000007"){
                                $scope.norecKelainan1 = $scope.dataKehilanSekarang[i].norec
                                $scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000008"){
                                $scope.norecKelainan2 = $scope.dataKehilanSekarang[i].norec
                                $scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                          
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000009"){
                                $scope.norecKelainan3= $scope.dataKehilanSekarang[i].norec
                                $scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                              
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000010"){
                                $scope.norecKelainan4 = $scope.dataKehilanSekarang[i].norec
                                $scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                            
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000011"){
                                $scope.norecKelainan5 = $scope.dataKehilanSekarang[i].norec
                                $scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                            
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000012"){
                                $scope.norecKelainan6 = $scope.dataKehilanSekarang[i].norec
                                $scope.listKelainan.forEach(function(e){
                                 if (e.id ==  $scope.dataKehilanSekarang[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "name":e.name,                                                    }  
                                         $scope.currentKelainan.push(dataid)
                                    }
                         		})
                          
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000013"){
                                $scope.norecKetKelainan = $scope.dataKehilanSekarang[i].norec
                                $scope.item.ketKelainan = $scope.dataKehilanSekarang[i].nilai 
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000014"){
                                $scope.norecFHR = $scope.dataKehilanSekarang[i].norec
                                 for (var k = 0; k < $scope.listKelainan.length; k++) {
                                	if ($scope.listFHR[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.FHR = $scope.listFHR[k]
                                	}
                                }
                              
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000015"){
                                $scope.norecLilitanTaliPusat = $scope.dataKehilanSekarang[i].norec
                               for (var k = 0; k < $scope.listLilitanTaliPusat.length; k++) {
                                	if ($scope.listLilitanTaliPusat[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.lilitanTaliPusat = $scope.listLilitanTaliPusat[k]
                                	}
                                }
                              
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000016"){
                                $scope.norecFH = $scope.dataKehilanSekarang[i].norec
                             for (var k = 0; k < $scope.listFH.length; k++) {
                                	if ($scope.listFH[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.FH = $scope.listFH[k]
                                	}
                                }
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000017"){
                                $scope.norecPorlapsTaliPusat = $scope.dataKehilanSekarang[i].norec
                                 for (var k = 0; k < $scope.listPorlaps.length; k++) {
                                	if ($scope.listPorlaps[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.porlapsTaliPusat = $scope.listPorlaps[k]
                                	}
                                }
                            
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000018"){
                                $scope.norecFHR2= $scope.dataKehilanSekarang[i].norec
                               for (var k = 0; k < $scope.listFHR2.length; k++) {
                                	if ($scope.listFHR2[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.FHR2 = $scope.listFHR2[k]
                                	}
                                }
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000019"){
                                $scope.norecTglPartus = $scope.dataKehilanSekarang[i].norec
                                 var tgl =  new Date($scope.dataKehilanSekarang[i].nilai)
                    			$scope.item.tglPartus = moment(tgl).format('YYYY-MM-DD')
                              
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000020"){
                                $scope.norecJamPartus = $scope.dataKehilanSekarang[i].norec
                                var tgl =  new Date($scope.dataKehilanSekarang[i].nilai)
                    			$scope.item.jamPartus  = moment(tgl).format('HH-mm')
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000021"){
                                $scope.norecLetakPartus = $scope.dataKehilanSekarang[i].norec
                                $scope.item.letakPartus = $scope.dataKehilanSekarang[i].nilai 
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000022"){
                                $scope.norecKondisiPartus = $scope.dataKehilanSekarang[i].norec
                             for (var k = 0; k < $scope.listKondisiPartus.length; k++) {
                                	if ($scope.listKondisiPartus[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.kondisiPartus = $scope.listKondisiPartus[k]
                                	}
                                }
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000023"){
                                $scope.norecBeratPlasenta = $scope.dataKehilanSekarang[i].norec
                                $scope.item.beratPlasenta = $scope.dataKehilanSekarang[i].nilai 
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000024"){
                                $scope.norecKeadaanPlasenta = $scope.dataKehilanSekarang[i].norec
                                $scope.item.keadaanPlasenta = $scope.dataKehilanSekarang[i].nilai 
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000025"){
                                $scope.norecPembuluhDarah = $scope.dataKehilanSekarang[i].norec
                               for (var k = 0; k < $scope.listPembuluhDarah.length; k++) {
                                	if ($scope.listPembuluhDarah[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.pembuluhDarah = $scope.listPembuluhDarah[k]
                                	}
                                }
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000026"){
                                $scope.norecKelainanTaliPusat = $scope.dataKehilanSekarang[i].norec
                                $scope.item.kelainanTaliPusat = $scope.dataKehilanSekarang[i].nilai 
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000027"){
                                $scope.norecJK = $scope.dataKehilanSekarang[i].norec
                                 for (var k = 0; k < $scope.listJK.length; k++) {
                                	if ($scope.listJK[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.jenisKelamin = $scope.listJK[k]
                                	}
                                }
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000028"){
                                $scope.norecDataLab = $scope.dataKehilanSekarang[i].norec
                                  for (var k = 0; k < $scope.listDataLab.length; k++) {
                                	if ($scope.listDataLab[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.dataLab = $scope.listDataLab[k]
                                	}
                                }
                            }else if($scope.dataKehilanSekarang[i].objectfk == "KHS-000029"){
                                $scope.norecUsg = $scope.dataKehilanSekarang[i].norec
                                  for (var k = 0; k < $scope.listDataLab.length; k++) {
                                	if ($scope.listDataLab[k].id == $scope.dataKehilanSekarang[i].nilai ){
                                		   $scope.item.usg = $scope.listDataLab[k]
                                	}
                                }
                            }

                        }
                    }   
                })
            };
            $scope.getKehamilanNow();
            $scope.ListAntenatal = [
            {"id": 1, "name": "Sp.OG"},
            {"id": 2, "name": "Bidan"},
            {"id": 3, "name": "Tidak Pernah"}
            ]
            $scope.ListYaTidak = [
            {"id": 4, "name": "Tidak Teratur"},
            {"id": 5, "name": "Teratur"}
            ]
            $scope.listKelainan = [
            {"id": 6, "name": "Isoimunisasi"},
            {"id": 7, "name": "Toxemia"},
            {"id": 8, "name": "Hidramnion"},
            {"id": 9, "name": "Diabetes"},
            {"id": 10, "name": "Perdarahan per Vagina"},
            {"id": 11, "name": "Infeksi Traktus Urinarius"},
            {"id": 12, "name": "Lain-lain..."},
            ]
            $scope.listFHR = [
            {"id": 13, "name": "160"},
            {"id": 14, "name": "Tidak Ada"}
            ]

            $scope.listLilitanTaliPusat = [
            {"id": 19, "name": "Ya"},
            {"id": 20, "name": "Tidak Ada"}
            ]
            $scope.listFH = [
            {"id": 15, "name": "Irreguler"},
            {"id": 16, "name": "Tidak Diketahui"}
            ]

            $scope.listFHR2 = [
            {"id": 17, "name": "100"},
            {"id": 18, "name": "Aspirasi Mekonium"}
            ]

            $scope.listPorlaps = [
            {"id": 21, "name": "Ya"},
            {"id": 22, "name": "Tidak"}
            ]
            $scope.listKondisiPartus = [
            {"id": 23, "name": "Spontan"},
            {"id": 24, "name": "Operatif"}
            ]
            $scope.listPembuluhDarah = [
            {"id": 25, "name": "3"},
            {"id": 26, "name": "2"},
            {"id": 27, "name": "Tidak Ada"}
            ]
            $scope.listJK = [
            {"id": 28 ,"name": "Laki-laki"},
            {"id": 29, "name": "Perempuan"},
            {"id": 30, "name": "Ambigous"}
            ]
              $scope.listDataLab = [
            {"id": 31, "name": "Ada"},
            {"id": 32, "name": "Tidak Ada"}
       
            ]


            $scope.isChecked = function(id){
            	var match = false;
            	for(var i=0 ; i < $scope.arrKelainan.length; i++) {
            		if($scope.arrKelainan[i].id == id){
            			match = true;
            		}
            	}
            	return match;
            };
            $scope.checkboxCLick = function(bool, item) {
            	debugger;
            	if(bool){
					// show text-box
					if (item.id === 452)
						$scope.kelainanLain = true;
					// add item
					$scope.arrKelainan.push(item);
				} else {
					// hide text-box
					if (item.id === 452)
						$scope.kelainanLain = false;
					// remove item
					for(var i=0 ; i < $scope.arrKelainan.length; i++) {
						if($scope.arrKelainan[i].id == item.id){
							$scope.arrKelainan.splice(i,1);
						}
					}      
				}
			};
			$scope.cekRadioClick = function(data, stat){
				data.value = stat.id;
				console.log(JSON.stringify('nama parameter: ' + data.nama + ', nilai: '+ stat.nama));

			}
		

			$scope.Save = function(){
				if ($scope.dataKehilanSekarang.length != 0) {
					var data = [
					{
						norec: $scope.norecGpaG,
						objectfk: "KHS-000001",
						nilai:  $scope.item.GpaG,
						satuan: "",
						jenisobject : "numberPicker"
					},
					{
						norec:  $scope.norecGpaP,
						objectfk: "KHS-000002",
						nilai:  $scope.item.GpaP,
						satuan: "",
						jenisobject : "numberPicker"
					},
					{
						norec: $scope.norecGpaA,
						objectfk: "KHS-000003",
						nilai: $scope.item.GpaA ,
						satuan: "",
						jenisobject: 'numberPicker'
					},
					{
						norec:  $scope.norecAtenatalTeratur,
						objectfk: "KHS-000004",
						nilai: $scope.item.atenatalTeratur !== undefined ? $scope.item.atenatalTeratur.id : $scope.item.atenatalTeratur,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecPemeriksaanAtenatal,
						objectfk: "KHS-000005",
						nilai: $scope.item.pemeriksaanAtenatal !== undefined ? $scope.item.pemeriksaanAtenatal.id : $scope.item.pemeriksaanAtenatal,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecKelainan0,
						objectfk: "KHS-000006",
						nilai: $scope.currentKelainan[0] !== undefined && $scope.currentKelainan.length >= 1 ? $scope.currentKelainan[0].id : $scope.currentKelainan[0], /* 	{"id": 1, "name": "Isoimunisasi"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKelainan1,
						objectfk: "KHS-000007",
						nilai: $scope.currentKelainan[1] !== undefined && $scope.currentKelainan.length >= 2 ? $scope.currentKelainan[1].id : $scope.currentKelainan[1],/*	{"id": 2, "name": "Toxemia"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKelainan2,
						objectfk: "KHS-000008",
				      	nilai: $scope.currentKelainan[2] !== undefined && $scope.currentKelainan.length >= 3 ? $scope.currentKelainan[2].id : $scope.currentKelainan[2],	/*{"id": 3, "name": "Hidramnion"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKelainan3,
						objectfk: "KHS-000009",
						nilai: $scope.currentKelainan[3] !== undefined && $scope.currentKelainan.length >= 4 ? $scope.currentKelainan[3].id : $scope.currentKelainan[3],		/*{"id": 4, "name": "Perdarahan per Vagina"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKelainan4,
						objectfk: "KHS-000010",
						nilai: $scope.currentKelainan[4] !== undefined && $scope.currentKelainan.length >= 5 ? $scope.currentKelainan[4].id : $scope.currentKelainan[4],	/*	{"id": 5, "name": "Diabetes"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKelainan5,
						objectfk: "KHS-000011",
						nilai: $scope.currentKelainan[5] !== undefined && $scope.currentKelainan.length >= 6 ? $scope.currentKelainan[5].id : $scope.currentKelainan[5], /*	{"id": 6, "name": "Infeksi Traktus Urinarius"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKelainan6,
						objectfk: "KHS-000012",
						nilai: $scope.currentKelainan[6] !== undefined && $scope.currentKelainan.length >= 7 ? $scope.currentKelainan[6].id : $scope.currentKelainan[6],	/*	{"id": 7, "name": "Lain-lain..."}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						norec:  $scope.norecKetKelainan,
						objectfk: "KHS-000013",
						nilai: $scope.item.ketKelainan,
						satuan: "",
						jenisobject: "textarea"
					},
					{
						norec:  $scope.norecFHR,
						objectfk: "KHS-000014",
						nilai: $scope.item.FHR!== undefined ? $scope.item.FHR.id : $scope.item.FHR,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecLilitanTaliPusat,
						objectfk: "KHS-000015",
						nilai: $scope.item.lilitanTaliPusat  !== undefined  ? $scope.item.lilitanTaliPusat.id : $scope.item.lilitanTaliPusat,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecFH,
						objectfk: "KHS-000016",
						nilai: $scope.item.FH!==undefined? $scope.item.FH.id : $scope.item.FH,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecPorlapsTaliPusat,
						objectfk: "KHS-000017",
						nilai: $scope.item.porlapsTaliPusat !== undefined ?  $scope.item.porlapsTaliPusat.id :  $scope.item.porlapsTaliPusat ,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecFHR2,
						objectfk: "KHS-000018",
						nilai: $scope.item.FHR2 !== undefined ? $scope.item.FHR2.id :$scope.item.FHR2 ,
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec: $scope.norecTglPartus,
						objectfk: "KHS-000019",
						nilai: moment($scope.item.tglPartus ).format('YYYY-MM-DD'),
						satuan: "",
						jenisobject: "datepicker"
					},
					{
						norec:  $scope.norecJamPartus,
						objectfk: "KHS-000020",
						nilai:moment($scope.item.jamPartus ).format('HH-mm'), 
						satuan: "",
						jenisobject: "timepicker"
					},
					{
						norec:  $scope.norecLetakPartus,
						objectfk: "KHS-000021",
						nilai:$scope.item.letakPartus, 
						satuan: "",
						jenisobject: "textbox"
					},
					{
						norec:  $scope.norecKondisiPartus,
						objectfk: "KHS-000022",
						nilai:$scope.item.kondisiPartus !== undefined ? $scope.item.kondisiPartus.id : $scope.item.kondisiPartus, 
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecBeratPlasenta,
						objectfk: "KHS-000023",
						nilai:$scope.item.beratPlasenta, 
						satuan: "",
						jenisobject: "numberPicker"
					},
					{
						norec:  $scope.norecKeadaanPlasenta,
						objectfk: "KHS-000024",
						nilai:$scope.item.keadaanPlasenta, 
						satuan: "",
						jenisobject: "textbox"
					},
					{
						norec:  $scope.norecPembuluhDarah,
						objectfk: "KHS-000025",
						nilai:$scope.item.pembuluhDarah !== undefined ? $scope.item.pembuluhDarah.id : $scope.item.pembuluhDarah, 
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecKelainanTaliPusat,
						objectfk: "KHS-000026",
						nilai:$scope.item.kelainanTaliPusat, 
						satuan: "",
						jenisobject: "textbox"
					},
					{
						norec:  $scope.norecJK,
						objectfk: "KHS-000027",
						nilai:$scope.item.jenisKelamin !== undefined ? $scope.item.jenisKelamin.id : $scope.item.jenisKelamin, 
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec:  $scope.norecDataLab,
						objectfk: "KHS-000028",
						nilai:$scope.item.dataLab !== undefined ? $scope.item.dataLab.id : $scope.item.dataLab, 
						satuan: "",
						jenisobject: "radio"
					},
					{
						norec: $scope.norecUsg,
						objectfk: "KHS-000029",
						nilai:$scope.item.usg !== undefined ? $scope.item.usg.id : $scope.item.usg, 
						satuan: "",
						jenisobject: "radio"
					}

					]
				} else {
					var data = [
					{
					
						objectfk: "KHS-000001",
						nilai:  $scope.item.GpaG,
						satuan: "",
						jenisobject : "numberPicker"
					},
					{
					
						objectfk: "KHS-000002",
						nilai:  $scope.item.GpaP,
						satuan: "",
						jenisobject : "numberPicker"
					},
					{
					
						objectfk: "KHS-000003",
						nilai: $scope.item.GpaA ,
						satuan: "",
						jenisobject: 'numberPicker'
					},
					{
						
						objectfk: "KHS-000004",
						nilai: $scope.item.atenatalTeratur !== undefined ? $scope.item.atenatalTeratur.id : $scope.item.atenatalTeratur,
						satuan: "",
						jenisobject: "radio"
					},
					{
					
						objectfk: "KHS-000005",
						nilai: $scope.item.pemeriksaanAtenatal !== undefined ? $scope.item.pemeriksaanAtenatal.id : $scope.item.pemeriksaanAtenatal,
						satuan: "",
						jenisobject: "radio"
					},
					{
						
						objectfk: "KHS-000006",
						nilai: $scope.currentKelainan[0] !== undefined && $scope.currentKelainan.length >= 1 ? $scope.currentKelainan[0].id : $scope.currentKelainan[0], /* 	{"id": 1, "name": "Isoimunisasi"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						
						objectfk: "KHS-000007",
						nilai: $scope.currentKelainan[1] !== undefined && $scope.currentKelainan.length >= 2 ? $scope.currentKelainan[1].id : $scope.currentKelainan[1],/*	{"id": 2, "name": "Toxemia"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
					
						objectfk: "KHS-000008",
				      	nilai: $scope.currentKelainan[2] !== undefined && $scope.currentKelainan.length >= 3 ? $scope.currentKelainan[2].id : $scope.currentKelainan[2],	/*{"id": 3, "name": "Hidramnion"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
					
						objectfk: "KHS-000009",
						nilai: $scope.currentKelainan[3] !== undefined && $scope.currentKelainan.length >= 4 ? $scope.currentKelainan[3].id : $scope.currentKelainan[3],		/*{"id": 4, "name": "Perdarahan per Vagina"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						
						objectfk: "KHS-000010",
						nilai: $scope.currentKelainan[4] !== undefined && $scope.currentKelainan.length >=5 ? $scope.currentKelainan[4].id : $scope.currentKelainan[4],	/*	{"id": 5, "name": "Diabetes"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
					
						objectfk: "KHS-000011",
						nilai: $scope.currentKelainan[5] !== undefined && $scope.currentKelainan.length >= 6 ? $scope.currentKelainan[5].id : $scope.currentKelainan[5], /*	{"id": 6, "name": "Infeksi Traktus Urinarius"}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						
						objectfk: "KHS-000012",
						nilai: $scope.currentKelainan[6] !== undefined && $scope.currentKelainan.length >= 7 ? $scope.currentKelainan[6].id : $scope.currentKelainan[6],	/*	{"id": 7, "name": "Lain-lain..."}, */
						satuan: "",
						jenisobject: "checkbox"
					},
					{
						
						objectfk: "KHS-000013",
						nilai: $scope.item.ketKelainan,
						satuan: "",
						jenisobject: "textarea"
					},
					{
						
						objectfk: "KHS-000014",
						nilai: $scope.item.FHR!== undefined ? $scope.item.FHR.id : $scope.item.FHR,
						satuan: "",
						jenisobject: "radio"
					},
					{
					
						objectfk: "KHS-000015",
						nilai: $scope.item.lilitanTaliPusat  !== undefined  ? $scope.item.lilitanTaliPusat.id : $scope.item.lilitanTaliPusat,
						satuan: "",
						jenisobject: "radio"
					},
					{
						
						objectfk: "KHS-000016",
						nilai: $scope.item.FH !== undefined ?$scope.item.FH.id : $scope.item.FH,
						satuan: "",
						jenisobject: "radio"
					},
					{
						
						objectfk: "KHS-000017",
						nilai: $scope.item.porlapsTaliPusat !== undefined ?  $scope.item.porlapsTaliPusat.id :  $scope.item.porlapsTaliPusat ,
						satuan: "",
						jenisobject: "radio"
					},
					{
					
						objectfk: "KHS-000018",
						nilai: $scope.item.FHR2 !== undefined ? $scope.item.FHR2.id :$scope.item.FHR2 ,
						satuan: "",
						jenisobject: "radio"
					},
					{
						objectfk: "KHS-000019",
						nilai: moment($scope.item.tglPartus ).format('YYYY-MM-DD'),
						satuan: "",
						jenisobject: "datepicker"
					},
					{
					
						objectfk: "KHS-000020",
						nilai:moment($scope.item.jamPartus ).format('HH-mm'), 
						satuan: "",
						jenisobject: "timepicker"
					},
					{
					
						objectfk: "KHS-000021",
						nilai:$scope.item.letakPartus, 
						satuan: "",
						jenisobject: "textbox"
					},
					{
					
						objectfk: "KHS-000022",
						nilai:$scope.item.kondisiPartus !== undefined ? $scope.item.kondisiPartus.id : $scope.item.kondisiPartus, 
						satuan: "",
						jenisobject: "radio"
					},
					{
					
						objectfk: "KHS-000023",
						nilai:$scope.item.beratPlasenta, 
						satuan: "",
						jenisobject: "numberPicker"
					},
					{
					
						objectfk: "KHS-000024",
						nilai:$scope.item.keadaanPlasenta, 
						satuan: "",
						jenisobject: "textbox"
					},
					{
					
						objectfk: "KHS-000025",
						nilai:$scope.item.pembuluhDarah !== undefined ? $scope.item.pembuluhDarah.id : $scope.item.pembuluhDarah, 
						satuan: "",
						jenisobject: "radio"
					},
					{
				
						objectfk: "KHS-000026",
						nilai:$scope.item.kelainanTaliPusat, 
						satuan: "",
						jenisobject: "textbox"
					},
					{
				
						objectfk: "KHS-000027",
						nilai:$scope.item.jenisKelamin !== undefined ? $scope.item.jenisKelamin.id : $scope.item.jenisKelamin, 
						satuan: "",
						jenisobject: "radio"
					},
					{
					
						objectfk: "KHS-000028",
						nilai:$scope.item.dataLab !== undefined ? $scope.item.dataLab.id : $scope.item.dataLab, 
						satuan: "",
						jenisobject: "radio"
					},
					{
					
						objectfk: "KHS-000029",
						nilai:$scope.item.usg !== undefined ? $scope.item.usg.id : $scope.item.usg, 
						satuan: "",
						jenisobject: "radio"
					}

					]                                
				}
				for (var i = data.length - 1; i >= 0; i--) {
					if(data[i].norec == undefined){
						data[i].norec = '-'
					}
					if(data[i].nilai == undefined){
						data.splice([i],1)
					}
				}
				// for (var i = 0; i < data.length; i++) {
				// 	if(data[i].norec == undefined){
				// 		data[i].norec = '-'
				// 	}
				// 	if(data[i].nilai == undefined){
				// 		data.splice([i],1)
				// 	}
				

				// }
				var jsonSave = {
					data: data,
					noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap
				}

				console.log(jsonSave);
				// ManagePhp.saveData(jsonSave).then(function(e) {
                //        ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Kehamilan Sekarang').then(function (res) {
                //          })
				// });
			}
			$scope.Back= function(){
				$scope.item = {}
			}
			  $scope.currentKelainan=[];
           $scope.addListKelainan = function(data) {
                var index = $scope.currentKelainan.indexOf(data);
                if (_.filter($scope.currentKelainan, {
                        id: data.id
                    }).length === 0)
                    $scope.currentKelainan.push(data);
                else {
                    $scope.currentKelainan.splice(index, 1);
                }
                
            }
		}
		]);
});