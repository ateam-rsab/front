@echo off
if exist .\app\WelcomeAsli.html goto :ada


copy .\app\javascripts\Controllers\WelcomeCtrl.js .\app\javascripts\Controllers\WelcomeCtrlAsli.js
copy .\app\Welcome.html .\app\WelcomeAsli.html
copy .\app\main.html .\app\mainAsli.html
copy .\app\module\header\header.html .\app\module\header\headerAsli.html

copy .\app\javascripts\Controllers\WelcomeCtrlBaru.js .\app\javascripts\Controllers\WelcomeCtrl.js
copy .\app\WelcomeBaru.html .\app\Welcome.html
copy .\app\mainBaru.html .\app\main.html
copy .\app\module\header\headerBaru.html .\app\module\header\header.html
copy .\app\stylesheets\baru\*.* .\app\stylesheets\

echo 'Informasi : Ganti ke interface baru  berhasil'
goto :end

:ada
echo 'Peringatan : Masih pakai interface baru'
goto :end

:end
pause