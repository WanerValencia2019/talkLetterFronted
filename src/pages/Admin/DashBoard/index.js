import React from 'react';

import NavBar from './NavBar';

export default function DashBoard({ children }) {
	return (		
	<NavBar>
		{children}	
	</NavBar>
	)
}