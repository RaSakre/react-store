import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface IRegisterData {
	email: string;
	login:string;
	password:string;
}

interface ILoginData {
	login: string;
	password: string;
}

interface IUser{
	name:string;
	email:string;
}

interface IAuthState {
	isRegistered: boolean;
	isAuth: boolean;
	registerData: IRegisterData;
	loginData: ILoginData;
	userInfo: IUser;
}


const initialState:IAuthState = {
	isRegistered: false,
	isAuth: false,
	registerData: {
		email: "",
		login: "",
		password: ""
	},
	loginData: {
		login: "",
		password: ""
	},
	userInfo: {
		name: '',
		email: '',
	}
}

export const registerThunk = createAsyncThunk("auth/register", async (data:IRegisterData) => {
	const response = await fetch('http://localhost:3001/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			data
		})
	})
	const regData = response.json()
	return regData.then((data: any) => data)
})

export const userThunk = createAsyncThunk("auth/login", async (data: ILoginData) => {
  const response = await fetch('http://localhost:3001/users');
  const users = await response.json();

  // Проверяем, есть ли пользователь с указанными логином и паролем
  const user = users.find((user: { data: { login: string; password: string; }; }) => 
    user.data.login === data.login && user.data.password === data.password
  );

  if (!user) {
    throw new Error('Неверный логин или пароль'); // Обработка ошибки
  }
  return user; // Возвращаем пользователя
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setRegisterData: (state, action: PayloadAction<IRegisterData>) => {
			state.registerData = action.payload; // просто заменяем весь объект
		},
		setLoginData: (state, action:PayloadAction<ILoginData>) => {
			state.loginData = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(registerThunk.rejected, (state) => {
				state.isRegistered = false;
		})
		.addCase(registerThunk.pending, (state) => {
				state.isRegistered = false;
		})
		.addCase(registerThunk.fulfilled, (state, action) => {
			state.isRegistered = true;
		})
		.addCase(userThunk.fulfilled, (state, action) => {
				state.isAuth = true;
				state.userInfo = {
          email: action.payload.data.email,
          name: action.payload.data.login,
        };
		})
		.addCase(userThunk.rejected, (state, action) => {
			console.error(action.error.message);
		});
}
})



export const { setRegisterData, setLoginData } = authSlice.actions;
export default authSlice.reducer;
