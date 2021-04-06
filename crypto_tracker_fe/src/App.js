import './App.css';

import { store } from "./actions/store"
import { Provider } from "react-redux"
import { ToastProvider } from 'react-toast-notifications';

import { Col, Container, Row } from 'reactstrap';
import LatestTicks from "./components/LatestTicks"
import Historical from "./components/Historical"

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <div className="App">
          <Container className="mt-4">
            <Row noGutters={false}>
              <Col xs="12" sm="6">
                <LatestTicks />
              </Col>
              <Col xs="12" sm="6">
                <Historical />
              </Col>
            </Row>
          </Container>

        </div>
      </ToastProvider>
    </Provider >
  );
}

export default App;