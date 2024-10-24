// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type DentistsId } from './Dentists';
import { type PropertiesId } from './Properties';

/** Identifier type for public.dentist_properties */
export type DentistPropertiesId = number & { __brand: 'DentistPropertiesId' };

/** Represents the table public.dentist_properties */
export default interface DentistProperties {
  id: DentistPropertiesId;

  dentist_id: DentistsId;

  property_id: PropertiesId;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.dentist_properties */
export interface DentistPropertiesInitializer {
  /** Default value: nextval('dentist_properties_id_seq'::regclass) */
  id?: DentistPropertiesId;

  dentist_id: DentistsId;

  property_id: PropertiesId;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.dentist_properties */
export interface DentistPropertiesMutator {
  id?: DentistPropertiesId;

  dentist_id?: DentistsId;

  property_id?: PropertiesId;

  created_at?: Date;

  updated_at?: Date;
}
