define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('StatusFungsionalRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien', 'CacheHelper', 'ManagePhp',
        function ($q, $rootScope, $scope, ModelItem, $state, findPasien, managePasien, cacheHelper, ManagePhp) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Status Fungsional";
            // // debugger;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.isPernahDirawat = false;
            $scope.isRawatInap = window.isRawatInap;
            $scope.item = {};
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.title = "Status Fungsional";
            $scope.subtitle = "Pilih salah satu penilaian status fungsional untuk rawat jalan atau rawat inap (anak atau dewasa). ";
            $scope.titlePengkajian = "PENGKAJIAN STATUS FUNGSIONAL MENURUT BARTHEL INDEKS";
            $scope.titleDewasa = "THE MODIFIED MORSE FALL SCALE"
            $scope.form = false;
            ModelItem.get("statusfungsional").then(function (data) {
                $scope.item = data;
                $rootScope.dataVOloaded = true;
            }, function errorCallBack(err) { });
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.formId = 240; //get master form status fungsional
            $scope.arrParameterRawatJalan = [];
            $scope.arrParameterRawatInap = [];
            $scope.init = function () {
                console.log('Hai')

                $("input:radio[name='makan']").attr("checked", false);
            }
            $scope.init();
            $scope.listMakan = [
                { "id": 1, "nama": "Makan", "detail": [{ "id": 1, "nama": "Tidak mampu", "descNilai": "0" }, { "id": 2, "nama": "Butuh bantuan", "descNilai": "1" }, { "id": 3, "nama": "Mandiri", "descNilai": "2" }] }
            ]
            $scope.listMandi = [
                { "id": 2, "nama": "Mandi", "detail": [{ "id": 1, "nama": "Tergantung orang lain", "descNilai": "0" }, { "id": 2, "nama": "Mandiri ", "descNilai": "1" }] }
            ]
            $scope.listPerawatan = [
                { "id": 3, "nama": "Perawatan Diri", "detail": [{ "id": 1, "nama": "Membutuhkan bantuan orang lain", "descNilai": "0" }, { "id": 2, "nama": " Mandiri (Membersihkan muka, sikat gigi,sisir rambut)", "descNilai": "1" }] }
            ]
            $scope.listBerpakaian = [
                { "id": 4, "nama": "Berpakaian", "detail": [{ "id": 1, "nama": "Tergantung orang lain ", "descNilai": "0" }, { "id": 2, "nama": "Sebagian dibantu (Misal:mengancing baju)", "descNilai": "1" }, { "id": 3, "nama": "Mandiri  ", "descNilai": "2" }] }
            ]
            $scope.listBab = [
                { "id": 5, "nama": "Buang Air Besar", "detail": [{ "id": 1, "nama": "Tak terkendali/ Tak teratur (perlu pencahar)", "descNilai": "0" }, { "id": 2, "nama": "Kadang tak terkendali (hanya 1x tiap 24 jam)", "descNilai": "1" }, { "id": 3, "nama": "Terkendali/ Teratur", "descNilai": "2" }] }
            ]
            $scope.listBak = [
                { "id": 6, "nama": "Buang Air Kecil", "detail": [{ "id": 1, "nama": "Tidak terkendali/pakai kateter", "descNilai": "0" }, { "id": 2, "nama": "Kadang-kadang terkendali (1x seminggu)", "descNilai": "1" }, { "id": 3, "nama": "Mandiri   ", "descNilai": "2" }] }
            ]
            $scope.listPenggunaan = [
                { "id": 7, "nama": "Penggunaan Toilet", "detail": [{ "id": 1, "nama": "Tergantung bantuan orang lain", "descNilai": "0" }, { "id": 2, "nama": "Membutuhkan bantuan tetapi dapat melakukan beberapa hal sendiri", "descNilai": "1" }, { "id": 3, "nama": "Mandiri    ", "descNilai": "2" }] }
            ]
            $scope.listTransfer = [
                { "id": 8, "nama": "Transfer", "detail": [{ "id": 1, "nama": "Tidak mampu ", "descNilai": "0" }, { "id": 2, "nama": "Butuh bantuan 2 orang untuk bisa duduk", "descNilai": "1" }, { "id": 3, "nama": "Bantuan Kecil (1 orang)", "descNilai": "2" }, { "id": 4, "nama": "Mandiri     ", "descNilai": "3" }] }
            ]
            $scope.listMobilitas = [
                { "id": 9, "nama": "Mobilitas", "detail": [{ "id": 1, "nama": "Immobile (tidak mampu)", "descNilai": "0" }, { "id": 2, "nama": "Menggunakan Kursi Roda", "descNilai": "1" }, { "id": 3, "nama": "Berjalan dengan bantuan 1 orang", "descNilai": "2" }, { "id": 4, "nama": "Mandiri      ", "descNilai": "3" }] }
            ]
            $scope.listTangga = [
                { "id": 10, "nama": "Naik Turun Tangga", "detail": [{ "id": 1, "nama": "Tidak mampu   ", "descNilai": "0" }, { "id": 2, "nama": "Membutuhkan bantuan", "descNilai": "1" }, { "id": 3, "nama": "Mandiri       ", "descNilai": "2" }] }
            ]
            $scope.listRiwayatJatuh = [
                {
                    "id": 11, "nama": "Riwayat Jatuh dalam 3 bulan terakhir",
                    "detail": [
                        { "id": 1, "nama": "Tidak ada", "descNilai": "0" },
                        { "id": 2, "nama": "Ada", "descNilai": "25" },
                    ]
                }
            ]
            $scope.listDiagnosisSekunder = [
                {
                    "id": 12, "nama": "Diagnosis Sekunder > 1",
                    "detail": [
                        { "id": 1, "nama": "Tidak ", "descNilai": "0" },
                        { "id": 2, "nama": "Ya ", "descNilai": "25" },
                    ]
                }
            ]
            $scope.listAlatBantuJalan = [
                {
                    "id": 13, "nama": "Alat Bantu Jalan",
                    "detail": [
                        { "id": 1, "nama": "Bed rest/ Kursi Roda/ Tidak ada ", "descNilai": "0" },
                        { "id": 2, "nama": "Penopang tongkat/ walker ", "descNilai": "15" },
                        { "id": 3, "nama": "Furnitur ", "descNilai": "30" },
                    ]
                }
            ]
            $scope.listAkses = [
                {
                    "id": 14, "nama": "Akses IV",
                    "detail": [
                        { "id": 1, "nama": "Tidak ada   ", "descNilai": "0" },
                        { "id": 2, "nama": "Ada   ", "descNilai": "25" },

                    ]
                }
            ]
            $scope.listCaraBerjalan = [
                {
                    "id": 15, "nama": "Cara berjalan/ berpindah",
                    "detail": [
                        { "id": 1, "nama": "Normal/ bed rest/ imobilisasi   ", "descNilai": "0" },
                        { "id": 2, "nama": "Lemah   ", "descNilai": "15" },
                        { "id": 3, "nama": "Terganggu   ", "descNilai": "30" },
                    ]
                }
            ]
            $scope.listStatusMental = [
                {
                    "id": 16, "nama": "Cara berjalan/ berpindah",
                    "detail": [
                        { "id": 1, "nama": "Normal/ bed rest/ imobilisasi   ", "descNilai": "0" },
                        { "id": 2, "nama": "Lemah   ", "descNilai": "15" },
                        { "id": 3, "nama": "Terganggu   ", "descNilai": "30" },
                    ]
                }
            ]

            $scope.getdata = function () {
                var objectfk = "SFS";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        $scope.dataSkrining = e.data.data;
                        if ($scope.dataSkrining.length != 0) {
                            for (var i = 0; i < $scope.dataSkrining.length; i++) {
                                if ($scope.dataSkrining[i].objectfk == "SFS-000001") {
                                    $scope.noRecAlatBantu = $scope.dataSkrining[i].norec
                                    $scope.item.alatBantu = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.alatBantu !== undefined) {
                                        $scope.check1 = true;
                                    }
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000002") {
                                    $scope.noRecProthesa = $scope.dataSkrining[i].norec
                                    $scope.item.prothesa = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.prothesa !== undefined) {
                                        $scope.check2 = true;
                                    }
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000003") {
                                    $scope.noRecCacatTubuh = $scope.dataSkrining[i].norec
                                    $scope.item.cacatTubuh = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.cacatTubuh !== undefined) {
                                        $scope.check3 = true;
                                    }
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000004") {
                                    $scope.noRecAktivitas = $scope.dataSkrining[i].norec
                                    $scope.item.aktivitas = $scope.dataSkrining[i].nilai;
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000005") {
                                    $scope.noRecMakan = $scope.dataSkrining[i].norec
                                    $scope.item.makan = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.makan === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 1,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.makan === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 1,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.makan === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 1,
                                            "descNilai": '2'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listMakan[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000006") {
                                    $scope.noRecMandi = $scope.dataSkrining[i].norec
                                    $scope.item.mandi = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.mandi === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 2,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.mandi === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 2,
                                            "descNilai": '1'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listMandi[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000007") {
                                    $scope.noRecPerawatan = $scope.dataSkrining[i].norec
                                    $scope.item.perawatan = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.perawatan === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 3,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.perawatan === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 3,
                                            "descNilai": '1'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listPerawatan[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000008") {
                                    $scope.noRecBerpakaian = $scope.dataSkrining[i].norec
                                    $scope.item.berpakaian = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.berpakaian === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 4,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.berpakaian === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 4,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.berpakaian === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 4,
                                            "descNilai": '2'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listBerpakaian[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000009") {
                                    $scope.noRecBab = $scope.dataSkrining[i].norec
                                    $scope.item.bab = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.bab === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 5,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.bab === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 5,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.bab === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 5,
                                            "descNilai": '2'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listBab[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000010") {
                                    $scope.noRecBak = $scope.dataSkrining[i].norec
                                    $scope.item.bak = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.bak === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 6,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.bak === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 6,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.bak === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 6,
                                            "descNilai": '2'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listBak[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000011") {
                                    $scope.noRecPenggunaan = $scope.dataSkrining[i].norec
                                    $scope.item.penggunaan = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.penggunaan === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 7,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.penggunaan === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 7,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.penggunaan === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 7,
                                            "descNilai": '2'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listPenggunaan[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000012") {
                                    $scope.noRecTransfer = $scope.dataSkrining[i].norec
                                    $scope.item.transfer = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.transfer === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 8,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.transfer === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 8,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.transfer === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 8,
                                            "descNilai": '2'
                                        }
                                    }
                                    if ($scope.item.transfer === "4") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 8,
                                            "descNilai": '3'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listTransfer[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000013") {
                                    $scope.noRecMobilitas = $scope.dataSkrining[i].norec
                                    $scope.item.mobilitas = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.mobilitas === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 9,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.mobilitas === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 9,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.mobilitas === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 9,
                                            "descNilai": '2'
                                        }
                                    }
                                    if ($scope.item.mobilitas === "4") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 9,
                                            "descNilai": '3'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listMobilitas[0], temp);
                                }
                                if ($scope.dataSkrining[i].objectfk == "SFS-000014") {
                                    $scope.noRecTangga = $scope.dataSkrining[i].norec
                                    $scope.item.tangga = $scope.dataSkrining[i].nilai;
                                    if ($scope.item.tangga === "1") {
                                        var temp = {
                                            "id": 1,
                                            "idParent": 10,
                                            "descNilai": '0'
                                        }
                                    }
                                    if ($scope.item.tangga === "2") {
                                        var temp = {
                                            "id": 2,
                                            "idParent": 10,
                                            "descNilai": '1'
                                        }
                                    }
                                    if ($scope.item.tangga === "3") {
                                        var temp = {
                                            "id": 3,
                                            "idParent": 10,
                                            "descNilai": '2'
                                        }
                                    }
                                    $scope.cekTotalSkor($scope.listTangga[0], temp);
                                }
                            }
                        }
                    })
            }
            $scope.getdata();

            $scope.cekTotalSkor = function (data, stat) {
                data.value = stat.id;
                data.descNilai = stat.descNilai;
                var result = $.grep($scope.arrParameterRawatInap, function (e) {
                    return e.idParent == data.id;
                });
                var tempData = {
                    "id": stat.id,
                    "idParent": data.id,
                    "descNilai": stat.descNilai,
                    "nama": stat.nama,
                    "value": "true"
                }
                if (result.length == 0) {
                    // debugger;
                    $scope.arrParameterRawatInap.push(tempData);
                    console.log(JSON.stringify($scope.arrParameterRawatInap));
                } else {
                    for (var i = 0; i < $scope.arrParameterRawatInap.length; i++)
                        if ($scope.arrParameterRawatInap[i].idParent && $scope.arrParameterRawatInap[i].idParent === data.id) {
                            $scope.arrParameterRawatInap.splice(i, 1);
                            break;
                        }
                    $scope.arrParameterRawatInap.push(tempData);
                    console.log(JSON.stringify($scope.arrParameterRawatInap));
                    // debugger;
                }
                $scope.getTotalSkor();
                // debugger;
            }
            $scope.getTotalSkor = function () {
                var skorAwal = 0;
                $scope.arrParameterRawatInap.forEach(function (data) {
                    skorAwal += parseInt(data.descNilai);
                    // debugger;
                })
                $scope.totalSkor = skorAwal
            }

            $scope.Save = function () {
                var dataForm = [];
                var tempData = [];

                if ($scope.item.alatBantu !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecAlatBantu,
                        objectfk: "SFS-000001",
                        nilai: $scope.item.alatBantu.toString(),
                        satuan: "-",
                        jenisobject: "textbox"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.prothesa !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecProthesa,
                        objectfk: "SFS-000002",
                        nilai: $scope.item.prothesa.toString(),
                        satuan: "-",
                        jenisobject: "textbox"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.cacatTubuh !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecCacatTubuh,
                        objectfk: "SFS-000003",
                        nilai: $scope.item.cacatTubuh.toString(),
                        satuan: "-",
                        jenisobject: "textbox"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.aktivitas !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecAktivitas,
                        objectfk: "SFS-000004",
                        nilai: $scope.item.aktivitas.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.makan !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecMakan,
                        objectfk: "SFS-000005",
                        nilai: $scope.item.makan.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.mandi !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecMandi,
                        objectfk: "SFS-000006",
                        nilai: $scope.item.mandi.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.perawatan !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecPerawatan,
                        objectfk: "SFS-000007",
                        nilai: $scope.item.perawatan.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.berpakaian !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecBerpakaian,
                        objectfk: "SFS-000008",
                        nilai: $scope.item.berpakaian.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.bab !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecBab,
                        objectfk: "SFS-000009",
                        nilai: $scope.item.bab.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }

                if ($scope.item.bak !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecBak,
                        objectfk: "SFS-000010",
                        nilai: $scope.item.bak.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.penggunaan !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecPenggunaan,
                        objectfk: "SFS-000011",
                        nilai: $scope.item.penggunaan.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.transfer !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecTransfer,
                        objectfk: "SFS-000012",
                        nilai: $scope.item.transfer.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.mobilitas !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecMobilitas,
                        objectfk: "SFS-000013",
                        nilai: $scope.item.mobilitas.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                if ($scope.item.tangga !== undefined) {
                    var tmpDataFungsi = {
                        norec: $scope.noRecTangga,
                        objectfk: "SFS-000014",
                        nilai: $scope.item.tangga.toString(),
                        satuan: "-",
                        jenisobject: "radio button"
                    }
                    tempData.push(tmpDataFungsi);
                }
                for (var i = tempData.length - 1; i >= 0; i--) {
                    if (tempData[i].nilai == undefined) {
                        tempData.splice([i], 1)
                    }
                    if (tempData[i].norec == undefined) {
                        tempData[i].norec = '-'
                    }

                }
                // debugger;
                var jsonSave = {
                    data: tempData,
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap
                }
                ManagePhp.saveData(jsonSave).then(function (e) {
                    $scope.arrParameterRawatInap = [];
                    $scope.getdata();
                    ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa', $state.params.noRec, 'Status Fungsional').then(function (res) {
                    })
                });
            }
        }
    ]);
});