const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter a description of the project.",
            name: "description"
        },
        {
            type: "input",
            message: "Please describe the installation instructions for the project.",
            name: "installInstructions"
        },
        {
            type: "input",
            message: "Please describe the usage information for the project.",
            name: "usageInfo"
        },
        {
            type: "input",
            message: "Please describe the contribution guidelines for the project.",
            name: "contributionGuide"
        },
        {
            type: "input",
            message: "Please describe the test instructions for the project.",
            name: "testInstructions"
        },
        {
            type: "checkbox",
            message: "Please select a license.",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3",
                "Affero GPL",
                "Artistic License 2.0",
                "BSD 3-Clause License",
                "BSD 2-Clause License",
                "Eclipse Public License v1.0",
                "GPL v3",
                "LGPL v2.1",
                "LGPL v3",
                "Mozilla Public License v2",
                "Public Domain"
            ],
            name: "license"
        },
        {
            type: "input",
            message: "Enter your Username.",
            name: "username"
        },
        {
            type: "input",
            message: "Enter your email address.",
            name: "emailAddress"
        },
    ])
}

function generateMarkdown(response) {
    return `
# ${response.title}

# Table of Contents

- [Description](#description)
- [installInstructions](#installInstructions)
- [usageInfo](#usageInfo)
- [contributionGuide](#contributionGuide)
- [testInstructions](#testInstructions)
- [license](#license)
- [username](#username)
- [emailAddress](#emailAddress)

## Description

![license](https://img.shields.io/badge/License-${response.license}-blue.svg "Licesne Badge")

    ${response.description}
## Installation:
    ${response.installInstructions}
## Usage:
    ${response.usageInfo}
## Contributing:
    ${response.contributionGuide}
## Test
    ${response.testInstructions}
## Licesne:
    Click below for License information
- [license](https://opensource.org/licenses/${response.license})


Information about this repo/project can be found below:
-[github profile](https://github.com/${response.username})

 Email:   ${response.emailAddress}
    `;
}
async function init() {
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("Success");
    } catch (err) {
        console.log(err);
    }
}

init();