const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "deploy",
    dev: true,
    guild: true,
    global: false,
    usage: 'doesn\'t really matter',
    run: async (bot, ctx) => {
        await ctx.defer(); //make it .defer({ ephemeral: true}) if you want it to be ephemeral
        const f = ctx.options[0].value; //so basically ctx is the context, so we are taking the value of the option 0, array so its 0
        const file = require(`./${f}`);
        const stuff = file.data;
        if (!ctx.options[1] || ctx.options[1].value == "everywhere") {
            if (file.global) {  //ok so remember, it takes 1 hour to register a global command, and ig you can make similar stuff so it registers guild commands too
                try {
                    bot.application.commands.create(stuff);
                    let name = file.name ? '✅' : `❌`;
                    let description = file.description ? '✅' : `❌`;
                    let usage = file.usage ? '✅' : `❌`;
                    let dev = file.dev ? '✅' : `❌`;
                    let global = file.global ? '✅' : `❌`;
                    let guild = file.guild ? '✅' : `❌`;
                    let data = file.data ? '✅' : `❌`;
                    const embed = new MessageEmbed()
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                        .setDescription(`<:bux_slash:846414368124305468> slash command added`)
                        .setColor("#5865F2")
                        .addField('name:', `> ${file?.name} ${name}`, true)
                        .addField('description:', `> ${file?.description} ${description}`, true)
                        .addField('usage:', `> ${file?.usage} ${usage}`, true)
                        .addField('dev:', `> ${file?.dev} ${dev}`, true)
                        .addField('global:', `> ${file?.global} ${global}`, true)
                        .addField('guild:', `> ${file?.guild} ${guild}`, true)
                        .addField('data:', `> ${data}`)
                        .setFooter(ctx.user.username, ctx.user.displayAvatarURL())
                        .setTimestamp()
                        .setColor("#5865F2")
                    ctx.editReply({ embeds: [embed] });
                    return;
                } catch (error) {
                    console.log(error);
                    ctx.editReply('err');
                }
            }else{
                ctx.editReply('its not set as a global command in the modul.exports so go fix that you idiot');
            }
        } else {
            const gui = bot.guilds.cache.get(file.guildid[0]);
            await gui.commands.create(stuff);
            let name = file.name ? '✅' : `❌`;
            let description = file.description ? '✅' : `❌`;
            let usage = file.usage ? '✅' : `❌`;
            let dev = file.dev ? '✅' : `❌`;
            let global = file.global ? '✅' : `❌`;
            let guild = file.guild ? '✅' : `❌`;
            let data = file.data ? '✅' : `❌`;
            const embed = new MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .setDescription(`<:bux_slash:846414368124305468> slash command added`)
                .setColor("#5865F2")
                .addField('name:', `> ${file?.name} ${name}`, true)
                .addField('description:', `> ${file?.description} ${description}`, true)
                .addField('usage:', `> ${file?.usage} ${usage}`, true)
                .addField('dev:', `> ${file?.dev} ${dev}`, true)
                .addField('global:', `> ${file?.global} ${global}`, true)
                .addField('guild:', `> ${file?.guild} ${guild}`, true)
                .addField('data:', `> ${data}`)
                .setFooter(ctx.user.username, ctx.user.displayAvatarURL())
                .setTimestamp()
                .setColor("#5865F2")
            ctx.editReply({ embeds: [embed] });
        }
    }
}