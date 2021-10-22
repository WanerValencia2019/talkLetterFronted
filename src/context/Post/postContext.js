import { createContext } from 'react';
import { generateString } from '../../utils';

export const postContext = createContext({
	posts: [],
	id_log: '',
	doGetMyPost: () => null,
	doUpdatePost: () => null,
	doAddPost: () => null,
	doDeletePost: () => null,
	doAddLike: () => null,
	doDeleteLike: () => null,
	doAddComent: () => null,
});