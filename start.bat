@echo off
title Tox Studio Ticket Bot - Developed by Toxdow
color 0f
cls

:basla
echo ---------------------------------------------------------
echo Tox Studio Ticket Sistemi Baslatiliyor...
echo Yazilimci: Toxdow
echo ---------------------------------------------------------
node index.js
echo.
echo [!] Bot kapandi veya bir hata olustu. 
echo [!] 5 saniye sonra yeniden baslatiliyor...
timeout /t 5
goto basla