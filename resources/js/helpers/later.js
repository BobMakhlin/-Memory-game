
export default function later(delay) {
    return new Promise(
        (res, rej) => {
            setTimeout(res, delay)
        }
    )
}
