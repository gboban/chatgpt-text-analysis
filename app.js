const fs = require("fs")
const path = require("path")
require("dotenv").config();

const ChatGPTHelper = require("./index.js")

let chatGPTHelper = new ChatGPTHelper(process.env.OPEN_AI_KEY)

function main() {
    console.log("Hello world")
    console.log("Usage: node app.js --path <path>")
    console.log("\t'npm start' will run 'node app.js .'")

    console.log(process.argv)

    const argvPathIndex = process.argv.indexOf('--path')
    let argvPath;
    
    if (argvPathIndex > -1) {
      // Retrieve the value after --custom
      argvPath = process.argv[argvPathIndex + 1]
    }

    console.log("Path to proccss", argvPath)

    fs.readdir(argvPath, (err, files) => {
        if(err){
            throw err
        }
        files.forEach(file => {
          // get the details of the file 
          let fileDetails = fs.lstatSync(path.resolve(argvPath, file))
          // check if the file is directory 
          if (fileDetails.isDirectory()) {
            console.log('Directory: ' + file)
          } else {
            console.log('File: ' + file)
            try {
              const data = fs.readFileSync(path.resolve(argvPath, file), 'utf8')
              console.log(data)
              chatGPTHelper.getInfo(data/*.slice(0, 1024)*/, 11, 128)
            } catch (err) {
              console.error(err)
            }
          }
          return
        })
    })
  }
  
  if (require.main === module) {
    main()
  }
