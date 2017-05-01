import Header from './header'
import Meta from './meta'

export default ({ children }) => (
  <div className='main'>
    <Meta />
    <Header />

    <div className='page'>
      { children }
    </div>

    <style jsx>{`
      .main {
        width: 85%;
        margin-top: 40px;
        margin-left: 8vw;
        padding: 10px 0 0 0;
        background-color: #eee;
      }

      .page {
        color: #828282;
        background: #eee;
        padding-top: 48px;
      }

      @media (max-width: 750px) {
        .main {
          padding: 0;
          width: auto;
        }
      }
    `}</style>
  </div>
)
