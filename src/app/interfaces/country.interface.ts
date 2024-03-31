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
    coatOfArms?: Images;
    continents: Array<any>;
    demonyms?: object;
    fifa?: string;
    flags?: Images;
    idd?: object;
    independent?: string;
    landlocked?: string;
    languages?: object;
    latlng?: Array<any>;
    maps?: Maps;
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

export interface Images {
    alt?: string;
    png: string;
    svg: string;
}

export interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}