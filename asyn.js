// async function water(){
//   try{
//     await waitFn();
//   }catch(e){
//     console.log('error')
//     console.log(e);
//   }
// }

// const waitFn = () => {
//   return new Promise((res,rej) => {
//     setTimeout(() => {
//       console.log('done with delay')
//       res()
//     }, 2000)
//   })
// }

// water()

try {
  try {
    throw new Error('oops');
  } catch (ex) {
    // console.error('inner', ex.message);
    throw ex;
  }
} catch (ex) {
  console.error('outer', ex.message);
}