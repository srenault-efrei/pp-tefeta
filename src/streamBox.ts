
const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')
import chalk from 'chalk'



function transformLine(str: string, index: number): string {
    let start: string = str.slice(0, index)
    let end: string = str.slice(index, str.length)
    return `${start}v${end}`

}

function drawExit(filename: string): void {
    const rstream = fs.createReadStream(filename)


    let content: string = ''
    let finalContent: string = ''

    rstream.on('data', (chunk: object) => {
        content += chunk.toString()
    })

    rstream.on("end", () => {
        let lines: Array<string> = content.split("\n")
        let positionOne: number = lines[1].toString().indexOf('1')
        let newLine: string  = ''
        for (const key in lines) {
            if (lines[key] == lines[0] || lines[key] == lines[lines.length - 1]) {
                finalContent += lines[key] + '\n'
            } else {
                newLine = transformLine(lines[key], positionOne)
                finalContent += newLine + '\n'
            }
        }

        fs.writeFile(filename, finalContent, { encoding: 'utf8' }, (err: string) => {
            if (err) { throw err }
            else {
                console.log(chalk.green.bold("Successfully, you found the way from the path " + filename))
            }
        });
    })

}

module.exports = {
    drawExit
}