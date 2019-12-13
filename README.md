

# A React-Component Directory Maker

### What This Does
This creates a directory for a named [React](https://reactjs.org/) component. 
Running this package produces...
- A **directory** titled a given tile (_ex. ComponentA_)
- **3 files** inside the directory:
  - a **Component.css** file (_ex. ComponentA.css_)
  - a **Component.js** file which contains some 'boilerplate' react code...(_ex. ComponentA.js_)
	  - the template code currently looks like...
```
import React from 'react';
const ComponentA = () => <p>ComponentA</p>
export default ComponentA
```
  - an **index.js file**, which imports & exports the Component from the sibling js file
 ```
 import ComponentA from './ComponentA'
 export default ComponentA
 ```

### Installation
```npm install -g compfile```
I recommend installing this globally. 
Otherwise
- install it locally to a project
- create a script in your package.json, something like...
	- ```"cf": "compfile"```

### Creating A Component Directory && Files using a terminal
**Globally Installed Instance**
- cd into the directory where you plan to insert a new component directory
- run 
```compfile your-component-name-here```

**Locally Installed Instance**
- cd into the directory where you plan to insert a new component directory
- Taking the above script as an an example, run 
```npm run cf your-component-name-here```