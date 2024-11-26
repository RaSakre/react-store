import { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { MainSection } from './components/Main-Section/MainSection';
import {useDispatch, useSelector} from './utils/store'
import { fetchClothes, fetchBasket } from './slice/storeSlice';
import { Routes, Route } from 'react-router-dom';
import { Shop } from './components/Shop/Shop';
import { Card } from './components/CardDetails/Card';
import { Basket } from './components/Basket/Basket';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Profile } from './components/Profile/Profile';

function App() {
	const dispatch = useDispatch()
	const clothes = useSelector(state => state.webStore.clothes)
	const basketProducts = useSelector(state => state.webStore.basketProducts)
	useEffect(() => {
		if (clothes.length === 0) {
			dispatch(fetchClothes());
		}
		dispatch(fetchBasket());
	}, [dispatch, clothes.length]);
  return (
		<>
		<Header/>
		<Routes>
			<Route path='/' element={<MainSection/>} />
			<Route path='/shop' element={<Shop/>} />
			<Route path='/shop/:id' element={<Card/>} />
			<Route path='/basket' element={<Basket/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='/register' element={<Register/>} />
			<Route path='/profile' element={<Profile/>} />
		</Routes>
		</>
  );
}

export default App;
