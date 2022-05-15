const utils = require('./utils');
const Discord = require("discord.js");

class Game {
    /**
     * @name tictactoe
     * @kind constructor
     * @param {Object} options options
     * @param {any} [options.message] parameter used for message event
     * @param {any} [options.player_two] second player in the game.
     * @description Easy and simple tic tac toe game!
     */
    constructor(options) {
        if(!options.message) throw new TypeError("message is a required argument")
        if(!options.player_two) throw new TypeError("Second player is a required option")
        this.player_two = options.player_two;
        this.message = options.message;
        this.grid = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
        this.ttt_grid()
        this.reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
        this.players_go = 0
        this.send_message = true
        this.playing_game = true
        this.ttt_message = false
        this.run();
    }

    async run() {
        await this.eval_win()
        if (this.playing_game == true) {
            if (this.players_go % 2  == 0) {
                if (this.send_message == true) {
                    let grid = await this.ttt_grid()
                    if (this.players_go == 0) {
                        this.ttt_message =  await this.message.channel.send(new Discord.MessageEmbed().setColor(0x03a9f4).setAuthor(`🎲 | Tictactoe`).setDescription(`**» It's your turn, ${this.message.author}!**\n\`\`\`${grid}\`\`\``));
                        for (let i in this.reactions) {
                            this.ttt_message.react(this.reactions[i])
                        }
                    }
                    else {
                        this.ttt_message.edit(new Discord.MessageEmbed().setColor(0x03a9f4).setAuthor(`🎲 | Tictactoe`).setDescription(`**» It's your turn, ${this.message.author}!**\n\`\`\`${grid}\`\`\``));
                    }
                }
                this.ttt_message.awaitReactions((reaction, user) => user.id == this.message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '5️⃣' || reaction.emoji.name == '6️⃣' || reaction.emoji.name == '7️⃣' || reaction.emoji.name == '8️⃣' || reaction.emoji.name == '9️⃣'),
                { max: 1, time: 3000000 }).then(async collected => {
                    this.reaction = collected.first().emoji.name
                    if (this.reaction == '1️⃣') this.user_input = 0
                    if (this.reaction == '2️⃣') this.user_input = 1
                    if (this.reaction == '3️⃣') this.user_input = 2
                    if (this.reaction == '4️⃣') this.user_input = 3
                    if (this.reaction == '5️⃣') this.user_input = 4
                    if (this.reaction == '6️⃣') this.user_input = 5
                    if (this.reaction == '7️⃣') this.user_input = 6
                    if (this.reaction == '8️⃣') this.user_input = 7
                    if (this.reaction == '9️⃣') this.user_input = 8
                    this.grid[this.user_input] = '✖️'
                    const userReactions = this.ttt_message.reactions.cache.filter(reaction => reaction.users.cache.has(this.message.author.id));
                    for (const reaction of userReactions.values()) {
                    await reaction.users.remove(this.message.author.id);
                    this.ttt_message.reactions.cache.get(this.reactions[this.user_input]).remove()
                    this.players_go++
                    this.send_message = true
                    this.run()
                }
                }
                ).catch(() => {
                    this.ttt_message.edit(new Discord.MessageEmbed().setColor(0xf04947).setDescription(`<a:no:615983201156071424> **|** ***The tictactoe game timed out!***`));
                    this.end_game(this.player_two, this.message)
                })
            }
            if (this.players_go % 2  == 1) {
                if (this.send_message == true) {
                    let grid = await this.ttt_grid()
                    this.ttt_message.edit(new Discord.MessageEmbed().setColor(0x03a9f4).setAuthor(`🎲 | Tictactoe`).setDescription(`**» It's your turn, ${this.player_two}!**\n\`\`\`${grid}\`\`\``));
                    this.ttt_message.awaitReactions((reaction, user) => user.id == this.player_two.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '5️⃣' || reaction.emoji.name == '6️⃣' || reaction.emoji.name == '7️⃣' || reaction.emoji.name == '8️⃣' || reaction.emoji.name == '9️⃣'),
                    { max: 1, time: 30000 }).then(async collected => {
                        this.reaction = collected.first().emoji.name
                        if (this.reaction == '1️⃣') this.user_input = 0
                        if (this.reaction == '2️⃣') this.user_input = 1
                        if (this.reaction == '3️⃣') this.user_input = 2
                        if (this.reaction == '4️⃣') this.user_input = 3
                        if (this.reaction == '5️⃣') this.user_input = 4
                        if (this.reaction == '6️⃣') this.user_input = 5
                        if (this.reaction == '7️⃣') this.user_input = 6
                        if (this.reaction == '8️⃣') this.user_input = 7
                        if (this.reaction == '9️⃣') this.user_input = 8
                        this.grid[this.user_input] = '⭕'
                        const userReactions = this.ttt_message.reactions.cache.filter(reaction => reaction.users.cache.has(this.player_two.id));
                        for (const reaction of userReactions.values()) {
                        await reaction.users.remove(this.player_two.id);
                        this.ttt_message.reactions.cache.get(this.reactions[this.user_input]).remove()
                        this.players_go++
                        this.send_message = true
                        this.run()
                    }
                    }
                    ).catch(() => {
                        this.ttt_message.edit(new Discord.MessageEmbed().setColor(0xf04947).setDescription(`<a:no:615983201156071424> **|** ***The tictactoe game timed out!***`));
                        this.end_game(this.player_two, this.message)
                    })
                }
                }
        }
    }
    async ttt_grid() {
            return `${this.grid[0]}${this.grid[1]}${this.grid[2]}\n${this.grid[3]}${this.grid[4]}${this.grid[5]}\n${this.grid[6]}${this.grid[7]}${this.grid[8]}`
    }
    async eval_win() {
        const win_combinations = [
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6] 
        ]
        let step_one = -1
        while (step_one < 7) {
            step_one++
            if (this.grid[win_combinations[step_one][0]] == '✖️' && this.grid[win_combinations[step_one][1]] == '✖️' && this.grid[win_combinations[step_one][2]] == '✖️') {
                let grid = await this.ttt_grid()
                this.ttt_message.edit(new Discord.MessageEmbed().setColor(0x03a9f4).setAuthor(`🎲 | Tictactoe`).setDescription(`**» ${this.message.author} won!**\n\`\`\`${grid}\`\`\``));
                this.end_game(this.player_two, this.message)
            }
            if (this.grid[win_combinations[step_one][0]] == '⭕' && this.grid[win_combinations[step_one][1]] == '⭕' && this.grid[win_combinations[step_one][2]] == '⭕') {
                let grid = await this.ttt_grid()
                this.ttt_message.edit(new Discord.MessageEmbed().setColor(0x03a9f4).setAuthor(`🎲 | Tictactoe`).setDescription(`**» ${this.player_two} won!**\n\`\`\`${grid}\`\`\``));
                this.end_game(this.player_two, this.message)
            }
            if (this.players_go == 9 && step_one == 7) {
                let grid = await this.ttt_grid()
                this.ttt_message.edit(new Discord.MessageEmbed().setColor(0x03a9f4).setAuthor(`🎲 | Tictactoe`).setDescription(`**» It's a draw!**\n\`\`\`${grid}\`\`\``));
                this.end_game(this.player_two, this.message)
            }
        }
    }
    end_game(player_two, message) {
        utils.inGame = utils.inGame.filter(i => i != message.author.id);
        utils.inGame = utils.inGame.filter(i => i != player_two.id);
        this.playing_game = false
        this.ttt_message.reactions.removeAll()
        return;
    }
}

module.exports = Game;