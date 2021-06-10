//// Async await is cool until you have several try catch to deal with.

Optimization 1

const OPt1 = async (params) => {
  const first = await step1(params).catch(err => handle(err))
  const second = await step1(first).catch(err => handle(err))
  const third = await step1(second).catch(err => handle(err))

  return third
}



Optimization 2

const AsyncHelper = async () => {
  try{
    const data = await promise;
    return [data, null];
  }catch(error) {
    return [null, error]
  }
}

const OPt2 = async () => {
  const [data, error] = AsyncHelper()
  const [data2, error2] = AsyncHelper()
  const [data3, error3] = AsyncHelper()
}
