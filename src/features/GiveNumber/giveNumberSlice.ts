import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import moment from 'moment';
import { db } from '../../config/firebase';
import { defaultGiveNumberState, giveNumberType, Ifilter, serviceType } from '../../constants/interface';
import { RootState } from '../../store';


const initialState: defaultGiveNumberState = {
    loading: false,
    giveNumber: null,
    giveNumbers: [],
    giveNumbersFilter: [],
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
            giveNumbers = giveNumbers.filter((giveNumber) => {
                if (filter.dateRange != null) {
                    const dateProvider = moment(giveNumber.timeGet.toDate());
                    if (
                        filter.dateRange[0] &&
                        !moment(filter.dateRange[0]).isSameOrBefore(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }

                    if (
                        filter.dateRange[1] &&
                        !moment(filter.dateRange[1]).isSameOrAfter(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });
            if (filter.service != null)
                giveNumbers = giveNumbers.filter(
                    (giveNumber) => giveNumber.serviceName === filter.service
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
                            .includes(filter.keywords?.toLowerCase()),


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
    }
    return giveNumber;
});

export const getByIdService = createAsyncThunk(
    "giveNumber/getByNameService",
    async ({ key, filter }: { key?: string; filter?: Ifilter }) => {
        let giveNumbers: giveNumberType[] = [];

        const querySnapshot = await getDocs(
            query(collection(db, "givenumber"), where("service", "==", key))
        );
        querySnapshot.forEach((value) => {
            giveNumbers.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        for (const giveNumber of giveNumbers) {
            const Snap = await getDoc(
                doc(db, "services", giveNumber.service as string)
            );
            const temp = Snap.data() as serviceType;
            giveNumber.number = temp.serviceId + temp.prefix + giveNumber.stt;
        }
        if (filter) {
            giveNumbers = giveNumbers.filter((giveNumber) => {
                if (filter.dateRange != null) {
                    const dateProvider = moment(giveNumber.timeGet.toDate());
                    if (
                        filter.dateRange[0] &&
                        !moment(filter.dateRange[0]).isSameOrBefore(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }

                    if (
                        filter.dateRange[1] &&
                        !moment(filter.dateRange[1]).isSameOrAfter(
                            dateProvider,
                            "days"
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });
            if (filter.status != null)
                giveNumbers = giveNumbers.filter(
                    (giveNumber) => giveNumber.status == filter.status
                );
            if (filter.keywords != "")
                giveNumbers = giveNumbers.filter((giveNumber) =>
                    giveNumber.number
                        ?.toLowerCase()
                        .includes(filter.keywords.toLowerCase())
                );
        }
        giveNumbers.sort(
            (a, b) =>
                b.timeGet.toDate().getTime() - a.timeGet.toDate().getTime()
        );
        return giveNumbers;
    }
);

export const addGiveNumber = createAsyncThunk(
    "givenumbers/add",
    async (values: giveNumberType) => {
        let giveNumbers: giveNumberType[] = [];

        const querySnapshot = await getDocs(
            query(
                collection(db, "givenumber"),
                where("service", "==", values.service)
            )
        );
        querySnapshot.forEach((value) => {
            giveNumbers.push({
                id: value.id,
                ...(value.data() as giveNumberType),
            });
        });
        giveNumbers.sort(
            (a, b) =>
                b.timeGet.toDate().getTime() - a.timeGet.toDate().getTime()
        );

        const newDoc = doc(collection(db, "givenumber"));
        await setDoc(newDoc, {
            ...values,
            stt: giveNumbers.length > 0 ? giveNumbers[0].stt + 1 : 1,
            number: values.number + (giveNumbers.length > 0 ? giveNumbers[0].stt + 1 : 1).toString()
        });

        const Ref = doc(db, "givenumber", newDoc.id);
        const Snap = await getDoc(Ref);
        return Snap.id;
    }
);

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
        builder.addCase(getByIdService.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getByIdService.fulfilled, (state, action) => {
            if (action.payload) {
                state.giveNumbersFilter = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.giveNumbersFilter = [];
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(getByIdService.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
        builder.addCase(addGiveNumber.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addGiveNumber.fulfilled, (state, action) => {
            if (action.payload) {
                state.message.fail = false;
                state.message.text = "Thêm thành công";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.loading = false;
        });
        builder.addCase(addGiveNumber.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });

    },
})
const giveNumberReducer = giveNumberSlice.reducer;

export const giveNumberSelector = (state: RootState) => state.giveNumberReducer;


export default giveNumberReducer