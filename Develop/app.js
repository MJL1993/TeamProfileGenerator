const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?",
    },

    {
        type: "input",
        name: "managerID",
        message: "What is the manager's work ID?",
    },

    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email address?",
    },

    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?",
    },
];

const engineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?",
    },
    {
        type: "input",
        name: "engineerID",
        message: "What is the engineer's work ID?",
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email address?",
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer's GitHub username?",
    },
];

const internQuestions = [
    {
        type: "input",
        name: "internName",
        message: "What is the intern's name?",
    },
    {
        type: "input",
        name: "internID",
        message: "What is the intern's work ID?",
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email address?",
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is the intern's school name?",
    },
];

const teamQuestions = [{
    type: "list",
    name: "employeeType",
    message: "Which employee type would you like to create?",
    choices: ["intern", "engineer", "I have added all team members!"]
}]

function managerCreate() {
    inquirer.prompt(managerQuestions)
        .then(responses => {

            const manager = new Manager(responses.managerName, responses.managerID, responses.managerEmail, responses.managerOfficeNumber)

            team.push(manager);

            createTeam();
        })
};

managerCreate();

function engineerCreate() {
    inquirer.prompt(engineerQuestions)
        .then(responses => {

            const engineer = new Engineer(responses.engineerName, responses.engineerID, responses.engineerEmail, responses.engineerGithub)

            team.push(engineer);

            createTeam();
        })
}

function internCreate() {
    inquirer.prompt(internQuestions)
        .then(responses => {

            const intern = new Intern(responses.internName, responses.internID, responses.internEmail, responses.internSchool)

            team.push(intern);
            
            createTeam();
        })
}


function createTeam() {
    inquirer.prompt(teamQuestions)
        .then(teamRes => {

            switch (teamRes.employeeType) {

                case "engineer":
                    engineerCreate();
                    break;

                case "intern":
                    internCreate();
                    break;

                default:
                    buildTeam();
                    break;
            }
        })
};

function buildTeam(){

    fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);

    fs.writeFileSync(outputPath, render(team));       
};
