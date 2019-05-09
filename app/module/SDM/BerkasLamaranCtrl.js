define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BerkasLamaranCtrl', ['FindSdm', 'ManageSdm', 'DateHelper', '$rootScope', '$scope', 'ModelItem', '$state',
        function(findSdm, ManageSdm, dateHelper, $rootScope, $scope, ModelItem, $state) {
            //adi 05-jun-17 cuma ngasih comment
            // disini dapet noRec nya dari daftar pelamar, lalu di cek
            if ($state.params.noRec !== "") {
                //rubah data string yang didapat tadi ke object lagi simpan di item
                $scope.item = JSON.parse($state.params.noRec);
            } else
                $scope.item = data;
                

            $scope.now = new Date();
            $scope.dataVOloaded = true;
            //adi 05-jun-17 ini jadi di comment
            // $scope.item.tahunMasuk = new Date().getFullYear();
            // $scope.item.bulanMasuk = dateHelper.toMonth(new Date().getMonth());
            $scope.no = 1;

            // ModelItem.getDataDummyGeneric("PersyaratanPelamar", false).then(function(data) {
            //     $scope.listPersyaratanPelamar = data;
            //     ModelItem.getDataDummyGeneric("StatusPelamar", true).then(function(data) {
            //         $scope.ListStatusPns = data;
            //         findSdm.getBerkasPelamar($scope.item.noRec).then(function(e) {
            //             if (e.data.data === null) return;
            //             $scope.item.statusPelamar = e.data.data.berkas.statusPelamar;
            //             $scope.noRec = e.data.data.berkas.noRec;
            //             //adi tgl 05-jun-17, ganti jadi isLulus hasilnya
            //             // $scope.item.isLulus = e.data.data.berkas.isLulus === true ? 1 : 0;
            //             var arr = [];
            //             for (var key in e.data.data.detail) {
            //                 if (e.data.data.detail.hasOwnProperty(key)) {
            //                     var element = e.data.data.detail[key];
            //                     element.syarat.value = element.status === 'true';
            //                     element.syarat.noRec = element.noRec;
            //                     arr.push(element.syarat);
            //                 }
            //             }
            //             if (arr.length !== 0)
            //                 $scope.listPersyaratanPelamar = _.sortBy(arr, function(e) {
            //                     return e.id;
            //                 });
            //         });
            //     })

            //     // debugger;

            // })
            
            //tgl 11-jul-17
            $scope.item.isLulus = $scope.item.isLulus === true ? 1 : 0 ;



            $scope.dataLaporanUjiHasil = new kendo.data.DataSource({
                data: []
            });




            $scope.$watch('item.statusPelamar', function(e) {
                if (e === undefined) return;
                if (e.name.indexOf('PNS') === 0) {
                    $scope.daftarBerkasLamaran = $scope.listPersyaratanPelamar;
                } else {
                    $scope.daftarBerkasLamaran = _.filter($scope.listPersyaratanPelamar, function(e) {
                        return !(e.id >= 4 && e.id <= 9);
                    });
                }
            });


            $scope.ListStatusPns = [];



            $scope.daftarBerkasLamaran = [];



            // $scope.Save = function() {
            //     var model = {};
            //     model.details = [];
            //     for (var key in $scope.daftarBerkasLamaran) {
            //         if ($scope.daftarBerkasLamaran.hasOwnProperty(key)) {
            //             var element = $scope.daftarBerkasLamaran[key];
            //             if (element.id !== undefined)
            //                 model.details.push({
            //                     syarat: element,
            //                     noRec: element.noRec,
            //                     status: element.value === undefined ? false : element.value
            //                 });
            //         }
            //     }
            //     model.namaPelamar = {
            //         noRec: $scope.item.noRec
            //     }
            //     model.noRec = $scope.noRec;
            //     //adi tgl 05-jun-17, nanti ganti disini
            //     model.hasil = $scope.item.hasil === "Lolos";
            //     model.statusPelamar = $scope.item.statusPelamar;
            //     manageSdm.saveBerkasLamaran(ModelItem.beforePost(model)).then(function(e) {
            //     });
            // }


            //adi menambahkan option untuk kendodatepicker, ga jadi pake ini
            //   $scope.monthSelectorOptions = {
            //     start: "year",
            //     depth: "year"
            // };

            //adi menambahkan data dummy untuk cekbox
            //menambahkan combo dummy data jenis
            //nantinya ini pake data dari backend
            // $scope.listKeterangan = [
            //     {
            //         "id":1,
            //         "kode":"1",
            //         "keterangan":"KTP"
            //     }, 
            //     {
            //         "id":2,
            //         "kode":"2",
            //         "keterangan":"Fotocopy Ijazah"
            //     },
            //     {
            //         "id":3,
            //         "kode":"3", 
            //         "keterangan":"Pas Foto 3x4"
            //     },
            //     {
            //         "id":4,
            //         "kode":"4",
            //         "keterangan":"SKCK"
            //     },
            //     {
            //         "id":5,
            //         "kode":"5",
            //         "keterangan":"STR"
            //     },
            //     {
            //         "id":6,
            //         "kode":"6",
            //         "keterangan":"SIP"
            //     },
            //     {
            //         "id":7,
            //         "kode":"7",
            //         "keterangan":"CV"
            //     },
            //     {
            //         "id":8,
            //         "kode":"8",
            //         "keterangan":"Portfolio"
            //     }
            // ];


            //tgl 14-jul-17
            $scope.$watch('item.kategoryPegawai', function(newValue, oldValue){
                //debugger;
                if(newValue != undefined){
                    var kdid=""
                    if ($scope.item.kategoryPegawai != undefined){
                        kdid="kdid="+$scope.item.kategoryPegawai.id
                    }
                    ManageSdm.getItem("rekrutmen/get-pns-nonpns?"+kdid, true).then(function(dat) {
                        $scope.listStatusPns=dat.data.data;
                    });
                }
            });

            //adi tambah fungsi ambil ListStatusPns untuk combobox 2-jun-17
            ManageSdm.getOrderList("rekrutmen/get-pns-nonpns", true).then(function (dat) {
                //debugger;
                $scope.listStatusPns = dat.data.data;
                
            });

            //adi getAllDaftarPelamar
            // manageSdm.getOrderList("rekrutmen/get-all-daftar-pelamar", true).then(function (dat) {
            //     $scope.listStatusPns = dat.data;
            //     //debugger;
            // });

            //coba parse string dari object ke object date //tetep belum bisa
            //$scope.item.periode = kendo.parseDate($scope.item.periode);


            //tgl 12-jul-17
            var initPns = function(){
                ManageSdm.getOrderList("rekrutmen/get-dokumen-pns", true).then(function (dat) {
                    //debugger;
                    $scope.listPns = dat.data.data;
                
                });
            }


            var initNonPns = function(){
                ManageSdm.getOrderList("rekrutmen/get-dokumen-nonpns", true).then(function (dat) {
                    //debugger;
                    $scope.listNonPns = dat.data.data;
                
                });
            }
            
            


            //debugger;
            

            //tgl 06-jun-17 tambahan fungsi untuk combo muncul berkas /saat on change combo
            $scope.dapatBerkas = function () {
               debugger;

                if ($scope.item.kategoryPegawai.kategoryPegawai === 'PNS' ) {
                    initPns();
                    $scope.a = true;
                    $scope.b = false;
                    //$scope.item.idK = $scope.item.kategoryPegawai.id;
                    
                } else {
                    //ini yang non pns
                    initNonPns();
                    $scope.a = false;
                    $scope.b = true;
                    // $scope.item.idK = $scope.item.kategoryPegawai.id;
                    
                }

                //tgl 07-jun-17 bikin fungsi untuk ngeload data dari ManageSdm saat on change dimulai
                //getManageSdm();

                
            };  

           

            //tgl 07-jun-17
            // function getManageSdm(){

            //     //tgl 05-jun-17
            //     //debugger;
            //     var posisiLamarId = $scope.item.posisiLamarId;
            //     var idKategory = $scope.item.idK;

            //     if( idKategory == undefined){
            //         idKategory = "";
            //     }


            //     ManageSdm.getOrderList("rekrutmen/get-berkas-lamaran?kategoryPegawaiId="+idKategory+"&jabatanId="+posisiLamarId, true).then(function (dat) {
            //         $scope.listBerkasLamaran = dat.data.data;
            //     });

            // }



            // //tgl 06-jun-17 masih belum work
            // $scope.selectBerkas = function(){
            //     // $scope.item.kategoryPegawai = $scope.item.kategoryPegawai;
            //     // $scope.item.id = $scope.item.kategoryPegawai.id;  
            // }

// debugger;
            //tgl 12-jul-17
            $scope.arrPns = [];
            $scope.arrNonPns = [];
            $scope.arrAll = [];
            
            $scope.cekArrPns= function (data) {
                debugger;

                var isExist = _.find($scope.arrPns, function (dataExist) {
                   return dataExist == data.id;
                });
                if (isExist == undefined) {
                    $scope.arrPns.push(data.id);
                } else{
                     $scope.arrPns = _.without($scope.arrPns, data.id);
                }
                $scope.arrAll = $scope.arrPns;
            };


            $scope.cekArrNon= function(data1){
                debugger;

                var isEx = _.find($scope.arrNonPns, function(dataE){
                    return dataE == data1.id
                });
                if(isEx == undefined){
                    $scope.arrNonPns.push(data1.id);
                }else{
                    $scope.arrNonPns = _.without($scope.arrNonPns, data1.id);
                }
                $scope.arrAll = $scope.arrNonPns;
            };



            //untuk pas simpan berdasar data pns atau non pns beda
             // if ($scope.item.kategoryPegawai.kategoryPegawai === 'PNS' ) {
             //    $scope.arrAll = $scope.arrPns;
             // }else{
             //    $scope.arrAll = $scope.arrNonPns;
             // }



        //tgl 06-jun-17
        //membuat save data diberkas lamaran
        $scope.Save1 = function() {  

            debugger;

                //untuk pengecekan kalo data kosong
                if ($scope.item.periode === undefined || $scope.item.namaPelamar === undefined || $scope.item.degree === undefined || $scope.item.jurusan === undefined ||  $scope.item.nilai === undefined || $scope.item.kategoryPegawai.kategoryPegawai === undefined || $scope.item.isLulus === undefined || $scope.item.kategoryPegawai.id === undefined){
                    toastr.warning("Data tidak tersedia untuk disimpan");
                }


                
    
                var dataBerkasSave = {
                    "pelamarId" :$scope.item.pelamarId,
                    "namaPelamar" :$scope.item.namaPelamar,
                    "universitas" :$scope.item.universitas,
                    "degree" :$scope.item.degree,
                    "jurusan":$scope.item.jurusan,
                    "nilai":$scope.item.nilai,
                    "qtyPeserta":$scope.item.qtyPeserta,
                    "posisiLamarId":$scope.item.posisiLamarId,
                    "posisiLamar":$scope.item.posisiLamar,
                    "kategoriLamarId":$scope.item.kategoryPegawai.id,
                    "kategoriLamar":$scope.item.kategoryPegawai.kategoryPegawai,
                    "nilaiScore":"",
                    "periode":$scope.item.periode,
                    "periodeLamar":moment($scope.item.periode).format("MM-YYYY"),
                    "isLulus":$scope.item.isLulus,
                    "dokumenKirimIds":$scope.arrAll

                }           
    
                
             ManageSdm.saveTerimaBerkasLamaran(dataBerkasSave,"rekrutmen/save-terima-berkas-lamaran").then(function (e) {
                 // debugger;
             // $scope.item= {};
                  // init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


             //debugger;
            };

            // $scope.arrDat = [];
            // $scope.cekClick = function(data){
            //     var isAda = _.find($scope.arrDat, function (dataExist){
            //         return dataExist == data;
            //     });
            //     if(isAda == undefined){
            //         $scope.arrDat.push(dat);
            //     } else {
            //         $scope.arrDat = _.without($scope.arrDat, data);
            //     }
            //     debugger;
            // };






             

        }
    ]);
});