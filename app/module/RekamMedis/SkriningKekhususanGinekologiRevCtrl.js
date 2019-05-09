define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKekhususanGinekologiRevCtrl', ['$rootScope', '$scope', '$state', 'CacheHelper', 'ManagePhp',
        function($rootScope, $scope, $state, cacheHelper, ManagePhp) {

            //$rootScope.listActive -> data listMenu

            $scope.titleObs = "OBSTETRIK DAN GINEKOLOGI";
            $scope.titleRanap= "RAWAT INAP";
            $scope.titleKehamilan = "RIWAYAT KEHAMILAN SEKARANG";
            $scope.titleGinek = "STATUS GINEKOLOGI";
            $scope.titleGolDar = "GOLONGAN DARAH";
            $rootScope.showMenu = true;
            $scope.formId = 586;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};
            $scope.klinik = [];
            $scope.arrPenyakitLain = [];
            $scope.currentPenyakit=[]; 
            
            $scope.listDarahHaid=[
            {"id":1,"nama":"Jumlah Darah Haid","detail":[{"id":1,"nama":"Sedikit","descNilai":"4"},{"id":2,"nama":"Normal","descNilai":"3"},{"id":3,"nama":"Banyak","descNilai":"2"}]}
            ]
            $scope.listKeputihan=[
            {"id":1,"nama":"Keputihan","detail":[{"id":1,"nama":"Gatal","descNilai":"4"},{"id":2,"nama":"Bau","descNilai":"3"},{"id":3,"nama":"Warna (Putih/Kuning)","descNilai":"2"}]}
            ]
            $scope.listPenyakit=[
            {"id":1,"nama":"Penyakit Lain","detail":[{"id":1,"nama":"Jantung","descNilai":"4"},{"id":2,"nama":"Paru-Paru","descNilai":"3"},{"id":3,"nama":"Diabetes","descNilai":"2"}]}
            ]   
            $scope.listCaraMelahirkan=[
            {"id":1,"nama":"Cara Melahirkan","detail":[{"id":1,"nama":"Spontal","descNilai":"4"},{"id":2,"nama":"SC","descNilai":"3"},{"id":3,"nama":"Forcep","descNilai":"2"},{"id":4,"nama":"Vacum Extraction","descNilai":"2"}]}
            ]   
            $scope.listPendarahan=[
            {"id":1,"nama":"Pendarahan","detail":[{"id":1,"nama":"Ya","descNilai":"4"},{"id":2,"nama":"Tidak","descNilai":"3"}]}
            ]

            $scope.listKonsistensi=[
            {"id":1,"nama":"Konsistensi Uterus","detail":[{"id":1,"nama":"Lembek","descNilai":"4"},{"id":2,"nama":"Tidak      ","descNilai":"3"}]}
            ]
            $scope.listLukaOperasi=[
            {"id":1,"nama":"Luka Operasi","detail":[{"id":1,"nama":"Tidak Ada","descNilai":"4"},{"id":2,"nama":"Ada","descNilai":"3"}]}
            ]

            $scope.listPerineum=[
            {"id":1,"nama":"Perineum","detail":[{"id":1,"nama":"Utuh","descNilai":"4"},{"id":2,"nama":"Ada Robekan","descNilai":"3"}]}
            ]
            $scope.listLochea=[
            {"id":1,"nama":"Lochea","detail":[{"id":1,"nama":"Rubra","descNilai":"4"},{"id":2,"nama":"Sanguinolenta","descNilai":"3"},{"id":3,"nama":"Serosa","descNilai":"3"},{"id":4,"nama":"Alba","descNilai":"3"}
            ]}]

            $scope.getdata=function(){
                var objectfk = "ODG";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk 
                    + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                        $scope.dataResult = e.data.data;
                        
                        for (var i = 0; i < $scope.dataResult.length; i++) {
                            if($scope.dataResult[i].objectfk == "ODG-000001"){
                                $scope.noReckawinPertama = $scope.dataResult[i].norec
                                $scope.item.kawinPertama = $scope.dataResult[i].nilai
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000002"){
                                $scope.noReckawinKedua = $scope.dataResult[i].norec
                                $scope.item.kawinKedua = $scope.dataResult[i].nilai
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000003"){
                                $scope.noRecumurSuami = $scope.dataResult[i].norec
                                $scope.item.umurSuami = $scope.dataResult[i].nilai
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000004"){
                                $scope.noRecmasihKawin = $scope.dataResult[i].norec
                                $scope.item.masihKawin = $scope.dataResult[i].nilai
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000005"){
                                $scope.noReckawin = $scope.dataResult[i].norec
                                $scope.item.kawin = $scope.dataResult[i].nilai

                            }
                            if($scope.dataResult[i].objectfk == "ODG-000006"){
                                $scope.noRecgpa = $scope.dataResult[i].norec
                                $scope.item.gpa = $scope.dataResult[i].nilai

                                
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000007"){
                                $scope.noRechpht = $scope.dataResult[i].norec
                                $scope.item.hpht = $scope.dataResult[i].nilai

                            }
                            if($scope.dataResult[i].objectfk == "ODG-000008"){
                                $scope.noRectaksiranPartus = $scope.dataResult[i].norec
                                $scope.item.taksiranPartus = $scope.dataResult[i].nilai
                        

                            }
                            if($scope.dataResult[i].objectfk == "ODG-000009"){
                                $scope.noRechiperemesis = $scope.dataResult[i].norec
                                $scope.item.hiperemesis = $scope.dataResult[i].nilai
                             
                       

                            }
                            if($scope.dataResult[i].objectfk == "ODG-000010"){
                                $scope.noRectoksemia = $scope.dataResult[i].norec
                                $scope.item.toksemia = $scope.dataResult[i].nilai
                    
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000011"){
                                $scope.noReceklampsia = $scope.dataResult[i].norec
                                $scope.item.eklampsia = $scope.dataResult[i].nilai
                                                          
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000012"){
                                $scope.noRecperdarahan = $scope.dataResult[i].norec
                                $scope.item.perdarahan = $scope.dataResult[i].nilai
                              
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000013"){
                                $scope.noReckontraksi = $scope.dataResult[i].norec
                                $scope.item.kontraksi = $scope.dataResult[i].nilai
                             
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000014"){
                                $scope.noRecKPD = $scope.dataResult[i].norec
                                $scope.item.KPD = $scope.dataResult[i].nilai
                              

                            }
                            if($scope.dataResult[i].objectfk == "ODG-000015"){
                                $scope.noRecKB = $scope.dataResult[i].norec
                                $scope.item.KB = $scope.dataResult[i].nilai
                             
                            }
                            if($scope.dataResult[i].objectfk == "ODG-000016"){
                                $scope.noRechaid = $scope.dataResult[i].norec
                                $scope.item.haid = $scope.dataResult[i].nilai
                              
                            }

                            if($scope.dataResult[i].objectfk == "ODG-000017"){
                                $scope.noRecsiklus= $scope.dataResult[i].norec
                                $scope.item.siklus= $scope.dataResult[i].nilai
                                
                            } if($scope.dataResult[i].objectfk == "ODG-000018"){
                                $scope.noRecdarahHaid= $scope.dataResult[i].norec
                                $scope.item.darahHaid= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000019"){
                                $scope.noReckeputihan= $scope.dataResult[i].norec
                                $scope.item.keputihan= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000020"){
                                $scope.noRecgolDarSuami= $scope.dataResult[i].norec
                                $scope.item.golDarSuami= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000021"){
                                $scope.noRecresusSuami= $scope.dataResult[i].norec
                                $scope.item.resusSuami= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000022"){
                                $scope.noRecgolDarIstri= $scope.dataResult[i].norec
                                $scope.item.golDarIstri= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000023"){
                                $scope.noRecresusIstri= $scope.dataResult[i].norec
                                $scope.item.resusIstri= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000024"){
                                $scope.noReccaraMelahirkan= $scope.dataResult[i].norec
                                $scope.item.caraMelahirkan= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000025"){
                                $scope.noRectingiPundus= $scope.dataResult[i].norec
                                $scope.item.tingiPundus= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000026"){
                                $scope.noRecpendarahan= $scope.dataResult[i].norec
                                $scope.item.pendarahan= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000027"){
                                $scope.noReckonsistensi= $scope.dataResult[i].norec
                                $scope.item.konsistensi= $scope.dataResult[i].nilai

                            } if($scope.dataResult[i].objectfk == "ODG-000028"){
                                $scope.noReclukaOperasi= $scope.dataResult[i].norec
                                $scope.item.lukaOperasi= $scope.dataResult[i].nilai
                                
                            } if($scope.dataResult[i].objectfk == "ODG-000029"){
                                $scope.noRecperineum= $scope.dataResult[i].norec
                                $scope.item.perineum= $scope.dataResult[i].nilai
                                
                            } if($scope.dataResult[i].objectfk == "ODG-000030"){
                                $scope.noReclochea= $scope.dataResult[i].norec
                                $scope.item.lochea= $scope.dataResult[i].nilai
                                
                            } if($scope.dataResult[i].objectfk == "ODG-000031"){
                                $scope.noRecJantung= $scope.dataResult[i].norec
                                $scope.listPenyakit[0].detail.forEach(function(e){
                                    if (e.id ==  $scope.dataResult[i].nilai){
                                        e.isChecked = true
                                        var dataid = { "id":e.id,
                                        "descNilai" : "4",
                                        "isChecked" : true,
                                        "nama":e.nama}  
                                        $scope.currentPenyakit.push(dataid)
                                    }
                                })       
                                
                            }  if($scope.dataResult[i].objectfk == "ODG-000032"){
                                $scope.noRecParu= $scope.dataResult[i].norec
                                $scope.listPenyakit[0].detail.forEach(function(e){
                                    if (e.id ==  $scope.dataResult[i].nilai){
                                        e.isChecked = true
                                        var dataid = { "id":e.id,
                                        "descNilai" : "4",
                                        "isChecked" : true,
                                        "nama":e.nama}  
                                        $scope.currentPenyakit.push(dataid)
                                    }
                                })       
                                
                            }  if($scope.dataResult[i].objectfk == "ODG-000033"){
                                $scope.noRecDiabetes= $scope.dataResult[i].norec
                                $scope.listPenyakit[0].detail.forEach(function(e){
                                    if (e.id ==  $scope.dataResult[i].nilai){
                                        e.isChecked = true
                                        var dataid = { "id":e.id,
                                        "descNilai" : "4",
                                        "isChecked" : true,
                                        "nama":e.nama}  
                                        $scope.currentPenyakit.push(dataid)
                                    }
                                })       
                                
                            }  
                        }
                    })
};
$scope.getdata();

$scope.numberPicker = {
    format: "{0:n0}"
}
$scope.radioKlik=function(data, stat){
    data.value = stat.id;
    debugger;
}
$scope.isChecked = function(id){
    var match = false;
    for(var i=0 ; i < $scope.arrPenyakitLain.length; i++) {
       if($scope.arrPenyakitLain[i].id == id){
           match = true;
       }
   }
   return match;
};
$scope.checkboxCLick = function(bool, item) {
    debugger;
    if(bool){
        item.value = "true";
        $scope.arrPenyakitLain.push(item);
    } else {

     for(var i=0 ; i < $scope.arrPenyakitLain.length; i++) {
      if($scope.arrPenyakitLain[i].id == item.id){
          $scope.arrPenyakitLain.splice(i,1);
      }
  }      
}
};
$scope.Save = function(){
 var tempData = []
 if($scope.item.kawinPertama !== undefined){
    var tmpStatus = {
        norec: $scope.noReckawinPertama,
        objectfk: "ODG-000001",
        nilai: $scope.item.kawinPertama,
        satuan: "-",
        jenisobject : "numberPicker"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kawinKedua !== undefined){
    var tmpStatus = {
        norec: $scope.noReckawinKedua,
        objectfk: "ODG-000002",
        nilai: $scope.item.kawinKedua,
        satuan: "-",
        jenisobject : "numberPicker"
    }
    tempData.push(tmpStatus);
}
if($scope.item.umurSuami !== undefined){
    var tmpStatus = {
        norec: $scope.noRecumurSuami,
        objectfk: "ODG-000003",
        nilai: $scope.item.umurSuami,
        satuan: "-",
        jenisobject : "numberPicker"
    }
    tempData.push(tmpStatus);
}
if($scope.item.masihKawin !== undefined){
    var tmpStatus = {
        norec: $scope.noRecmasihKawin,
        objectfk: "ODG-000004",
        nilai: $scope.item.masihKawin,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kawin !== undefined){
    var tmpStatus = {
        norec: $scope.noReckawin,
        objectfk: "ODG-000005",
        nilai: $scope.item.kawin,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.gpa !== undefined){
    var tmpStatus = {
        norec: $scope.noRecgpa,
        objectfk: "ODG-000006",
        nilai: $scope.item.gpa,
        satuan: "-",
        jenisobject : "textbox"
    }
    tempData.push(tmpStatus);
}
if($scope.item.hpht !== undefined){
    var tmpStatus = {
        norec: $scope.noRechpht,
        objectfk: "ODG-000007",
        nilai: $scope.item.hpht,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.taksiranPartus !== undefined){
    var tmpStatus = {
        norec: $scope.noRectaksiranPartus,
        objectfk: "ODG-000008",
        nilai: $scope.item.taksiranPartus,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.hiperemesis !== undefined){
    var tmpStatus = {
        norec: $scope.noRechiperemesis,
        objectfk: "ODG-000009",
        nilai: $scope.item.hiperemesis,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.toksemia !== undefined){
    var tmpStatus = {
        norec: $scope.noRectoksemia,
        objectfk: "ODG-000010",
        nilai: $scope.item.toksemia,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.eklampsia !== undefined){
    var tmpStatus = {
        norec: $scope.noReceklampsia,
        objectfk: "ODG-000011",
        nilai: $scope.item.eklampsia,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.perdarahan !== undefined){
    var tmpStatus = {
        norec: $scope.noRecperdarahan,
        objectfk: "ODG-000012",
        nilai: $scope.item.perdarahan,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kontraksi !== undefined){
    var tmpStatus = {
        norec: $scope.noReckontraksi,
        objectfk: "ODG-000013",
        nilai: $scope.item.kontraksi,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.KPD !== undefined){
    var tmpStatus = {
        norec: $scope.noRecKPD,
        objectfk: "ODG-000014",
        nilai: $scope.item.KPD,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.KB !== undefined){
    var tmpStatus = {
        norec: $scope.noRecKB,
        objectfk: "ODG-000015",
        nilai: $scope.item.KB,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.haid !== undefined){
    var tmpStatus = {
        norec: $scope.noRechaid,
        objectfk: "ODG-000016",
        nilai: $scope.item.haid,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.siklus !== undefined){
    var tmpStatus = {
        norec: $scope.noRecsiklus,
        objectfk: "ODG-000017",
        nilai: $scope.item.siklus,
        satuan: "-",
        jenisobject : "numberPicker"
    }
    tempData.push(tmpStatus);
}
if($scope.item.darahHaid !== undefined){
    var tmpStatus = {
        norec: $scope.noRecdarahHaid,
        objectfk: "ODG-000018",
        nilai: $scope.item.darahHaid,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.keputihan !== undefined){
    var tmpStatus = {
        norec: $scope.noReckeputihan,
        objectfk: "ODG-000019",
        nilai: $scope.item.keputihan,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.golDarSuami !== undefined){
    var tmpStatus = {
        norec: $scope.noRecgolDarSuami,
        objectfk: "ODG-000020",
        nilai: $scope.item.golDarSuami,
        satuan: "-",
        jenisobject : "textbox"
    }
    tempData.push(tmpStatus);
}

if($scope.item.resusSuami !== undefined){
    var tmpStatus = {
        norec: $scope.noRecresusSuami,
        objectfk: "ODG-000021",
        nilai: $scope.item.resusSuami,
        satuan: "-",
        jenisobject : "textbox"
    }
    tempData.push(tmpStatus);
}

if($scope.item.golDarIstri !== undefined){
    var tmpStatus = {
        norec: $scope.noRecgolDarIstri,
        objectfk: "ODG-000022",
        nilai: $scope.item.golDarIstri,
        satuan: "-",
        jenisobject : "textbox"
    }
    tempData.push(tmpStatus);
}

if($scope.item.resusIstri !== undefined){
    var tmpStatus = {
        norec: $scope.noRecresusIstri,
        objectfk: "ODG-000023",
        nilai: $scope.item.resusIstri,
        satuan: "-",
        jenisobject : "textbox"
    }
    tempData.push(tmpStatus);
}

if($scope.item.caraMelahirkan !== undefined){
    var tmpStatus = {
        norec: $scope.noReccaraMelahirkan,
        objectfk: "ODG-000024",
        nilai: $scope.item.caraMelahirkan,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}

if($scope.item.tingiPundus !== undefined){
    var tmpStatus = {
        norec: $scope.noRectingiPundus,
        objectfk: "ODG-000025",
        nilai: $scope.item.tingiPundus,
        satuan: "-",
        jenisobject : "textbox"
    }
    tempData.push(tmpStatus);
}


if($scope.item.pendarahan !== undefined){
    var tmpStatus = {
        norec: $scope.noRecpendarahan,
        objectfk: "ODG-000026",
        nilai: $scope.item.pendarahan,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}


if($scope.item.konsistensi !== undefined){
    var tmpStatus = {
        norec: $scope.noReckonsistensi,
        objectfk: "ODG-000027",
        nilai: $scope.item.konsistensi,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}


if($scope.item.lukaOperasi !== undefined){
    var tmpStatus = {
        norec: $scope.noReclukaOperasi,
        objectfk: "ODG-000028",
        nilai: $scope.item.lukaOperasi,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}


if($scope.item.perineum !== undefined){
    var tmpStatus = {
        norec: $scope.noRecperineum,
        objectfk: "ODG-000029",
        nilai: $scope.item.perineum,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.lochea !== undefined){
    var tmpStatus = {
        norec: $scope.noReclochea,
        objectfk: "ODG-000030",
        nilai: $scope.item.lochea,
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
$scope.currentPenyakit.forEach(function(data){
    if(data.id === 1){
        var tmp = {
            norec: $scope.noRecJantung,
            objectfk: "ODG-000031",
            nilai: data.id.toString(),
            satuan: "-",
            jenisobject : "checkbox",
            status: data.status
        }
        tempData.push(tmp);
    }
    if(data.id === 2){
        var tmp = {
            norec: $scope.noRecParu,
            objectfk: "ODG-000032",
            nilai: data.id.toString(),
            satuan: "-",
            jenisobject : "checkbox",
            status: data.status
        }
        tempData.push(tmp);
    }
    if(data.id === 3){
        var tmp = {
            norec: $scope.noRecDiabetes,
            objectfk: "ODG-000033",
            nilai: data.id.toString(),
            satuan: "-",
            jenisobject : "checkbox",
            status: data.status
        }
        tempData.push(tmp);
    }

})



for (var i = tempData.length - 1; i >= 0; i--) {
    if(tempData[i].nilai == undefined){
        tempData.splice([i],1)
    }
    if(tempData[i].norec == undefined){
        tempData[i].norec = '-'
    }

}

var jsonSave = {
    data: tempData,
    noregistrasifk: $state.params.noRec,
    riwayatpapfk: $scope.noRecPap
}
ManagePhp.saveData(jsonSave).then(function(e) {
    $scope.currentPenyakit=[];  
    $scope.getdata();
});
}

$scope.addListPenyakit = function(data) {
    var index = $scope.currentPenyakit.indexOf(data);
    if (_.filter($scope.currentPenyakit, {
        id: data.id
    }).length === 0)
        $scope.currentPenyakit.push(data);
        else {
            $scope.currentPenyakit.splice(index, 1);
        }
    }

}

]);
});