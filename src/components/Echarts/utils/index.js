import http from "./http";
export async function chartApi({ data, config } = {}) {
    // const { url, method } = config;
    // const { payload } = await http({
    //     url: url || "",
    //     method: method || 'post',
    //     data
    // })
    // return payload;
    let bb = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ a: 132 })
        }, 2000)
    })
    return bb;
}