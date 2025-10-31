interface TodoItem {
    task: string,
    done: boolean
}

let items: TodoItem[] = []

function addTask(task: string): void {
    items.push({ task: task, done: false })
}

function showTasks(): void {
    if (items.length === 0) {
        console.log("No tasks to show.")
        return
    }

    const indexWidth = Math.max(2, Math.floor(Math.log10(items.length)))
    const taskWidth = Math.max(...items.map(i => i.task.length), 4)

    console.log(`| ${'ID'.padEnd(indexWidth)} | ${'Task'.padEnd(taskWidth)} | ${'✓'} |`)
    console.log('-'.repeat(indexWidth+taskWidth + 11))

    for (let i = 0; i < items.length; i++) {
        const num = String(i + 1).padEnd(indexWidth)
        const task = items[i].task.padEnd(taskWidth)
        const done = (items[i].done ? '✓' : '✗')
        console.log(`| ${num} | ${task} | ${done} |`)
    }

}


function deleteTask(id: number): void {
    if (id < 0 || id >= items.length){
        console.log("Invalid ID")
        return
    }
    items.splice(id, 1)
}

function editTask(id: number, newText: string) {
    if (id < 0 || id >= items.length){
        console.log("Invalid ID")
        return
    }
    items[id].task = newText
}

function markAsDone(id: number) {
    if (id < 0 || id >= items.length){
        console.log("Invalid ID")
        return
    }
    items[id].done = true
}

function markAsNotDone(id: number) {
    if (id < 0 || id >= items.length){
        console.log("Invalid ID")
        return
    }
    items[id].done = false
}


const { exit } = require("process")
var pnp = require('prompt-sync')();

function main() {

    while (true) {
        console.log(`
Raouf's Todolist CLI, enter :
- 1 to display all the tasks.
- 2 to add a task.
- 3 to mark a task as done.
- 4 to undo a task.
- 5 to edit a task.
- 6 to delete a task.
- 0 to exit.
`);
        let input : string = '';
        while(input == '')
            input = pnp('Enter operation number : ')
        let input2: string
        switch (input) {
            case '0':
                exit(0)
                break
            case '1':
                showTasks()
                break
            case '2':
                input2 = pnp('Enter your task : ')
                addTask(input2)
                break
            case '3':
                input2 = pnp('Enter task ID : ')
                markAsDone(parseInt(input2) - 1)
                break
            case '4':
                input2 = pnp('Enter task ID : ')
                markAsNotDone(parseInt(input2) - 1)
                break
            case '5':
                input2 = pnp('Enter task ID : ')
                let input3 = pnp('Enter new task name : ')
                editTask(parseInt(input2) - 1, input3)
                break
            case '6':
                input2 = pnp('Enter task ID : ')
                deleteTask(parseInt(input2) - 1)
                break
        }

        if(pnp('Press 0 to exit or 1 to continue : ') == '0')
            break
    }
}
main()