import './App.css';

import { store } from "./actions/store"
import { Provider } from "react-redux"
import { ToastProvider } from 'react-toast-notifications';

import { Col, Container, Row } from 'reactstrap';
import Test from "./components/LatestTicks"

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <div className="App">
          <Container className="mt-4">
            <Row noGutters={false}>
              <Col xs="12" sm="6"><Test /></Col>
              <Col xs="12" sm="6">Historical</Col>
            </Row>
          </Container>

        </div>
      </ToastProvider>
    </Provider>
  );
}

export default App;

// TODO

// Main page layout: 10 min
// Ticks component: 1H
// Countdown display: 30 min
// History component: 1H
