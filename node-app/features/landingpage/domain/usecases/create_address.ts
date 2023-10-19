import { LandingpageAddress } from "../entities/address";
import { LandingpageAddressRepository } from "../repositories/address_repository";

export class CreateAddress {
    constructor(private addressRepository: LandingpageAddressRepository){};

    async execute(address: LandingpageAddress) : Promise<LandingpageAddress> {
        return await this.addressRepository.createAddress(address);
    }
}