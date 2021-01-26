 define(['Configuration'], function (config) {

     var urlDataGeneric = config.urlDataGeneric_Akuntansi;
     var urlDataTableMaster = config.urlDataTableMaster_Akuntansi;
     var urlDataTableTransaksi = config.urlDataTableTransaksi_Akuntansi;
     var urlDataTableTransaksi_Akuntansi = config.urlDataTableTransaksi_Akuntansi;
     var urlBaseApiPostDataAkuntansi = config.baseApiPostData_Akuntansi;
     var httpServiceAkuntansi = angular.module('HttpServicesAkuntansi', []);
     let getCookie = (name) => {
         const value = `; ${document.cookie}`;
         const parts = value.split(`; ${name}=`);
         if (parts.length === 2) return parts.pop().split(';').shift();
     }

     httpServiceAkuntansi.service('ModelItemAkuntansi', ['$mdDialog', '$q', '$http', '$resource', 'TextHelper',
         function ($mdDialog, $q, $http, $resource, textHelper) {

             var beforeSubmit =
                 function (data, back) {
                     var item = {};
                     if ($.isFunction(data)) return;
                     if (data instanceof Array)
                         item = [];
                     for (var key in data) {
                         if (key === '$$hashKey') continue;
                         if (key === '_events') continue;
                         if (key === '_handlers') continue;
                         if (key === 'uid') continue;
                         if (key === 'dirty') continue;
                         if (key === 'parent') continue; //
                         if (key === 'attributes') continue;
                         if (data.hasOwnProperty(key)) {
                             var element = data[key];
                             if (element instanceof Array) {
                                 var temp = [];
                                 for (var i in element) {
                                     if (element.hasOwnProperty(i)) {
                                         var detailElement = element[i];
                                         temp.push(beforeSubmit(detailElement, back));
                                     }
                                 }
                                 if (data instanceof Array)
                                     item.push(temp);
                                 else
                                     item[key] = temp;
                             } else {
                                 if (key.indexOf('tanggal') > -1 || key.indexOf('tgl') > -1) {
                                     if (back) {

                                     } else {
                                         if (element === undefined) {
                                             item[key] = null;
                                         } else
                                         if (element === 0 || element === null)
                                             item[key] = undefined;
                                         else
                                         if (isNaN(Date.parse(element)))
                                             item[key] = new Date(element)
                                         else
                                             item[key] = Date.parse(element);
                                     }
                                 } else {
                                     if (data instanceof Array) {
                                         var temp = element;
                                         if (temp instanceof Object)
                                             temp = beforeSubmit(temp, back);
                                         item.push(temp);
                                     } else if (element instanceof Object) {
                                         item[key] = beforeSubmit(element, back);
                                     } else
                                         item[key] = element;
                                 }
                             }
                         }
                     }
                     return item;
                 }
             var items = [];

             return {
                 beforePost: function (data) {
                     return beforeSubmit(data);
                 },
                 getDataGeneric: function (nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                     var deffer = $q.defer();
                     if (isServerFiltering === undefined)
                         isServerFiltering = false;
                     var arr = document.cookie.split(';')
                     var authorization = "" //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (kendoSource) {
                         var currentTop = '';
                         if (top !== undefined)
                             if (urlDataGeneric.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         if (!select) {
                             if (urlDataGeneric.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (urlDataGeneric.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };

                         var url = "";
                         url = urlDataGeneric + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url;
                         } else
                             url = url;
                         var kendoSourceData = new kendo.data.DataSource({
                             filter: filter,
                             serverFiltering: isServerFiltering,
                             transport: {
                                 read: {
                                     type: 'GET',
                                     url: url,
                                     dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                     beforeSend: function (xhr) {
                                         xhr.setRequestHeader('X-AUTH-TOKEN', authorization)
                                     }
                                 }
                             }
                         });

                         if (kendoSourceData != undefined) {
                             deffer.resolve(kendoSourceData);
                         } else {
                             deffer.reject();
                         }


                     } else {
                         var currentTop = '';

                         if (top !== undefined) {
                             if (urlDataGeneric.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         }
                         var url = "";
                         if (!select) {
                             if (urlDataGeneric.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (urlDataGeneric.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };
                         url = urlDataGeneric + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url;
                         } else
                             url = url;

                         $http({
                             method: 'GET',
                             url: url,
                             headers: {
                                 'Content-Type': 'application/json',
                                 'X-AUTH-TOKEN': authorization
                             }

                         }).then(function successCallback(response) {

                             if (response.status === 200) {

                                 var data = response.data;
                                 data.statResponse = true;
                                 deffer.resolve(data);
                             }
                         }, function errorCallback(response) {

                             var data = {
                                 "statResponse": false,
                             }
                             deffer.resolve(data);
                         });
                     }

                     return deffer.promise;

                 },

                 getDataTableMaster: function (tableName) {

                     var deffer = $q.defer();
                     var arr = document.cookie.split(';')
                     var authorization = "" //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }

                     var url = urlDataTableMaster + tableName;


                     $http({
                         method: 'GET',
                         url: url,
                         headers: {
                             'Content-Type': 'application/json',
                             'X-AUTH-TOKEN': authorization
                         }

                     }).then(function successCallback(response) {
                         if (response.status === 200) {

                             var data = response.data;
                             data.statResponse = true;
                             deffer.resolve(data);
                         }
                     }, function errorCallback(response) {
                         var data = {
                             "statResponse": false,
                         }
                         deffer.resolve(data);
                     });

                     return deffer.promise;

                 },
                 getDataDummyPHP: function (nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                     //#di PHP
                     // if(isset($req['filter']['filters'][0]['value']) &&
                     //     $req['filter']['filters'][0]['value']!="" &&
                     //     $req['filter']['filters'][0]['value']!="undefined"){
                     //     $dataProduk = $dataProduk->where('pr.namaproduk','ilike','%'. $req['filter']['filters'][0]['value'].'%' );
                     // };

                     //#di js
                     // modelItemAkuntansi.getDataDummyPHP("BPJS/get-detail-produk-kelompok", true, true, 20).then(function(data) {
                     //     $scope.listproduk= data;
                     var deffer = $q.defer();
                     if (isServerFiltering === undefined)
                         isServerFiltering = false;
                    //  var arr = document.cookie.split(';')
                    var authorization = getCookie("authorization");
                    //  for (var i = 0; i < arr.length; i++) {
                    //      var element = arr[i].split('=');
                    //      if (element[0].indexOf('authorization') > 0) {
                    //          authorization = element[1];
                    //      }
                    //  }
                    
                     if (kendoSource) {
                         var currentTop = '';
                         if (top !== undefined)
                             if (urlDataTableTransaksi_Akuntansi.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         if (!select) {
                             if (urlDataTableTransaksi_Akuntansi.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (urlDataTableTransaksi_Akuntansi.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };

                         var url = "";
                         url = urlDataTableTransaksi_Akuntansi + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url //+ "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url //+ "?X-AUTH-TOKEN=" + authorization;
                         var kendoSourceData = new kendo.data.DataSource({
                             filter: filter,
                             serverFiltering: isServerFiltering,
                             transport: {
                                 read: {
                                     type: 'GET',
                                     url: url,
                                     dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                     headers: {
                                         'Content-Type': 'application/json',
                                         'X-AUTH-TOKEN': authorization
                                     }
                                 }
                             }
                         });

                         if (kendoSourceData != undefined) {
                             deffer.resolve(kendoSourceData);
                         } else {

                             deffer.reject();
                         }


                     } else {
                         var currentTop = '';

                         if (top !== undefined) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         }
                         var url = "";
                         if (!select) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };
                         url = baseUrlListData + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url + "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url + "?X-AUTH-TOKEN=" + authorization;

                         $http({
                             method: 'GET',
                             url: url,
                             headers: {
                                 'Content-Type': 'application/json',
                                 'X-AUTH-TOKEN': authorization
                             }

                         }).then(function successCallback(response) {
                             if (response.status === 200) {

                                 var data = response.data;
                                 data.statResponse = true;
                                 deffer.resolve(data);
                             }
                         }, function errorCallback(response) {
                             var data = {
                                 "statResponse": false,
                             }
                             deffer.resolve(data);
                         });
                     }

                     return deffer.promise;

                 },
                 getDataDummyPHP2: function (ididid, nameGeneric, kendoSource, isServerFiltering, top, filter, select) {
                     //#di PHP
                     // if(isset($req['filter']['filters'][0]['value']) &&
                     //     $req['filter']['filters'][0]['value']!="" &&
                     //     $req['filter']['filters'][0]['value']!="undefined"){
                     //     $dataProduk = $dataProduk->where('pr.namaproduk','ilike','%'. $req['filter']['filters'][0]['value'].'%' );
                     // };

                     //#di js
                     // modelItemAkuntansi.getDataDummyPHP("BPJS/get-detail-produk-kelompok", true, true, 20).then(function(data) {
                     //     $scope.listproduk= data;
                     var deffer = $q.defer();
                     if (isServerFiltering === undefined)
                         isServerFiltering = false;
                     var arr = document.cookie.split(';')
                     var authorization = "";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (kendoSource) {
                         var currentTop = '';
                         if (top !== undefined)
                             if (urlDataTableTransaksi_Akuntansi.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         if (!select) {
                             if (urlDataTableTransaksi_Akuntansi.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (urlDataTableTransaksi_Akuntansi.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };

                         var url = "";
                         url = urlDataTableTransaksi_Akuntansi + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url //+ "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url //+ "?X-AUTH-TOKEN=" + authorization;
                         var kendoSourceData = new kendo.data.DataSource({
                             filter: filter,
                             serverFiltering: isServerFiltering,
                             transport: {
                                 read: {
                                     type: 'GET',
                                     url: url,
                                     dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                     headers: {
                                         'Content-Type': 'application/json',
                                         'X-AUTH-TOKEN': authorization
                                     }
                                 }
                             },
                             idididid: ididid
                         });

                         if (kendoSourceData != undefined) {
                             deffer.resolve(kendoSourceData);
                         } else {

                             deffer.reject();
                         }


                     } else {
                         var currentTop = '';

                         if (top !== undefined) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         }
                         var url = "";
                         if (!select) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };
                         url = baseUrlListData + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url + "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url + "?X-AUTH-TOKEN=" + authorization;

                         $http({
                             method: 'GET',
                             url: url,
                             headers: {
                                 'Content-Type': 'application/json',
                                 'X-AUTH-TOKEN': authorization
                             }

                         }).then(function successCallback(response) {
                             if (response.status === 200) {

                                 var data = response.data;
                                 data.statResponse = true;
                                 deffer.resolve(data);
                             }
                         }, function errorCallback(response) {
                             var data = {
                                 "statResponse": false,
                             }
                             deffer.resolve(data);
                         });
                     }

                     return deffer.promise;

                 },
                 kendoHttpSource: function (url, serverFiltering) {
                     var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (serverFiltering === undefined)
                         serverFiltering = false;
                     var tempurl = urlDataTableTransaksi + url;
                     if (tempurl.indexOf('?') > 0)
                         tempurl = tempurl + "&X-AUTH-TOKEN=" + authorization
                     else
                         tempurl = tempurl + "?X-AUTH-TOKEN=" + authorization
                     var kendoSourceData = new kendo.data.DataSource({
                         serverFiltering: serverFiltering,
                         transport: {
                             read: {
                                 type: 'GET',
                                 url: tempurl,
                                 beforeSend: function (req) {
                                     req.setRequestHeader('X-AUTH-TOKEN', authorization);
                                 },
                                 dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                             }
                         },
                         pageSize: 20,
                         serverPaging: true,
                         schema: {
                             model: {
                                 id: "id"
                             },
                             data: function (a, e, r, t) {
                                 if (a.data !== undefined) {
                                     if (a.data.data !== undefined)
                                         return a.data.data;
                                     return a.data;
                                 }
                                 kendoSourceData.total(50);
                                 return a;
                             },
                             total: function (e) {
                                 if (e.messages !== undefined && e.messages["Total-Count"] !== undefined)
                                     return e.messages["Total-Count"];
                                 return undefined;
                             },
                             totalPages: function (e) {}
                         }

                     });

                     return kendoSourceData;

                 },
                 getPegawai: function () {
                     return JSON.parse(window.localStorage.getItem('pegawai'));
                 },

                 getDataTableTransaksi: function (tableName) {

                     var deffer = $q.defer();
                     var arr = document.cookie.split(';')
                     var authorization = "" //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }

                     var url = urlDataTableTransaksi + tableName;


                     $http({
                         method: 'GET',
                         url: url,
                         headers: {
                             'Content-Type': 'application/json',
                             'X-AUTH-TOKEN': authorization
                         }

                     }).then(function successCallback(response) {
                         if (response.status === 200) {

                             var data = response.data;
                             data.statResponse = true;
                             deffer.resolve(data);
                         }
                     }, function errorCallback(response) {
                         var data = {
                             "statResponse": false,
                         }
                         deffer.resolve(data);
                     });

                     return deffer.promise;

                 },

                 getDataGlobal: function (strUrl) {

                     var deffer = $q.defer();
                     var arr = document.cookie.split(';')
                     var authorization = "" // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }

                     var url = urlBaseApiPostDataAkuntansi + strUrl;


                     $http({
                         method: 'GET',
                         url: url,
                         headers: {
                             'Content-Type': 'application/json',
                             'X-AUTH-TOKEN': authorization
                         }

                     }).then(function successCallback(response) {
                         if (response.status === 200) {

                             var data = response.data;
                             data.statResponse = true;
                             deffer.resolve(data);
                         }
                     }, function errorCallback(response) {
                         var data = {
                             "statResponse": false,
                         }
                         deffer.resolve(data);
                     });

                     return deffer.promise;

                 },

                 setValidation: function (scope, listRawRequired) {
                     var listFixRequired = [];
                     var msg = "";

                     for (var i = 0; i < listRawRequired.length; i++) {
                         var arr = listRawRequired[i].split("|");
                         var arrModel = arr[0].split(".");
                         var obj = {
                             ngModel: scope[arrModel[0]][arrModel[1]],
                             ngModelText: arr[0],
                             type: arr[1],
                             label: arr[2]
                         };

                         listFixRequired.push(obj);
                     }

                     for (var i = 0; i < listFixRequired.length; i++) {
                         if (listFixRequired[i].ngModel === undefined || listFixRequired[i].ngModel === "") {
                             this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, false);
                             msg += listFixRequired[i].label + " tidak boleh kosong|";
                         } else {
                             this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, true);
                         }
                     }

                     var result = {};
                     if (msg == "") {
                         result = {
                             status: true
                         };
                     } else {
                         result = {
                             status: false,
                             messages: msg
                         };
                     }

                     return result;
                 },

                 cekEnableDisableButton: function (buttonDisabled) {

                     if (!buttonDisabled) {
                         var element = angular.element('[class="btnTemplate1"]');
                         element.addClass("button-disabled");
                     } else {
                         var element = angular.element('[class="btnTemplate1 button-disabled"]');
                         element.removeClass("button-disabled")
                     }
                 },

                 cekValidation: function (ngModelType, ngModelName, statusValidation) {
                     var element = angular.element('[' + ngModelType + '="' + ngModelName + '"]');

                     if (!statusValidation) {
                         element.addClass("validation-error");
                     } else {
                         element.removeClass("validation-error")
                     }
                 },

                 showMessages: function (messages) {
                     var arrMsgError = messages.split("|");
                     for (var i = 0; i < arrMsgError.length - 1; i++) {
                         window.messageContainer.error(arrMsgError[i]);
                     }
                 },

                 showAlertDialog: function (title, textContent, labelOk, labelCancel) {
                     if (labelCancel == undefined) {
                         return $mdDialog.confirm()
                             .title(title)
                             .textContent(textContent)
                             .ariaLabel('Lucky day')
                             .ok(labelOk)
                             .cancel(labelCancel)
                     } else {
                         return $mdDialog.confirm()
                             .title(title)
                             .textContent(textContent)
                             .ariaLabel('Lucky day')
                             .ok(labelOk)
                     }
                 }
             };
         }
     ]);
     httpServiceAkuntansi.service('R_Akuntansi', ['$q', '$http', function ($q, $http) {
         return {
             get: function (obj) {
                 var deffer = $q.defer();
                 if (obj.method === undefined)
                     obj.method = "GET";
                 var authorization = getCookie("authorization"); // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                //  console.log("HttpServiceAkuntansi");
                //  var arr = document.cookie.split(';')
                //  for (var i = 0; i < arr.length; i++) {
                //      var element = arr[i].split('=');
                //      if (element[0].indexOf('authorization') > 0) {
                //          authorization = element[1];
                //      }
                //  }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url;
                 } else
                     url = obj.url;

                 $http.get(url, {
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     }
                 }).then(function successCallback(response) {
                     response.statResponse = true;
                     deffer.resolve(response);
                 }, function errorCallback(response) {

                     response.statResponse = false;
                     deffer.resolve(response);
                 });
                 return deffer.promise;
             },
             post: function (obj, data) {
                 console.log(JSON.stringify(data));
                 var deffer = $q.defer();
                 var authorization = "" //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url;
                 } else
                     url = obj.url;
                 var req = {
                     method: 'POST',
                     url: url,
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     },
                     data: data
                 }
                 $http(req).then(function successCallback(response, a, b) {
                     /*var msg = response.headers("x-message");
                     window.messageContainer.log(msg);*/

                     var msg = response.data.messages;
                     window.messageContainer.log(msg);

                     deffer.resolve(response);
                 }, function errorCallback(response) {
                     //var msgError = response.headers("x-message");

                     if (response.data != null) {
                         var msgError = response.data.messages;

                         if (msgError != "") {
                             var p = response.data.errors

                             for (var key in p) {
                                 if (p.hasOwnProperty(key)) {
                                     for (var i = 0; i < p[key].length; i++) {
                                         window.messageContainer.error(key + " : " + p[key][i])
                                     }
                                 }
                             }

                             window.messageContainer.error(msgError);
                         }
                     } else {
                         window.messageContainer.error("Koneksi terputus");
                     }

                     deffer.reject(response);

                 });
                 return deffer.promise;
             },
             put: function (obj, data) {
                 console.log(JSON.stringify(data));
                 var deffer = $q.defer();
                 var authorization = "" //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url;
                 } else
                     url = obj.url;
                 var req = {
                     method: 'PUT',
                     url: url,
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     },
                     data: data
                 }
                 $http(req).then(function successCallback(response, a, b) {

                     var msg = response.data.messages;
                     window.messageContainer.log(msg);

                     deffer.resolve(response);
                 }, function errorCallback(response) {
                     var msgError = response.data.messages;

                     if (msgError != "") {
                         var p = response.data.errors

                         for (var key in p) {
                             if (p.hasOwnProperty(key)) {
                                 for (var i = 0; i < p[key].length; i++) {
                                     window.messageContainer.error(key + " : " + p[key][i])
                                 }
                             }
                         }

                         window.messageContainer.error(msgError);
                     }

                     deffer.reject(response);
                 });
                 return deffer.promise;
             },
             delete: function (obj, data) {
                 var deffer = $q.defer();
                 var authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 url = obj.url;
                 var req = {
                     method: 'DELETE',
                     url: url,
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     },
                     data: data ? data : {}
                 }
                 $http(req).then(function successCallback(response, a, b) {

                     var msg = response.headers("x-message");
                     window.messageContainer.log(msg);

                     deffer.resolve(response);
                 }, function errorCallback(response) {
                     var msgError = response.headers("x-message");

                     if (msgError != "") {
                         var p = response.data.errors

                         for (var key in p) {
                             if (p.hasOwnProperty(key)) {
                                 for (var i = 0; i < p[key].length; i++) {
                                     window.messageContainer.error(key + " : " + p[key][i])
                                 }
                             }
                         }
                     }

                     deffer.reject(response);
                 });
                 return deffer.promise;
             }
         }
     }]);
     httpServiceAkuntansi.service('GenericRequest', [
         function () {
             return function (fields, data, isServer, url, model) {
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
             };
         }
     ]);

 });