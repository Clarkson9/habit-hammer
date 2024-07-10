import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages and components
import Header from "./components/Header/Header.js";
import Home from "./pages/Home/Home.js";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import HabitList from "./pages/HabitList/HabitList.js";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/list" element={<HabitList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
