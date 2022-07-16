import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isActionOpen, setIsActionOpen] = useState(false);

  const toggleAction = (open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) { return; }
    setIsActionOpen(open);
  };

  return (
    <AppContext.Provider value={{ isActionOpen, toggleAction }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
