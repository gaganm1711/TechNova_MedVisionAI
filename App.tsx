
import React, { useState, useEffect } from 'react';
import { AuthState, User, MedicalCase } from './types';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AnalysisPanel from './components/AnalysisPanel';
import CaseViewer from './components/CaseViewer';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState<MedicalCase[]>([]);
  const [viewingCase, setViewingCase] = useState<MedicalCase | null>(null);

  // Load dummy data initially
  useEffect(() => {
    const savedUser = localStorage.getItem('medvision_user');
    if (savedUser) {
      setAuthState({ user: JSON.parse(savedUser), isAuthenticated: true });
    }

    const dummyCases: MedicalCase[] = [
      {
        id: '1',
        patient: { name: 'Sarah Jenkins', age: 45, gender: 'Female', symptoms: 'Persistent cough, chest pain' },
        imageUrl: 'https://picsum.photos/seed/chest-xray/800/800',
        scanType: 'X-ray',
        timestamp: '2024-05-15 14:30',
        status: 'High-Risk',
        analysis: {
          doctorReport: {
            findings: "Large opacity noted in the lower right lobe consistent with consolidation. Pleural effusion detected.",
            diagnoses: ["Pneumonia", "Pleural Effusion"],
            confidence: 94,
            clinicalExplanation: "Increased radiographic density suggests inflammatory process or fluid accumulation in the right costophrenic angle.",
            riskLevel: "High",
            nextSteps: ["Immediate antibiotic therapy", "Thoracentesis for fluid analysis", "Follow-up CT scan"],
            differentialDiagnosis: ["Malignancy", "Tuberculosis"],
            suggestedLabs: ["CBC", "CRP", "Sputum Culture"]
          },
          patientReport: {
            summary: "You have a lung infection that needs immediate attention.",
            explanation: "The scan shows a cloudy area in your right lung which is usually caused by pneumonia and some fluid collection.",
            advice: "Please start the prescribed antibiotics immediately and rest. We need to do a few more tests to make sure you get the right treatment."
          }
        }
      },
      {
        id: '2',
        patient: { name: 'Robert Miller', age: 62, gender: 'Male', symptoms: 'Severe headache, left side weakness' },
        imageUrl: 'https://picsum.photos/seed/brain-ct/800/800',
        scanType: 'CT Scan',
        timestamp: '2024-05-15 09:15',
        status: 'Completed',
        analysis: {
          doctorReport: {
            findings: "No acute intracranial hemorrhage. Normal ventricular morphology. No midline shift.",
            diagnoses: ["Normal Brain CT"],
            confidence: 98,
            clinicalExplanation: "CT scan demonstrates preserved grey-white matter differentiation with no evidence of acute ischemic or hemorrhagic stroke.",
            riskLevel: "Low",
            nextSteps: ["Evaluate for complex migraine", "Neurology consultation", "Consider MRI for TIA evaluation"],
            differentialDiagnosis: ["Tension Headache", "TIA"],
            suggestedLabs: ["Basic Metabolic Panel", "Coagulation Profile"]
          },
          patientReport: {
            summary: "Your brain scan looks normal.",
            explanation: "We didn't see any signs of bleeding or stroke in the pictures of your brain.",
            advice: "This is good news! Your doctor will continue to investigate the cause of your headaches, possibly checking for migraines."
          }
        }
      }
    ];
    setCases(dummyCases);
  }, []);

  const handleLogin = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
    localStorage.setItem('medvision_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('medvision_user');
  };

  const handleAnalysisComplete = (newCase: MedicalCase) => {
    setCases([newCase, ...cases]);
    setViewingCase(newCase);
    setActiveTab('view_case');
  };

  if (!authState.isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={authState.user} 
      onLogout={handleLogout} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <Dashboard 
          cases={cases} 
          onUploadClick={() => setActiveTab('upload')} 
          onCaseClick={(c) => {
            setViewingCase(c);
            setActiveTab('view_case');
          }}
        />
      )}

      {activeTab === 'upload' && (
        <AnalysisPanel 
          onAnalysisComplete={handleAnalysisComplete}
          onCancel={() => setActiveTab('dashboard')}
        />
      )}

      {activeTab === 'view_case' && viewingCase && (
        <CaseViewer 
          medicalCase={viewingCase} 
          onBack={() => setActiveTab('dashboard')}
        />
      )}

      {(activeTab === 'cases' || activeTab === 'reports' || activeTab === 'settings') && (
        <div className="h-full flex flex-col items-center justify-center p-12 text-slate-400">
           <i className="fa-solid fa-screwdriver-wrench text-6xl mb-6"></i>
           <h3 className="text-xl font-bold">Under Development</h3>
           <p>This module is currently being optimized for HIPAA compliance.</p>
           <button 
             onClick={() => setActiveTab('dashboard')}
             className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold"
           >
            Back to Dashboard
           </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
