const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require("quick.db");
const transcript = require('discord-html-transcripts');
const config = require('./config.json');

const db = new QuickDB();
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel]
});

client.once('ready', () => {
    console.log(`Tox Studio: ${client.user.tag} aktif! Yazılımcı: Toxdow`);
});

// --- KOMUT: TICKET PANEL ---
client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'ticketpanel') {
        const embed = new EmbedBuilder()
            .setTitle('ᴛᴏx sᴛᴜᴅɪᴏ | ᴅᴇsᴛᴇᴋ ᴍᴇʀᴋᴇᴢɪ')
            .setDescription('Değerli kullanıcımız,\n\nYaşadığınız sorunları veya iş birliği taleplerinizi bize iletmek için aşağıdaki butonu kullanabilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır.\n\n**Kurallar:**\n• Gereksiz etiket atmayınız.\n• Talebinizi açık ve net bir dille ifade ediniz.')
            .setColor(config.embedColor)
            .setImage('https://i.hizliresim.com/78chqrs.png') // Buraya kurumsal banner linki gelecek
            .setFooter({ text: config.footerText });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('open_ticket').setLabel('Talep Oluştur').setEmoji('📩').setStyle(ButtonStyle.Secondary)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }

    // --- MODAL: TALEP SEBEBİ ---
    if (interaction.customId === 'open_ticket') {
        const modal = new ModalBuilder().setCustomId('ticket_modal').setTitle('Talep Detayları');
        const reasonInput = new TextInputBuilder()
            .setCustomId('ticket_reason')
            .setLabel('Talep Sebebiniz Nedir?')
            .setPlaceholder('Lütfen detaylıca açıklayınız...')
            .setStyle(TextInputStyle.Paragraph).setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(reasonInput));
        await interaction.showModal(modal);
    }

    // --- TICKET KANALI OLUŞTURMA ---
    if (interaction.isModalSubmit() && interaction.customId === 'ticket_modal') {
        const reason = interaction.fields.getTextInputValue('ticket_reason');
        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: config.ticketCategory,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
                { id: config.staffRoleId, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
            ]
        });

        const ticketEmbed = new EmbedBuilder()
            .setTitle('Talep Detayları')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`Merhaba **${interaction.user.username}**, talebin başarıyla oluşturuldu.\n\n**Talep Sebebi:**\n\`${reason}\``)
            .addFields({ name: 'Durum', value: '⌛ Yetkili bekleniyor...' })
            .setColor(config.embedColor)
            .setFooter({ text: config.footerText });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('claim_ticket').setLabel('Talebi Devral').setEmoji('📌').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('close_ticket').setLabel('Talebi Kapat').setEmoji('🔒').setStyle(ButtonStyle.Danger)
        );

        await channel.send({ content: `Destek Hattı: <@&${config.staffRoleId}> | <@${interaction.user.id}>`, embeds: [ticketEmbed], components: [row] });
        await interaction.reply({ content: `Talebiniz oluşturuldu: ${channel}`, ephemeral: true });
    }

    // --- BUTON: TALEBİ DEVRAL ---
    if (interaction.customId === 'claim_ticket') {
        if (!interaction.member.roles.cache.has(config.staffRoleId)) return interaction.reply({ content: 'Bu işlem yetkililere mahsustur.', ephemeral: true });
        
        await interaction.reply({ content: `Bu talebi <@${interaction.user.id}> adlı yetkili devraldı, sizinle ilgilenecek.` });
        interaction.message.components[0].components[0].data.disabled = true;
        await interaction.message.edit({ components: [interaction.message.components[0]] });
    }

    // --- BUTON: TALEBİ KAPAT VE LOG ---
    if (interaction.customId === 'close_ticket') {
        const logChannel = interaction.guild.channels.cache.get(config.logChannelId);
        const attachment = await transcript.createTranscript(interaction.channel);

        const logEmbed = new EmbedBuilder()
            .setTitle('Ticket Kapatıldı')
            .addFields(
                { name: 'Kapatan Yetkili', value: interaction.user.tag, inline: true },
                { name: 'Kanal', value: interaction.channel.name, inline: true }
            )
            .setColor('#ff0000')
            .setTimestamp();

        await logChannel.send({ embeds: [logEmbed], files: [attachment] });
        await interaction.reply('Kanal 5 saniye içinde siliniyor...');
        setTimeout(() => interaction.channel.delete(), 5000);
    }
});

client.login(config.token);