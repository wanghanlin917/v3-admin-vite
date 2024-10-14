export interface CompanyRequestData {
  title: string
  unique_id: string
  licence_path: string
  legal_person: string
  legal_identity: string
  legal_identity_front: string
  legal_identity_back: string
}

export interface CompanyEditRequestData {
  title: string
  unique_id: string
  licence_path: string
  licence_path_url: string
  legal_person: string
  legal_identity: string
  legal_identity_front: string
  legal_identity_front_url: string
  legal_identity_back: string
  legal_identity_back_url: string
}

export type CompanyResponseData = ApiResponseData<{
  title: string
  unique_id: string
  licence_path: string
  legal_person: string
  legal_identity: string
  legal_identity_front: string
  legal_identity_back: string
}>

export type CompanyEditResponseData = ApiResponseData<{
  title: string
  unique_id: string
  licence_path: string
  licence_path_url: string
  legal_person: string
  legal_identity: string
  legal_identity_front: string
  legal_identity_front_url: string
  legal_identity_back: string
  legal_identity_back_url: string
}>
