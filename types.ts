
export type UserRole = 'Doctor' | 'Radiologist' | 'Hospital Admin' | 'Lab Staff';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  hospital: string;
  medicalLicenseId?: string;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  symptoms: string;
}

export interface MedicalCase {
  id: string;
  patient: PatientInfo;
  imageUrl: string;
  scanType: 'X-ray' | 'MRI' | 'CT Scan';
  timestamp: string;
  status: 'Pending' | 'Completed' | 'High-Risk';
  analysis?: AnalysisResult;
}

export interface AnalysisResult {
  doctorReport: {
    findings: string;
    diagnoses: string[];
    confidence: number;
    clinicalExplanation: string;
    riskLevel: 'Low' | 'Moderate' | 'High';
    nextSteps: string[];
    differentialDiagnosis: string[];
    suggestedLabs: string[];
  };
  patientReport: {
    summary: string;
    explanation: string;
    advice: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
