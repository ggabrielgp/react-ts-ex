import { Provider } from 'react-redux';
import './App.css'
import { Home } from './pages';
import { LayoutContainer } from './styled-components/layout.styled.component';
import store from './redux/store';
import { Navbar } from './components';


function App() {


  return (
    <Provider store={store}>
      <Navbar />
      <LayoutContainer>
        <Home />
      </LayoutContainer>
    </Provider>
  )
}

export default App
