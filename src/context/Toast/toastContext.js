import { createContext } from 'react';
import {generateString} from './../../utils';

const defaultData = {
	show: false,
	message: '',
	type: 'error',
	displayToast: () => null,
	hide: () => null,
	id_log: generateString()
}

export const toastContext = createContext(defaultData);