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