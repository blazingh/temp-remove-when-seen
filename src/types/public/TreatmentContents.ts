// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import { type TreatmentsId } from './Treatments';

/** Identifier type for public.treatment_contents */
export type TreatmentContentsId = number & { __brand: 'TreatmentContentsId' };

/** Represents the table public.treatment_contents */
export default interface TreatmentContents {
  id: TreatmentContentsId;

  treatment_id: TreatmentsId;

  order: number;

  title: unknown;

  content: unknown;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.treatment_contents */
export interface TreatmentContentsInitializer {
  /** Default value: nextval('treatment_contents_id_seq'::regclass) */
  id?: TreatmentContentsId;

  treatment_id: TreatmentsId;

  order: number;

  title: unknown;

  content: unknown;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.treatment_contents */
export interface TreatmentContentsMutator {
  id?: TreatmentContentsId;

  treatment_id?: TreatmentsId;

  order?: number;

  title?: unknown;

  content?: unknown;

  created_at?: Date;

  updated_at?: Date;
}
export interface TreatmentName {
  tr: string;
  en: string;

}
export interface TreatmentRelevantBranchName {
  tr: string;
  en: string;

}
