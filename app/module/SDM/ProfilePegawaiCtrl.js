define(['initialize'], function (initialize) {
    'use strict';
    // initialize.controller('DataPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem','JenisSk','RekamDataPegawai','StatusPerkawinan','ManageSdm','ManageSdmNew','FindSdm',
    initialize.controller('ProfilePegawaiCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', 'DateHelper', '$timeout', 'CetakHelper', '$mdDialog',
        function ($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, DaftarPegawaiService, dataHelper, FindSdm, dateHelper, $timeout, cetakHelper, $mdDialog) {
            $scope.item = {};
            let dataPegawai = JSON.parse(localStorage.getItem('pegawai')),
                idPegawai = dataPegawai.id;

            ManageSdmNew.getListData("pegawai/get-pegawai-detail-by-customs/" + idPegawai).then(function (res) {
                $scope.item = res.data.data;
                $scope.item.tglLahir = $scope.item.tglLahir ? dateHelper.formatDate($scope.item.tglLahir, "DD MMM YYYY") : "-";
                $scope.item.tglMasuk = $scope.item.tglMasuk ? dateHelper.formatDate($scope.item.tglMasuk, "DD MMM YYYY") : "-";
                $scope.item.tglkeluar = $scope.item.tglkeluar ? dateHelper.formatDate($scope.item.tglkeluar, "DD MMM YYYY") : "-";
                $scope.item.tglPensiun = $scope.item.tglPensiun ? dateHelper.formatDate($scope.item.tglPensiun, "DD MMM YYYY") : "-";
                $scope.item.tglTerbitSip = $scope.item.tglTerbitSip ? dateHelper.formatDate($scope.item.tglTerbitSip, "DD MMM YYYY") : "-";
                $scope.item.tglTerbitStr = $scope.item.tglTerbitStr ? dateHelper.formatDate($scope.item.tglTerbitStr, "DD MMM YYYY") : "-";
                $scope.item.tglBerakhirSip = $scope.item.tglBerakhirSip ? dateHelper.formatDate($scope.item.tglBerakhirSip, "DD MMM YYYY") : "-";
                $scope.item.tglBerakhirStr = $scope.item.tglBerakhirStr ? dateHelper.formatDate($scope.item.tglBerakhirStr, "DD MMM YYYY") : "-";

                $scope.item.pangkat = $scope.item.pangkat ? $scope.item.pangkat.namaPangkat : "-";
                $scope.item.pensiun = $scope.item.pensiun ? $scope.item.pensiun : "-";
                $scope.item.golonganDarah = $scope.item.golonganDarah ? $scope.item.golonganDarah.golonganDarah : "-";
                $scope.item.golonganPangkat = $scope.pangkat ? $scope.pangkat.golonganPegawai.golonganPegawai : "-";
                $scope.item.eselon = $scope.item.eselon ? $scope.item.eselon.eselon : "-"

                $scope.item.noSip = $scope.item.noSip ? $scope.item.noSip : "-"
                $scope.item.noStr = $scope.item.noStr ? $scope.item.noStr : "-"

                $scope.item.nip = $scope.item.nip ? $scope.item.nip : '-'

                if ($scope.item.isMenanggung) {
                    $scope.item.isMenanggung = "Ya";
                } else {
                    $scope.item.isMenanggung = "Tidak";
                }
                console.log($scope.item);
            });

            ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + idPegawai).then(function (data) {
                $scope.dataSourceJabatanInternal = new kendo.data.DataSource({
                    data: data.data.data,
                    pageSize: 5
                });
                // console.log(data.data.data)
                $scope.isRouteLoading = false;
            });

            $scope.gridJabatanInternal = {
                pageable: true,
                columns: [
                    {
                        field: "jenisJabatan",
                        title: "<h3 class='small-font'>Jenis<br>Jabatan</h3>", width: "100px",
                        template: "#if(jenisJabatan) { # #= jenisJabatan.jenisJabatan # #} else { #-# } #",
                    },
                    {
                        field: "jabatan",
                        title: "<h3 class='small-font'>Jabatan</h3>", width: "150px",
                        template: "#if(jabatan) { # #= jabatan.namaJabatan # #} else { #-# } #",
                    },
                    {
                        field: "unitKerjaPegawai",
                        title: "<h3 class='small-font'>Unit Kerja</h3>", width: "200px",
                        template: "#if(unitKerjaPegawai) { # #= unitKerjaPegawai.name # #} else { #-# } #",
                    }, // editor: unitDropDownEditor, template: "#= unitKerja.name #"},
                    {
                        field: "subUnitKerjaPegawai",
                        title: "<h3 class='small-font'>Sub<br>Unit Kerja</h3>", width: "150px",
                        template: "#if(subUnitKerjaPegawai) { # #= subUnitKerjaPegawai.name # #} else { #-# } #",
                    },
                    {
                        field: "atasanLangsung",
                        title: "<h3 class='small-font'>Atasan<br>Langsung</h3>", width: "150px",
                        template: "#if(!atasanLangsungDireksi) { # #= atasanLangsung.namaLengkap # #} else { # #=atasanLangsungDireksi# # } #"
                    },
                    {
                        field: "pejabatPenilai",
                        title: "<h3 class='small-font'>Atasan<br>Pejabat Penilai</h3>", width: "150px",
                        template: "#if(!pejabatPenilaiDireksi) { # #= pejabatPenilai.namaLengkap # #} else { # #=pejabatPenilaiDireksi# # } #"
                    },
                    {
                        field: "atasanLangsungDireksi",
                        title: "<h3 class='small-font'>Atasan<br>Langsung</h3>", width: "150px",
                        hidden: true
                    },
                    {
                        field: "pejabatPenilaiDireksi",
                        title: "<h3 class='small-font'>Pejabat<br>Penilai</h3>", width: "150px",
                        hidden: true
                    },
                    {
                        field: "isPrimary",
                        title: "<h3 class='small-font'>Jabatan<br> Utama</h3>", width: "70px",
                        template: "#if(isPrimary) { #Ya# } else { #Tidak# } #",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    },
                    {
                        field: "isMonitoring",
                        title: "<h3 class='small-font'>Monitoring</h3>", width: "80px",
                        template: "#if(isMonitoring) { #Ya# } else { #Tidak# } #",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    },
                    {
                        field: "isCanCreateJadwal",
                        title: "<h3 class='small-font'>Membuat<br> Jadwal</h3>", width: "100px",
                        template: "#if(isCanCreateJadwal) { #Ya# } else { #Tidak# } #",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    }],
            };
        }
    ]);
});