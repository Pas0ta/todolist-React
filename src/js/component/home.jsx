import React from "react";
import TodoList from "./todoList.jsx";


//create your first component
const Home = () => {
	return (
		<div className="container-fluid p-0">
			<div className="row mt-4 mb-3">
				<div className="col-12">
					<h1 className=" text-center">
						 Mi Listilla
					</h1>
					<TodoList />
				</div>
			</div>
		
	</div>
	);
};

export default Home;