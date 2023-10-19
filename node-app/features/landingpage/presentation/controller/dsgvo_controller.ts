import { Dsgvo } from "../../domain/entities/dsgvo";
import { CreateDsgvo } from "../../domain/usecases/create_dsgvo";
import { UpdateDsgvo } from "../../domain/usecases/update_dsgvo";
import { GetDsgvo } from "../../domain/usecases/get_dsgvo";
import { DeleteDsgvo } from "../../domain/usecases/delete_dsgvo";
import { Request, Response } from "express";

export class DsgvoController {
    constructor(
        private createDsgvo: CreateDsgvo,
        private updateDsgvo: UpdateDsgvo,
        private getDsgvo: GetDsgvo,
        private deleteDsgvo: DeleteDsgvo
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const {
                corporateForm, companyName, prename, surname, ustId, wirtschaftsId, registrationNumber, contentOwner, contentOwnerEmail,
                impEmail, impTelefon, dataProtectionOfficer, dpoEmail, dpoPhone, cookiePolicyLink, privacyPolicyLink, landingPageId
            } = req.body;

            const dsgvo = await this.createDsgvo.execute(new Dsgvo({
                corporateForm: corporateForm,
                companyName: companyName,
                prename: prename,
                surname: surname,
                ustId: ustId,
                wirtschaftsId: wirtschaftsId,
                registrationNumber: registrationNumber,
                contentOwner: contentOwner,
                contentOwnerEmail: contentOwnerEmail,
                impEmail: impEmail,
                impTelefon: impTelefon,
                dataProtectionOfficer: dataProtectionOfficer,
                dpoEmail: dpoEmail,
                dpoPhone: dpoPhone,
                cookiePolicyLink: cookiePolicyLink,
                privacyPolicyLink: privacyPolicyLink,
                landingPageId: landingPageId
            }));

            res.status(200).send(dsgvo);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during creating the Dsgvo' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const {
                corporateForm, companyName, prename, surname, ustId, wirtschaftsId, registrationNumber, contentOwner, contentOwnerEmail,
                impEmail, impTelefon, dataProtectionOfficer, dpoEmail, dpoPhone, cookiePolicyLink, privacyPolicyLink, landingPageId
            } = req.body;

            const dsgvo = await this.updateDsgvo.execute(new Dsgvo({
                corporateForm: corporateForm,
                companyName: companyName,
                prename: prename,
                surname: surname,
                ustId: ustId,
                wirtschaftsId: wirtschaftsId,
                registrationNumber: registrationNumber,
                contentOwner: contentOwner,
                contentOwnerEmail: contentOwnerEmail,
                impEmail: impEmail,
                impTelefon: impTelefon,
                dataProtectionOfficer: dataProtectionOfficer,
                dpoEmail: dpoEmail,
                dpoPhone: dpoPhone,
                cookiePolicyLink: cookiePolicyLink,
                privacyPolicyLink: privacyPolicyLink,
                landingPageId: landingPageId
            }));

            res.status(200).send(dsgvo);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred during updating the Dsgvo' });
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            if (!req.params?.landingpageId) {
                return res.status(400).send({ message: 'Landingpage Id is missing' });
            }
            const { landingPageId } = req.landingpageId;
            const dsgvo = await this.getDsgvo.execute(Number(landingPageId));

            res.status(200).send(dsgvo);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to get Dsgvo' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            if (!req.params?.landingpageId) {
                return res.status(400).send({ message: 'Landingpage Id is missing' });
            }
            const { landingPageId } = req.params.landingpageId;

            await this.deleteDsgvo.execute(Number(landingPageId));

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to delete Dsgvo' });
        }
    }
}
