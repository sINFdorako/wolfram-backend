import { LandingpageAddressRepository } from "../repositories/address_repository";

export class DeleteAddress {
    constructor(private addressRepository: LandingpageAddressRepository) {}

    async execute(dsgvoId: number): Promise<void> {
         await this.addressRepository.deleteAddress(dsgvoId);
    }
}