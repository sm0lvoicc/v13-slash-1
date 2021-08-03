const { Client, Collection } = require('discord.js');
const bot = new Client({
    allowedMentions: { parse: [] },
    intents: [
        /*INTENTS*/
    ], //if your bot has all the intents, change it if you don't
    fetchAllMembers: true //make it false if you don't want to cache the whole user list when doing stuff
    //this also takes quite a bit of RAM and time for the bot to come online if its a big bot
});
const { token } = require('./config.json');
bot.slash = new Collection();
['interaction'].forEach((x) => { //add more handlers if you want to, but here we are making a slash only bot so...
    require(`./handler/${x}`)(bot);
});
bot.on('ready', async () => {
    /*so first we will make a deply command which will register your command in all the servers or a single guild
    so, the deploy command will only be usable by you and in your test server*/
    /*---------------------------------deploy--------------------------------*/
    const guild = bot.guilds.cache.get("760780685647675412"/*the id of your guild in strings*/);
    const deploy = await guild.commands.create(
        {
            name: "deploy-test", //the name of the command
            description: "🚀 | deploy a slash command", //the description of the command, and only unicode emojis can be used 
            options: [
                {
                    name: "file",
                    description: "📁 | the file you want to deploy", //ik the emoji is of a folder not a file but its pretend we don't know that
                    type: 'STRING', //there are many different types, INTEGER, STRING, BOOLEAN, but we need string here
                    required: true, //ofc we do require this
                },
                {
                    name: "type", //command type
                    description: "🌐 | the type of the command",
                    type: "STRING",
                    required: false, //maybe if you want to register the guild command first
                    choices: [
                        {
                            name: "guild",
                            value: "server"
                        },
                        {
                            name: "global",
                            value: "everywhere"
                        }
                    ]
                }
            ],
            defaultPermission: false //makes the command non usabe for everyone
        }
    );
    const permissions = [
        {
            id: "744517607239057479", //your id
            type: 'USER', //the type, role or user
            permission: true //only this user can use it
        } //add more objects if you want to give permissions to more people
    ];
    await deploy.setPermissions(permissions);
    /*command written, now if we turn on our bot, i mean, your, mine basically, the command will be there in the guild*/
    console.log(`${bot.user.username} is ready to kick ${bot.users.cache.size} users from ${bot.guilds.cache.size} guilds`); //jking discord, don't ban ples
});
/*btw, you need to registed this command only once, and then remove or comment out these codes from here, else the bot
will try to reigister the command whenever you turn on the bot, which is certainly not very good and will error out*/
/*now, we need to listen to the interactions, its INTERACTION_CREATE thing from discord side, but in djs V13 its interaction*/
bot.on('interaction', async (interaction) => {
    if (!interaction.isCommand()) return; //rejecting a command if its not a command, fumk, english
    try {
        bot.slash.get(interaction.commandName).run(bot, interaction); //getting the command from the slash collection and running them
    } catch (error) {
        console.log(error);
        interaction.reply("breh, err"); //sends an error whenever there is
    };
});
bot.login(token).catch(console.error);