const readline = require('readline');
const os = require('os')
const v8 = require('v8');
const util = require('util');
const fs = require('fs');
const path = require('path')
const events = require('events');
class _events extends events{};
const e = new _events();

const { hzLine, verticalSpace, logTheData, compFromName, indexFromString } = require('./helpers')

let componentName = process.argv[2]
componentName = typeof(componentName) == 'string' && componentName.trim().length > 0 ? componentName.trim() : false;

if(componentName){
  //get ID from string
  fs.mkdir(`${__dirname}/${componentName}`, err => {
    if(err){
      console.log('err')
      console.log(err)
    }else{
      //create Component.js file
      fs.open(`${__dirname}/${componentName}/${componentName}.js`,'a', (err, fileDescriptor) => {

        if(err || !fileDescriptor){
          return callback('Couldnt open file for appending')
        }

        let componentString = compFromName(componentName)

        //Append to file and close the file
        fs.appendFile(fileDescriptor,`${componentString}\n`, err => {
          if(err){
            return callback('error appending and closing the file')
          }

          //close the file
          fs.close(fileDescriptor, (err) => {
            if(err){
              console.log('ERROR');
              console.log(err)
              return
            }

            // create css file
            fs.open(`${__dirname}/${componentName}/${componentName}.css`,'a', (err, fileDescriptor) => {

              if(err || !fileDescriptor){
                return callback('Couldnt open file for appending')
              }

              // create index.js file
              fs.open(`${__dirname}/${componentName}/index.js`,'a', (err, indexFileDescriptor) => {

                if(err || !indexFileDescriptor){
                  return callback('Couldnt open file for appending')
                }

                //Append to file and close the file
                fs.appendFile(indexFileDescriptor,`${indexFromString(componentName)}\n`, err => {
                  if(err){
                    return callback('error appending and closing the file')
                  }

                  //close the file
                  fs.close(indexFileDescriptor, (err) => {
                    if(err){
                      console.log('ERROR');
                      console.log(err)
                      return
                    }
                    return;
                  })
                })
              })
            })
          })
        })
      })
    }
  })
  // If no match is found, tell the user to try again
  if(!componentName){
    console.log("Sorry, try again");
  }
}