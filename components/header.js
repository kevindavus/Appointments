import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import {Button} from 'react-toolbox/lib/button'

export default({ title }) => (
  <AppBar fixed flat>
    <Navigation type='horizontal'>
      <Button href='/' style={{top: '10px', right: '-30px', backgroundColor: 'rgb(13, 71, 161)'}}>
        <div style={{color: '#fff'}}>Appointments</div>
      </Button>
    </Navigation>
  </AppBar>
)
