// app.js - Main application entry point
console.log('Server starting...');

import {formatDate, validateTask, mergeTaskUpdate, createTask, } from "./utils.js";
import {fetchSampleUsers, fetchSampleUsersPromise } from "./api.js";

console.log(formatDate(new Date("2026-07-22")));

const completeTask = {title: "Graded Task 3", dueDate: "2026-07-22",};
console.log(completeTask);

console.log(validateTask(completeTask));
console.log(validateTask({}));

const updatedTask = mergeTaskUpdate(completeTask, { title: "Graded Task 3", dueDate: "2026-07-15" });

console.log(updatedTask);

const user = await fetchSampleUsers();
const sampleUser = user
    .filter((user) => user.name.length < 40)
    .map((user) => ({ id: user.id, name: user.name, email: user.email}));
console.log(sampleUser);
console.log();

const usersPromise = await fetchSampleUsersPromise();
const sampleUsersPromise = usersPromise
    .filter((user) => user.name.length < 40)
    .map((user) => ({ id: user.id, name: user.name, email: user.email}));
console.log(sampleUsersPromise);
console.log();

async function main(){
    try {
        const user = await fetchSampleUsers();
        console.log(user);
        console.log();

        const task = createTask({title: "Graded Task 4", dueDate: formatDate(new Date("2026-07-22"))});
        console.log(task);
    } catch (err){
        console.error("Invalid:", err.message);
    }
}

main();