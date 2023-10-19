import { LandingpageAddress } from "../entities/address";

export interface LandingpageAddressRepository {
    createAddress(address: LandingpageAddress) : Promise<LandingpageAddress>;
    updateAddress(address: LandingpageAddress) : Promise<LandingpageAddress>;
    getAddress(dsgvoId: number) : Promise<LandingpageAddress>;
    deleteAddress(dsgvoId: number) : Promise<void>;
}