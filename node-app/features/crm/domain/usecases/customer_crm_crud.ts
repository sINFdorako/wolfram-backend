import { CustomerCRMRepository } from "../../domain/repositories/customer_crm_repository";

export class CreateCustomer {
    constructor(private customerCRMRepository: CustomerCRMRepository) {}

    async execute(entity: CustomerCRMEntity): Promise<CustomerCRMEntity> {
        return await this.customerCRMRepository.createCustomer(entity);
    }
}

export class GetCustomers {
    constructor(private customerCRMRepository: CustomerCRMRepository) {}

    async execute(userId: number): Promise<CustomerCRMEntity[]> {
        return await this.customerCRMRepository.getCustomers(userId);
    }
}

export class UpdateCustomer {
    constructor(private customerCRMRepository: CustomerCRMRepository) {}

    async execute(entity: CustomerCRMEntity): Promise<CustomerCRMEntity> {
        return await this.customerCRMRepository.updateCustomer(entity);
    }
}

export class DeleteCustomer {
    constructor(private customerCRMRepository: CustomerCRMRepository) {}

    async execute(userId: number, id: number): Promise<void> {
        await this.customerCRMRepository.deleteCustomer(userId, id);
    }
}
