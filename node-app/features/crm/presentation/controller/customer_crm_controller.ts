import { Request, Response } from 'express';
import { CreateCustomer, DeleteCustomer, GetCustomers, UpdateCustomer } from '../../domain/usecases/customer_crm_crud';
import { CustomerCRMEntity } from '../../domain/entities/customer_crm';

export class CustomerCRMController {
    constructor(
        private createCustomer: CreateCustomer,
        private deleteCustomer: DeleteCustomer,
        private getCustomers: GetCustomers,
        private updateCustomer: UpdateCustomer
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, companyName, position, email, landline, phone, website, instagram, facebook, tiktok, street, houseNumber, postalCode, city, state, country, birthDate, lifecyclePosition, numberOfBookings, lastAppointment, totalRevenue, outstandingInvoices, customerDiscount, newsletterSubscribed } = req.body;
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user.id;

            const customer = new CustomerCRMEntity({ firstName: firstName, lastName: lastName, companyName: companyName, position: position, email: email, landline: landline, phone: phone, website: website, instagram: instagram, facebook: facebook, tiktok: tiktok, street: street, houseNumber: houseNumber, postalCode: postalCode, city: city, state: state, country: country, birthDate: birthDate, lifecyclePosition: lifecyclePosition, numberOfBookings: numberOfBookings, lastAppointment: lastAppointment, totalRevenue: totalRevenue, outstandingInvoices: outstandingInvoices, customerDiscount: customerDiscount, newsletterSubscribed: newsletterSubscribed, userId: userId });
            console.log("userId:" ,userId);
            const customerCreated = await this.createCustomer.execute(customer);

            res.status(201).send();
            res.status(200).json(customerCreated);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during customer creation' });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user.id;

            const customers = await this.getCustomers.execute(userId);

            res.status(200).json(customers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching customers' });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user?.id;
            const { firstName, lastName, companyName, position, email, landline, phone, website, instagram, facebook, tiktok, street, houseNumber, postalCode, city, state, country, birthDate, lifecyclePosition, numberOfBookings, lastAppointment, totalRevenue, outstandingInvoices, customerDiscount, newsletterSubscribed } = req.body;

            const customer = new CustomerCRMEntity({ firstName: firstName, lastName: lastName, companyName: companyName, position: position, email: email, landline: landline, phone: phone, website: website, instagram: instagram, facebook: facebook, tiktok: tiktok, street: street, houseNumber: houseNumber, postalCode: postalCode, city: city, state: state, country: country, birthDate: birthDate, lifecyclePosition: lifecyclePosition, numberOfBookings: numberOfBookings, lastAppointment: lastAppointment, totalRevenue: totalRevenue, outstandingInvoices: outstandingInvoices, customerDiscount: customerDiscount, newsletterSubscribed: newsletterSubscribed, userId: userId });
            const updatedCustomer = await this.updateCustomer.execute(customer);

            res.status(200).json(updatedCustomer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the customer' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            if (!req.user?.id) {
                return res.status(400).send({ message: 'User ID is missing' });
            }
            const userId = req.user?.id;

            await this.deleteCustomer.execute(userId, parseInt(req.params.id));

            res.status(204).send(); // No Content
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the customer' });
        }
    }
}
