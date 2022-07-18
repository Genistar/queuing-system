import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { defaultGiveNumberState, giveNumberType, Ifilter } from '../../constants/interface';
import { RootState } from '../../store';


const initialState: defaultGiveNumberState = {
    loading: false,
    giveNumber: null,
    giveNumbers: [],
    message: {
        fail: false,
        text: "",
    },
};

export const getAll = createAsyncThunk("givenumbers/getAll",
    async (filter?: Ifilter) => {
        let giveNumbers: giveNumberType[] = [];

        const queryUser = await getDocs(collection(db, "givenumber"));
        queryUser.forEach((value) => {
            giveNumbers.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        if (filter) {
            if (filter.service != null)
                giveNumbers = giveNumbers.filter(
                    (giveNumber) => giveNumber.service === filter.service
                );
            if (filter.status != null)
                giveNumbers = giveNumbers.filter(
                    (giveNumber) => giveNumber.status === filter.status
                );
            if (filter.source != null)
                giveNumbers = giveNumbers.filter(
                    (giveNumber) => giveNumber.source === filter.source
                );
            if (filter.keywords != "")
                giveNumbers = giveNumbers.filter(
                    (giveNumber) =>
                        giveNumber.name
                            .toLowerCase()
                            .includes(filter.keywords?.toLowerCase())
                );
        }
        // for (const user of users) {
        //     const roleSnap = await getDoc(doc(db, "roles", user.role as string));
        //     user.role = (roleSnap.data() as roleType).name;
        // }
        giveNumbers.reverse();
        return giveNumbers;
    });

export const get = createAsyncThunk("givenumbers/get", async (id: string) => {
    let giveNumber: giveNumberType;

    const giveNumberSnap = await getDoc(doc(db, "givenumber", id));
    // const roleSnap = await getDoc(doc(db, "roles", (userSnap.data() as userType).role));
    giveNumber = {
        id,
        ...(giveNumberSnap.data() as giveNumberType),
        // role: (roleSnap.data() as roleType).name,
    };

    return giveNumber;
});


const giveNumberSlice = createSlice({
    name: 'givenumber',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumbers = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
        builder.addCase(get.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumber = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(get.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    },
})
const giveNumberReducer = giveNumberSlice.reducer;

export const giveNumberSelector = (state: RootState) => state.giveNumberReducer;


export default giveNumberReducer