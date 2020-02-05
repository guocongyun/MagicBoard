import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About } from 'features/about';
import { BoardContainer } from 'features/board';
import { GlobalStyles } from 'theme';

const App: FC = () => (
  <>
    <GlobalStyles />
    <Router>
      <Switch>
        <Route path="/" exact>
          <BoardContainer />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
