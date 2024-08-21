import { DateTime } from 'luxon';
import { GetContactDto } from '../dto';
import { ContactData } from '../types/ContactType';
import { ContactType } from '../constants';

export const mapContactToTableRow = (contact: GetContactDto): ContactData => {
  return {
    id: contact.contact_id,
    name: `${contact.first_name} ${contact.last_name}`,
    type: ContactType.find((type) => type.value === contact.type)?.label ?? '',
    phone: contact.phone_number_1,
    email: contact.email,
    created_at: DateTime.fromISO(contact.created_at).toLocaleString(),
    actions: contact.contact_id,
  };
};
