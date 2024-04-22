import inquirer from "inquirer";
let todos = [];
let condition = true;
let taskCount = 0;
async function main() {
    while (condition && taskCount < 10) {
        let todoQuestions = await inquirer.prompt([
            {
                name: "firstQuestion",
                type: "input",
                message: "What would you like to add in your todos?"
            },
            {
                name: "secondQuestion",
                type: "confirm",
                message: "Would you like to add more todos?",
                default: true
            }
        ]);
        if (todoQuestions.firstQuestion === "") {
            console.log("Task cannot be empty.");
        }
        else {
            let deleteTask = await inquirer.prompt({
                name: "deleteTask",
                type: "confirm",
                message: "Do you want to delete a task?",
                default: false
            });
            if (deleteTask.deleteTask && todos.length > 0) {
                let deleteIndex = await inquirer.prompt({
                    name: "deleteIndex",
                    type: "list",
                    message: "Which task would you like to delete?",
                    choices: todos
                });
                let index = todos.indexOf(deleteIndex.deleteIndex);
                todos.splice(index, 1);
                console.log(`Task "${deleteIndex.deleteIndex}" deleted.`);
            }
            else {
                todos.push(todoQuestions.firstQuestion);
                console.log(todos);
                condition = todoQuestions.secondQuestion;
                taskCount++;
            }
        }
    }
    console.log("Maximum limit reached. You cannot add more than 10 tasks.");
}
main();
