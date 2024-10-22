// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type ImagesId } from './Images';
import { type UsersId } from './Users';
import { TreatmentRelevantBranchName, type TreatmentName } from './TreatmentContents'

/** Identifier type for public.treatments */
export type TreatmentsId = number & { __brand: 'TreatmentsId' };

/** Represents the table public.treatments */
export default interface Treatments {
  max_fee: string;
  min_fee: string;
  appointment_count: any;
  relevant_treatment_category: any;
  id: TreatmentsId;
  name: any;

  image: ImagesId | null;

  edited_by: UsersId | null;

  table_of_contents: unknown;

  description: any | null;

  relevant_branches: TreatmentRelevantBranchName;

  avg_price_tl: string | null;

  created_at: Date;

  updated_at: Date;

  cover_image: string | null

  domain: {
    tr: string,
    en: string
  }
}

/** Represents the initializer for the table public.treatments */
export interface TreatmentsInitializer {
  /** Default value: nextval('treatments_id_seq'::regclass) */
  id?: TreatmentsId;

  name: unknown;

  image?: ImagesId | null;

  edited_by?: UsersId | null;

  /** Default value: 1 */
 
  table_of_contents: unknown;

  description?: unknown | null;

  /** Default value: '[]'::jsonb */
  relevant_branches?: unknown | null;

  avg_price_tl?: string | null;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.treatments */
export interface TreatmentsMutator {
  id?: TreatmentsId;

  name?: unknown;

  image?: ImagesId | null;

  edited_by?: UsersId | null;

  table_of_contents?: unknown;

  description?: unknown | null;

  relevant_branches?: unknown | null;

  avg_price_tl?: string | null;

  created_at?: Date;

  updated_at?: Date;
}
