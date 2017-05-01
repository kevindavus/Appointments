import React from 'react'
import Page from '../components/page'
import Navigation from 'react-toolbox/lib/navigation'
import Button from 'react-toolbox/lib/button'

import 'isomorphic-fetch'
import getTimes from '../lib/get-times'
import getLayout from '../lib/get-layout'

const openURL = 'https://gist.githubusercontent.com/rdmcfee/c022a06a90d59926dc3e44d10a536126/raw/c006cd096e3ecca8ef5e2339823770e62723c84c/openings.json'
const appURL = 'https://gist.githubusercontent.com/rdmcfee/c13df3428b5d47c6a2a1557c173ea911/raw/33adb76ca15efdf08fd9388ffeb146ea3d388b72/appointments.json'
let openings, open, appts, appointments

export default class scheduler extends React.Component {
  static async getInitialProps ({res}) {
    let services = []
    // eslint-disable-next-line no-undef
    openings = await fetch(openURL)
    open = await openings.json()

    // eslint-disable-next-line no-undef
    appointments = await fetch(appURL)
    appts = await appointments.json()
    appts.services.map((service, i) => {
      services.push(
        {
          value: `${service.name}`,
          label: `${service.name} - ${service.duration} minutes`,
          duration: `${service.duration}`,
          href: `/?service=${i}`
        })
    })
    return {
      openings: open.openings,
      services: services
    }
  }

  render () {
    const {url, services, openings} = this.props
    const serviceIdx = url.query.service ? url.query.service : 0
    return (
      <Page>
        <Navigation type='horizontal' >
          <p>Please choose from one of our services:</p>
          {
            services.map((service) => <Button href={service.href} label={service.value} />)
          }
        </Navigation>
        {getLayout(getTimes(openings, services[serviceIdx]), services[serviceIdx])}
      </Page>
    )
  }
}
