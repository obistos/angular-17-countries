export interface Country {
    name: Name;
    currencies: object;
    capital: Array<any>;
    cca2: string;
    flag: string;
    region: string;
    population: string;
    altSpellings?: Array<any>;
    area?: number;
    borders?: Array<any>;
    capitalInfo?: object;
    car?: object;
    cca3?: string;
    ccn3?: string;
    cioc?: string;
    coatOfArms?: object;
    continents: Array<any>;
    demonyms?: object;
    fifa?: string;
    flags?: Flags;
    idd?: object;
    independent?: string;
    landlocked?: string;
    languages?: object;
    latlng?: Array<any>;
    maps?: object;
    startOfWeek?: string;
    status?: string;
    subregion?: string;
    timezones?: string;
    tld?: Array<any>;
    translations?: object;
    unMember?: string;
}

export interface Name {
    common: string;
    official: string;
    nativeName: object;
}

export interface Flags {
    alt: string;
    png: string;
    svg: string;
}