@echo off
if exist .\app\WelcomeAsli.html goto :ada


copy .\app\javascripts\Controllers\WelcomeCtrl.js .\app\javascripts\Controllers\WelcomeCtrlAsli.js
copy .\app\Welcome.html .\app\WelcomeAsli.html
copy .\app\main.html .\app\mainAsli.html
copy .\app\module\header\header.html .\app\module\header\headerAsli.html
copy .\app\javascripts\Services\HeaderService.js .\app\javascripts\Services\HeaderServiceAsli.js
copy .\app\javascripts\Controller.js .\app\javascripts\ControllerAsli.js
copy .\app\module\header\header_controller.js .\app\module\header\header_controllerAsli.js

copy .\app\ifacebaru\WelcomeCtrlNew.js .\app\javascripts\Controllers\WelcomeCtrl.js
copy .\app\ifacebaru\WelcomeNew.html .\app\Welcome.html
copy .\app\ifacebaru\mainNew.html .\app\main.html
copy .\app\ifacebaru\headerNew.html .\app\module\header\header.html
copy .\app\ifacebaru\HeaderServiceNew.js .\app\javascripts\Services\HeaderService.js
copy .\app\ifacebaru\ControllerNew.js .\app\javascripts\Controller.js
copy .\app\ifacebaru\header_controllerNew.js .\app\module\header\header_controller.js
copy .\app\stylesheets\baru\*.* .\app\stylesheets\

echo 'Informasi : Ganti ke interface baru  berhasil'
goto :end

:ada
echo 'Peringatan : Masih pakai interface baru'
goto :end

:end
pause