
const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')
import chalk from 'chalk'



function transformLine(str: string, index: number): string {
    let start: string = str.slice(0, index)
    let end: string = str.slice(index, str.length)
    return `${start}v${end}`
}

function myWriteFile(filename: string, finalContent: string) {
    fs.writeFile(filename, finalContent, { encoding: 'utf8' }, (err: string) => {
        if (err) { throw err }
        else {
            console.log(chalk.green.bold("Successfully, you found the way from the path " + filename))
        }
    });
}

function drawExit(filename: string): void {
    const rstream = fs.createReadStream(filename)


    let content: string = ''
    let finalContent: string = ''

    rstream.on('data', (chunk: object) => {
        content += chunk.toString()
        // console.log(content)
    })

    if (filename === 'data/maps/oval.01.map') {
        rstream.on("end", () => {
            let lines: Array<string> = content.split("\n")
            let positionOne: number = lines[1].toString().indexOf('1')
            let newLine: string = ''
            for (const key in lines) {
                if (lines[key] == lines[0] || lines[key] == lines[lines.length - 1]) {
                    finalContent += lines[key] + '\n'
                } else {
                    newLine = transformLine(lines[key], positionOne)
                    finalContent += newLine + '\n'
                }
            }
            myWriteFile(filename, finalContent)
        })
    }

    else {


        rstream.on("end", () => {
            let lines: Array<string> = content.split("\n")
            let positionTwo: number = -1
            let positionLineTwo: number = -1
            let lineNumber: number = 27
            let column: number = 46
            let char: string = ''
            let newLine: string = ''


            for (const key in lines) {


                if (lines[key].includes('2')) {
                    positionTwo = lines[key].toString().indexOf('2')
                    positionLineTwo = parseInt(key)

                }
                if (!lines[key].includes(' ')) {
                    finalContent += lines[key] + '\n'
                } else {
                    if (parseInt(key) <= 26) {
                        // console.log(lines[parseInt(key)+1])
                        if (lines[parseInt(key) + 1][positionTwo] === ' ') {
                            console.log(key)
                            newLine = lines[parseInt(key) + 1].toString().replace(' ', 'v')

                            if(lines[parseInt(key)][positionTwo+1] === ' '){
                                newLine = lines[parseInt(key) + 1].toString().replace(' ', '>')
                            }
                            finalContent += newLine + '\n'

                            // if (lines[parseInt(key)][positionTwo + 1] === ' ') {
                            //     newLine = lines[parseInt(key) + 1].toString().replace(' ', '>')
                            //     finalContent += newLine + '\n'
                            // }
                        }

                    }

                }

            }
            console.log(finalContent);
            // console.log(positionTwo);




        })


    }

}

module.exports = {
    drawExit
}