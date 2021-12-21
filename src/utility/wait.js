export default function wait(millseconds){
    const start = Date.now()
    return new Promise((res, rej) => {
        check(start, millseconds, res, rej)
    })
}
let iterations = 0
function check(start, millseconds, cb, rejection ){
    // console.log({now: Date.now(), start, expired: Date.now()-start, millseconds})
    if(Date.now() - start >= millseconds) cb(true) 
    else if (iterations < 1000) {
        
        setTimeout((() => {console.log("Hiya"); check(start, millseconds, cb, rejection)}), 100)
        iterations++
    } else {
        if(rejection) rejection("Wait Time Exceeeded")
    }
}