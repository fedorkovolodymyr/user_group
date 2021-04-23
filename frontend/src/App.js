import React, { } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import GroupList from "./Components/GroupList";
import UserList from "./Components/UserList";


function App() {


  return (
      <Container>
          <Row>
              <Col>
                  <Tabs defaultActiveKey="users"
                      id="controlled-tab">
                      <Tab eventKey="users" title="Users">
                          <UserList />
                      </Tab>
                      <Tab eventKey="groups" title="Groups">
                          <GroupList />
                      </Tab>
                  </Tabs>

              </Col>
          </Row>
      </Container>
  );
}

export default App;
