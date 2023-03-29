export enum Gender {
  MALE = "M",
  FEMALE = "F",
}

export enum Role {
  DOCTOR = "doctor",
  PHARMACY = "pharmacy",
  ADMIN = "admin",
  PATIENT = "patient"
}

export enum PatientStatus {
  MENIKAH = "menikah",
  LAJANG = "lajang"
}

export enum RegQueueStatus {
  NEW = 'new',
  REGISTERED = 'registered',
  BAIL = 'bail'
}

export enum ClinicQueueStatus {
  REGISTERED = 'registered',
  DONE = 'done',
  BAIL = 'bail'
}

export enum TransactionStatus {
  PAID = 'paid',
  UNPAID = 'unpaid'
}
