const inquirer = require('inquirer');

class CLI {
	#prompts = [];
	constructor(questions) {
		this.#promptBuilder(questions);
	}
	#promptBuilder(questions) {
		for (let i = 0; i < questions.length; i++) {
			let o = {
				type: 'input',
				name: i + "",
				message: questions[i]
			}
			this.#prompts.push(o)
		}
	}
	run() {
		return inquirer.prompt(
			this.#prompts
		).then((responses) => {
			let output = [];
			let i = 0;
			while (i in responses) {
				output.push(responses[i]);
				i++;
			}
			return output;
		});
	}
}

module.exports = CLI;
