
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PengkajianMedisDokterCtrl', ['$timeout','$q','$rootScope', '$scope', 'ModelItem', 'DateHelper','FindPasien', '$state','ManagePasien','$mdDialog',
        function($timeout,$q,$rootScope, $scope, ModelItem, DateHelper, findPasien, $state, ManagePasien,$mdDialog) {
            //test();
            $scope.dataVOloaded = true;
            $scope.listPersepsiSehat = [{id:1,"name":"jajaj "}]
            $scope.statusnormal = {};
            debugger;

            // get data from suster
            findPasien.getDataFromSuster($state.params.noRec).then(function(e) {
                debugger;
                $scope.statusnormal = e.data.data.kebutuhanDasar
            })

            // validasi tombol perview
            /*if ($scope.statusnormal.isNormalOksigenasi == false) {
                $scope.isKet = true;
                $scope.warnatombol = "background-color:#FA2121;font-weightpx; font-size:18px; color:white;"
            }
            else if ($scope.statusnormal.isNormalOksigenasi == true) {
                $scope.warnatombol = "background-color:#358EFF;font-weightpx; font-size:18px; color:white;"
            }*/

            
                $q.all([ModelItem.getDataDummyGeneric("OksigenasiPolaNafas", false),
                    ModelItem.getDataDummyGeneric("OksigenasiBatuk", false),
                    ModelItem.getDataDummyGeneric("OksigenasiSianosis", false),
                    ModelItem.getDataDummyGeneric("CairanNadi", false),
                    ModelItem.getDataDummyGeneric("CairanUbunUbun", false),
                    ModelItem.getDataDummyGeneric("CairanTurgorKulit", false),
                    ModelItem.getDataDummyGeneric("CairanCrt", false),
                    ModelItem.getDataDummyGeneric("CairanEdema", false),
                    ModelItem.getDataDummyGeneric("CairanAkral", false),
                    ModelItem.getDataDummyGeneric("NeurologiKomponen", false),
                    ModelItem.getDataDummyGeneric("NeurologiKejang", false),
                    ModelItem.getDataDummyGeneric("NutrisiMukosa", false),
                    ModelItem.getDataDummyGeneric("NutrisiStomatitis", false),
                    ModelItem.getDataDummyGeneric("NutrisiMuntah", false),
                    ModelItem.getDataDummyGeneric("NutrisiMual", false),
                    ModelItem.getDataDummyGeneric("DefeaksiAnus", false),
                    ModelItem.getDataDummyGeneric("DefeaksiBab", false),
                    ModelItem.getDataDummyGeneric("DefeaksiFeses", false),
                    ModelItem.getDataDummyGeneric("UrinBak", false),
                    ModelItem.getDataDummyGeneric("UrinAlatGenitalia", false),
                    ModelItem.getDataDummyGeneric("IntegumenWarna", false),
                    ModelItem.getDataDummyGeneric("IntegumenKelainanKulit", false),
                    ModelItem.getDataDummyGeneric("IntegumenKulit", false),
                    ModelItem.getDataDummyGeneric("AnakAktif", false),
                    ModelItem.getDataDummyGeneric("AnakLelah", false),
                    ModelItem.getDataDummyGeneric("KognisiPenglihatan", false),
                    ModelItem.getDataDummyGeneric("KognisiPendengaran", false),
                    ModelItem.getDataDummyGeneric("KognisiDayaIngat", false),
                    ModelItem.getDataDummyGeneric("StatusLamaTidur", false),
                    ModelItem.getDataDummyGeneric("KonsepDiriGambaran", false),
                    ModelItem.getDataDummyGeneric("PeranMasalah", false),
                    ModelItem.getDataDummyGeneric("PeranPengaruhPenyakit", false),
                    ModelItem.getDataDummyGeneric("KopingEfektif", false),
                    ModelItem.getDataDummyGeneric("NilaiPertolongan", false),
                    ModelItem.getDataDummyGeneric("NilaiHarapan", false),
                    ModelItem.getDataDummyGeneric("PersepsiSehat", false),
                    ModelItem.getDataDummyGeneric("PersepsiPenyakit", false),
                    ModelItem.getDataDummyGeneric("PersepsiKegiatan", false)
                ]).then(function(data) {
                    debugger;

                    if (data[0].statResponse) {
                        $scope.listOksigenasiPolaNafas = data[0];

                    }
                    if (data[1].statResponse) {
                        $scope.listOksigenasiBatuk = data[1];
                    }
                    if (data[2].statResponse) {
                        $scope.listOksigenasiSianosis = data[2];
                    }
                    if (data[3].statResponse) {
                        $scope.listCairanNadi = data[3];
                    }
                    if (data[4].statResponse) {
                        $scope.listCairanUbunUbun = data[4];
                    }
                    if (data[5].statResponse) {
                        $scope.listCairanTurgorKulit = data[5];
                    }
                    if (data[6].statResponse) {
                        $scope.listCairanCrt = data[6];
                    }
                    if (data[7].statResponse) {
                        $scope.listCairanEdema = data[7];
                    }
                    if (data[8].statResponse) {
                        $scope.listCairanAkral = data[8];
                    }
                    if (data[9].statResponse) {
                        $scope.listNeurologiKomponen = data[9];
                    }
                    if (data[10].statResponse) {
                        $scope.listNeurologiKejang = data[10];
                    }
                    if (data[11].statResponse) {
                        $scope.listNutrisiMukosa = data[11];
                    }
                    if (data[12].statResponse) {
                        $scope.listNutrisiStomatitis = data[12];
                    }
                    if (data[13].statResponse) {
                        $scope.listNutrisiMuntah = data[13];
                    }
                    if (data[14].statResponse) {
                        $scope.listNutrisiMual = data[14];
                    }
                    if (data[15].statResponse) {
                        $scope.listDefeaksiAnus = data[15];
                    }
                    if (data[16].statResponse) {
                        $scope.listDefeaksiBab = data[16];
                    }
                    if (data[17].statResponse) {
                        debugger;
                        $scope.listDefeaksiFeses = data[17];
                    }
                    if (data[18].statResponse) {
                        $scope.listUrinBak = data[18];
                    }
                    if (data[19].statResponse) {
                        $scope.listUrinAlatGenitalia = data[19];
                    }
                    if (data[20].statResponse) {
                        $scope.listIntegumenWarna = data[20];
                    }
                    if (data[21].statResponse) {
                        $scope.listIntegumenKelainanKulit = data[21];
                    }
                    if (data[22].statResponse) {
                        $scope.listIntegumenKulit = data[22];
                    }
                    if (data[23].statResponse) {
                        $scope.listAnakAktif = data[23];
                    }
                    if (data[24].statResponse) {
                        $scope.listAnakLelah = data[24];
                    }
                    if (data[25].statResponse) {
                        $scope.listKognisiPenglihatan = data[25];
                    }
                    if (data[26].statResponse) {
                        $scope.listKognisiPendengaran = data[26];
                    }
                    if (data[27].statResponse) {
                        $scope.listKognisiDayaIngat = data[27];
                    }
                    if (data[28].statResponse) {
                        $scope.listStatusLamaTidur = data[28];
                    }
                    if (data[29].statResponse) {
                        $scope.listKonsepDiriGambaran = data[29];
                    }
                    if (data[30].statResponse) {
                        $scope.listPeranMasalah = data[30];
                    }
                    if (data[31].statResponse) {
                        $scope.listPeranPengaruhPenyakit = data[31];
                    }
                    if (data[32].statResponse) {
                        $scope.listKopingEfektif = data[32];
                    }
                    if (data[33].statResponse) {
                        $scope.listNilaiPertolongan = data[33];
                    }
                    if (data[34].statResponse) {
                        $scope.listNilaiHarapan = data[34];
                    }
                    if (data[35].statResponse) {
                        $scope.listPersepsiSehat_a = data[35];
                    }
                    if (data[36].statResponse) {
                        $scope.listPersepsiPenyakit = data[36];
                    }
                    if (data[37].statResponse) {
                        $scope.listPersepsiKegiatan = data[37];
                    }})
            
            $q.all([ModelItem.getDataDummyGeneric("FisisKulit", false),
                ModelItem.getDataDummyGeneric("FisisKepala", false),
                ModelItem.getDataDummyGeneric("FisisMata", false),
                ModelItem.getDataDummyGeneric("StatusNormalTidakNormal", false),
                ModelItem.getDataDummyGeneric("FisisLeher", false),
                ModelItem.getDataDummyGeneric("FisisThorax", false),
                ModelItem.getDataDummyGeneric("FisisParu", false),
                ModelItem.getDataDummyGeneric("FisisAbdomen", false),
                ModelItem.getDataDummyGeneric("FisisEkstremitas", false),
                ModelItem.getDataDummyGeneric("StatusNormalTidakNormal", false),
                ModelItem.getDataDummyGeneric("FisisNeurologi", false)
                
            ]).then(function(data) {
                debugger;

                if (data[0].statResponse) {
                    $scope.listFisisKulit = data[0];

                }
                if (data[1].statResponse) {
                    $scope.listFisisKepala = data[1];
                }
                if (data[2].statResponse) {
                    $scope.listFisisMata = data[2];
                }
                if (data[3].statResponse) {
                    $scope.listStatusNormalTidakNormal = data[3];
                }
                if (data[4].statResponse) {
                    $scope.listFisisLeher = data[4];
                }
                if (data[5].statResponse) {
                    $scope.listFisisThorax = data[5];
                }
                if (data[6].statResponse) {
                    $scope.listFisisParu = data[6];
                }
                if (data[7].statResponse) {
                    $scope.listFisisAbdomen = data[7];
                }
                if (data[8].statResponse) {
                    $scope.listFisisEkstremitas = data[8];
                }
                if (data[9].statResponse) {
                    $scope.listFisisEkstremitas = data[9];
                }
                if (data[10].statResponse) {
                    $scope.listFisisNeurologi = data[10];

                }

                $timeout(function()
                {
                    $scope.item.kulit=$scope.listFisisKulit[0];
                    $scope.item.kepala =$scope.listFisisKepala[0];
                    $scope.item.mata =$scope.listFisisMata[0];
                    $scope.item.tht =$scope.listStatusNormalTidakNormal[0];
                    $scope.item.leher =$scope.listFisisLeher[0];
                    $scope.item.thorax =$scope.listFisisThorax[0];
                    $scope.item.jantung =$scope.listStatusNormalTidakNormal[0];
                    $scope.item.paru =$scope.listFisisParu[0];
                    $scope.item.abdomen =$scope.listFisisAbdomen[0];
                    $scope.item.ektremitas =$scope.listFisisEkstremitas[0];
                    $scope.item.genitalia =$scope.listStatusNormalTidakNormal[0];
                    $scope.item.neurologi=$scope.listFisisNeurologi[0];
                })

            });
            $scope.listNeurologi = [{id:1,name:"compos mentis"},{id:2,name:"Gangguan Kesadaran"},{id:3,name:"Kelainan Neurologi"}]
            $scope.isNeurologi = false;
            $scope.$watch('item.Neurologi', function(kulit) {
                if (kulit != undefined) {
                    if (kulit.id == 3) {
                        $scope.isNeurologi = true;
                    } else {
                        $scope.isNeurologi = false;
                    }
                }
            });
            $scope.isKulit = false;
            $scope.$watch('item.kulit', function(kulit) {
                if (kulit != undefined) {
                    if (kulit.id == 3) {
                        $scope.isKulit = true;
                    } else {
                        $scope.isKulit = false;
                    }
                }
            });

            $scope.isKepala = false;
            $scope.$watch('item.kepala', function(kepala) {
                if (kepala != undefined) {
                    if (kepala.id == 4) {
                        $scope.isKepala = true;
                    } else {
                        $scope.isKepala = false;
                    }
                }
            });

            $scope.isMata = false;
            $scope.$watch('item.mata', function(mata) {
                if (mata != undefined) {
                    if (mata.id == 5) {
                        $scope.isMata = true;
                    } else {
                        $scope.isMata = false;
                    }
                }
            });

            $scope.isLeher = false;
            $scope.$watch('item.leher', function(leher) {
                if (leher != undefined) {
                    if (leher.id == 4) {
                        $scope.isLeher = true;
                    } else {
                        $scope.isLeher = false;
                    }
                }
            });

            $scope.isAbdomen = false;
            $scope.$watch('item.abdomen', function(paru) {
                if (paru != undefined) {
                    if (paru.id == 6) {
                        $scope.isAbdomen = true;
                    } else {
                        $scope.isAbdomen = false;
                    }
                }
            });

            $scope.isParu = false;
            $scope.$watch('item.paru', function(paru) {
                if (paru != undefined) {
                    if (paru.id == 4) {
                        $scope.isParu = true;
                    } else {
                        $scope.isParu = false;
                    }
                }
            });

            $scope.isEkstremitas = false;
            $scope.$watch('item.ektremitas', function(paru) {
                if (paru != undefined) {
                    if (paru.id == 5) {
                        $scope.isEkstremitas = true;
                    } else {
                        $scope.isEkstremitas = false;
                    }
                }
            });
            function test() {
            }
            ///////////////////////////////////////////////////////////////////////////////////////////
            $q.all([ModelItem.getDataDummyGeneric("OksigenasiPolaNafas", false),
                ModelItem.getDataDummyGeneric("OksigenasiBatuk", false),
                ModelItem.getDataDummyGeneric("OksigenasiSianosis", false),
                ModelItem.getDataDummyGeneric("CairanNadi", false),
                ModelItem.getDataDummyGeneric("CairanUbunUbun", false),
                ModelItem.getDataDummyGeneric("CairanTurgorKulit", false),
                ModelItem.getDataDummyGeneric("CairanCrt", false),
                ModelItem.getDataDummyGeneric("CairanEdema", false),
                ModelItem.getDataDummyGeneric("CairanAkral", false),
                ModelItem.getDataDummyGeneric("NeurologiKomponen", false),
                ModelItem.getDataDummyGeneric("NeurologiKejang", false),
                ModelItem.getDataDummyGeneric("NutrisiMukosa", false),
                ModelItem.getDataDummyGeneric("NutrisiStomatitis", false),
                ModelItem.getDataDummyGeneric("NutrisiMuntah", false),
                ModelItem.getDataDummyGeneric("NutrisiMual", false),
                ModelItem.getDataDummyGeneric("DefeaksiAnus", false),
                ModelItem.getDataDummyGeneric("DefeaksiBab", false),
                ModelItem.getDataDummyGeneric("DefeaksiFeses", false),
                ModelItem.getDataDummyGeneric("UrinBak", false),
                ModelItem.getDataDummyGeneric("UrinAlatGenitalia", false),
                ModelItem.getDataDummyGeneric("IntegumenWarna", false),
                ModelItem.getDataDummyGeneric("IntegumenKelainanKulit", false),
                ModelItem.getDataDummyGeneric("IntegumenKulit", false),
                ModelItem.getDataDummyGeneric("AnakAktif", false),
                ModelItem.getDataDummyGeneric("AnakLelah", false),
                ModelItem.getDataDummyGeneric("KognisiPenglihatan", false),
                ModelItem.getDataDummyGeneric("KognisiPendengaran", false),
                ModelItem.getDataDummyGeneric("KognisiDayaIngat", false),
                ModelItem.getDataDummyGeneric("StatusLamaTidur", false),
                ModelItem.getDataDummyGeneric("KonsepDiriGambaran", false),
                ModelItem.getDataDummyGeneric("PeranMasalah", false),
                ModelItem.getDataDummyGeneric("PeranPengaruhPenyakit", false),
                ModelItem.getDataDummyGeneric("KopingEfektif", false),
                ModelItem.getDataDummyGeneric("NilaiPertolongan", false),
                ModelItem.getDataDummyGeneric("NilaiHarapan", false),
                ModelItem.getDataDummyGeneric("PersepsiSehat", false),
                ModelItem.getDataDummyGeneric("PersepsiPenyakit", false),
                ModelItem.getDataDummyGeneric("PersepsiKegiatan", false)
            ]).then(function(data) {
                debugger;

                if (data[0].statResponse) {
                    $scope.listOksigenasiPolaNafas = data[0];

                }
                if (data[1].statResponse) {
                    $scope.listOksigenasiBatuk = data[1];
                }
                if (data[2].statResponse) {
                    $scope.listOksigenasiSianosis = data[2];
                }
                if (data[3].statResponse) {
                    $scope.listCairanNadi = data[3];
                }
                if (data[4].statResponse) {
                    $scope.listCairanUbunUbun = data[4];
                }
                if (data[5].statResponse) {
                    $scope.listCairanTurgorKulit = data[5];
                }
                if (data[6].statResponse) {
                    $scope.listCairanCrt = data[6];
                }
                if (data[7].statResponse) {
                    $scope.listCairanEdema = data[7];
                }
                if (data[8].statResponse) {
                    $scope.listCairanAkral = data[8];
                }
                if (data[9].statResponse) {
                    $scope.listNeurologiKomponen = data[9];
                }
                if (data[10].statResponse) {
                    $scope.listNeurologiKejang = data[10];
                }
                if (data[11].statResponse) {
                    $scope.listNutrisiMukosa = data[11];
                }
                if (data[12].statResponse) {
                    $scope.listNutrisiStomatitis = data[12];
                }
                if (data[13].statResponse) {
                    $scope.listNutrisiMuntah = data[13];
                }
                if (data[14].statResponse) {
                    $scope.listNutrisiMual = data[14];
                }
                if (data[15].statResponse) {
                    $scope.listDefeaksiAnus = data[15];
                }
                if (data[16].statResponse) {
                    $scope.listDefeaksiBab = data[16];
                }
                if (data[17].statResponse) {
                    debugger;
                    $scope.listDefeaksiFeses = data[17];
                }
                if (data[18].statResponse) {
                    $scope.listUrinBak = data[18];
                }
                if (data[19].statResponse) {
                    $scope.listUrinAlatGenitalia = data[19];
                }
                if (data[20].statResponse) {
                    $scope.listIntegumenWarna = data[20];
                }
                if (data[21].statResponse) {
                    $scope.listIntegumenKelainanKulit = data[21];
                }
                if (data[22].statResponse) {
                    $scope.listIntegumenKulit = data[22];
                }
                if (data[23].statResponse) {
                    $scope.listAnakAktif = data[23];
                }
                if (data[24].statResponse) {
                    $scope.listAnakLelah = data[24];
                }
                if (data[25].statResponse) {
                    $scope.listKognisiPenglihatan = data[25];
                }
                if (data[26].statResponse) {
                    $scope.listKognisiPendengaran = data[26];
                }
                if (data[27].statResponse) {
                    $scope.listKognisiDayaIngat = data[27];
                }
                if (data[28].statResponse) {
                    $scope.listStatusLamaTidur = data[28];
                }
                if (data[29].statResponse) {
                    $scope.listKonsepDiriGambaran = data[29];
                }
                if (data[30].statResponse) {
                    $scope.listPeranMasalah = data[30];
                }
                if (data[31].statResponse) {
                    $scope.listPeranPengaruhPenyakit = data[31];
                }
                if (data[32].statResponse) {
                    $scope.listKopingEfektif = data[32];
                }
                if (data[33].statResponse) {
                    $scope.listNilaiPertolongan = data[33];
                }
                if (data[34].statResponse) {
                    $scope.listNilaiHarapan = data[34];
                }
                if (data[35].statResponse) {
                    $scope.listPersepsiSehat = data[35];
                }
                if (data[36].statResponse) {
                    $scope.listPersepsiPenyakit = data[36];
                }
                if (data[37].statResponse) {
                    $scope.listPersepsiKegiatan = data[37];
                }

            });
////////////////////////////////////////////////////////////////////////////////

            $scope.showAdvanced = function(ev) {
                debugger;

                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    locals: {
                        itemOksigenasi: $scope.statusnormal.isNormalOksigenasi,
                        itemKebutuhanCairan: $scope.statusnormal.isNormalKebutuhanCairan,
                        itemNeurologi: $scope.statusnormal.isNormalNeurologi,
                        itemKebutuhanNutrisi: $scope.statusnormal.isNormalKebutuhanNutrisi,
                        itemDefeaksi: $scope.statusnormal.isNormalDefeaksi,
                        itemUrin: $scope.statusnormal.isNormalUrin,
                        itemIntagumen: $scope.statusnormal.isNormalIntegumen,
                        itemAktifitasAnak: $scope.statusnormal.isNormalAktifitasAnak,
                        itemPersepsiKognisi: $scope.statusnormal.isNormalPersepsiKognisi,
                        itemTidurIstirahat: $scope.statusnormal.isNormalTidurIstirahat,
                        itemKonsepDiri: $scope.statusnormal.isNormalKonsepDiri,
                        itemPeranHubungan: $scope.statusnormal.isNormalPeranHubungan,
                        itemKoping: $scope.statusnormal.isNormalKoping,
                        itemNilaiNilai: $scope.statusnormal.isNormalNilaiNilai,
                        itemPersepsiPasien: $scope.statusnormal.isNormalPersepsiPasien,




                        itempolaNafas: $scope.statusnormal.polaNafas,
                        itembatuk: $scope.statusnormal.batuk,
                        itemsianosis: $scope.statusnormal.sianosis,
                        itemnadi: $scope.statusnormal.nadi,
                        itemubunUbun: $scope.statusnormal.ubunUbun,
                        itemturgorKulit: $scope.statusnormal.turgorKulit,
                        itemcrt: $scope.statusnormal.crt,
                        itemedema: $scope.statusnormal.edema,
                        itemakral: $scope.statusnormal.akral,
                        itemkomponen: $scope.statusnormal.komponen,
                        itemkejang: $scope.statusnormal.kejang,
                        itemmukosa: $scope.statusnormal.mukosa,
                        itemstomatitis: $scope.statusnormal.stomatitis,
                        itemmuntah: $scope.statusnormal.muntah,
                        itemmual: $scope.statusnormal.mual,
                        itemanus: $scope.statusnormal.anus,
                        itembab: $scope.statusnormal.bab,
                        itemfeses: $scope.statusnormal.feses,
                        itembak: $scope.statusnormal.bak,
                        itemalatGenitalia: $scope.statusnormal.alatGenitalia,
                        itemwarna: $scope.statusnormal.warna,
                        itemkelainanKulit: $scope.statusnormal.kelainanKulit,
                        itemkulit: $scope.statusnormal.kulit,
                        itemaktif: $scope.statusnormal.aktif,
                        itemlelah: $scope.statusnormal.lelah,
                        itempenglihatan: $scope.statusnormal.penglihatan,
                        itempendengaran: $scope.statusnormal.pendengaran,
                        itemdayaIngat: $scope.statusnormal.dayaIngat,
                        itemlamaTidur: $scope.statusnormal.lamaTidur,
                        itemgambaran: $scope.statusnormal.gambaran,
                        itemmasalah: $scope.statusnormal.masalah,
                        itempengaruhPenyakit: $scope.statusnormal.pengaruhPenyakit,
                        itemkoping: $scope.statusnormal.koping,
                        itempertolongan: $scope.statusnormal.pertolongan,
                        itemharapan: $scope.statusnormal.harapan,
                        itemsehat: $scope.statusnormal.sehat,
                        itempenyakit: $scope.statusnormal.penyakit,
                        itemkegiatan: $scope.statusnormal.kegiatan,
                        ///////////////////////////////////////////////
                        listOksigenasiBatuk: $scope.listOksigenasiBatuk,
                        listOksigenasiPolaNafas: $scope.listOksigenasiPolaNafas,
                        listOksigenasiSianosis: $scope.listOksigenasiSianosis,
                        listCairanNadi : $scope.listCairanNadi,
                        listCairanUbunUbun : $scope.listCairanUbunUbun,
                        listCairanTurgorKulit : $scope.listCairanTurgorKulit,
                        listCairanCrt : $scope.listCairanCrt,
                        listCairanEdema : $scope.listCairanEdema,
                        listCairanAkral : $scope.listCairanAkral,
                        listNeurologiKomponen : $scope.listNeurologiKomponen,
                        listNeurologiKejang : $scope.listNeurologiKejang,
                        listNutrisiMukosa : $scope.listNutrisiMukosa,
                        listNutrisiStomatitis : $scope.listNutrisiStomatitis,
                        listNutrisiMuntah : $scope.listNutrisiMuntah,
                        listNutrisiMual : $scope.listNutrisiMual,
                        listDefeaksiAnus : $scope.listDefeaksiAnus,
                        listDefeaksiBab : $scope.listDefeaksiBab,
                        listDefeaksiFeses : $scope.listDefeaksiFeses,
                        listUrinBak : $scope.listUrinBak,
                        listUrinAlatGenitalia : $scope.listUrinAlatGenitalia,
                        listIntegumenWarna : $scope.listIntegumenWarna,
                        listIntegumenKelainanKulit : $scope.listIntegumenKelainanKulit,
                        listIntegumenKulit : $scope.listIntegumenKulit,
                        listAnakAktif : $scope.listAnakAktif,
                        listAnakLelah : $scope.listAnakLelah,
                        listKognisiPenglihatan : $scope.listKognisiPenglihatan,
                        listKognisiPendengaran : $scope.listKognisiPendengaran,
                        listKognisiDayaIngat : $scope.listKognisiDayaIngat,
                        listStatusLamaTidur : $scope.listStatusLamaTidur,
                        listKonsepDiriGambaran : $scope.listKonsepDiriGambaran,
                        listPeranMasalah : $scope.listPeranMasalah,
                        listPeranPengaruhPenyakit : $scope.listPeranPengaruhPenyakit,
                        listKopingEfektif : $scope.listKopingEfektif,
                        listNilaiPertolongan : $scope.listNilaiPertolongan,
                        listNilaiHarapan : $scope.listNilaiHarapan,
                        listPersepsiSehat : $scope.listPersepsiSehat,
                        listPersepsiPenyakit : $scope.listPersepsiPenyakit,
                        listPersepsiKegiatan : $scope.listPersepsiKegiatan,
                    },
                    windowClass: 'large-Modal'
                })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };
            var data ="";
            var xxx = $scope.statusnormal.batuk
            function DialogController(
                itemOksigenasi,itemKebutuhanCairan,itemNeurologi,itemKebutuhanNutrisi,itemUrin ,itemIntagumen,
                itemAktifitasAnak ,itemPersepsiKognisi ,itemTidurIstirahat ,itemKonsepDiri,itemPeranHubungan ,itemKoping ,itemNilaiNilai ,itemPersepsiPasien  ,itemDefeaksi,itempolaNafas,
                itembatuk,itemsianosis,itemnadi,itemubunUbun,itemturgorKulit,itemcrt,
                itemedema,itemakral,itemkomponen,itemkejang,itemmukosa,itemstomatitis,itemmuntah,itemmual,itemanus,
                itembab,itemfeses,itembak,itemalatGenitalia,itemwarna,itemkelainanKulit,itemkulit,itemaktif,itemlelah,
                itempenglihatan,itempendengaran,itemdayaIngat,itemlamaTidur,itemgambaran,itemmasalah,itempengaruhPenyakit,
                itemkoping,itempertolongan,itemharapan,itemsehat,itempenyakit,itemkegiatan,$scope, $mdDialog, listOksigenasiBatuk,
                listOksigenasiPolaNafas,listOksigenasiSianosis,listCairanNadi,listCairanUbunUbun,listCairanTurgorKulit,listCairanCrt,
                listCairanEdema,listCairanAkral,listNeurologiKomponen,listNeurologiKejang,listNutrisiMukosa,listNutrisiStomatitis,
                listNutrisiMuntah,listNutrisiMual,listDefeaksiAnus,listDefeaksiBab,listDefeaksiFeses,listUrinBak,listUrinAlatGenitalia,
                listIntegumenWarna,listIntegumenKelainanKulit,listIntegumenKulit,listAnakAktif,listAnakLelah,listKognisiPenglihatan,
                listKognisiPendengaran,listKognisiDayaIngat,listStatusLamaTidur,listKonsepDiriGambaran,listPeranMasalah,listPeranPengaruhPenyakit,
                listKopingEfektif,listNilaiPertolongan,listNilaiHarapan,listPersepsiSehat,listPersepsiPenyakit,listPersepsiKegiatan
            ) {

                $scope.itempolaNafas = itempolaNafas;
                $scope.itembatuk = itembatuk;
                $scope.itemOksigenasi = itemOksigenasi;
                $scope.itemKebutuhanNutrisi = itemKebutuhanNutrisi;
                $scope.itemUrin = itemUrin;
                $scope.itemIntagumen = itemIntagumen;
                $scope.itemAktifitasAnak = itemAktifitasAnak ;
                $scope.itemPersepsiKognisi = itemPersepsiKognisi ;
                $scope.itemTidurIstirahat = itemTidurIstirahat ;
                $scope.itemKonsepDiri = itemKonsepDiri ;
                $scope.itemPeranHubungan = itemPeranHubungan ;
                $scope.itemKoping = itemKoping ;
                $scope.itemNilaiNilai = itemNilaiNilai ;
                $scope.itemPersepsiPasien = itemPersepsiPasien ;
                $scope.itemDefeaksi = itemDefeaksi;
                $scope.itemNeurologi = itemNeurologi;
                $scope.itemKebutuhanCairan = itemKebutuhanCairan;
                $scope.itembatuk = itembatuk;
                $scope.itemsianosis = itemsianosis;
                $scope.itemnadi = itemnadi;
                $scope.itemubunUbun = itemubunUbun;
                $scope.itemturgorKulit = itemturgorKulit;
                $scope.itemcrt = itemcrt
                $scope.itemedema = itemedema;
                $scope.itemakral = itemakral;
                $scope.itemkomponen = itemkomponen;

                $scope.itemkejang = itemkejang;
                $scope.itemmukosa = itemmukosa;
                $scope.itemstomatitis = itemstomatitis;
                $scope.itemmuntah = itemmuntah;
                $scope.itemmual = itemmual;
                $scope.itemanus = itemanus;
                $scope.itembab = itembab;
                $scope.itemfeses = itemfeses;
                $scope.itembak = itembak;
                $scope.itemalatGenitalia = itemalatGenitalia;
                $scope.itemwarna = itemwarna;
                $scope.itemkelainanKulit = itemkelainanKulit;
                $scope.itemkulit = itemkulit;
                $scope.itemaktif = itemaktif;
                $scope.itemlelah = itemlelah;
                $scope.itempenglihatan = itempenglihatan;
                $scope.itempendengaran = itempendengaran;
                $scope.itemdayaIngat = itemdayaIngat;
                $scope.itemlamaTidur = itemlamaTidur;
                $scope.itemgambaran = itemgambaran;
                $scope.itemmasalah = itemmasalah;
                $scope.itempengaruhPenyakit = itempengaruhPenyakit;
                $scope.itemkoping = itemkoping;
                $scope.itempertolongan = itempertolongan;
                $scope.itemharapan = itemharapan;
                $scope.itemsehat = itemsehat;
                $scope.itempenyakit =itempenyakit;
                $scope.itemkegiatan = itemkegiatan;



                /////////////////////////////////////////////////////////////
                $scope.listOksigenasiPolaNafas = listOksigenasiPolaNafas;
                
                for (var key in $scope.listOksigenasiPolaNafas) {
                            if ($scope.listOksigenasiPolaNafas.hasOwnProperty(key)) {
                                var element = $scope.listOksigenasiPolaNafas[key];
                                if (element.id === $scope.itempolaNafas.id) {
                                    $scope.itempolaNafas = element;
                                }
                            }
                        }

                $scope.listOksigenasiBatuk = listOksigenasiBatuk;
                for (var key in $scope.listOksigenasiBatuk) {
                            if ($scope.listOksigenasiBatuk.hasOwnProperty(key)) {
                                var element = $scope.listOksigenasiBatuk[key];
                                if (element.id === $scope.itembatuk.id) {
                                    $scope.itembatuk = element;
                                }
                            }
                        }
                $scope.listOksigenasiSianosis = listOksigenasiSianosis;
                for (var key in $scope.listOksigenasiSianosis) {
                            if ($scope.listOksigenasiSianosis.hasOwnProperty(key)) {
                                var element = $scope.listOksigenasiSianosis[key];
                                if (element.id === $scope.itemsianosis.id) {
                                    $scope.itemsianosis = element;
                                }
                            }
                        }
                $scope.listCairanNadi = listCairanNadi;
                for (var key in $scope.listCairanNadi) {
                            if ($scope.listCairanNadi.hasOwnProperty(key)) {
                                var element = $scope.listCairanNadi[key];
                                if (element.id === $scope.itemnadi.id) {
                                    $scope.itemnadi = element;
                                }
                            }
                        }
                $scope.listCairanUbunUbun = listCairanUbunUbun;
                for (var key in $scope.listCairanUbunUbun) {
                            if ($scope.listCairanUbunUbun.hasOwnProperty(key)) {
                                var element = $scope.listCairanUbunUbun[key];
                                if (element.id === $scope.itemubunUbun.id) {
                                    $scope.itemubunUbun = element;
                                }
                            }
                        }
                $scope.listCairanTurgorKulit = listCairanTurgorKulit;
                for (var key in $scope.listCairanTurgorKulit) {
                            if ($scope.listCairanTurgorKulit.hasOwnProperty(key)) {
                                var element = $scope.listCairanTurgorKulit[key];
                                if (element.id === $scope.itemturgorKulit.id) {
                                    $scope.itemturgorKulit = element;
                                }
                            }
                        }
                $scope.listCairanCrt = listCairanCrt;
                for (var key in $scope.listCairanCrt) {
                            if ($scope.listCairanCrt.hasOwnProperty(key)) {
                                var element = $scope.listCairanCrt[key];
                                if (element.id === $scope.itemcrt.id) {
                                    $scope.itemcrt = element;
                                }
                            }
                        }
                $scope.listCairanEdema = listCairanEdema;
                for (var key in $scope.listCairanEdema) {
                            if ($scope.listCairanEdema.hasOwnProperty(key)) {
                                var element = $scope.listCairanEdema[key];
                                if (element.id === $scope.itemedema.id) {
                                    $scope.itemedema = element;
                                }
                            }
                        }
                $scope.listCairanAkral = listCairanAkral;
                for (var key in $scope.listCairanAkral) {
                            if ($scope.listCairanAkral.hasOwnProperty(key)) {
                                var element = $scope.listCairanAkral[key];
                                if (element.id === $scope.itemakral.id) {
                                    $scope.itemakral = element;
                                }
                            }
                        }
                $scope.listNeurologiKomponen = listNeurologiKomponen;
                for (var key in $scope.listNeurologiKomponen) {
                            if ($scope.listNeurologiKomponen.hasOwnProperty(key)) {
                                var element = $scope.listNeurologiKomponen[key];
                                if (element.id === $scope.itemkomponen.id) {
                                    $scope.itemkomponen = element;
                                }
                            }
                        }
                $scope.listNeurologiKejang = listNeurologiKejang;
                for (var key in $scope.listNeurologiKejang) {
                            if ($scope.listNeurologiKejang.hasOwnProperty(key)) {
                                var element = $scope.listNeurologiKejang[key];
                                if (element.id === $scope.itemkejang.id) {
                                    $scope.itemkejang = element;
                                }
                            }
                        }
                $scope.listNutrisiMukosa = listNutrisiMukosa;
                for (var key in $scope.listNutrisiMukosa) {
                            if ($scope.listNutrisiMukosa.hasOwnProperty(key)) {
                                var element = $scope.listNutrisiMukosa[key];
                                if (element.id === $scope.itemmukosa.id) {
                                    $scope.itemmukosa = element;
                                }
                            }
                        }
                $scope.listNutrisiStomatitis = listNutrisiStomatitis;
                for (var key in $scope.listNutrisiStomatitis) {
                            if ($scope.listNutrisiStomatitis.hasOwnProperty(key)) {
                                var element = $scope.listNutrisiStomatitis[key];
                                if (element.id === $scope.itemstomatitis.id) {
                                    $scope.itemstomatitis = element;
                                }
                            }
                        }
                $scope.listNutrisiMuntah = listNutrisiMuntah;
                for (var key in $scope.listNutrisiMuntah) {
                            if ($scope.listNutrisiMuntah.hasOwnProperty(key)) {
                                var element = $scope.listNutrisiMuntah[key];
                                if (element.id === $scope.itemmuntah.id) {
                                    $scope.itemmuntah = element;
                                }
                            }
                        }
                $scope.listNutrisiMual = listNutrisiMual;
                for (var key in $scope.listNutrisiMual) {
                            if ($scope.listNutrisiMual.hasOwnProperty(key)) {
                                var element = $scope.listNutrisiMual[key];
                                if (element.id === $scope.itemmual.id) {
                                    $scope.itemmual = element;
                                }
                            }
                        }
                $scope.listDefeaksiAnus= listDefeaksiAnus;
                for (var key in $scope.listDefeaksiAnus) {
                            if ($scope.listDefeaksiAnus.hasOwnProperty(key)) {
                                var element = $scope.listDefeaksiAnus[key];
                                if (element.id === $scope.itemanus.id) {
                                    $scope.itemanus = element;
                                }
                            }
                        }
                $scope.listDefeaksiBab= listDefeaksiBab;
                for (var key in $scope.listDefeaksiBab) {
                            if ($scope.listDefeaksiBab.hasOwnProperty(key)) {
                                var element = $scope.listDefeaksiBab[key];
                                if (element.id === $scope.itembab.id) {
                                    $scope.itembab = element;
                                }
                            }
                        }
                $scope.listDefeaksiFeses= listDefeaksiFeses;
                for (var key in $scope.listDefeaksiFeses) {
                            if ($scope.listDefeaksiFeses.hasOwnProperty(key)) {
                                var element = $scope.listDefeaksiFeses[key];
                                if (element.id === $scope.itemfeses.id) {
                                    $scope.itemfeses = element;
                                }
                            }
                        }
                $scope.listUrinBak= listUrinBak;
                for (var key in $scope.listUrinBak) {
                            if ($scope.listUrinBak.hasOwnProperty(key)) {
                                var element = $scope.listUrinBak[key];
                                if (element.id === $scope.itembak.id) {
                                    $scope.itembak = element;
                                }
                            }
                        }
                $scope.listUrinAlatGenitalia= listUrinAlatGenitalia;
                for (var key in $scope.listUrinAlatGenitalia) {
                            if ($scope.listUrinAlatGenitalia.hasOwnProperty(key)) {
                                var element = $scope.listUrinAlatGenitalia[key];
                                if (element.id === $scope.itemalatGenitalia.id) {
                                    $scope.itemalatGenitalia = element;
                                }
                            }
                        }
                $scope.listIntegumenWarna = listIntegumenWarna;
                for (var key in $scope.listIntegumenWarna) {
                            if ($scope.listIntegumenWarna.hasOwnProperty(key)) {
                                var element = $scope.listIntegumenWarna[key];
                                if (element.id === $scope.itemwarna.id) {
                                    $scope.itemwarna = element;
                                }
                            }
                        }
                $scope.listIntegumenKelainanKulit= listIntegumenKelainanKulit;
                for (var key in $scope.listIntegumenKelainanKulit) {
                            if ($scope.listIntegumenKelainanKulit.hasOwnProperty(key)) {
                                var element = $scope.listIntegumenKelainanKulit[key];
                                if (element.id === $scope.itemkelainanKulit.id) {
                                    $scope.itemkelainanKulit = element;
                                }
                            }
                        }
                $scope.listIntegumenKulit =listIntegumenKulit;
                for (var key in $scope.listIntegumenKulit) {
                            if ($scope.listIntegumenKulit.hasOwnProperty(key)) {
                                var element = $scope.listIntegumenKulit[key];
                                if (element.id === $scope.itemkulit.id) {
                                    $scope.itemkulit = element;
                                }
                            }
                        }
                $scope.listAnakAktif = listAnakAktif;
                for (var key in $scope.listAnakAktif) {
                            if ($scope.listAnakAktif.hasOwnProperty(key)) {
                                var element = $scope.listAnakAktif[key];
                                if (element.id === $scope.itemaktif.id) {
                                    $scope.itemaktif = element;
                                }
                            }
                        }
                $scope.listAnakLelah= listAnakLelah;
                for (var key in $scope.listAnakLelah) {
                            if ($scope.listAnakLelah.hasOwnProperty(key)) {
                                var element = $scope.listAnakLelah[key];
                                if (element.id === $scope.itemlelah.id) {
                                    $scope.itemlelah = element;
                                }
                            }
                        }
                $scope.listKognisiPenglihatan = listKognisiPenglihatan;
                for (var key in $scope.listKognisiPenglihatan) {
                            if ($scope.listKognisiPenglihatan.hasOwnProperty(key)) {
                                var element = $scope.listKognisiPenglihatan[key];
                                if (element.id === $scope.itempenglihatan.id) {
                                    $scope.itempenglihatan = element;
                                }
                            }
                        }
                $scope.listKognisiPendengaran=  listKognisiPendengaran;
                for (var key in $scope.listKognisiPendengaran) {
                            if ($scope.listKognisiPendengaran.hasOwnProperty(key)) {
                                var element = $scope.listKognisiPendengaran[key];
                                if (element.id === $scope.itempendengaran.id) {
                                    $scope.itempendengaran = element;
                                }
                            }
                        }
                $scope.listKognisiDayaIngat=  listKognisiDayaIngat;
                for (var key in $scope.listKognisiDayaIngat) {
                            if ($scope.listKognisiDayaIngat.hasOwnProperty(key)) {
                                var element = $scope.listKognisiDayaIngat[key];
                                if (element.id === $scope.itemdayaIngat.id) {
                                    $scope.itemdayaIngat = element;
                                }
                            }
                        }
                $scope.listStatusLamaTidur= listStatusLamaTidur;
                for (var key in $scope.listStatusLamaTidur) {
                            if ($scope.listStatusLamaTidur.hasOwnProperty(key)) {
                                var element = $scope.listStatusLamaTidur[key];
                                if (element.id === $scope.itemlamaTidur.id) {
                                    $scope.itemlamaTidur = element;
                                }
                            }
                        }
                $scope.listKonsepDiriGambaran= listKonsepDiriGambaran;
                for (var key in $scope.listKonsepDiriGambaran) {
                            if ($scope.listKonsepDiriGambaran.hasOwnProperty(key)) {
                                var element = $scope.listKonsepDiriGambaran[key];
                                if (element.id === $scope.itemgambaran.id) {
                                    $scope.itemgambaran = element;
                                }
                            }
                        }
                $scope.listPeranMasalah= listPeranMasalah;
                for (var key in $scope.listPeranMasalah) {
                            if ($scope.listPeranMasalah.hasOwnProperty(key)) {
                                var element = $scope.listPeranMasalah[key];
                                if (element.id === $scope.itemmasalah.id) {
                                    $scope.itemmasalah = element;
                                }
                            }
                        }
                $scope.listPeranPengaruhPenyakit = listPeranPengaruhPenyakit;
                for (var key in $scope.listPeranPengaruhPenyakit) {
                            if ($scope.listPeranPengaruhPenyakit.hasOwnProperty(key)) {
                                var element = $scope.listPeranPengaruhPenyakit[key];
                                if (element.id === $scope.itempengaruhPenyakit.id) {
                                    $scope.itempengaruhPenyakit = element;
                                }
                            }
                        }
                $scope.listKopingEfektif= listKopingEfektif;
                for (var key in $scope.listKopingEfektif) {
                            if ($scope.listKopingEfektif.hasOwnProperty(key)) {
                                var element = $scope.listKopingEfektif[key];
                                if (element.id === $scope.itemkoping.id) {
                                    $scope.itemkoping = element;
                                }
                            }
                        }
                $scope.listNilaiPertolongan= listNilaiPertolongan;
                for (var key in $scope.listNilaiPertolongan) {
                            if ($scope.listNilaiPertolongan.hasOwnProperty(key)) {
                                var element = $scope.listNilaiPertolongan[key];
                                if (element.id === $scope.itempertolongan.id) {
                                    $scope.itempertolongan = element;
                                }
                            }
                        }
                $scope.listNilaiHarapan= listNilaiHarapan;
                for (var key in $scope.listNilaiHarapan) {
                            if ($scope.listNilaiHarapan.hasOwnProperty(key)) {
                                var element = $scope.listNilaiHarapan[key];
                                if (element.id === $scope.itemharapan.id) {
                                    $scope.itemharapan = element;
                                }
                            }
                        }
                $scope.listPersepsiSehat = listPersepsiSehat;
                for (var key in $scope.listPersepsiSehat) {
                            if ($scope.listPersepsiSehat.hasOwnProperty(key)) {
                                var element = $scope.listPersepsiSehat[key];
                                if (element.id === $scope.itemsehat.id) {
                                    $scope.itemsehat = element;
                                }
                            }
                        }
                $scope.listPersepsiPenyakit = listPersepsiPenyakit;
                for (var key in $scope.listPersepsiPenyakit) {
                            if ($scope.listPersepsiPenyakit.hasOwnProperty(key)) {
                                var element = $scope.listPersepsiPenyakit[key];
                                if (element.id === $scope.itempenyakit.id) {
                                    $scope.itempenyakit = element;
                                }
                            }
                        }
                $scope.listPersepsiKegiatan = listPersepsiKegiatan;
                for (var key in $scope.listPersepsiKegiatan) {
                            if ($scope.listPersepsiKegiatan.hasOwnProperty(key)) {
                                var element = $scope.listPersepsiKegiatan[key];
                                if (element.id === $scope.itemkegiatan.id) {
                                    $scope.itemkegiatan = element;
                                }
                            }
                        }

                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

            $scope.Save = function() {
                debugger;
                $scope.item.antrianPasienDiPeriksa = { "noRec": $state.params.noRec }
                ManagePasien.saveKebutuhanDasarDokter(ModelItem.beforePost($scope.item)).then(function(e) {


                    /*cacheHelper.set("kajianAwal", $scope.kajianAwal);
                     $state.go('dashboardpasien.Integumen', {
                     noCM: $scope.noCM,
                     tanggal: $state.params.tanggal
                     });*/
                });
            };
        }
    ]);
});
  