let dates = []
let managedTimes = []
let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC', timeZoneName: 'short'}
import { List, ListSubHeader, ListItem, ListDivider } from 'react-toolbox/lib/list'
import Link from 'next/link'

export default (times, service) => {
  if (!service) {
    return <p>Loading ...</p>
  }
  times.map((time) => {
    let index = -1
    const date = new Date(time[0])
    const date2 = new Date(time[1])
    const prettyDate = date.toLocaleString('en-US', options)
    const prettyTime = date.toLocaleTimeString().replace(/:\d+ /, ' ')

    index = dates.indexOf(prettyDate)
    if (index === -1) {
      dates.push(prettyDate)
      index = dates.indexOf(prettyDate)
      managedTimes[index] = []
    }
    let type = service.value.split(' ')[0].toLowerCase()
    if (type !== 'swedish' && type !== 'shiatsu') {
      type = 'other'
    }

    let url = 'appointment/?type=' + service.value.split(' ')[0].toLowerCase() + '&start=' + time[0] + '&end=' + time[1]
    let as = service.value.split(' ')[0].toLowerCase() + '/' + date.getTime() + '/' + date2.getTime()
    managedTimes[index].push({time: prettyTime, url: url, as: as})
  })
  let layout = dates.map((date, i) => {
    return (
      <div key={date}>
        <List selectable ripple>

          <style jsx>{`
      .date {
        margin-top: 1px;
        margin-bottom: -14px;
        color: #828282;
        background: #fff;
      }

      }
    `}</style>
          <div className='date'>
            <ListDivider />
            <ListSubHeader caption={date} />
            {
          managedTimes[i].map((time, i) => {
            return (
              <Link prefetch key={time.as} href={time.url} as={time.as} >
                <ListItem selectable caption={time.time} />
              </Link>
            )
          })
        }
          </div>
        </List>
      </div>
    )
  })
  return layout
}
