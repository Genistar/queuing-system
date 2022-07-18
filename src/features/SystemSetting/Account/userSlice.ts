import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { defaultState, Ifilter, roleType, userType } from '../../../constants/interface';
import { RootState } from '../../../store';

const initialState: defaultState = {
    authLoading: false,
    userId: "",
    userLogin: null,
    user: null,
    users: [],
    message: {
        fail: false,
        text: "",
    },
};

export const login = createAsyncThunk(
    "user/login",
    async ({ username, password }: { username: string; password: string }) => {
        let id = null;
        const usersRef = collection(db, "user");
        const querySnapshot = await getDocs(
            query(
                usersRef,
                where("username", "==", username),
                where("password", "==", password)
            )
        );
        querySnapshot.forEach((doc) => {
            id = doc.id;
            localStorage.setItem("userId", doc.id);
        });
        return id;
    }
);

export const load = createAsyncThunk("user/load", async () => {
    let user: userType;
    let id = localStorage.getItem("userId");
    const usersRef = doc(db, "user", id as string);

    const userSnap = await getDoc(usersRef);
    user = {
        id: userSnap.id,
        ...(userSnap.data() as userType),
    };
    return user;
});

export const getAll = createAsyncThunk("user/getAll",
    async (filter?: Ifilter) => {
        let users: userType[] = [];

        const queryUser = await getDocs(collection(db, "user"));
        queryUser.forEach((value) => {
            users.push({
                id: value.id,
                ...(value.data() as userType),
            });
        });
        if (filter) {
            if (filter.active != null)
                users = users.filter(
                    (user) => user.role == filter.role
                );
            if (filter.keywords != "")
                users = users.filter(
                    (user) =>
                        user.email
                            .toLowerCase()
                            .includes(filter.keywords?.toLowerCase()) ||
                        user.name
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        user.username
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
        }
        // for (const user of users) {
        //     const roleSnap = await getDoc(doc(db, "roles", user.role as string));
        //     user.role = (roleSnap.data() as roleType).name;
        // }
        users.reverse();
        return users;
    });

export const add = createAsyncThunk(
    "user/add",
    async (values: userType) => {
        const newUser = doc(collection(db, "user"));
        await setDoc(newUser, values);
        const userRef = doc(db, "user", newUser.id);
        const userSnap = await getDoc(userRef);
        return userSnap;
    }
);
export const get = createAsyncThunk("user/get", async (id: string) => {
    let user: userType;

    const userSnap = await getDoc(doc(db, "user", id));
    // const roleSnap = await getDoc(doc(db, "roles", (userSnap.data() as userType).role));
    user = {
        id,
        ...(userSnap.data() as userType),
        // role: (roleSnap.data() as roleType).name,
    };

    return user;
});

export const update = createAsyncThunk(
    "user/updateUser",
    async (value: userType) => {
        const userRef = doc(db, "user", value.id as string);
        await updateDoc(userRef, value);
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem("userId");
            state.userLogin = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.message.fail = false;
                state.message.text = "Đăng nhập thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Sai mật khẩu hoặc tên đăng nhập";
            }
            state.authLoading = false;
        });
        builder.addCase(load.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(load.fulfilled, (state, action) => {
            if (action.payload) {
                state.userLogin = action.payload;
            } else {
                state.userLogin = null;
            }
            state.authLoading = false;
        });
        builder.addCase(load.rejected, (state, action) => {
            state.userLogin = null;
            state.authLoading = false;
        });
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.users = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(get.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(get.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(get.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(update.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.authLoading = false;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})
const userReducer = userSlice.reducer;

export const userSelector = (state: RootState) => state.userReducer;


export default userReducer