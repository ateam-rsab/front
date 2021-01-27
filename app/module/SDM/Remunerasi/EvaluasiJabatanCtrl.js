define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('EvaluasiJabatanCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.item = {};
            $scope.pegawai = {};
            $scope.data = {};
            var totalNilai = "";
            $scope.totalNilaiJabatan = "";
            $scope.grade = "";
            $scope.detailGrade = "";
            $scope.isSimpanDisabled = true;

            modelItem.getDataDummyGeneric('Ruangan').then(function (e) {
                $scope.ruangans = _.sortBy(e, function (i) {
                    return i.namaRuangan;
                });
            });

            ManageSdmNew.getListData("service/list-generic/?view=Jabatan&select=id,namaJabatan,kelompokJabatanId&criteria=statusEnabled,kdJabatan&values=true,ANJAB").then((res) => {

                $scope.listJabatan = res.data;
            })

            $scope.getDataKelompokJabatan = () => {
                ManageSdmNew.getListData("service/list-generic/?view=NilaiKelompokJabatan&select=id,detailKelompokJabatan,nilaiTerendah,nilaiTertinggi&criteria=statusEnabled,kelompokJabatanId&values=true," + $scope.data.jabatan.kelompokJabatanId).then((res) => {

                    $scope.listKelompokJabatan = res.data;
                })
            }

            $scope.getRuangan = function (employee) {
                if (!employee) return;
                if (employee.ruanganId) {
                    $scope.data.ruangan = {
                        id: employee.ruanganId
                    }
                }
            }

            $scope.choose = function (item) {
                $scope.totalNilaiJabatan = "";
                $scope.grade = "";
                $scope.detailGrade = "";

                $scope.pegawai = item;
                $scope.item = item;
                $scope.item.totalNilaiJabatan = "";

            }

            $scope.listFaktor = [];
            modelItem.getDataDummyGeneric('MapFaktorEvaluasi').then(function (e) {
                $scope.map = e;
                modelItem.getDataDummyGeneric('FaktorEvaluasi').then(function (e) {
                    var arr = _.groupBy(e, "faktor");
                    $scope.listFaktor1 = _.sortBy(arr["Faktor 1"], "profile");
                    $scope.listFaktor2 = _.sortBy(arr["Faktor 2"], "profile");
                    $scope.listFaktor3 = _.sortBy(arr["Faktor 3"], "profile");
                    $scope.listFaktor4 = _.sortBy(arr["Faktor 4"], "profile");
                    $scope.listFaktor5 = _.sortBy(arr["Faktor 5"], "profile");
                    $scope.listFaktor7 = _.sortBy(arr["Faktor 7"], "profile");
                    $scope.listFaktor8 = _.sortBy(arr["Faktor 8"], "profile");
                    $scope.listFaktor9 = _.sortBy(arr["Faktor 9"], "profile");
                    $scope.listFaktor10 = _.sortBy(arr["Faktor 10"], "profile");
                    var temp = [];
                    for (var key in arr) {
                        if (arr.hasOwnProperty(key)) {
                            var element = arr[key];
                            temp.push(key);
                        }
                    }
                    $scope.listFaktor = arr;
                    $scope.listFaktorA = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('A') >= 0;
                    })
                    $scope.listFaktorB = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('B') >= 0;
                    })
                    $scope.listFaktorC = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('C') >= 0;
                    })
                    $scope.listFaktorD = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('D') >= 0;
                    })
                    $scope.listFaktorE = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('E') >= 0;
                    })
                    $scope.listFaktorF = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('F') >= 0;
                    })
                    $scope.listFaktorG = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('G') >= 0;
                    })
                    $scope.listFaktorH = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('H') >= 0;
                    })
                    $scope.listFaktorI = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('I') >= 0;
                    })
                    $scope.listFaktorJ = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('J') >= 0;
                    })
                    $scope.listFaktorK = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('K') >= 0;
                    })
                    $scope.listFaktorL = _.filter($scope.listFaktor['Faktor 6'], function (e) {
                        return e.profile.indexOf('L') >= 0;
                    })

                    $scope.listFaktorD = _.sortBy($scope.listFaktorD, 'profile');
                    $scope.listFaktorJ = _.sortBy($scope.listFaktorJ, 'profile');
                })
            });

            $scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({
                    id: i
                });
            $scope.listMonth = [];
            for (var i = 0; i <= 11; i++)
                $scope.listMonth.push({
                    id: dateHelper.toMonthNum(i),
                    name: dateHelper.toMonth(i)
                });

            $scope.$watch('selectedTahun', function (e) {
                if (e === undefined) return;
            });
            $scope.$watch('selectedBulan', function (e) {
                if (e === undefined) return;
            });

            $scope.selectedBulan = $scope.listMonth[new Date().getMonth()];
            $scope.selectedTahun = $scope.listTahun[$scope.listTahun.length - 1];

            let validate = () => {
                if (!$scope.data.jabatan) {
                    toastr.warning("Harap pilih Jabatan", "Simpan Gagal");
                    return false;
                }
                if (!$scope.data.kelompokJabatan) {
                    toastr.warning("Harap pilih Kelompok Jabatan", "Simpan Gagal");
                    return false;
                }

                if (!$scope.item.faktor1) {
                    toastr.warning("Harap pilih Faktor 1 (Komtek)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor2) {
                    toastr.warning("Harap pilih Faktor 2 (Manajerial)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor3) {
                    toastr.warning("Harap pilih Faktor 3 (Komunikasi)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor4) {
                    toastr.warning("Harap pilih Faktor 4 (Analisa)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor5) {
                    toastr.warning("Harap pilih Faktor 5 (Pedoman)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor7) {
                    toastr.warning("Harap pilih Faktor 7 (Wewenang)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor8) {
                    toastr.warning("Harap pilih Faktor 8 (Harta)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor9) {
                    toastr.warning("Harap pilih Faktor 9 (Peran Jabatan)", " Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktor10) {
                    toastr.warning("Harap pilih Faktor 10 (Pobabilitas Resiko)", " Simpan Gagal");
                    return false;
                }

                if (!$scope.item.faktorA) {
                    toastr.warning("Harap pilih Faktor A", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorB) {
                    toastr.warning("Harap pilih Faktor B", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorC) {
                    toastr.warning("Harap pilih Faktor C", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorD) {
                    toastr.warning("Harap pilih Faktor D", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorE) {
                    toastr.warning("Harap pilih Faktor E", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorF) {
                    toastr.warning("Harap pilih Faktor F", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorG) {
                    toastr.warning("Harap pilih Faktor G", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorH) {
                    toastr.warning("Harap pilih Faktor H", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorI) {
                    toastr.warning("Harap pilih Faktor I", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorJ) {
                    toastr.warning("Harap pilih Faktor J", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorK) {
                    toastr.warning("Harap pilih Faktor K", "Simpan Gagal");
                    return false;
                }
                if (!$scope.item.faktorL) {
                    toastr.warning("Harap pilih Faktor L", "Simpan Gagal");
                    return false;
                }

                return true
            }

            $scope.Save = function () {
                if (!totalNilai) {
                    $scope.Hitung();
                    return;
                }

                if (!validate()) {
                    return;
                }

                let dataSave = {
                    faktorA: getListFaktor($scope.listFaktorA, $scope.item.faktorA.id),
                    faktorB: getListFaktor($scope.listFaktorB, $scope.item.faktorB.id),
                    faktorC: getListFaktor($scope.listFaktorC, $scope.item.faktorC.id),
                    faktorD: getListFaktor($scope.listFaktorD, $scope.item.faktorD.id),
                    faktorE: getListFaktor($scope.listFaktorE, $scope.item.faktorE.id),
                    faktorF: getListFaktor($scope.listFaktorF, $scope.item.faktorF.id),
                    faktorG: getListFaktor($scope.listFaktorG, $scope.item.faktorG.id),
                    faktorH: getListFaktor($scope.listFaktorH, $scope.item.faktorH.id),
                    faktorI: getListFaktor($scope.listFaktorI, $scope.item.faktorI.id),
                    faktorJ: getListFaktor($scope.listFaktorJ, $scope.item.faktorJ.id),
                    faktorK: getListFaktor($scope.listFaktorK, $scope.item.faktorK.id),
                    faktorL: getListFaktor($scope.listFaktorL, $scope.item.faktorL.id),

                    faktor1: $scope.item.faktor1,
                    faktor2: $scope.item.faktor2,
                    faktor3: $scope.item.faktor3,
                    faktor4: $scope.item.faktor4,
                    faktor5: $scope.item.faktor5,
                    faktor7: $scope.item.faktor7,
                    faktor8: $scope.item.faktor8,
                    faktor9: $scope.item.faktor9,
                    faktor10: $scope.item.faktor10,
                    jabatan: {
                        id: $scope.data.jabatan.id
                    },
                    tahun: $scope.selectedTahun.id.toString(),
                    statusEnabled: true,
                    kdProfile: 0,
                    bulan: $scope.selectedBulan.id,
                    totalNilai: totalNilai
                }

                ManageSdmNew.saveData(dataSave, "sdm/save-evaluasi-jabatan").then(function (e) {
                    $scope.temp = "";
                    $scope.refresh();
                    $scope.totalNilaiJabatan = "";
                    $scope.grade = "";
                    $scope.detailGrade = "";
                    $scope.item = "";
                });
            };

            function getListFaktor(listFaktor, idfaktor) {
                var faktorItem = {};
                for (var key in listFaktor) {
                    if (listFaktor.hasOwnProperty(key)) {
                        var element = listFaktor[key];
                        if (element.id == idfaktor) {
                            faktorItem = element;
                            break;
                        }
                    }
                }
                return faktorItem;
            }

            //Hitung index Evaluasi Pegawai
            $scope.Hitung = function () {
                if (!validate()) {
                    return;
                }

                $rootScope.doneLoad = false;

                let dataSave = {
                    faktorA: getListFaktor($scope.listFaktorA, $scope.item.faktorA.id),
                    faktorB: getListFaktor($scope.listFaktorB, $scope.item.faktorB.id),
                    faktorC: getListFaktor($scope.listFaktorC, $scope.item.faktorC.id),
                    faktorD: getListFaktor($scope.listFaktorD, $scope.item.faktorD.id),
                    faktorE: getListFaktor($scope.listFaktorE, $scope.item.faktorE.id),
                    faktorF: getListFaktor($scope.listFaktorF, $scope.item.faktorF.id),
                    faktorG: getListFaktor($scope.listFaktorG, $scope.item.faktorG.id),
                    faktorH: getListFaktor($scope.listFaktorH, $scope.item.faktorH.id),
                    faktorI: getListFaktor($scope.listFaktorI, $scope.item.faktorI.id),
                    faktorJ: getListFaktor($scope.listFaktorJ, $scope.item.faktorJ.id),
                    faktorK: getListFaktor($scope.listFaktorK, $scope.item.faktorK.id),
                    faktorL: getListFaktor($scope.listFaktorL, $scope.item.faktorL.id),

                    faktor1: $scope.item.faktor1,
                    faktor2: $scope.item.faktor2,
                    faktor3: $scope.item.faktor3,
                    faktor4: $scope.item.faktor4,
                    faktor5: $scope.item.faktor5,
                    faktor6: $scope.item.faktor6,
                    faktor7: $scope.item.faktor7,
                    faktor8: $scope.item.faktor8,
                    faktor9: $scope.item.faktor9,
                    faktor10: $scope.item.faktor10,
                    jabatan: $scope.data
                }

                ManageSdmNew.saveData(dataSave, "sdm/hitung-grade-evaluasi-jabatan/").then(function (e) {

                    $scope.totalNilaiJabatan = Math.ceil(e.data.data.result);
                    totalNilai = Math.ceil(e.data.data.result);
                    if (totalNilai < $scope.data.kelompokJabatan.nilaiTerendah || totalNilai > $scope.data.kelompokJabatan.nilaiTertinggi) {
                        $scope.isSimpanDisabled = true;

                        if (totalNilai < $scope.data.kelompokJabatan.nilaiTerendah) toastr.info("Total Perhitungan Nilai Jabatan Kurang dari Batas Bawah");
                        if (totalNilai > $scope.data.kelompokJabatan.nilaiTertinggi) toastr.info("Total Perhitungan Nilai Jabatan Lebih dari Batas Atas");
                    } else {
                        $scope.isSimpanDisabled = false;
                    }

                    $scope.grade = e.data.data.grade ? e.data.data.grade : "-";
                    $scope.detailGrade = e.data.data.detailGrade ? e.data.data.detailGrade : "-";

                });
                $rootScope.doneLoad = true;
            };

            //Tombol Batal
            $scope.Back = function () {
                $scope.item = "";
            };

            //Refresh
            $scope.refresh = function () {
                $scope.totalNilaiJabatan = "";
                $scope.grade = "";
                $scope.detailGrade = "";
                $scope.total = 0;
                $scope.item = "";
                if ($scope.selectedBulan === undefined || $scope.selectedTahun === undefined || ($scope.data !== undefined && $scope.data.ruangan === undefined)) {
                    return;
                }
                $rootScope.doneLoad = false;
                $scope.listData = [];
                $rootScope.doneLoad = false;
                $q.all([
                    manageSdm.getOrderList("sdm/get-list-master-evaluasi?tahun=" + $scope.selectedTahun.id + "&bulan=" + $scope.selectedBulan.name),
                    findPegawai.getDataEvaluasi($scope.data.ruangan.id, $scope.selectedTahun.id, $scope.selectedBulan.name)
                ]).then(function (data) {
                    //Data Pegawai
                    var arr = [];
                    $rootScope.doneLoad = true;

                    $scope.listData = arr;


                });

            }
        }
    ])
});