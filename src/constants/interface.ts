import { Timestamp } from "firebase/firestore";
import * as H from "history";
export interface devicesData {
    key: string;
    name: string;
    address: string;
    active: string;
    connect: string;
    service: string;
    user: string;
    password: string;
}

export interface serviceData {
    key: string;
    name: string;
    description: string;
    active: string;
}

export interface numberData {
    stt: string;
    status: string;
}

export interface giveNumberData {
    key: string,
    name: string,
    serviceName: string,
    date: string,
    hsd: string,
    active: string,
    nguoncap: string,
}

export interface accountData {
    key: number,
    userName: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    role: string,
    password: string,
    active: boolean
}

export interface roleData {
    key: string,
    roleName: string,
    roleDecription: string,
    featureRole: string
}

export interface dairyData {
    key: number,
    userName: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    role: string,
    password: string,
    active: boolean,
    ipAddress: string,
    manipulate: string,
    time: string
}

export type userType = {
    id?: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    name: string;
    isActive: boolean;
};

export interface defaultState {
    authLoading: boolean;
    userId: string;
    userLogin: userType | null;
    user: userType | null;
    users: userType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

export interface defaultDeviceState {
    loading: boolean;
    device: deviceType | null;
    devices: deviceType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

export interface defaultServiceState {
    loading: boolean;
    service: serviceType | null;
    services: serviceType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

export interface defaultGiveNumberState {
    loading: boolean;
    giveNumber: giveNumberType | null;
    giveNumbers: giveNumberType[];
    giveNumbersFilter: giveNumberType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

export interface defaultDiaryState {
    loading: boolean;
    diaries: diaryType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

export interface defaultRoleState {
    loading: boolean;
    role: roleType | null;
    roles: roleType[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}


export type roleType = {
    id?: string;
    name: string;
    description: string;
    amountOfUser?: number;
    authorityA?: string[] | undefined;
    authorityB?: string[] | undefined;
    authorityC?: string[] | undefined;
};

export interface Ifilter {
    active?: boolean | null,
    connect?: boolean | null,
    role?: string | null,
    keywords: string,
    service?: string | null,
    status?: string | null,
    source?: string | null,
}

export type deviceType = {
    id?: string;
    deviceId: string;
    name: string;
    username: string;
    password: string;
    type: string;
    ip: string;
    isActive?: boolean;
    isConnect?: boolean;
    services: string[];
};

export type serviceType = {
    id?: string;
    serviceId: string;
    name: string;
    description: string;
    start?: number;
    end?: number;
    prefix: string;
    surfix: string;
    reset: boolean;
    isActive?: boolean;
};

export type giveNumberType = {
    id?: string;
    service: string | undefined;
    serviceName: string | undefined;
    number?: string;
    name: string;
    stt: number;
    status: "waiting" | "used" | "skip";
    source: string;
    timeGet: Timestamp;
    date: Timestamp;
    phoneNumber: string;
    email: string;
};

export type diaryType = {
    id?: string;
    username: string;
    ip: string;
    action: string;
    time: Timestamp;
};


export interface RouteComponentProps<P> {
    match: match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

export interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}