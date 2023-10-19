import { LandingpageAddress } from "../../domain/entities/address";
import { CreateAddress } from "../../domain/usecases/create_address";
import { DeleteAddress } from "../../domain/usecases/delete_address";
import { GetAddress } from "../../domain/usecases/get_address";
import { UpdateAddress } from "../../domain/usecases/update_address";
import { Request, Response } from "express";

export class AddressController {
    constructor(private createAddress: CreateAddress, private updateAddress: UpdateAddress, private getAddress: GetAddress, private deleteAddress: DeleteAddress) { }

    create = async (req: Request, res: Response) => {
        try {
            if (!req.params?.dsgvoId) {
                return res.status(400).send({ message: 'Dsgvo Id is missing' });
            }
            const dsgvoId = req.params.dsgvoId;
            const { street, houseNumber, additionalInfo, city, postcode, stateOrProvince, country, countryCode } = req.body;

            const address = await this.createAddress.execute(new LandingpageAddress({ dsgvoId: Number(dsgvoId), street: street, houseNumber: houseNumber, additionalInfo: additionalInfo, city: city, postcode: postcode, stateOrProvince: stateOrProvince, country: country, countryCode: countryCode }));

            res.status(200).send(address);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during creating the address' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            if (!req.params?.dsgvoId) {
                return res.status(400).send({ message: 'Dsgvo Id is missing' });
            }
            const dsgvoId = req.params.dsgvoId;
            const { street, houseNumber, additionalInfo, city, postcode, stateOrProvince, country, countryCode } = req.body;

            const address = await this.updateAddress.execute(new LandingpageAddress({ dsgvoId: Number(dsgvoId), street: street, houseNumber: houseNumber, additionalInfo: additionalInfo, city: city, postcode: postcode, stateOrProvince: stateOrProvince, country: country, countryCode: countryCode }));

            res.status(200).send(address);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during updating the address' });
        }
    }

    get = async(req: Request, res: Response) => {
        try {
            if(!req.params?.dsgvoId) {
                return res.status(400).send({ message: 'Dsgvo Id is missing' });
            }
            const dsgvoId = req.params.dsgvoId;
            const address = await this.getAddress.execute(Number(dsgvoId));

            res.status(200).send(address);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to get address'});
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            if(!req.params?.dsgvoId) {
                return res.status(400).send({ message: 'Dsgvo Id is missing' });
            }
            const dsgvoId = req.params.dsgvoId;
            
            await this.deleteAddress.execute(Number(dsgvoId));

            res.status(204).send();
            
        } catch(error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to delete address'});
        }
    }
}