import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LoginPortal } from './components/auth/LoginPortal';
import { TeacherPortal } from './components/teacher/TeacherPortal';
import { StudentPortal } from './components/students/StudentPortal';
import { UserRightsManager } from './components/users/UserRightsManager';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { CreatorInstituteProfile } from './components/profile/CreatorInstituteProfile';
import { UsersRolesModule } from './components/users/UsersRolesModule';
import { LMSModule } from './components/lms/LMSModule';
import { DigitalProductsModule } from './components/products/DigitalProductsModule';
import { ContactList } from './components/crm/ContactList';
import { LeadPipelineKanban } from './components/crm/LeadPipelineKanban';
import { LeadDetailModal } from './components/crm/LeadDetailModal';
import { NewLeadModal } from './components/crm/NewLeadModal';
import { WhatsAppModule } from './components/whatsapp/WhatsAppModule';
import { EmailModule } from './components/email/EmailModule';
import { MarketingAutomationModule } from './components/automation/MarketingAutomationModule';
import { SalesPaymentsModule } from './components/sales/SalesPaymentsModule';
import { StudentManagementModule } from './components/students/StudentManagementModule';
import { ReportsMISModule } from './components/reports/ReportsMISModule';
import { SettingsMasterDataModule } from './components/settings/SettingsMasterDataModule';
import { PreskoolFormCenter } from './components/forms/PreskoolFormCenter';
import { PreskoolIndexDashboard } from './components/preskool/PreskoolIndexDashboard';
import { MasterDataCenter } from './components/masters/MasterDataCenter';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    isLoggedIn,
    currentUser,
    activeModule,
    selectedLeadForDetail,
    setSelectedLeadForDetail,
    toast,
  } = useApp();

  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // If user is not logged in, show the Multi-Portal Authentication Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
        <LoginPortal />
        {/* Toast notification pill */}
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg shadow-xl text-xs animate-in slide-in-from-bottom-2 fade-in duration-200">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    );
  }

  // Portal-specific routing based on authenticated user's portalType & assigned modules
  const renderActiveView = () => {
    // 1. Teacher Portal scope
    if (currentUser.portalType === 'teacher') {
      return <TeacherPortal />;
    }

    // 2. Student Portal scope
    if (currentUser.portalType === 'student') {
      return <StudentPortal />;
    }

    // 3. Administrator Portal scope
    switch (activeModule) {
      case 'dashboard':
      case 'preskool-dashboard':
        return <PreskoolIndexDashboard />;
      case 'user-rights':
      case 'rbac':
        return <UserRightsManager />;
      case 'student-admission':
      case 'preskool-forms':
      case 'fees':
        return <PreskoolFormCenter />;
      case 'masters':
      case 'master-data':
        return <MasterDataCenter />;
      case 'teachers':
      case 'users':
        return <UsersRolesModule />;
      case 'profile':
        return <CreatorInstituteProfile />;
      case 'lms':
        return <LMSModule />;
      case 'digital-products':
        return <DigitalProductsModule />;
      case 'crm':
        return <ContactList />;
      case 'leads':
        return <LeadPipelineKanban onOpenNewLeadModal={() => setShowNewLeadModal(true)} />;
      case 'whatsapp':
        return <WhatsAppModule />;
      case 'email':
        return <EmailModule />;
      case 'automation':
        return <MarketingAutomationModule />;
      case 'sales':
        return <SalesPaymentsModule />;
      case 'students':
      case 'student-portal':
        return <StudentManagementModule />;
      case 'reports':
        return <ReportsMISModule />;
      case 'settings':
        return <SettingsMasterDataModule />;
      default:
        return <PreskoolIndexDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Navbar onOpenNewLeadModal={() => setShowNewLeadModal(true)} />

      <div className="flex-1 flex overflow-hidden">
        {currentUser.portalType !== 'teacher' && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      {selectedLeadForDetail && (
        <LeadDetailModal
          lead={selectedLeadForDetail}
          onClose={() => setSelectedLeadForDetail(null)}
        />
      )}

      {showNewLeadModal && (
        <NewLeadModal onClose={() => setShowNewLeadModal(false)} />
      )}

      {/* Toast notification pill */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg shadow-xl text-xs animate-in slide-in-from-bottom-2 fade-in duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
          {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
