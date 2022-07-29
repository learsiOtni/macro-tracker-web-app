import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faCog, faSignOutAlt, faUserCircle, 
  faCalendarWeek, faThLarge, faSearch, faCaretSquareDown, faCaretSquareUp
} from '@fortawesome/free-solid-svg-icons'
 

import Navigator from './navigation';

class App extends Component {
  render() {
    return (
      <Navigator />
    );
  };
};

library.add(
  fab, faHeart, faCog, faSignOutAlt, faUserCircle, 
  faCalendarWeek, faThLarge, faSearch, faCaretSquareDown, faCaretSquareUp
);

export default App;
