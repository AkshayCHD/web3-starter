repeatCalls();

// const repeatCalls = async () => {
//     const val = await yourAsyncTask();
//     console.log(val)
//     await repeatCalls()
// }

function repeatCalls() {
    setTimeout(() => {
        yourAsyncTask().then((val) => console.log(val))
        repeatCalls();
    }, 1000)
}
const yourAsyncTask = () => new Promise((resolve, reject) => {
    try {
        setTimeout(()=> {
            console.log("Async Task Done");
            resolve(true)
        }, 1000)
    } catch(error) {
        reject(error);
    }
})

