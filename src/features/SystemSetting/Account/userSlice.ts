import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { defaultState, roleType, userType } from '../../../constants/interface';
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

export const getAll = createAsyncThunk("user/getAll", async () => {
    let users: userType[] = [];

    const queryUser = await getDocs(collection(db, "user"));
    queryUser.forEach((value) => {
        users.push({
            id: value.id,
            ...(value.data() as userType),
        });
    });
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

    },
    extraReducers: (builder) => {
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