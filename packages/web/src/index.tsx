import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './styles/GlobalStyles'

import App from './App'

const Root: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <App />
    </>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
