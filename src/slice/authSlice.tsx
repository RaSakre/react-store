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
	login:string;
	email:string;
}

interface IAuthState {
	isRegistered: boolean;
	error: string;
	isAuth: boolean;
	registerData: IRegisterData;
	loginData: ILoginData;
	userInfo: IUser;
}


const initialState:IAuthState = {
	isRegistered: false,
	error: '',
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
		login: '',
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


const generateToken = () => {
  return crypto.randomUUID();
};
export const userThunk = createAsyncThunk(
  "auth/login",
  async (data: ILoginData) => {
    const response = await fetch("http://localhost:3001/users");

    if (!response.ok) {
      throw new Error("Ошибка при получении пользователей");
    }
    const users = await response.json();
    const user = users.find(
      (user: { data: { login: string; password: string } }) =>
        user.data.login === data.login && user.data.password === data.password
    );
		if(user) {
		const token = generateToken();
    localStorage.setItem("token", token);
		localStorage.setItem("userEmail", user.data.email)
		localStorage.setItem("userName", user.data.login);  
		}

    if (!user) {
      throw new Error("Неверный логин или пароль");
    }

    
    return user;
  }
);


const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setRegisterData: (state, action: PayloadAction<IRegisterData>) => {
			state.registerData = action.payload; // просто заменяем весь объект
		},
		setLoginData: (state, action:PayloadAction<ILoginData>) => {
			state.loginData = action.payload
		},
		restoreUser: (state, action: PayloadAction<{ email: string ; login: string }>) => {
      state.isAuth = true;
      state.userInfo = action.payload;
    },
		clearUser: (state) => {
			state.isAuth = false;
			state.userInfo = {
				login: '',
				email: '',
			}
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
          login: action.payload.data.login,
        };
		})
}
})



export const { setRegisterData, setLoginData, restoreUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
