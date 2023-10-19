import { Dsgvo } from "../entities/dsgvo";

export interface DsgvoRepository {
    createDsgvo(dsgvo: Dsgvo) : Promise<Dsgvo>;
    updateDsgvo(dsgvo: Dsgvo) : Promise<Dsgvo>;
    getDsgvo(landingpageId: number): Promise<Dsgvo>;
    deleteDsgvo(landingpageId: number) : Promise<void>;
}