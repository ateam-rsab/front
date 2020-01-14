
define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KebutuhanDasarSusterRevCtrl', ['$timeout', '$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', '$state', 'ManagePasien', 'ManagePhp',
        function ($timeout, $q, $rootScope, $scope, ModelItem, DateHelper, findPasien, $state, ManagePasien, ManagePhp) {
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.title = "PENGKAJIAN KEBUTUHAN DASAR (Hanya untuk Rawat Inap)"

            $scope.listOksigenasi = [
                { "id": 1, "nama": "Oksigenasi ", "detail": [{ "id": 1, "nama": "Tidak Masalah" }, { "id": 2, "nama": "Masalah" }] }
            ]
            $scope.listCairan = [
                { "id": 2, "nama": "Cairan ", "detail": [{ "id": 1, "nama": "Tidak Masalah " }, { "id": 2, "nama": "Masalah " }] }
            ]
            $scope.listKesadaran = [
                { "id": 3, "nama": "Kesadaran ", "detail": [{ "id": 1, "nama": "Tidak Masalah  " }, { "id": 2, "nama": "Masalah  " }] }
            ]
            $scope.listNutrisi = [
                { "id": 4, "nama": "Nutrisi ", "detail": [{ "id": 1, "nama": "Tidak Masalah   " }, { "id": 2, "nama": "Masalah   " }] }
            ]
            $scope.listEliminasi = [
                { "id": 5, "nama": "Eliminasi ", "detail": [{ "id": 1, "nama": "Tidak Masalah    " }, { "id": 2, "nama": "Masalah    " }] }
            ]
            $scope.listIntegumen = [
                { "id": 6, "nama": "Integumen ", "detail": [{ "id": 1, "nama": "Tidak Masalah     " }, { "id": 2, "nama": "Masalah     " }] }
            ]
            $scope.listAktivitas = [
                { "id": 7, "nama": "Aktifitas ", "detail": [{ "id": 1, "nama": "Tidak Masalah      " }, { "id": 2, "nama": "Masalah      " }] }
            ]
            $scope.listSeksualitas = [
                { "id": 8, "nama": "Seksualitas/Reproduksi ", "detail": [{ "id": 1, "nama": "Tidak Masalah       " }, { "id": 2, "nama": "Masalah       " }] }
            ]
            $scope.listTidur = [
                { "id": 9, "nama": "Tidur/istirahat ", "detail": [{ "id": 1, "nama": "Tidak Masalah        " }, { "id": 2, "nama": "Masalah        " }] }
            ]
            $scope.listKonsepDiri = [
                { "id": 10, "nama": "Konsep Diri ", "detail": [{ "id": 1, "nama": "Tidak Masalah         " }, { "id": 2, "nama": "Masalah         " }] }
            ]
            $scope.listKoping = [
                { "id": 11, "nama": "Koping ", "detail": [{ "id": 1, "nama": "Tidak Masalah          " }, { "id": 2, "nama": "Masalah          " }] }
            ]
            $scope.listPersepsi = [
                { "id": 12, "nama": "Persepsi pasien/orang tua tentang penyakit ", "detail": [{ "id": 1, "nama": "Tidak Masalah           " }, { "id": 2, "nama": "Masalah           " }] }
            ]
            $scope.listUpaya = [
                { "id": 13, "nama": "Upaya klien/orang tua untuk mengatasi penyakit ", "detail": [{ "id": 1, "nama": "Tidak Masalah             " }, { "id": 2, "nama": "Masalah             " }] }
            ]
            $scope.listBermain = [
                { "id": 14, "nama": "Bermain ", "detail": [{ "id": 1, "nama": "Tidak Masalah              " }, { "id": 2, "nama": "Masalah              " }] }
            ]
            $scope.listRekreasi = [
                { "id": 15, "nama": "Rekreasi ", "detail": [{ "id": 1, "nama": "Tidak Masalah               " }, { "id": 2, "nama": "Masalah               " }] }
            ]

            $scope.getdata = function () {
                var objectfk = "KDS";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                $scope.item = {};
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk).then(function (e) {
                    $scope.dataKebutuhan = e.data.data;
                    if ($scope.dataKebutuhan.length != 0) {
                        for (var i = 0; i < $scope.dataKebutuhan.length; i++) {
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000001") {
                                $scope.noRecOksigenasi = $scope.dataKebutuhan[i].norec
                                $scope.item.oksigenasi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000002") {
                                $scope.noRecKetOksigenasi = $scope.dataKebutuhan[i].norec
                                $scope.item.ketOksigenasi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000003") {
                                $scope.noRecCairan = $scope.dataKebutuhan[i].norec
                                $scope.item.cairan = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000004") {
                                $scope.noRecKetCairan = $scope.dataKebutuhan[i].norec
                                $scope.item.ketCairan = $scope.dataKebutuhan[i].nilai;
                                console.log($scope.dataKebutuhan[i].nilai)
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000005") {
                                $scope.noReckesadaran = $scope.dataKebutuhan[i].norec
                                $scope.item.kesadaran = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000006") {
                                $scope.noRecKetKesadaran = $scope.dataKebutuhan[i].norec
                                $scope.item.ketKesadaran = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000007") {
                                $scope.noRecNutrisi = $scope.dataKebutuhan[i].norec
                                $scope.item.nutrisi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000008") {
                                $scope.noRecKetNutrisi = $scope.dataKebutuhan[i].norec
                                $scope.item.ketNutrisi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000009") {
                                $scope.noRecEliminasi = $scope.dataKebutuhan[i].norec
                                $scope.item.eliminasi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000010") {
                                $scope.noRecKetEliminasi = $scope.dataKebutuhan[i].norec
                                $scope.item.ketEliminasi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000011") {
                                $scope.noRecIntegumen = $scope.dataKebutuhan[i].norec
                                $scope.item.integumen = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000012") {
                                $scope.noRecKetIntegumen = $scope.dataKebutuhan[i].norec
                                $scope.item.ketIntegumen = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000013") {
                                $scope.noRecAktifitas = $scope.dataKebutuhan[i].norec
                                $scope.item.aktifitas = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000014") {
                                $scope.noRecKetAktifitas = $scope.dataKebutuhan[i].norec
                                $scope.item.ketAktifitas = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000015") {
                                $scope.noRecSeksualitas = $scope.dataKebutuhan[i].norec
                                $scope.item.seksualitas = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000016") {
                                $scope.noRecKetSeksualitas = $scope.dataKebutuhan[i].norec
                                $scope.item.ketSeksualitas = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000017") {
                                $scope.noRecTidur = $scope.dataKebutuhan[i].norec
                                $scope.item.tidur = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000018") {
                                $scope.noRecKetTidur = $scope.dataKebutuhan[i].norec
                                $scope.item.ketTidur = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000019") {
                                $scope.noRecKonsepDiri = $scope.dataKebutuhan[i].norec
                                $scope.item.konsepDiri = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000020") {
                                $scope.noRecKetKonsepDiri = $scope.dataKebutuhan[i].norec
                                $scope.item.ketKonsepDiri = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000021") {
                                $scope.noRecKoping = $scope.dataKebutuhan[i].norec
                                $scope.item.koping = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000022") {
                                $scope.noRecKetKoping = $scope.dataKebutuhan[i].norec
                                $scope.item.ketKoping = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000023") {
                                $scope.noRecPersepsi = $scope.dataKebutuhan[i].norec
                                $scope.item.persepsi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000024") {
                                $scope.noRecKetPersepsi = $scope.dataKebutuhan[i].norec
                                $scope.item.ketPersepsi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000025") {
                                $scope.noRecUpaya = $scope.dataKebutuhan[i].norec
                                $scope.item.upaya = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000026") {
                                $scope.noRecKetUpaya = $scope.dataKebutuhan[i].norec
                                $scope.item.ketUpaya = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000027") {
                                $scope.noRecBermain = $scope.dataKebutuhan[i].norec
                                $scope.item.bermain = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000028") {
                                $scope.noRecKetBermain = $scope.dataKebutuhan[i].norec
                                $scope.item.ketBermain = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000029") {
                                $scope.noRecRekreasi = $scope.dataKebutuhan[i].norec
                                $scope.item.rekreasi = $scope.dataKebutuhan[i].nilai;
                            }
                            if ($scope.dataKebutuhan[i].objectfk == "KDS-000030") {
                                $scope.noRecKetRekreasi = $scope.dataKebutuhan[i].norec
                                $scope.item.ketRekreasi = $scope.dataKebutuhan[i].nilai;
                            }
                        }
                    }
                })
            }
            $scope.getdata();

            $scope.Save = function () {
                var dataForm = [];
                var tempData = [];

                if ($scope.item.oksigenasi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecOksigenasi,
                        objectfk: "KDS-000001",
                        nilai: $scope.item.oksigenasi.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketOksigenasi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetOksigenasi,
                        objectfk: "KDS-000002",
                        nilai: $scope.item.ketOksigenasi.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.cairan !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecCairan,
                        objectfk: "KDS-000003",
                        nilai: $scope.item.cairan.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketCairan !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetCairan,
                        objectfk: "KDS-000004",
                        nilai: $scope.item.ketCairan.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.kesadaran !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecHubungan,
                        objectfk: "KDS-000005",
                        nilai: $scope.item.kesadaran.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketKesadaran !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetKesadaran,
                        objectfk: "KDS-000006",
                        nilai: $scope.item.ketKesadaran.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.nutrisi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecNutrisi,
                        objectfk: "KDS-000007",
                        nilai: $scope.item.nutrisi.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketNutrisi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetNutrisi,
                        objectfk: "KDS-000008",
                        nilai: $scope.item.ketNutrisi.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.eliminasi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecEliminasi,
                        objectfk: "KDS-000009",
                        nilai: $scope.item.eliminasi.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketEliminasi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetEliminasi,
                        objectfk: "KDS-000010",
                        nilai: $scope.item.ketEliminasi.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.integumen !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecIntegumen,
                        objectfk: "KDS-000011",
                        nilai: $scope.item.integumen.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketIntegumen !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetIntegumen,
                        objectfk: "KDS-000012",
                        nilai: $scope.item.ketIntegumen.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.aktifitas !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecAktifitas,
                        objectfk: "KDS-000013",
                        nilai: $scope.item.aktifitas.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketAktifitas !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetAktifitas,
                        objectfk: "KDS-000014",
                        nilai: $scope.item.ketAktifitas.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.seksualitas !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecSeksualitas,
                        objectfk: "KDS-000015",
                        nilai: $scope.item.seksualitas.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketSeksualitas !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetSeksualitas,
                        objectfk: "KDS-000016",
                        nilai: $scope.item.ketSeksualitas.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.tidur !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecTidur,
                        objectfk: "KDS-000017",
                        nilai: $scope.item.tidur.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketTidur !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetTidur,
                        objectfk: "KDS-000018",
                        nilai: $scope.item.ketTidur.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.konsepDiri !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKonsepDiri,
                        objectfk: "KDS-000019",
                        nilai: $scope.item.konsepDiri.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketKonsepDiri !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetKonsepDiri,
                        objectfk: "KDS-000020",
                        nilai: $scope.item.ketKonsepDiri.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.koping !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKoping,
                        objectfk: "KDS-000021",
                        nilai: $scope.item.koping.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketKoping !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetKoping,
                        objectfk: "KDS-000022",
                        nilai: $scope.item.ketKoping.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.persepsi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecPersepsi,
                        objectfk: "KDS-000023",
                        nilai: $scope.item.persepsi.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketPersepsi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetPersepsi,
                        objectfk: "KDS-000024",
                        nilai: $scope.item.ketPersepsi.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.upaya !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecUpaya,
                        objectfk: "KDS-000025",
                        nilai: $scope.item.upaya.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketUpaya !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetUpaya,
                        objectfk: "KDS-000026",
                        nilai: $scope.item.ketUpaya.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.bermain !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecBermain,
                        objectfk: "KDS-000027",
                        nilai: $scope.item.bermain.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketBermain !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetBermain,
                        objectfk: "KDS-000028",
                        nilai: $scope.item.ketBermain.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.rekreasi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecRekreasi,
                        objectfk: "KDS-000029",
                        nilai: $scope.item.rekreasi.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if ($scope.item.ketRekreasi !== undefined) {
                    var tmpStatus = {
                        norec: $scope.noRecKetRekreasi,
                        objectfk: "KDS-000030",
                        nilai: $scope.item.ketRekreasi.toString(),
                        satuan: "-",
                        jenisobject: "text box"
                    }
                    tempData.push(tmpStatus);
                }
                for (var i = tempData.length - 1; i >= 0; i--) {
                    if (tempData[i].nilai == undefined) {
                        tempData.splice([i], 1)
                    }
                    if (tempData[i].norec == undefined) {
                        tempData[i].norec = '-'
                    }

                }
                debugger;
                var jsonSave = {
                    data: tempData,
                    noregistrasifk: $state.params.noRec
                }
                ManagePhp.saveData(jsonSave).then(function (e) {
                    $scope.item = {};
                    $scope.getdata();
                    ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa', $state.params.noRec, 'Pengkajian Kebutuhan Dasar').then(function (res) {
                    })
                });
            }
        }
    ]);
});
