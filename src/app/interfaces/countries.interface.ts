export interface Countries {
    name: Name;
    currencies: object;
    capital: object[];
    cca2: string;
    flag: string;
    region: string;
    population: string;
}

export interface Name {
    common: string;
    official: string;
    nativeName: object;
}