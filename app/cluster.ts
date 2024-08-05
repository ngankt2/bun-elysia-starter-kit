import {spawn} from "bun";

let cpus = navigator.hardwareConcurrency; // Number of CPU cores
if (cpus > 3) {
    cpus = 3;
}
const buns = new Array(cpus);

for (let i = 0; i < cpus; i++) {
    const isMaster = (i === 0); // Set the first process as master
    console.log(`Spawning process on CPU: ${i}, Master: ${isMaster}`);

    buns[i] = spawn({
        cmd: ["bun", "./app/index.ts", isMaster ? "master" : "worker", i.toString()],
        stdout: "inherit",
        stderr: "inherit",
        stdin: "inherit",
    });
}

function kill() {
    for (const bun of buns) {
        bun.kill();
    }
}

process.on("SIGINT", kill);
process.on("exit", kill);