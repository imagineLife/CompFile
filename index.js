#!/usr/bin/env node

'use strict';
const readline = require('readline');
const os = require('os')
const v8 = require('v8');
const util = require('util');
const fs = require('fs');
const fsP = fs.promises;
const path = require('path')
const events = require('events');
class _events extends events{};
const e = new _events();

const { compFromName, indexFromString } = require('./helpers')

async function compFile(){
  let fileDescriptor, cssFileDescriptor;
  let inputComponentName = process.argv[2]
  inputComponentName = typeof(inputComponentName) == 'string' && inputComponentName.trim().length > 0 ? inputComponentName.trim() : false;

  // If no match is found, tell the user to try again
  if(!inputComponentName){
    console.log("Sorry, try again");
    return;
  }

  //make the fie directory
  const componentDirectoryString = `${process.env.PWD}/${inputComponentName}`

  try{
    await fsP.mkdir(componentDirectoryString)
  
    //create Component.js file
    fileDescriptor = await fsP.open(`${componentDirectoryString}/${inputComponentName}.js`,'a');

    let componentString = compFromName(inputComponentName)

    //Append to file and close the file
    await fsP.appendFile(fileDescriptor,`${componentString}\n`);

    //close the file
    await fileDescriptor.close()

    // create css file
    cssFileDescriptor = await fsP.open(`${componentDirectoryString}/${inputComponentName}.css`,'a');

    //close the file
    await cssFileDescriptor.close()
      // create index.js file
      fs.open(`${componentDirectoryString}/index.js`,'a', (err, indexFileDescriptor) => {

        if(err || !indexFileDescriptor){
          return callback('Couldnt open file for appending')
        }

        //Append to file and close the file
        fs.appendFile(indexFileDescriptor,`${indexFromString(inputComponentName)}\n`, err => {
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
  }catch(e){
    console.log('Error')
    console.log(e);
  }finally{
    fileDescriptor.close();
  }
} 

compFile()