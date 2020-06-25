
const fs = require('fs')
import chalk from 'chalk'



function transformLine(str: string, index: number, char: string): string {
    let start: string = str.slice(0, index)
    let end: string = str.slice(index, str.length)
    return `${start}${char}${end}`
}

function myWriteFile(filename: string, finalContent: string) {
    fs.writeFile(filename, finalContent, { encoding: 'utf8' }, (err: string) => {
        if (err) { throw err }
        else {
            console.log(chalk.green.bold("Successfully, you found the way from the path " + filename))
        }
    });
}

function drawExit(): void {

    const tabFile: Array<string> = [
        "data/maps/oval.01.map",
        "data/maps/rect.02.map",
        "data/maps/rect.03.map",
        "data/maps/rect.04.map",
        "data/maps/rect.05.map",
        "data/maps/rect.06.map",
        "data/maps/rect.07.map",
        "data/maps/rect.08.map",
    ]


    for (const filename of tabFile) {
        let content: string = ''
        let finalContent: string = ''
        let rstream = null

        if (!fs.existsSync(filename)) {
            console.log(chalk.red(`The file ${filename} does not exist.`))
            process.exit(-1)
        } else {
            if (filename === 'data/maps/oval.01.map') {
                rstream = fs.createReadStream(filename)
                rstream.on('data', (chunk: object) => {
                    content += chunk.toString()
                })


                rstream.on("end", () => {
                    let lines: Array<string> = content.split("\n")
                    let positionOne: number = lines[1].toString().indexOf('1')
                    let newLine: string = ''
                    for (const key in lines) {
                        if (lines[key] == lines[0] || lines[key] == lines[1] || lines[key] == lines[lines.length - 1]) {
                            finalContent += lines[key] + '\n'
                        } else {
                            newLine = transformLine(lines[key], positionOne, "v")
                            finalContent += newLine + '\n'
                        }
                    }
                    myWriteFile(filename, finalContent)
                })
            }

            else {

                rstream = fs.createReadStream(filename)
                rstream.on('data', (chunk: object) => {
                    content += chunk.toString()
                })

                rstream.on("end", () => {
                    let lines: Array<string> = content.split("\n")
                    let positionOne: number = -1
                    let positionTwo: number = -1
                    let lineNumber: number = -1
                    let column: number = -1
                    let newLine: string = ''

                    for (const key in lines) {
                        if (parseInt(key) === 0) {
                            column = parseInt(lines[0].slice(0, 2))
                            lineNumber = parseInt(lines[0].slice(3))
                        }
                        if (lines[key].includes("1")) {
                            positionOne = lines[key].indexOf('1')
                        }

                        if (lines[key].includes("2")) {
                            positionTwo = lines[key].indexOf('2')
                        }
                        if (lines[key].includes(' ')) {

                            // for(let i=0; i<13; i++){
                            if (lines[parseInt(key) + 1][positionOne] === ' ') {
                                newLine = transformLine(lines[parseInt(key) + 1], positionOne, "v")
                                finalContent += newLine + '\n'
                            }
                        } else {
                            finalContent += lines[key] + '\n'
                        }
                    }
                    myWriteFile(filename, finalContent)
                })
            }
        }


    }

}

module.exports = {
    drawExit
}