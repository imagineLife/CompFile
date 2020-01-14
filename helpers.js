const compFromName = (compName) => {
let str = 
`import React from 'react';

const ${compName} = () => (<p>${compName}</p>);

export default ${compName};`
return str
}

const indexFromString = (compName) => {
  let str = 
`import ${compName} from './${compName}';
export default ${compName};`
return str
}

module.exports = {hzLine, verticalSpace, compFromName, indexFromString}