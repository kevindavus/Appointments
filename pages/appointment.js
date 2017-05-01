import {Card, CardTitle, CardMedia, CardText, CardActions} from 'react-toolbox/lib/card'
import {Button} from 'react-toolbox/lib/button'
import Page from '../components/page'
import React from 'react'

const details = {
  'swedish': {
    img: 'https://static.pexels.com/photos/3192/woman-girl-beauty-mask.jpg',
    'title': 'Swedish Massage',
    'desc': 'Classic full body massage. Enjoy this medium pressure massage that consists of a mix of kneading to promote circulation and gentle gliding to create a sense of relaxation and overall sense of well-being'
  },
  'shiatsu': {
    img: 'https://images.pexels.com/photos/7700/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
    'title': 'Shiatsu Massage',
    'desc': 'Shiatsu massage (finger pressure massage) is a traditional Japanese massage in which the practitioner uses his or her fingers and palms to put pressure on different parts of the body.'
  },
  'other': {
    img: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
    'title': 'Spa Treatment',
    'desc': 'Come enjoy the most relaxing treatment you could dream of.'
  }
}
const formatTime = function (date) {
  return date.toISOString().replace(/-|:|\.\d+/g, '')
}

export default class extends React.Component {
  static getInitialProps ({ query: { type, start, end }
}) {
    return { type, start, end }
  }

  render () {
    let start = new Date(this.props.start)
    if (start.toString() === 'Invalid Date') {
      start.setTime(Number(this.props.start))
    }
    let end = new Date(this.props.end)
    if (end.toString() === 'Invalid Date') {
      end.setTime(Number(this.props.end))
    }
    let dets
    this.props.type !== 'swedish' && this.props.type !== 'shiatsu' ? dets = details.other : dets = details[this.props.type]

    const appleURL = encodeURI(
      'data:text/calendar;charset=utf8,' + [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'URL:http://kevindav.us',
        'DTSTART:' + (formatTime(start) || ''),
        'DTEND:' + (formatTime(end) || ''),
        'SUMMARY:' + (dets.title || ''),
        'DESCRIPTION:' + (dets.desc || ''),
        'LOCATION:1601 2nd Ave, Seattle, WA 98101',
        'END:VEVENT',
        'END:VCALENDAR'].join('\n'))
    const googleURL = encodeURI([
      'https://www.google.com/calendar/render',
      '?action=TEMPLATE',
      '&text=' + (dets.title || ''),
      '&dates=' + (formatTime(start)),
      '/' + (formatTime(end)),
      '&details=' + (dets.desc || ''),
      '&location=1601 2nd Ave, Seattle, WA 98101',
      '&sprop=&sprop=name:'
    ].join(''))
    return (

      <Page>
        <Card style={{width: '350px'}}>
          <CardTitle
            avatar='https://pbs.twimg.com/profile_images/724754287188803585/fiVeFs-p_400x400.jpg'
            title='Remitly Spa Services'
    />
          <CardMedia
            aspectRatio='wide'
            image={dets.img}
    />
          <CardTitle
            title={dets.title}
    />
          <CardText>{start.toLocaleString().replace(/:\d+ /, ' ')} to {end.toLocaleTimeString().replace(/:\d+ /, ' ')}</CardText>
          <CardText>{dets.desc}</CardText>
          <CardActions>
            <Button label='Add to Google' href={googleURL} target='_blank' />
            <Button label='Add to Apple' href={appleURL} target='_blank' />
          </CardActions>
        </Card>
      </Page>
    )
  }
}
