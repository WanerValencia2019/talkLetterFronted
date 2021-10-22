import { createContext } from 'react';


export const usersContext = createContext({
	users: [],
	getAllUsers: () => null,
});