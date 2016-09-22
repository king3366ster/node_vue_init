function testTimeout (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timeout)
    }, timeout)
  })
}

export async function timeoutFn () {
  // use mysql2#connection to do sql
  // please use await
  let result = await testTimeout(2)
  return result
}
