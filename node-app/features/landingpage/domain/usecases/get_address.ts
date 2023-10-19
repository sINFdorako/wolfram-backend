import { LandingpageAddress } from "../entities/address";
import { LandingpageAddressRepository } from "../repositories/address_repository";

export class GetAddress {
    constructor(private addressRepository: LandingpageAddressRepository) {}

    async execute(dsgvoId: number): Promise<LandingpageAddress> {
        return await this.addressRepository.getAddress(dsgvoId);
    }
}