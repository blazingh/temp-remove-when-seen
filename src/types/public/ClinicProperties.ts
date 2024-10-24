// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type ClinicsId } from './Clinics';
import { type PropertiesId } from './Properties';

/** Identifier type for public.clinic_properties */
export type ClinicPropertiesId = number & { __brand: 'ClinicPropertiesId' };

/** Represents the table public.clinic_properties */
export default interface ClinicProperties {
  id: ClinicPropertiesId;

  clinic_id: ClinicsId;

  property_id: PropertiesId;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.clinic_properties */
export interface ClinicPropertiesInitializer {
  /** Default value: nextval('clinic_properties_id_seq'::regclass) */
  id?: ClinicPropertiesId;

  clinic_id: ClinicsId;

  property_id: PropertiesId;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.clinic_properties */
export interface ClinicPropertiesMutator {
  id?: ClinicPropertiesId;

  clinic_id?: ClinicsId;

  property_id?: PropertiesId;

  created_at?: Date;

  updated_at?: Date;
}
