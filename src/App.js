import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TodosList from "./features/todos/TodosList";

function App() {
	return (
		<>
			<div className="container">
				<TodosList />
			</div>
		</>
	);
}

export default App;
