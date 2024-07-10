import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages and components
import Header from "./components/Header/Header.js";
import Home from "./pages/Home/Home.js";
import Signup from "./pages/Signup/Signup.js";
import Login from "./pages/Login/Login.js";
import HabitList from "./pages/HabitList/HabitList.js";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/list" element={<HabitList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
