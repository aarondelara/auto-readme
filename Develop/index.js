const fs = require("fs");
const CLI = require("./cli.js");
const { callbackify } = require("util");

const questions = [
    "What is the title of your project?",
    "What is the description of your project?",
    "What are the installations used?",
    "Usage?",
    "What is the license?",
    "Contributers?",
    "Tests",
    "GitHub Username",
    "Email"
];

async function main() {
    let cli = new CLI(questions);
    let data = await cli.run();
    data = convertDataToReadMe(data);
    writeToFile("README.md", data, () => {
    });
}
main();

function writeToFile(fileName, data, callback) {
    fs.writeFile(fileName, data, callback);
}

let readme = [
    "",
    "Description",
    "Installations",
    "Usage",
    "Licenses",
    "Contributers",
    "Tests",
    "Questions"
]

function convertDataToReadMe(data) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            output.push("# " + data[i]);
            continue;
        }
        if (i > 6) {
            let question = "";
            question += "https://github.com/" + data[i];
            question += "\n\n" ;
            question += data[i + 1];
            output.push("## " + readme[i] + "\n" + question)
            let tableOfContents = "## Table of Contents\n";
            for (let i = 0; i < readme.length; i++) {
                if (i === 0) continue;
                tableOfContents += `[${readme[i]}](#${readme[i].replace(" ", "-").toLowerCase()})\n\n`;
            }
            output.push(tableOfContents);
            break;
        }

        // if (data[i] === "") {
        //     output.push(readme[i]);
        //     continue;
        // }

        output.push("## " + readme[i] + "\n" + data[i]);
    }
    return output.join("\n\n");
}