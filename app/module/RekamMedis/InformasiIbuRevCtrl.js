define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InformasiIbuRevCtrl', [ '$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper','$timeout', 'ManagePhp','CacheHelper' ,
        function( $rootScope, $scope, ModelItem, $state, dateHelper,$timeout, ManagePhp, cacheHelper) {
            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
          $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.formId = 372;
            $scope.isRouteLoading=false;  
            $scope.arrParameterInformasiIbu = [];
            $scope.item = {};
            $scope.now = new Date();

            $scope.listIbuDirawat = [{
                "id": 1, "name": "Ya"
            },{
                "id": 2, "name": "Tidak"
            }];
            $scope.listKebangsaan = [{
                "id": 1, "name": "WNI"
            },{
                "id": 2, "name": "WNA"
            }];
            $scope.statusPerkawinan = [{
                "id": 1, "name": "Kawin"
            },{
                "id": 2, "name": "Belum Kawin"
            }];
            $scope.diTolongOleh = [{
                "id": 1, "name": "Dokter"
            },{
                "id": 2, "name": "Bidan"
            }];
            

            ManagePhp.getData("rekam-medis/get-combo").then(function(e){
                $scope.listRuangan = e.data.ruangan
                $scope.listAgama = e.data.agama
            })

            $scope.findData = function(){
               $scope.popUpMenu.center().open();
           }
           $scope.searchIbu= function(){
            searchIbu();
        }
        function searchIbu(){
            $scope.isRouteLoading=true;
            var rm =""
            if ($scope.popUp.noRM != undefined){
             rm ="&norm=" +$scope.popUp.noRM
         }   

         var pasien =""
         if ($scope.popUp.namaPasien != undefined){
             pasien ="&namaPasien=" +$scope.popUp.namaPasien
         }   
         var ayah =""
         if ($scope.popUp.namaAyah != undefined){
             ayah ="&namaAyah=" +$scope.popUp.namaAyah
         }
         var almat =""
         if ($scope.popUp.alamat != undefined){
             almat ="&alamat=" +$scope.popUp.alamat
         }

         if ($scope.popUp.namaAyah != undefined){
             ayah ="&namaAyah=" +$scope.popUp.namaAyah
         }                var tglLahirs =""
         if ($scope.popUp.tglLahir != undefined){
             tglLahirs ="tglLahir=" + DateHelper.formatDate($scope.popUp.tglLahir, 'YYYY-MM-DD');
         }

         ManagePhp.getData("registrasipasien/get-pasien?"+
            tglLahirs+
            rm+
            pasien+
            ayah+
            almat)
         .then(function(data) {
            $scope.isRouteLoading=false;  
            $scope.dataSourceGrid = data.data.daftar;
        });

     };



     $scope.columnGrid= [
     {
        "field": "nocm",
        "title": "No Rekam Medis",
        "width":"80px",

    },
    {
        "field": "namapasien",
        "title": "Nama Pasien",
        "width":"150px",

    },
    {
        "field": "jeniskelamin",
        "title": "Jenis Kelamin",
        "width":"80px",

    },

    {
        "field": "namaayah",
        "title": "Nama Ayah Kandung",
        "width":"100px",
        "template": '# if( namaayah==null) {# - # } else {# #= namaayah # #} #'

    },
    {
        "field": "tgllahir",
        "title": "Tanggal Lahir",
        "width":"80px",
        "template": "<span class='style-left'>{{formatTanggal('#: tgllahir #')}}</span>"
    },

    {
        "field": "alamatlengkap",
        "title": "Alamat",
        "width":"200px",

    },
    {
        "field": "notelepon",
        "title": "No Telepon",
        "width":"80px",
        "template": '# if( notelepon==null) {# - # } else {# #= notelepon # #} #'
    },

    ];
    $scope.SearchEnter = function () {
        searchIbu()
    }
    $scope.PilihIbu= function(){
       if( $scope.dataPasienSelected == undefined){
        toastr.error('Pilih data dulu')
        return
    }
    $scope.tutupPopUp();
    $scope.item.noCmIbu =$scope.dataPasienSelected.nocm
    $scope.item.namaIbu =$scope.dataPasienSelected.namapasien
    $scope.item.tglLahir =moment($scope.dataPasienSelected.tgllahir ).format('YYYY-MM-DD')
    if ( $scope.item.noCmIbu !== undefined){
        ManagePhp.getData("rekam-medis/get-info-pasien?noCm="+  $scope.item.noCmIbu ).then(function(e){
            var result = e.data.data[0];
            $scope.item.agama={id:result.objectagamafk,agama:result.agama}   
            if (result.objectkebangsaanfk== null || result.objectkebangsaanfk =="1" )
               $scope.item.kebangsaan={id:1,name:"WNI"}   
           else
              $scope.item.kebangsaan={id:2,name:"WNA"}  
          $scope.item.ruangan={id:result.objectruanganlastfk,namaruangan:result.namaruangan}   
          if (result.statuskawin == 'kawin'  ){
              $scope.item.statusPerkawinan=$scope.statusPerkawinan[0]
          }else{
              $scope.item.statusPerkawinan=$scope.statusPerkawinan[1]
          }
          if (result.statusrawat =='dirawat'){
              $scope.item.ibuDirawat=$scope.listIbuDirawat[0]
          }else{
              $scope.item.ibuDirawat=$scope.listIbuDirawat[1]
          }

      })
    }

}

$scope.tutupPopUp= function(){
    $scope.popUpMenu.close();
}


$scope.getdataVital=function(){
    var objectfk = "IIB";
    var noregistrasifk = $state.params.noRec;
    var status = "t";
    ManagePhp.getData ("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
           + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
        $scope.dataInformasiIbu = e.data.data;
    
        if ($scope.dataInformasiIbu.length >0){
            for (var i = 0; i < $scope.dataInformasiIbu.length; i++) {
                if($scope.dataInformasiIbu[i].objectfk == "IIB-000001"){
                    $scope.norecNamaIbu = $scope.dataInformasiIbu[i].norec
                    $scope.item.namaIbu = $scope.dataInformasiIbu[i].nilai
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000002"){
                    $scope.norecIbuDirawat = $scope.dataInformasiIbu[i].norec
                     for (var k = 0; k  < $scope.listIbuDirawat.length; k++) {
                        if($scope.listIbuDirawat[k].id ==$scope.dataInformasiIbu[i].nilai )  {
                              $scope.item.ibuDirawat = $scope.listIbuDirawat[k]
                        }
                    }
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000003"){
                    $scope.norecNoCm = $scope.dataInformasiIbu[i].norec
                    $scope.item.noCmIbu = $scope.dataInformasiIbu[i].nilai
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000004"){
                    $scope.norecRuangan = $scope.dataInformasiIbu[i].norec
                     for (var k = 0; k < $scope.listRuangan.length; k++) {
                        if($scope.listRuangan[k].id ==$scope.dataInformasiIbu[i].nilai )  {
                             $scope.item.ruangan = $scope.listRuangan[k]
                        }
                    }
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000005"){
                    $scope.norecTglLahir = $scope.dataInformasiIbu[i].norec
                    var tgl =  new Date($scope.dataInformasiIbu[i].nilai)
                    $scope.item.tglLahir = moment(tgl).format('YYYY-MM-DD')
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000006"){
                    $scope.norecKebangsaan = $scope.dataInformasiIbu[i].norec
                     for (var k = 0; k < $scope.listKebangsaan.length; k++) {
                        if($scope.listKebangsaan[k].id ==$scope.dataInformasiIbu[i].nilai )  {
                             $scope.item.kebangsaan = $scope.listKebangsaan[k]
                        }
                     }
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000007"){
                    $scope.norecAgama = $scope.dataInformasiIbu[i].norec
                    for (var k = 0; k < $scope.listAgama.length; k++) {
                        if($scope.listAgama[k].id ==$scope.dataInformasiIbu[i].nilai )  {
                               $scope.item.agama ={id:$scope.listAgama[k].id,agama:$scope.listAgama[k].agama} 
                        }
                    }
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000008"){
                    $scope.norecStatusPerkawinan = $scope.dataInformasiIbu[i].norec
                     for (var k = 0; k < $scope.statusPerkawinan.length; k++) {
                        if($scope.statusPerkawinan[k].id ==$scope.dataInformasiIbu[i].nilai )  {
                               $scope.item.statusPerkawinan = $scope.statusPerkawinan[k]
                        }
                    }
                }else if($scope.dataInformasiIbu[i].objectfk == "IIB-000009"){
                    $scope.norecDitolong = $scope.dataInformasiIbu[i].norec
                     for (var k = 0; k < $scope.diTolongOleh.length; k++) {
                        if($scope.diTolongOleh[k].id ==$scope.dataInformasiIbu[i].nilai )  {
                             $scope.item.ditolongOleh = $scope.diTolongOleh[k]
                        }
                    }
                }

            }
        }   
    })
};
$scope.getdataVital();

    $scope.Save = function() {

            if ($scope.dataInformasiIbu.length != 0) {
                var data = [
                     {
                        norec: $scope.norecNamaIbu,
                        objectfk: "IIB-000001",
                        nilai: $scope.item.namaIbu,
                        satuan: "",
                        jenisobject : "textbox"
                    },
                    {
                        norec: $scope.norecIbuDirawat,
                        objectfk: "IIB-000002",
                        nilai: $scope.item.ibuDirawat !== undefined ? $scope.item.ibuDirawat.id : $scope.item.ibuDirawat ,
                        satuan: "",
                        jenisobject: 'radio'
                    },
                    {
                        norec: $scope.norecNoCm,
                        objectfk: "IIB-000003",
                        nilai: $scope.item.noCmIbu,
                        satuan: "Nocm",
                        jenisobject: "textbox"
                    },
                    {
                        norec: $scope.norecRuangan,
                        objectfk: "IIB-000004",
                        nilai: $scope.item.ruangan !== undefined ?  $scope.item.ruangan.id :   $scope.item.ruangan,
                        satuan: "",
                        jenisobject: "combobox"
                    },
                    {
                        norec: $scope.norecTglLahir,
                        objectfk: "IIB-000005",
                        nilai: $scope.item.tglLahir,
                        satuan: "",
                        jenisobject: "datepicker"
                    },
                    {
                        norec: $scope.norecKebangsaan,
                        objectfk: "IIB-000006",
                        nilai: $scope.item.kebangsaan !== undefined ? $scope.item.kebangsaan.id :  $scope.item.kebangsaan,
                        satuan: "",
                        jenisobject: "radio"
                    },
                    {
                        norec: $scope.norecAgama,
                        objectfk: "IIB-000007",
                        nilai: $scope.item.agama !== undefined ? $scope.item.agama.id : $scope.item.agama,
                        satuan: "",
                        jenisobject: "combobox"
                    },
                    {
                        norec: $scope.norecStatusPerkawinan,
                        objectfk: "IIB-000008",
                        nilai: $scope.item.statusPerkawinan !== undefined ? $scope.item.statusPerkawinan.id : $scope.item.statusPerkawinan,
                        satuan: "",
                        jenisobject: "radio"
                    },
                    {
                        norec: $scope.norecDitolong,
                        objectfk: "IIB-000009",
                        nilai: $scope.item.ditolongOleh !== undefined ? $scope.item.ditolongOleh.id : $scope.item.ditolongOleh,
                        satuan: "",
                        jenisobject: "radio"
                    }
                    ]
                } else {
                var data = [
                    {
                        norec: "-",
                        objectfk: "IIB-000001",
                        nilai: $scope.item.namaIbu,
                        satuan: "",
                        jenisobject : "textbox"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000002",
                        nilai: $scope.item.ibuDirawat !== undefined ? $scope.item.ibuDirawat.id : $scope.item.ibuDirawat ,
                        satuan: "",
                        jenisobject: 'radio'
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000003",
                        nilai: $scope.item.noCmIbu,
                        satuan: "Nocm",
                        jenisobject: "textbox"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000004",
                        nilai: $scope.item.ruangan !== undefined ?  $scope.item.ruangan.id :  $scope.item.ruangan,
                        satuan: "",
                        jenisobject: "combobox"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000005",
                        nilai: moment( $scope.item.tglLahir).format('YYYY-MM-DD'),
                        satuan: "",
                        jenisobject: "datepicker"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000006",
                        nilai: $scope.item.kebangsaan !== undefined ? $scope.item.kebangsaan.id : $scope.item.kebangsaan,
                        satuan: "",
                        jenisobject: "radio"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000007",
                        nilai: $scope.item.agama !== undefined ? $scope.item.agama.id : $scope.item.agama,
                        satuan: "",
                        jenisobject: "combobox"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000008",
                        nilai: $scope.item.statusPerkawinan !== undefined ? $scope.item.statusPerkawinan.id : $scope.item.statusPerkawinan,
                        satuan: "",
                        jenisobject: "radio"
                    },
                    {
                        norec: "-",
                        objectfk: "IIB-000009",
                        nilai: $scope.item.ditolongOleh !== undefined ? $scope.item.ditolongOleh.id : $scope.item.ditolongOleh,
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
            //     if(data[i].nilai == undefined){
            //         data.splice([i],1)
            //     }
            //     if(data[i].norec == undefined){
            //         data[i].norec = '-'
            //     }

            // }
            var jsonSave = {
                data: data,
                noregistrasifk: $state.params.noRec,
                riwayatpapfk: $scope.noRecPap
            }
            ManagePhp.saveData(jsonSave).then(function(e) {
                 ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Informasi Ibu').then(function (res) {
                 })
            });
    };

}
]);
});