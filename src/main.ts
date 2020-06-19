import chalk from 'chalk'
const { drawExit } = require('./streambox')
const fs = require("fs");


const args:Array<string> = process.argv.slice(2)

if (args.length !== 1) {
    console.log(chalk.red("Usage: yarn start <FILENAME>"))
    process.exit(0)
} else {

    const filename: string = args[0]

    if (!fs.existsSync(filename)) {
        console.log(chalk.red(`The file ${filename} does not exist.`))
        process.exit(-1)
    }
    else {
        drawExit(filename)        
    }
}