
define(['main'],
    function (main) {
        'use strict';
        var modelService = angular.module('Models', ['ngResource']);
        modelService.service('PatientModel', function () {
            var model = {
                KdProfile: '',
                NoCM: '',
                KdTitle: '',
                NamaPasien: '',
                KdJenisKelamin: '',
                TempatLahir: '',
                TglLahir: '',
                NoIdentitas: '',
                NoIdentitasDetail: '',
                KdNegara: '',
                KdStatusPerkawinan: '',
                KdAgama: '',
                KdPendidikan: '',
                KdPekerjaan: '',
                PoliTujuan: '',
                TglDaftar: '',
                Attributes: [
                    {
                        Name: 'KdProfile',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Profile tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Profile'
                        }
                    }, {
                        Name: 'NoCM',
                        IsNull: false,
                        Type: 'STRING',
                        Max: 15,
                        MessageMaxLength: 'No Catatan Medik tidak boleh melebihi 15 Karakter',
                        MessageNotNull: 'No Catatan Medik tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'No Catatan Medik'
                        }
                    }, {
                        Name: 'KdTitle',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Nama Depan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Nama Depan'
                        }
                    }, {
                        Name: 'NamaPasien',
                        IsNull: true,
                        Type: 'STRING',
                        Max: 40,
                        MessageMaxLength: 'Nama Pasien tidak boleh melebihi 40 Karakter',
                        MessageNotNull: 'Nama Pasien tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Nama Pasien'
                        }
                    }, {
                        Name: 'KdJenisKelamin',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Jenis Kelamin tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Jenis Kelamin'
                        }
                    }, {
                        Name: 'TempatLahir',
                        IsNull: false,
                        Type: 'STRING',
                        Max: 30,
                        MessageMaxLength: 'Tempat Lahir tidak boleh melebihi 30 Karakter',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Tempat Lahir'
                        }
                    }, {
                        Name: 'TglLahir',
                        IsNull: true,
                        Type: 'DATE',
                        MessageNotNull: 'Tanggal Lahir tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Tanggal Lahir'
                        }
                    }, {
                        Name: 'NoIdentitas',
                        IsNull: false,
                        Type: 'STRING',
                        Max: 30,
                        MessageMaxLength: 'No Identitas tidak boleh melebihi 30 Karakter',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'No Identitas'
                        }
                    }, {
                        Name: 'NoIdentitasDetail',
                        IsNull: false,
                        Type: 'STRING',
                        Max: 30,
                        MessageMaxLength: 'No Identitas tidak boleh melebihi 30 Karakter',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'No Identitas'
                        }
                    }, {
                        Name: 'KdNegara',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Negara tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Negara'
                        }
                    }, {
                        Name: 'UmurTahun',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Tahun tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Tahun'
                        }
                    }, {
                        Name: 'UmurBulan',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Bulan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Bulan'
                        }
                    }, {
                        Name: 'UmurHari',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'hari tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Hari'
                        }
                    }, {
                        Name: 'AlamatPasien',
                        IsNull: true,
                        Max: 150,
                        Type: 'string',
                        MessageNotNull: 'Alamat Pasien tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Alamat Lengkap Pasien'
                        }
                    }, {
                        Name: 'RtRw',
                        IsNull: true,
                        Type: 'STRING',
                        MessageNotNull: 'RT / RW  tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'RT/RW'
                        }
                    }, {
                        Name: 'KodePos',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Kode Pos tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Kode Pos'
                        }
                    }, {
                        Name: 'Kelurahan',
                        IsNull: true,
                        Type: 'string',
                        MessageNotNull: 'Kelurahan atau Desa tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Kelurahan/Desa'
                        }
                    }, {
                        Name: 'Kecamatan',
                        IsNull: true,
                        Type: 'STRING',
                        MessageNotNull: 'Kecamatan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Kecamatan'
                        }
                    }, {
                        Name: 'KotaKabupaten',
                        IsNull: true,
                        Type: 'STRING',
                        MessageNotNull: 'Kota Kabupaten tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Kota/Kabupaten'
                        }
                    }, {
                        Name: 'Propinsi',
                        IsNull: true,
                        Type: 'STRING',
                        MessageNotNull: 'Propinsi tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Propinsi'
                        }
                    }, {
                        Name: 'JenisPasien',
                        IsNull: true,
                        Type: 'string',
                        MessageNotNull: 'Jenis Pasien tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Jenis Pasien'
                        }
                    }, {
                        Name: 'JenisPelayanan',
                        IsNull: true,
                        Type: 'string',
                        MessageNotNull: 'Jenis Pelayanan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Jenis Pelayanan'
                        }
                    }, {
                        Name: 'PoliTujuan',
                        IsNull: true,
                        Type: 'string',
                        MessageNotNull: 'Poli Tujuan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Poli Tujuan'
                        }
                    }, {
                        Name: 'KdStatusPerkawinan',
                        IsNull: false,
                        Type: 'INTEGER',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Status Perkawinan'
                        }
                    }, {
                        Name: 'KdAgama',
                        IsNull: false,
                        Type: 'INTEGER',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Agama'
                        }
                    }, {
                        Name: 'KdPendidikan',
                        IsNull: true,
                        Type: 'STRING',
                        Max: 2,
                        MessageMaxLength: 'Kode  Pendidikan tidak boleh melebihi 2 Karakter',
                        MessageNotNull: 'Pendidikan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Pendidikan'
                        }
                    }, {
                        Name: 'KdPekerjaan',
                        IsNull: true,
                        Type: 'INTEGER',
                        MessageNotNull: 'Pekerjaan tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Pekerjaan'
                        }
                    }, {
                        Name: 'TglDaftar',
                        IsNull: true,
                        Type: 'DATE',
                        MessageNotNull: 'Tanggal Daftar tidak boleh kosong',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Tanggal Daftar'
                        }
                    }, {
                        Name: 'DaftarPasienReservasi',
                        IsNull: false,
                        Type: 'string',
                        Caption: {
                            cultur: 'id-id',
                            Value: 'Daftar Pasien Reservasi'
                        }
                    }
                ]
            };
            return {
                get() {
                    return model;
                },
                set: function (value) {
                    model = value;
                },
                new:function() {
                    for (var i in model) {
                        if (i !== 'Attributes') {
                            model[i] = '';
                        }
                    }
                }
            }
        });
        return modelService;

    });