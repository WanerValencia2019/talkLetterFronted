import React, { useState } from 'react'
import { toastContext } from './toastContext';
import {generateString} from './../../utils';


export default function ToastProvider({ children }) {
	const [show, setShow] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('error');
	const [id_log, setIdLog] = useState(generateString());

	const displayToast = ({ message, type }) => {
		setShow(true);
		setMessage(message);
		setType(type);
		setIdLog(generateString())	
	}

	const hide = ()	=> {
		setShow(false);
		setIdLog(generateString())
	}

	return (
		<toastContext.Provider value={{show, message, type, displayToast, hide, id_log }} displayName="Toast Context">
			{children}
		</toastContext.Provider>
	)
}