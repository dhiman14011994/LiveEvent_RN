// export const convertMinutesToHourMinute = (n: Number) => {
//     let num = n;
//     let hours = (num / 60);
//     let rhours = Math.floor(hours);
//     let minutes = (hours - rhours) * 60;
//     let rminutes = Math.round(minutes);
//     if (rhours > 0)
//         return String(rhours ? rhours : 0) + "m " + String(rminutes ? rminutes : 1) + "s"
//     else
//         return String(rminutes ? '0m '+rminutes : 1) + "s"
//         return String(rminutes ? rminutes : 1) + "s"
// }

export const convertMinutesToHourMinute = (n: any) => {
    // console.log("Check duration in helper functions >>> ", n)
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    // console.log("Check hours >>> ", rhours)
    // console.log("Check Minutes >>> ", rminutes)
    if (rhours > 0)
        return String(rhours ? rhours : 0) + "h " + String(rminutes ? rminutes : 1) + "min"
    else
        return String(rminutes>1 ? rminutes : 1) + "min"
}