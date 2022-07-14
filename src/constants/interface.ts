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

export type roleType = {
    id?: string;
    name: string;
    description: string;
    amountOfUser?: number;
    authorityA: string[] | undefined;
    authorityB: string[] | undefined;
    authorityC: string[] | undefined;
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