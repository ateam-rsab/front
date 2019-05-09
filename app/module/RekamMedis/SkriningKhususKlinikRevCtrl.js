define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKhususKlinikRevCtrl', ['$rootScope', '$scope', '$state', 'CacheHelper', 'ManagePhp',
        function($rootScope, $scope, $state,cacheHelper , ManagePhp ) {

            $scope.titleKulit = "KLINIK KULIT";
            $scope.titleGigi = "KLINIK GIGI";
            $scope.titleMata = "KLINIK MATA";
            $scope.titleNeurologi = "KLINIK NEUROLOGI";
            $scope.titleLaktasi = "KLINIK LAKTASI";
            $scope.titleTht = "KLINIK THT";
            $scope.titleClp = "KLINIK CELAH BIBIR DAN LANGIT (CLP)";

            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 320;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};
            $scope.klinik = [];
            $scope.listJerawat  =[
            {"id":1,"nama":"Jerawat ","no":"1)","detail":[{"id":1,"nama":"Ya"},{"id":2,"nama":"Tidak"}]}
            ]
            $scope.listGatal =[
            {"id":1,"nama":"Gatal-Gatal","no":"2)","detail":[{"id":1,"nama":"Ya "},{"id":2,"nama":"Tidak "}]}
            ]
            $scope.listKelainanKulit  =[
            {"id":1,"nama":"Kelainan Kulit","no":"3)","detail":[{"id":1,"nama":"Ya  "},{"id":2,"nama":"Tidak  "}]}
            ]
            $scope.listGizi  =[
            {"id":1,"nama":"Gunakan Formulir Pengkajian Klinik Gigi ","no":"4)"}
            ]
            $scope.listMataMerah   =[
            {"id":1,"nama":"Mata Merah","no":"5)","detail":[{"id":1,"nama":"Ya   "},{"id":2,"nama":"Tidak   "}]}
            ]
            $scope.listKotoranMata   =[
            {"id":1,"nama":"Banyak Kotoran Mata","no":"6)","detail":[{"id":1,"nama":"Ya    "},{"id":2,"nama":"Tidak    "}]}
            ]
            $scope.listPenglihatanMata  =[
            {"id":1,"nama":"Penglihatan Jelas ","no":"7)","detail":[{"id":1,"nama":"Ya     "},{"id":2,"nama":"Tidak     "}]}
            ]
            $scope.listKelainanBentuk =[
            {"id":1,"nama":"Kelainan Bentuk ","no":"8)","detail":[{"id":1,"nama":"Ya      "},{"id":2,"nama":"Tidak      "}]}
            ]
            $scope.listKejang  =[
            {"id":1,"nama":"Kejang  ","no":"9)","detail":[{"id":1,"nama":"Ya        "},{"id":2,"nama":"Tidak         "}]}
            ]
            $scope.listLumpuh   =[
            {"id":1,"nama":"Lumpuh  ","no":"10)","detail":[{"id":1,"nama":"Ya           "},{"id":2,"nama":"Tidak           "}]}
            ]
            $scope.listVertigo =[
            {"id":1,"nama":"Vertigo","no":"10)","detail":[{"id":1,"nama":"Ya             "},{"id":2,"nama":"Tidak             "}]}
            ]
            $scope.listPuttingLecet =[
            {"id":1,"nama":"Putting Lecet","no":"10)","detail":[{"id":1,"nama":"Ya               "},{"id":2,"nama":"Tidak               "}]}
            ]
            $scope.listPuttingDatar =[
            {"id":1,"nama":"Putting Datar ","no":"10)","detail":[{"id":1,"nama":"Ya                 "},{"id":2,"nama":"Tidak                 "}]}
            ]  
            $scope.listPayudaraBengkak =[
            {"id":1,"nama":"Payudara Bengkak ","no":"10)","detail":[{"id":1,"nama":"Ya                   "},{"id":2,"nama":"Tidak                  "}]}
            ]
            $scope.listPosisiBayi =[
            {"id":1,"nama":"Posisi Bayi ","no":"10)","detail":[{"id":1,"nama":"Salah"},{"id":2,"nama":"Benar"}]}
            ]
            $scope.listPerletakan  =[
            {"id":1,"nama":"Perletakan  ","no":"10)","detail":[{"id":1,"nama":"Tidak melekat sama sekali"},{"id":2,"nama":"Tidak melekat dengan baik"}, {"id":3,"nama":"Melekat Baik"}]}
            ]
            $scope.listMengisapEfektif =[{"id":1,"nama":"Mengisap Efektif","no":"10)","detail":[{"id":1,"nama":"Ya                       "},{"id":2,"nama":"Tidak                     "}]}
            ]
            $scope.listProduksiAsi =[
            {"id":1,"nama":"Produksi ASI","no":"10)","detail":[{"id":1,"nama":"Sedikit"},{"id":2,"nama":"Banyak"}]}
            ]
            $scope.listKelainanDimulut=[
            {"id":1,"nama":"Kelainan Di Mulut ","no":"10)","detail":[{"id":1,"nama":"Ya                        "},{"id":2,"nama":"Tidak                        "}]}
            ]
            $scope.listMimisan  =[
            {"id":1,"nama":"Mimisan ","no":"10)","detail":[{"id":1,"nama":"Ya                             "},{"id":2,"nama":"Tidak                                "}]}
            ]   
            $scope.listGangguanMenelan =[
            {"id":1,"nama":"Gangguan Menelan ","no":"10)","detail":[{"id":1,"nama":"Ya                                   "},{"id":2,"nama":"Tidak                                 "}]}
            ]
            $scope.listNyeriPadaTelinga  =[  
            {"id":1,"nama":"Nyeri Pada Telinga  ","no":"10)","detail":[{"id":1,"nama":"Ya                                        "},{"id":2,"nama":"Tidak                                          "}]}
            ]
            $scope.listMasalahPendengaran =[
            {"id":1,"nama":"Masalah Pendengaran ","no":"10)","detail":[{"id":1,"nama":"Ya                                           "},{"id":2,"nama":"Tidak                                               "}]}
            ]
            $scope.listTelingaCairan =[        
            {"id":1,"nama":"Telinga keluar cairan/nanah ","no":"10)","detail":[{"id":1,"nama":"Ya                                                   "},{"id":2,"nama":"Tidak                                                  "}]}
            ]
            $scope.listBenda  =[
            {"id":1,"nama":"Benda asing di telinga/hidung/tenggorokan ","no":"10)","detail":[{"id":1,"nama":"Ya                                                        "},{"id":2,"nama":"Tidak                                                    "}]}
            ]
            $scope.listCLP =[
            {"id":1,"nama":"Lihat formulir Klinik CLP ","no":"10)"}
            ]


            $scope.getdata = function(){
                var objectfk = "KLN";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function(e) {
                        $scope.dataResult = e.data.data;
                        if($scope.dataResult.length != 0){
                            for (var i = 0; i < $scope.dataResult.length; i++) {

                                if($scope.dataResult[i].objectfk == "KLN-000001"){
                                    $scope.noRecerawat = $scope.dataResult[i].norec
                                    $scope.item.jerawat = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000002"){
                                    $scope.noRecgatal = $scope.dataResult[i].norec
                                    $scope.item.gatal = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000003"){
                                    $scope.noReckelainanKulit = $scope.dataResult[i].norec
                                    $scope.item.kelainanKulit = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000004"){
                                    $scope.noRecmataMerah = $scope.dataResult[i].norec
                                    $scope.item.mataMerah = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000005"){
                                    $scope.noReckotoranMata = $scope.dataResult[i].norec
                                    $scope.item.kotoranMata = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000006"){
                                    $scope.noRecpenglihatanMata = $scope.dataResult[i].norec
                                    $scope.item.penglihatanMata = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000007"){
                                    $scope.noReckelaianBentuk = $scope.dataResult[i].norec
                                    $scope.item.kelaianBentuk = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000008"){
                                    $scope.noReckejang = $scope.dataResult[i].norec
                                    $scope.item.kejang = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000009"){
                                    $scope.noReclumpuh = $scope.dataResult[i].norec
                                    $scope.item.lumpuh = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000010"){
                                    $scope.noRecvertigo = $scope.dataResult[i].norec
                                    $scope.item.vertigo = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000011"){
                                    $scope.noRecputingLecet = $scope.dataResult[i].norec
                                    $scope.item.putingLecet = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000012"){
                                    $scope.noRecputingDatar = $scope.dataResult[i].norec
                                    $scope.item.putingDatar = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000013"){
                                    $scope.noRecpayudaraBengkak = $scope.dataResult[i].norec
                                    $scope.item.payudaraBengkak = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000014"){
                                    $scope.noRecposisiBayi = $scope.dataResult[i].norec
                                    $scope.item.posisiBayi = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000015"){
                                    $scope.noRecperletakan = $scope.dataResult[i].norec
                                    $scope.item.perletakan = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000016"){
                                    $scope.noRecmengisi = $scope.dataResult[i].norec
                                    $scope.item.mengisi = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000017"){
                                    $scope.noRecproduksiAsi = $scope.dataResult[i].norec
                                    $scope.item.produksiAsi = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000018"){
                                    $scope.noRecKelainanMulut = $scope.dataResult[i].norec
                                    $scope.item.KelainanMulut = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000019"){
                                    $scope.noRecmimisan = $scope.dataResult[i].norec
                                    $scope.item.mimisan = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000020"){
                                    $scope.noRecgangguanMenelan = $scope.dataResult[i].norec
                                    $scope.item.gangguanMenelan = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000021"){
                                    $scope.noRecnyeriTelinga = $scope.dataResult[i].norec
                                    $scope.item.nyeriTelinga = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000022"){
                                    $scope.noRecmasalahPendengaran = $scope.dataResult[i].norec
                                    $scope.item.masalahPendengaran = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000023"){
                                    $scope.noRectelingaCairan = $scope.dataResult[i].norec
                                    $scope.item.telingaCairan = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000024"){
                                    $scope.noRecbenda = $scope.dataResult[i].norec
                                    $scope.item.benda = $scope.dataResult[i].nilai;
                                } 
                                
                                if($scope.dataResult[i].objectfk == "KLN-000025"){
                                    $scope.norecKetKulit = $scope.dataResult[i].norec
                                    $scope.item.ketKulit = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000026"){
                                    $scope.noRecketMata = $scope.dataResult[i].norec
                                    $scope.item.ketMata = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000027"){
                                    $scope.noRecketNeurologi = $scope.dataResult[i].norec
                                    $scope.item.ketNeurologi = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000028"){
                                    $scope.noRecketLaktasi = $scope.dataResult[i].norec
                                    $scope.item.ketLaktasi = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KLN-000029"){
                                    $scope.noRecketTHT = $scope.dataResult[i].norec
                                    $scope.item.ketTHT = $scope.dataResult[i].nilai;
                                } 
                                // if($scope.dataResult[i].objectfk == "KLN-000030"){
                                //     $scope.noRecketCLP = $scope.dataResult[i].norec
                                //     $scope.item.ketCLP = $scope.dataResult[i].nilai;
                                // } 

                            }
                        }
                    })
}
$scope.getdata();


$scope.Save = function(){
   var tempData = []
   if($scope.item.jerawat !== undefined){
    var tmpStatus = {
        norec: $scope.noRecerawat,
        objectfk: "KLN-000001",
        nilai: $scope.item.jerawat.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.gatal !== undefined){
    var tmpStatus = {
        norec: $scope.noRecgatal,
        objectfk: "KLN-000002",
        nilai: $scope.item.gatal.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kelainanKulit !== undefined){
    var tmpStatus = {
        norec: $scope.noReckelainanKulit,
        objectfk: "KLN-000003",
        nilai: $scope.item.kelainanKulit.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.mataMerah !== undefined){
    var tmpStatus = {
        norec: $scope.noRecmataMerah,
        objectfk: "KLN-000004",
        nilai: $scope.item.mataMerah.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kotoranMata !== undefined){
    var tmpStatus = {
        norec: $scope.noReckotoranMata,
        objectfk: "KLN-000005",
        nilai: $scope.item.kotoranMata.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.penglihatanMata !== undefined){
    var tmpStatus = {
        norec: $scope.noRecpenglihatanMata,
        objectfk: "KLN-000006",
        nilai: $scope.item.penglihatanMata.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kelaianBentuk !== undefined){
    var tmpStatus = {
        norec: $scope.noReckelaianBentuk,
        objectfk: "KLN-000007",
        nilai: $scope.item.kelaianBentuk.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.kejang !== undefined){
    var tmpStatus = {
        norec: $scope.noReckejang,
        objectfk: "KLN-000008",
        nilai: $scope.item.kejang.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.lumpuh !== undefined){
    var tmpStatus = {
        norec: $scope.noReclumpuh,
        objectfk: "KLN-000009",
        nilai: $scope.item.lumpuh.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.vertigo !== undefined){
    var tmpStatus = {
        norec: $scope.noRecvertigo,
        objectfk: "KLN-000010",
        nilai: $scope.item.vertigo.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.putingLecet !== undefined){
    var tmpStatus = {
        norec: $scope.noRecputingLecet,
        objectfk: "KLN-000011",
        nilai: $scope.item.putingLecet.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.putingDatar !== undefined){
    var tmpStatus = {
        norec: $scope.noRecputingDatar,
        objectfk: "KLN-000012",
        nilai: $scope.item.putingDatar.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.payudaraBengkak !== undefined){
    var tmpStatus = {
        norec: $scope.noRecpayudaraBengkak,
        objectfk: "KLN-000013",
        nilai: $scope.item.payudaraBengkak.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.posisiBayi !== undefined){
    var tmpStatus = {
        norec: $scope.noRecposisiBayi,
        objectfk: "KLN-000014",
        nilai: $scope.item.posisiBayi.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.perletakan !== undefined){
    var tmpStatus = {
        norec: $scope.noRecperletakan,
        objectfk: "KLN-000015",
        nilai: $scope.item.perletakan.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.mengisi !== undefined){
    var tmpStatus = {
        norec: $scope.noRecmengisi,
        objectfk: "KLN-000016",
        nilai: $scope.item.mengisi.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.produksiAsi !== undefined){
    var tmpStatus = {
        norec: $scope.noRecproduksiAsi,
        objectfk: "KLN-000017",
        nilai: $scope.item.produksiAsi.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.KelainanMulut !== undefined){
    var tmpStatus = {
        norec: $scope.noRecKelainanMulut,
        objectfk: "KLN-000018",
        nilai: $scope.item.KelainanMulut.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.mimisan !== undefined){
    var tmpStatus = {
        norec: $scope.noRecmimisan,
        objectfk: "KLN-000019",
        nilai: $scope.item.mimisan.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
if($scope.item.gangguanMenelan !== undefined){
    var tmpStatus = {
        norec: $scope.noRecgangguanMenelan,
        objectfk: "KLN-000020",
        nilai: $scope.item.gangguanMenelan.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}

if($scope.item.nyeriTelinga !== undefined){
    var tmpStatus = {
        norec: $scope.noRecnyeriTelinga,
        objectfk: "KLN-000021",
        nilai: $scope.item.nyeriTelinga.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}

if($scope.item.masalahPendengaran !== undefined){
    var tmpStatus = {
        norec: $scope.noRecmasalahPendengaran,
        objectfk: "KLN-000022",
        nilai: $scope.item.masalahPendengaran.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}

if($scope.item.telingaCairan !== undefined){
    var tmpStatus = {
        norec: $scope.noRectelingaCairan,
        objectfk: "KLN-000023",
        nilai: $scope.item.telingaCairan.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}

if($scope.item.benda !== undefined){
    var tmpStatus = {
        norec: $scope.noRecbenda,
        objectfk: "KLN-000024",
        nilai: $scope.item.benda.toString(),
        satuan: "-",
        jenisobject : "radio button"
    }
    tempData.push(tmpStatus);
}
//*** */
if($scope.item.ketKulit !== undefined){
    var tmpStatus = {
        norec: $scope.norecKetKulit,
        objectfk: "KLN-000025",
        nilai: $scope.item.ketKulit,
        satuan: "-",
        jenisobject : "textarea"
    }
    tempData.push(tmpStatus);
}

if($scope.item.ketMata !== undefined){
    var tmpStatus = {
        norec: $scope.noRecketMata,
        objectfk: "KLN-000026",
        nilai: $scope.item.ketMata,
        satuan: "-",
        jenisobject : "textarea"
    }
    tempData.push(tmpStatus);
}

if($scope.item.ketNeurologi !== undefined){
    var tmpStatus = {
        norec: $scope.noRecketNeurologi,
        objectfk: "KLN-000027",
        nilai: $scope.item.ketNeurologi,
        satuan: "-",
        jenisobject : "textarea"
    }
    tempData.push(tmpStatus);
}

if($scope.item.ketLaktasi !== undefined){
    var tmpStatus = {
        norec: $scope.noRecketLaktasi,
        objectfk: "KLN-000028",
        nilai: $scope.item.ketLaktasi,
        satuan: "-",
        jenisobject : "textarea"
    }
    tempData.push(tmpStatus);
}

if($scope.item.ketTHT !== undefined){
    var tmpStatus = {
        norec: $scope.noRecketTHT,
        objectfk: "KLN-000029",
        nilai: $scope.item.ketTHT,
        satuan: "-",
        jenisobject : "textarea"
    }
    tempData.push(tmpStatus);
}

// if($scope.item.ketCLP !== undefined){
//     var tmpStatus = {
//         norec: $scope.noRecketCLP,
//         objectfk: "KLN-000030",
//         nilai: $scope.item.ketCLP,
//         satuan: "-",
//         jenisobject : "textarea"
//     }
//     tempData.push(tmpStatus);
// }

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
    $scope.currentStatus=[];  
    $scope.getdata();
});
}
}

]);
});