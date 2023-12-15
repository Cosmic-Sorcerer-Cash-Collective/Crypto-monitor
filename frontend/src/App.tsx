import { MyContextProvider } from './context/MyContext'
import { Root } from './page/root'

function App() {
  return (
    <MyContextProvider>
      <Root />
    </MyContextProvider>
  )
}

export default App
