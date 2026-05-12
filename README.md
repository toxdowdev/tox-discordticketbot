# ᴛᴏx sᴛᴜᴅɪᴏ | Ticket System v1.0

[TR] Tox Studio tarafından geliştirilen, minimalist ve kurumsal tasarıma sahip modern Discord ticket sistemi.
[EN] A modern Discord ticket system with a minimalist and corporate design, developed by Tox Studio.

---

## 🇹🇷 Türkçe İnceleme

### ✨ Özellikler
*   **Slash Komut Desteği:** `/ticketpanel` komutu ile saniyeler içinde kurulum.
*   **Kurumsal Tasarım:** Minimalist ve "Old Money" estetiğine uygun siyah/gri tonlarında embed yapısı.
*   **Modal Form:** Kullanıcıların talep sebeplerini şık bir form (Modal) üzerinden iletmesi.
*   **Gelişmiş Log:** Kapatılan taleplerin `discord-html-transcripts` ile web arayüzü şeklinde arşivlenmesi.
*   **Veritabanı:** `quick.db` altyapısı ile hızlı veri yönetimi.
*   **Otomatik Başlatma:** `start.bat` dosyası ile olası çökmelere karşı otomatik yeniden başlatma desteği.

### 🛠️ Kurulum
1.  Dosyaları bir klasöre çıkartın.
2.  Terminalde `npm install` komutunu çalıştırarak bağımlılıkları yükleyin.
3.  `config.json` dosyasını kendi ID'leriniz ve bot tokenınız ile doldurun.
4.  `node deploy-commands.js` yazarak Slash komutlarını tanımlayın.
5.  `start.bat` dosyasına çift tıklayarak sistemi aktif edin.

 # 📸 Preview / Önizleme
<p align="center">
  <img src="https://i.imgur.com/BNIm4QL.png" width="45%" alt="Ticket Panel" />
</p>

<p align="center">
  <img src="https://i.imgur.com/MNuLcIB.png" width="45%" alt="Ticket Channel" />
  <img src="https://i.imgur.com/C8uGxyn.png" width="45%" alt="Transcript Log" />
</p>

> **Note:** The interface is designed with a minimalist and premium aesthetic, tailored by Toxdow.

---

## 🇺🇸 English Overview

### ✨ Features
*   **Slash Command Support:** Quick setup via `/ticketpanel`.
*   **Corporate Design:** Minimalist embed structure following "Old Money" and premium aesthetics.
*   **Modal Forms:** Users submit ticket reasons through sleek and professional Discord modals.
*   **Advanced Logging:** Closed tickets are saved as high-quality HTML transcripts.
*   **Database:** High-performance local data management with `quick.db`.
*   **Auto-Restart:** Dedicated `start.bat` script to ensure 24/7 uptime.

### 🛠️ Installation
1.  Extract the files into a directory.
2.  Run `npm install` in your terminal to install dependencies.
3.  Fill the `config.json` file with your bot token and server IDs.
4.  Run `node deploy-commands.js` to register slash commands.
5.  Double-click `start.bat` to launch the ticket bot.

---

## ⚙️ Configuration (config.json)
```json
{
  "token": "BOT_TOKEN",
  "clientId": "CLIENT_ID",
  "guildId": "GUILD_ID",
  "ticketCategory": "CATEGORY_ID",
  "staffRoleId": "STAFF_ROLE_ID",
  "logChannelId": "LOG_CHANNEL_ID",
  "embedColor": "#0b0b0b",
  "footerText": "Tox Studio | Developed by Toxdow"
}
