import React, { useContext, useLayoutEffect } from 'react';
import SideHeader from '../../components/SideHeader';
import UserConnecteds from '../../components/UserConnecteds';
import CreatePostHeader from '../../components/CreatePostHeader';
import PostBanner from '../../components/PostBanner';
import { postContext } from '../../context/Post/postContext';
import { authContext } from '../../context/Auth/authContext';

export default function Home() {
	const { getAllPosts, posts, id_log } = useContext(postContext);
	const { user } = useContext(authContext);

	useLayoutEffect(() => {		
		getAllPosts()
	},[id_log])

	return (
		<div className="bg-white min-h-screen">		
			<SideHeader />
			<div class="grid grid-cols-12  shadow mt-1 overflow-scroll">
				<div className="col-span-12 col-span-12 md:col-span-9 p-4 ">
					<h4 className="text-center leading-loose font-bold text-lg mb-2">Bienvenido a el paraiso del conocimiento!!</h4>
					<div className="w-full md:max-w-4xl bg-gray-100 shadow">
						<CreatePostHeader />
						<div className="mt-1">
							{posts.length > 0 && posts.map((p)=>(<PostBanner createdAt={p.createdAt} id={p._id} title={p.title} content={p.content} likes={p.likes} comments={p.comments} />))}
						</div>
					</div>
				</div>
				<div className="invisible md:visible bg-white p-4 col-auto md:col-span-3 border-l-2 max-h-96 overflow-y-scroll">
					<h4 className="text-center font-medium">Usuarios conectados</h4>
					<div>
						<UserConnecteds />
					</div>
				</div>
			</div>
		</div>
	)
}