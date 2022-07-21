import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { defaultServiceState, Ifilter, serviceType } from "../../constants/interface";
import { RootState } from "../../store";


const initialState: defaultServiceState = {
    loading: false,
    service: null,
    services: [],
    message: {
        fail: false,
        text: "",
    },
};

export const getAll = createAsyncThunk("services/getAll",
    async (filter?: Ifilter) => {
        let services: serviceType[] = [];

        const queryUser = await getDocs(collection(db, "services"));
        queryUser.forEach((value) => {
            services.push({
                id: value.id,
                ...(value.data() as serviceType),
            });
        });
        if (filter) {
            if (filter.active != null)
                services = services.filter(
                    (service) => service.isActive == filter.active
                );
            if (filter.keywords != "")
                services = services.filter(
                    (service) =>
                        service.name
                            .toLowerCase()
                            .includes(filter.keywords?.toLowerCase()) ||
                        service.description
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase()) ||
                        service.serviceId
                            .toLowerCase()
                            .includes(filter.keywords.toLowerCase())
                );
        }
        // for (const user of users) {
        //     const roleSnap = await getDoc(doc(db, "roles", user.role as string));
        //     user.role = (roleSnap.data() as roleType).name;
        // }
        services.reverse();
        return services;
    });
export const get = createAsyncThunk("service/get", async (id: string) => {
    let service: serviceType;

    const serviceRef = doc(db, "services", id);
    const serviceSnap = await getDoc(serviceRef);
    service = {
        id,
        ...(serviceSnap.data() as serviceType),
    };

    return service;
});
export const getName = createAsyncThunk('service/getName', async (serviceId: string) => {
    let service: serviceType;

    const serviceRef = doc(db, 'service', serviceId);
    const serviceSnap = await getDoc(serviceRef);
    service = {
        ...(serviceSnap.data() as serviceType),
    };
    return service
})

export const add = createAsyncThunk(
    "service/add",
    async (values: serviceType) => {
        const newService = doc(collection(db, "services"));
        await setDoc(newService, values);
        const serviceRef = doc(db, "services", newService.id);
        const serviceSnap = await getDoc(serviceRef);
        return serviceSnap;
    }
);

export const update = createAsyncThunk(
    "service/updateService",
    async (value: serviceType) => {
        const serviceRef = doc(db, "services", value.id as string);
        await updateDoc(serviceRef, value);
    }
);

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.services = action.payload;
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
                state.service = action.payload;
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
        builder.addCase(update.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.loading = false;
        });
    }
})
const serviceReducer = serviceSlice.reducer;

export const serviceSelector = (state: RootState) => state.serviceReducer;

export default serviceReducer