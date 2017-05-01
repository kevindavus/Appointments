export default (times, service) => {
  if (!service) {
    return []
  }
  let periods = []
  times.map(function (available) {
    const open = new Date(available.begin_at)
    const close = new Date(available.end_at)
    let start = new Date()
    let finish = new Date()

    const durInMS = service.duration * 60 * 1000
    for (let i = open.getTime(); i + durInMS < close.getTime(); i += durInMS) {
      start.setTime(i)
      finish.setTime(i + durInMS)
      periods.push([start.toISOString(), finish.toISOString()])
    }
  })
  return periods
}
