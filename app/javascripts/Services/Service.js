define(['Configuration'], function (config) {

    var genericServices = angular.module('Services', ['ngResource']);

    var urlPrinting = config.urlPrinting;

    var urlReporting = config.urlReporting;

    var ulrReportingPhp = config.urlDataTableMaster_Akuntansi;

    genericServices.factory('socket', function ($rootScope) {

        var socket = null;

        try {
            socket = io.connect(urlSocket);
        } catch (err) {

        }

        var container = [];

        return {
            on: function (eventName, callback) {
                console.log('Client socket (ON) triggered');
                if (socket == null) {
                    return;
                }
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            off: function (eventName) {
                console.log('Client socket (OFF) triggered');
                if (socket == null) {
                    return;
                }
                socket.off(eventName);
            },
            emit: function (eventName, data, callback) {
                console.log('Client socket (EMIT) triggered');
                if (socket == null) {
                    return;
                }
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            },
            subscribe: function (queueName) {
                if (queueName !== undefined) {
                    container.push(queueName);
                } else {
                    throw 'Error: Queue name cannot be empty or undefined';
                }
            },
            unsubscribe: function () {

            }
        };
    });

    genericServices.factory('CetakHelper', ['$q', '$http',
        function ($q, $http) {
            return {
                open: function (urlLaporan) {
                    var str = document.cookie;
                    str = str.split('; ');
                    var result = {};
                    for (var i = 0; i < str.length; i++) {
                        var cur = str[i].split('=');
                        result[cur[0]] = cur[1];
                    }
                    // var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                    return urlPrinting + urlLaporan + '&X-AUTH-TOKEN=' + result['authorization'];
                },
                openURLReporting: function (urlLaporan) {
                    var str = document.cookie;
                    str = str.split('; ');
                    var result = {};
                    for (var i = 0; i < str.length; i++) {
                        var cur = str[i].split('=');
                        result[cur[0]] = cur[1];
                    }
                    // var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                    return urlReporting + urlLaporan + '&X-AUTH-TOKEN=' + result['authorization'];
                },
            
            };

        }
    ]);


    genericServices.factory('ReportHelper', ['$q', '$http',
        function ($q, $http) {
            return {
                open: function (urlLaporan) {
                    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                    return urlPrinting + urlLaporan + '&X-AUTH-TOKEN=' + token;
                },
                get: function (url) {
                    var deffer = $q.defer();
                    $http.get(url).then(function successCallback(response) {
                        deffer.resolve(response);
                    }, function errorCallback(response, err, da) {
                        deffer.reject(response);
                    });
                    return deffer.promise;
                },
                
                openUrlPhp: function (urlLaporan) {                  
                  return ulrReportingPhp + urlLaporan ;
                }
            };

        }
    ]);

    genericServices.factory('CetakBedah', ['$q', '$http',
        function ($q, $http) {
            return {
                open: function (urlLaporan) {
                    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                    return urlPrinting + urlLaporan + '&X-AUTH-TOKEN=' + token;
                },
                get: function (url) {
                    var deffer = $q.defer();
                    $http.get(url).then(function successCallback(response) {
                        deffer.resolve(response);
                    }, function errorCallback(response, err, da) {
                        deffer.reject(response);
                    });
                    return deffer.promise;
                },
            };

        }
    ]);

    genericServices.factory('ReportPelayanan', ['$q', '$http',
        function ($q, $http) {
            return {
                open: function (urlLaporan) {
                    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                    return urlPrinting + urlLaporan + '&X-AUTH-TOKEN=' + token;
                },
                get: function (url) {
                    var deffer = $q.defer();
                    $http.get(url).then(function successCallback(response) {
                        deffer.resolve(response);
                    }, function errorCallback(response, err, da) {
                        deffer.reject(response);
                    });
                    return deffer.promise;
                },
            };

        }
    ]);
    genericServices.factory('Report', ['$q', '$http',
        function ($q, $http) {
            return {
                open: function (aUrl) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
        }
    ]);
    genericServices.factory('CacheHelper', [
        function () {
            var maps = [];

            return {
                get: function (name) {
                    var temp = window.localStorage.getItem('cacheHelper');
                    if (temp !== undefined && temp !== null && maps.length === 0)
                        maps = JSON.parse(temp);

                    for (var key in maps) {
                        if (maps.hasOwnProperty(key)) {
                            var element = maps[key];
                            if (element.name === name)
                                return element.value;
                        }
                    }
                    return undefined;
                },
                set: function (name, value) {
                    var item = undefined;
                    for (var key in maps) {
                        if (maps.hasOwnProperty(key)) {
                            var element = maps[key];
                            if (element.name === name) {
                                item = element;
                                maps[key] = {
                                    name: name,
                                    value: value
                                };
                                break;
                            }
                        }
                    }
                    if (item === undefined)
                        maps.push({
                            name: name,
                            value: value
                        });
                    else item = {
                        name: name,
                        value: value
                    };
                    window.localStorage.setItem('cacheHelper', JSON.stringify(maps));
                }
            };

        }
    ]);

    genericServices.factory('Profile', ['$resource', '$http',
        function ($resource, $http) {
            return $resource('App/GetProfile', {}, {
                query: {
                    method: 'GET',
                    params: {},
                    isArray: true
                }
            });

        }
    ]);
    genericServices.factory('DataHelper', [
        function () {
            return {
                isUndefinedField: function (data) {
                    var temp = "";
                    if (!_.isUndefined(data)) {
                        temp = data;
                    }
                    return temp;
                },
                isUndefinedObjectField: function (data) {
                    var temp = "";
                    if (!_.isUndefined(data)) {
                        temp = data.id;
                    }
                    return temp;
                }
            } //end return
        }
    ]);
    genericServices.factory('GetPasien', [
        function () {
            // debugger;
            var tahun = new Date().getFullYear().toString().substr(-2);
            var nomorBulan = [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
            ];
            var indexBulan = new Date().getMonth();
            var bulan = nomorBulan[indexBulan];
            return {
                getIdPasien: function (id, panjang) {
                    var stringId = String(id);
                    var idArray = stringId.split("");
                    var pengulangan = panjang - idArray.length;
                    var angkaDepan = ""
                    for (var i = 0; i < pengulangan; i++) {
                        angkaDepan += "0";
                    };
                    var pasienId = tahun + bulan + angkaDepan + id;
                    return pasienId;
                }
            }
        }
    ]);
    genericServices.factory('DateHelper', [
        function () { // birthday is a date
            var dayNumber = [
                "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
            ];
            var monthNames = [
                "Januari", "Februari", "Maret",
                "April", "Mei", "Juni", "Juli",
                "Agustus", "September", "Oktober",
                "November", "Desember"
            ];
            var monthNumber = [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
            ];
            var dates = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
            var dateShorts = ["S", "Se", "Ra", "K", "J", "Sa", "M"];
            return {
                toTimeStamp: function (date, sparator) {
                    if (date instanceof Date)
                        return Date.parse(date);

                    if (sparator === undefined)
                        sparator = '-';
                    // var arr = date.split('T')[0].split(sparator);
                    return Date.parse(moment(date)._d);
                },
                toMonth: function (i) { return monthNames[i] },
                toDate: function (date) {
                    var arr = date.split('T')[0].split('/');
                    if (arr.length >= 3)
                        return new Date(arr[2], arr[1] - 1, arr[0]);
                    arr = date.split('T')[0].split('-');
                    if (arr[2].length === 4)
                        return new Date(arr[2], arr[1] - 1, arr[0]);

                    if (arr[0].length === 4) {
                        var arrDetail = [];
                        if (arr[2].indexOf(':') > 0)
                            arrDetail = arr[2].split(' ')[1].split(':');
                        if (arrDetail.length > 0)
                            return new Date(arr[0], arr[1] - 1, arr[2].split(' ')[0], arrDetail[0], arrDetail[1], arrDetail[2]);
                        else return new Date(arr[0], arr[1] - 1, arr[2]);
                    }
                    return new Date(arr[0], arr[1] - 1, arr[2]);

                },
                formatDate: function (date, format) {
                    if (date === undefined)
                        return "";
                    return moment(date).format(format);
                },
                toDateFromTimestamp: function (date) {
                    date = new Date(date)
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    if(month < 10) {
                        month = '0' + month;
                    }
                    var fullDate = `${day}-${month}-${year}`;
                    return fullDate;
                },
                toTimestampFromDate: function (date) {
                    date = date.split('-');
                    var returnDate = date[1] + '/' + date[0] + '/' + date[2];
                    // var dateFormated = Math.round(new Date(date).getTime()/1000)
                    // console.log(dateFormated)
                    return new Date(returnDate).getTime()/1000;
                },
                DescDay: function (date, flag) {
                    var day = date.getDay() - 1;
                    if (day === -1)
                        day = 6;
                    if (date === undefined)
                        return "";
                    if (date.getDay === undefined)
                        return "";
                    if (flag !== undefined) {
                        return dateShorts[day];
                    }
                    return dates[day];
                },
                CountAge: function (birthday, dataNow) {
                    // debugger;
                    if (birthday === undefined || birthday === '')
                        birthday = Date.now();
                    else {
                        if (birthday instanceof Date) {

                        } else {
                            var arr = birthday.split('-');
                            if (arr[0].length === 4) {
                                birthday = new Date(arr[0], arr[1], arr[2]);
                            } else {
                                birthday = new Date(arr[2], arr[1], arr[0]);
                            }
                        }

                    }
                    if (dataNow === undefined)
                        dataNow = Date.now();
                    var ageDifMs = dataNow - birthday;
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    var year = ageDate.getFullYear() - 1970;
                    if (year <= -1)
                        year = 0;
                    var day = ageDate.getDate() - 1;
                    var date = new Date(year, ageDate.getMonth(), day);
                    return {
                        year: year,
                        month: ageDate.getMonth(),
                        day: day,
                        date: date
                    };
                },

                CountDifferenceDayHourMinute: function (dateTimeFirst, dateTimeOld) {
                    if (dateTimeFirst == undefined || dateTimeFirst == "") {
                        dateTimeFirst = Date.now();
                    }
                    if (dateTimeOld == undefined || dateTimeOld == "") {
                        dateTimeOld = Date.now();
                    }
                    var today = new Date(dateTimeFirst);
                    var Christmas = new Date(dateTimeOld);
                    var diffMs = (Christmas - today);
                    var diffDays = Math.floor(diffMs / 86400000); // hari
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // jam
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // menit
                    var Totalwaktu = (diffDays + " Hari, " + diffHrs + " Jam, " + diffMins + " Menit ");
                    return Totalwaktu;
                },

                CountDifferenceHourMinute: function (FirstHour, LastHour) {
                    if (FirstHour == undefined || FirstHour == "") {
                        FirstHour = new Date();
                    }
                    if (LastHour == undefined || LastHour == "") {
                        LastHour = new Date();
                    }
                    var HourNow = new Date(FirstHour);
                    var HourLast = new Date(LastHour);
                    var diffMs = (HourLast - HourNow);
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); //Jam
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);//Menit
                    var TotalJamMenit = (diffHrs + " Jam, " + diffMins + " Menit ");
                    return TotalJamMenit;
                },

                BuildAge: function (year, month, day) {
                    var dataNow = new Date();
                    dataNow.setFullYear(dataNow.getFullYear() - year);
                    dataNow.setMonth(dataNow.getMonth() - month);
                    dataNow.setDate(dataNow.getDate() - day);
                    return dataNow;
                },
                getTanggalFormatted: function (inputTanggal) {
                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    var tanggalFormatted = day + ' ' + monthNames[monthIndex] + ' ' + year;

                    return tanggalFormatted;

                },
                getPeriodFormat: function (inputTanggal) {
                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    var tanggalFormatted = monthNames[monthIndex] + '-' + year;

                    return tanggalFormatted;

                },
                getPeriodeFormatted: function (inputTanggal) {
                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth() + 1;
                    var year = date.getFullYear();

                    var tanggalFormatte = year + '-' + monthIndex;
                    // debugger;
                    return tanggalFormatte;

                },
                getBulanFormatted: function (inputTanggal) {
                    var monthNames = [
                        "Januari", "Februari", "Maret",
                        "April", "Mei", "Juni", "Juli",
                        "Agustus", "September", "Oktober",
                        "November", "Desember"
                    ]
                    var date = inputTanggal;
                    var monthIndex = date.getMonth();
                    // debugger;
                    var year = date.getFullYear();
                    var BulanFormatted = monthNames[monthIndex] + ' ' + year;

                    return BulanFormatted;
                },
                getTanggalFormattedNew: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getFullYear();

                    var tanggalFormattedNew = year + '-' + monthNumber[month] + '-' + day;

                    return tanggalFormattedNew;

                },

                getTanggalFormattedBaru: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth() - 1;
                    var year = date.getFullYear();

                    var tanggalFormattedBaru = year + '-' + monthIndex;
                    // debugger;
                    return tanggalFormattedBaru;

                },

                getTanggalFormattedOk: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    var tanggalFormattedBaru = year + '-' + monthIndex;
                    // debugger;
                    return tanggalFormattedBaru;

                },



                getTahunFormatted: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    var tahunFormatted = year;

                    return tahunFormatted;

                },
                getPeriodeFormatted: function (date) {
                    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                },
                getJamFormatted: function (hour) {
                    var HH = hour.getHours();
                    var mm = hour.getMinutes();
                    if (HH < 10) HH = "0" + HH;
                    if (mm < 10) mm = "0" + mm;
                    return HH + ":" + mm;
                },
                getJamMenitDetikFormatted: function (hour) {
                    var HH = hour.getHours();
                    var mm = hour.getMinutes();
                    var ss = hour.getSeconds();
                    if (HH < 10) HH = "0" + HH;
                    if (mm < 10) mm = "0" + mm;
                    if (ss < 10) ss = "0" + ss;
                    return HH + ":" + mm + ":" + ss;
                },
                getTanggalJamFormatted: function (inputTanggal) {
                    var monthNames = [
                        "Januari", "Februari", "Maret",
                        "April", "Mei", "Juni", "Juli",
                        "Agustus", "September", "Oktober",
                        "November", "Desember"
                    ];

                    var date = inputTanggal;
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();
                    var HH = date.getHours();
                    var mm = date.getMinutes();
                    if (HH < 10) HH = "0" + HH;
                    if (mm < 10) mm = "0" + mm;
                    var tanggalFormatted = day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + HH + ':' + mm;

                    return tanggalFormatted;

                },
                //@ Miftah
                getDateTimeFormatted: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var HH = date.getHours();
                    var mm = date.getMinutes();

                    var DateTimeFormatted = year + '-' + month + '-' + day + ' ' + HH + ':' + mm;

                    return DateTimeFormatted;

                },

                getDateTimeFormatted2: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var HH = date.getHours();
                    var mm = date.getMinutes();
                    var dayNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                    ];

                    var HourNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24"
                    ];

                    var MinuteNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                        "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"
                    ];
                    var Bulan = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12"
                    ];

                    var DateTimeFormatted = year + '-' + Bulan[month] + '-' + dayNumber[day] + ' ' + HourNumber[HH] + ':' + MinuteNumber[mm];

                    return DateTimeFormatted;

                },

                getDateTimeFormatted3: function (inputTanggal) {

                    var date = inputTanggal;
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var HH = date.getHours();
                    var mm = date.getMinutes();
                    var dayNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                    ];

                    var HourNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24"
                    ];

                    var MinuteNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                        "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"
                    ];
                    var Bulan = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12"
                    ];

                    var DateTimeFormatted = year + '-' + Bulan[month] + '-' + dayNumber[day];

                    return DateTimeFormatted;

                },

                getMasaGaransi: function (inputTanggal, masaGaransi) {
                    // debugger
                    var date = inputTanggal;
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear() + parseInt(masaGaransi);
                    var HH = date.getHours();
                    var mm = date.getMinutes();
                    var dayNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                    ];

                    var HourNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24"
                    ];

                    var MinuteNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                        "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"
                    ];
                    var Bulan = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12"
                    ];

                    var DateTimeFormatted = year + '-' + Bulan[month] + '-' + dayNumber[day];
                    return DateTimeFormatted;
                },

                getTriwulan: function (inputTanggal) {
                    var date = inputTanggal;
                    var day = date.getDate();
                    if (date.getMonth() == 0) {
                        var month = date.getMonth() + 12 - 2;
                        var year = date.getFullYear() - 1;
                    } else if (date.getMonth() == 1) {
                        var month = date.getMonth() + 11;
                        var year = date.getFullYear() - 1;
                    } else {
                        var month = date.getMonth() - 2;
                        var year = date.getFullYear();
                    }
                    var HH = date.getHours();
                    var mm = date.getMinutes();
                    var dayNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                    ];

                    var HourNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24"
                    ];

                    var MinuteNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                        "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"
                    ];
                    var Bulan = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12"
                    ];

                    var DateTimeFormatted = year + '-' + (Bulan[month]) + '-' + dayNumber[day];

                    return DateTimeFormatted;

                },
                getDateTimeFormattedNew: function (inputTanggal) {
                    var dayNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                    ];
                    var HourNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24"
                    ];
                    var MinuteNumber = [
                        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                        "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"
                    ];
                    var date = inputTanggal;
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    var HH = date.getHours();
                    var mm = date.getMinutes();

                    var DateTimeFormatted = year + '-' + monthNumber[month] + '-' + dayNumber[day] + ' ' + HourNumber[HH] + ':' + MinuteNumber[mm] + ":00";

                    return DateTimeFormatted;

                },
                //davis was here
                setJamAwal: function (tgl) {
                    tgl.setHours(0);
                    tgl.setMinutes(0);
                    tgl.setSeconds(0);

                    return tgl;
                },
                setJamAkhir: function (tgl) {
                    tgl.setHours(23);
                    tgl.setMinutes(59);
                    tgl.setSeconds(59);

                    return tgl;
                },
                stringToDateTime: function (dateString) {
                    var year = dateString.substring(0, 4);
                    var month = dateString.substring(4, 6);
                    var day = dateString.substring(6, 8);
                    var hour = dateString.substring(8, 10);
                    var minutes = dateString.substring(10, 12);
                    var seconds = dateString.substring(12, 14);

                    var DateTimeFormatted = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + seconds;

                    return DateTimeFormatted;
                },
                newStringToDateTime: function (dateString) {
                    var day = dateString.substring(0, 2);
                    var month = dateString.substring(3, 5);
                    var year = dateString.substring(6, 10);
                    if (month.indexOf("0") == 0) {
                        month = month.substring(1, 2);
                    }
                    var DateTimeFormatted = year + '-' + month + '-' + day;

                    return DateTimeFormatted;
                },
                getFormatMonthPicker: function (date) {
                    var mount = date.getMonth() + 1;
                    if (mount < 10) {
                        mount = "0" + mount;
                    }
                    return date.getFullYear() + "-" + mount;
                },
                getDaysofMonth: function (date) {
                    var ds = new Date(date);

                    var firstDay = new Date(ds.getFullYear(), ds.getMonth(), 1);
                    var lastDay = new Date(ds.getFullYear(), ds.getMonth() + 1, 0);
                    var formattedFirstDayWithSlashes = firstDay.getFullYear() + '/' + monthNumber[(firstDay.getMonth())] + '/' + dayNumber[(firstDay.getDate())],
                        formattedLastDayWithSlashes = lastDay.getFullYear() + '/' + monthNumber[(firstDay.getMonth())] + '/' + dayNumber[(lastDay.getDate())];

                    return [formattedFirstDayWithSlashes, formattedLastDayWithSlashes];
                }

            }
        }
    ]);
    genericServices.factory('CheckConnection', ['$resource', '$http',
        function ($resource, $http) {
            return $resource('App/GetProfile/:id', {}, {
                get: {
                    method: 'GET',
                    params: {},
                    isArray: true
                }
            });
        }
    ]);

    genericServices.factory('Validation', ['LoginService', '$compile',
        function (loginService, $compile) {

            return {
                Show: function ($scope, done, close) {
                    $scope.loginService = loginService;
                    var myWindow = $("<div></div>");
                    var temp = $compile("<core-login-form is-loading='false' message='message' on-login='login(userName,password)' ></core-login-form>");
                    $scope.isLoading = true;
                    $(temp($scope)).appendTo(myWindow);
                    myWindow.kendoWindow({
                        width: "600px",
                        title: "Validasi",
                        close: function () {
                            if (close !== undefined)
                                close();
                        }
                    }).data("kendoWindow").center().open();
                    $scope.message = "";
                    $scope.login = function (userName, password) {
                        var module = $scope.module;
                        $scope.message = "";
                        loginService.query({
                            username: userName,
                            password: password,
                            module: module
                        }, function (data) {
                            if (data.statusCode === 200) {
                                if (done !== undefined)
                                    done(userName, password);
                                $scope.isLoading = false;
                                myWindow.data("kendoWindow").close();
                            } else {
                                $scope.message = {
                                    content: data.message,
                                    type: 'error'
                                };
                            }

                        }, function (error) {

                        });

                    }
                }
            }
        }
    ]);

    genericServices.factory('GenericService', ['$resource',
        function ($resource) {
            return $resource('Super/ListTable/?view=:table&field=:field&value=:value&Select=:select', {}, {
                query: {
                    method: 'GET',
                    params: {},
                    isArray: true
                }
            });
        }
    ]);


    genericServices.factory('TextHelper', ['$resource',
        function ($resource) {
            return {
                IsNullOrEmpty: function (obj) {
                    return obj === undefined || obj === "" || obj === null;
                },
                convertToStatement: function (value, isTitle, isRealText) {
                    return window.convertToStatement(value, isTitle, isRealText);
                }
            }
        }
    ]);

    genericServices.service('SaveToWindow', [
        function () {
            return {
                setItemToWindowChace: function (nameItem, valueItem) {
                    window[nameItem] = valueItem;

                }
            }
        }
    ]);

    window.convertToStatement = function (value, isTitle, isRealText) {
        if (isRealText === 3 || isRealText === 'true')
            return value;
        if (value === 'ruanganPelayanan')
            return "Spesialis";
        if (value === undefined)
            return;
        if (value === 'All')
            return "Semuanya";
        if (value === 'No items to display')
            return "Tidak ada data";
        if (value === 'Page')
            return "Halaman";
        if (value === 'of')
            return "dari";
        if (value === 'items per page')
            return "data per halaman";
        if (value === 'All')
            return "Semuanya";
        if (value === 'All')
            return "Semuanya";
        if (value === 'All')
            return "Semuanya";
        value = value.toString();
        if (value.indexOf('.') >= 0)
            value = value.split('.')[1];
        var temp = "";
        for (var i in value) {
            var localWord = value[i];
            if (value[i] !== undefined && value[i].toUpperCase !== undefined) {
                if (i === '0')
                    localWord = value[i].toUpperCase()
                else
                    if (value[i] === value[i].toUpperCase()) {
                        if (isRealText === '') {
                            localWord = ' ' + localWord;
                        } else {
                            if (isTitle !== -1 && isTitle !== undefined)
                                localWord = ' ' + localWord.toUpperCase();
                            else
                                localWord = ' ' + localWord.toLowerCase();
                        }
                    }
                temp += localWord;
            }
        }
        if (temp.length !== 0)
            if (temp[0].toUpperCase !== undefined)
                temp = temp[0].toUpperCase() + temp.substring(1, temp.length);
        var arr = temp.split(' ');
        temp = '';
        for (var i in arr)
            if (arr[i] === 'Kd')
                temp += "Kode" + " ";
            else temp += arr[i] + " ";
        return temp;
    }
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "5000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    window.messageContainer = {
        log: function (message, isError, container) {
            // if (isError === true)
            //     toastr.success("Data berhasil di simpan");
            // else {
            //     toastr.success("Data berhasil di simpan");
            // }
            if (isError === true)
                toastr.error(message)
            else {
                toastr.success(message)
            }
            var lastContainer = $(".panel-message div:first");
            var counter = lastContainer.find(".count").detach();
            var lastMessage = lastContainer.text();
            var count = 1 * (counter.text() || 1);

            lastContainer.append(counter);
            // var time = setInterval(function() {
            //     console.log($(".panel-message").children().length + " == " + new Date());
            //     if ($(".panel-message").children().length === 0)
            //         clearInterval(time);
            // }, 500)

            if (!lastContainer.length || message !== lastMessage) {
                var ctrl = $("<div  class='notification  " + (isError ? " error " : "information") + " ' />");
                // ctrl.css({
                //         marginTop: -24,
                //         //backgroundColor: isError ? "#ffbbbb" : "#b2ebf2"
                //     })
                //     .html("<div class='icon '><span class='fa " + (!isError ? 'fa-info' : 'fa fa-exclamation-triangle') + " fa-2x'></span></div><span class='label-msg'>" + message + "</span>")
                //     .prependTo($(".panel-message", container))
                //     .animate({
                //         marginTop: 0
                //     }, 300)
                //     .animate({
                //         //backgroundColor: isError ? "#ffdddd" : "#ffffff"
                //     }, 800);
                // setTimeout(function() {
                //     ctrl.animate({
                //         opacity: -0
                //     }, 300, function() {
                //         ctrl.parent().remove(ctrl);
                //     });
                // }, 3000);
            } else {
                count++;

                if (counter.length) {
                    counter.html(count);
                } else {
                    lastContainer.html(lastMessage);
                    //.append("<span class='count'>" + count + "</span>");
                }
            }
        },

        error: function (message) {

            this.log(message, true);
        },
        length: function () {
            return $(".panel-message").children().length;
        }
    };
    return {
        KendoData: function (fields, data, isServer, url, model) {
            if (isServer === undefined)
                isServer = false;
            if (!isServer)
                return new kendo.data.DataSource({
                    serverFiltering: isServer,
                    data: data,
                    schema: {
                        model: {
                            fields: fields
                        }
                    }
                });
            else
                if (url === undefined) {
                    var select = "";
                    for (var i in fields) {
                        if (select === "")
                            select += i;
                        else
                            select += "," + i;
                    }
                    return new kendo.data.DataSource({
                        serverFiltering: isServer,
                        serverPaging: true,
                        pageSize: 10,
                        transport: {
                            read: {
                                type: 'GET',
                                url: "Super/ListTable/?view=" + model + "&select=" + select,
                                dataType: 'json',
                                beforeSend: function (req) {

                                }
                            },
                        },
                        schema: {
                            model: {
                                fields: fields
                            }
                        }
                    });

                } else
                    return new kendo.data.DataSource({
                        serverFiltering: isServer,
                        data: data,
                        schema: {
                            model: {
                                fields: fields
                            }
                        }
                    });
        }


    };
});