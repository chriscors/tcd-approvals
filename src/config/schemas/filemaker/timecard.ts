
  /**
  * Generated by @proofgeist/fmdapi package
  * https://github.com/proofgeist/fmdapi
  * DO NOT EDIT THIS FILE DIRECTLY. Changes may be overritten
  */
  import { z } from "zod";

  // @generated
  // prettier-ignore
  /* eslint-disable */
  export const Ztimecard = z.object({
      "__id": z.string(),
      "contractName": z.string(),
      "date": z.string(),
      "status": z.union([z.string(), z.number()]),
      "TCD_CON__Contact::Name_Full_lfm_c": z.string(),
      "hrsUnworked": z.union([z.string(), z.number()]),
      "hrsWorked": z.union([z.string(), z.number()]),
      "TCD_CLL_VEN__Venue::Code": z.string(),
      "TCD_COJ__ContactJoin::Payroll_id": z.string(),
      "Note": z.string(),
      "TCD_RAT__Rating::name": z.string(),
      "TCD_CJT__ContractJobTitle::Name": z.string(),
      "TCD_DEP__Department::name": z.string(),
      "TCD_RTC__RateCard::name": z.string(),
      "TCD_CLL_VEN__Venue::Name": z.string(),
  });

  export type Ttimecard = z.infer<typeof Ztimecard>;
