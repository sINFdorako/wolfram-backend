import { CustomerCRMEntity } from "../../domain/entities/customer_crm";
import { CustomerCRM } from "../models/customer_crm_model";

export function customerEntityToModel(entity: CustomerCRMEntity): CustomerCRM {
    const model = new CustomerCRM();
    model.id = entity.id ?? 0;
    model.userId = entity.userId;
    model.gender = entity.gender;
    model.academicTitle = entity.academicTitle;
    model.customerId = entity.customerId;
    model.firstName = entity.firstName;
    model.lastName = entity.lastName;
    model.companyName = entity.companyName;
    model.position = entity.position;
    model.email = entity.email;
    model.landline = entity.landline;
    model.phone = entity.phone;
    model.website = entity.website;
    model.instagram = entity.instagram;
    model.facebook = entity.facebook;
    model.tiktok = entity.tiktok;
    model.street = entity.street;
    model.houseNumber = entity.houseNumber;
    model.postalCode = entity.postalCode;
    model.city = entity.city;
    model.state = entity.state;
    model.country = entity.country;
    model.birthDate = entity.birthDate;
    model.lifecyclePosition = entity.lifecyclePosition;
    model.numberOfBookings = entity.numberOfBookings;
    model.lastAppointment = entity.lastAppointment;
    model.totalRevenue = entity.totalRevenue;
    model.outstandingInvoices = entity.outstandingInvoices;
    model.customerDiscount = entity.customerDiscount;
    model.newsletterSubscribed = entity.newsletterSubscribed;
    
    return model;
}

export function modelToCustomerEntity(model: CustomerCRM): CustomerCRMEntity {
    const entity = new CustomerCRMEntity({
        id: model.id,
        userId: model.userId,
        gender: model.gender,
        academicTitle: model.academicTitle,
        customerId: model.customerId,
        firstName: model.firstName,
        lastName: model.lastName,
        companyName: model.companyName,
        position: model.position,
        email: model.email,
        landline: model.landline,
        phone: model.phone,
        website: model.website,
        instagram: model.instagram,
        facebook: model.facebook,
        tiktok: model.tiktok,
        street: model.street,
        houseNumber: model.houseNumber,
        postalCode: model.postalCode,
        city: model.city,
        state: model.state,
        country: model.country,
        birthDate: model.birthDate,
        lifecyclePosition: model.lifecyclePosition,
        numberOfBookings: model.numberOfBookings,
        lastAppointment: model.lastAppointment,
        totalRevenue: model.totalRevenue,
        outstandingInvoices: model.outstandingInvoices,
        customerDiscount: model.customerDiscount,
        newsletterSubscribed: model.newsletterSubscribed,
    });

    return entity;
}

export function modelToSequelizeData(model: CustomerCRM): Partial<CustomerCRM> {
    return {
        userId: model.userId,
        gender: model.gender,
        academicTitle: model.academicTitle,
        customerId: model.customerId,
        firstName: model.firstName,
        lastName: model.lastName,
        companyName: model.companyName,
        position: model.position,
        email: model.email,
        landline: model.landline,
        phone: model.phone,
        website: model.website,
        instagram: model.instagram,
        facebook: model.facebook,
        tiktok: model.tiktok,
        street: model.street,
        houseNumber: model.houseNumber,
        postalCode: model.postalCode,
        city: model.city,
        state: model.state,
        country: model.country,
        birthDate: model.birthDate,
        lifecyclePosition: model.lifecyclePosition,
        numberOfBookings: model.numberOfBookings,
        lastAppointment: model.lastAppointment,
        totalRevenue: model.totalRevenue,
        outstandingInvoices: model.outstandingInvoices,
        customerDiscount: model.customerDiscount,
        newsletterSubscribed: model.newsletterSubscribed,
    };
}

