#!/usr/bin/env node

'use strict';
const readline = require('readline');
const os = require('os')
const v8 = require('v8');
const util = require('util');
const fs = require('fs');
const path = require('path')
const events = require('events');
class _events extends events{};
const e = new _events();

const { compFromName, indexFromString } = require('./helpers')

async function compFile(){
  let inputComponentName = process.argv[2]
  inputComponentName = typeof(inputComponentName) == 'string' && inputComponentName.trim().length > 0 ? inputComponentName.trim() : false;
  if(inputComponentName){
    //get ID from string
    fs.mkdir(`${process.env.PWD}/${inputComponentName}`, err => {
      if(err){
        console.log('err')
        console.log(err)
      }else{
        //create Component.js file
        fs.open(`${process.env.PWD}/${inputComponentName}/${inputComponentName}.js`,'a', (err, fileDescriptor) => {

          if(err || !fileDescriptor){
            return callback('Couldnt open file for appending')
          }

          let componentString = compFromName(inputComponentName)

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
              fs.open(`${process.env.PWD}/${inputComponentName}/${inputComponentName}.css`,'a', (err, fileDescriptor) => {

                if(err || !fileDescriptor){
                  return callback('Couldnt open file for appending')
                }

                // create index.js file
                fs.open(`${process.env.PWD}/${inputComponentName}/index.js`,'a', (err, indexFileDescriptor) => {

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
              })
            })
          })
        })
      }
    })
    // If no match is found, tell the user to try again
    if(!inputComponentName){
      console.log("Sorry, try again");
    }
  }
} 

compFile()