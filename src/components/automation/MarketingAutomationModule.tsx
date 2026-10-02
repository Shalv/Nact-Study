import React, { useState } from 'react';
import {
  Workflow,
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Zap,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutomationWorkflow } from '../../types';

export const MarketingAutomationModule: React.FC = () => {
  const { automationWorkflows, toggleWorkflow, simulateWorkflowTrigger, showToast } = useApp();
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow>(automationWorkflows[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const triggersList = [
    'New Lead',
    'Payment Received',
    'Webinar Attendance',
    'Course Completion',
    'Course Registration',
    'Payment Failed',
    'Follow-up Overdue'
  ];

  const handleRunSimulation = (triggerName: string) => {
    setIsSimulating(true);
    setSimLogs([`[00.00s] Incoming event received: Trigger: "${triggerName}"`]);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[00.45s] Condition check passed: rules matched against active audience criteria.`
      ]);
    }, 450);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[00.80s] Action 1: Dispatched WhatsApp Template via Cloud API.`
      ]);
    }, 800);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[01.20s] Action 2: Counselor task scheduled & assigned in CRM pipeline.`
      ]);
    }, 1200);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[01.60s] Workflow execution completed successfully with 0 errors.`
      ]);
      simulateWorkflowTrigger(triggerName);
      setIsSimulating(false);
    }, 1600);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Marketing Automation & Workflow Engine</span>
            <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
              4 Active Triggers
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Event-driven triggers, conditional branches, and automated actions across WhatsApp, Email, CRM & LMS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflows List (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Production Workflow Rules ({automationWorkflows.length})</span>
            <span>Total automated executions: 2,175</span>
          </div>

          <div className="space-y-4">
            {automationWorkflows.map(wf => (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflow(wf)}
                className={`bg-white border rounded-lg p-5 transition-all cursor-pointer text-xs space-y-3 ${
                  selectedWorkflow.id === wf.id
                    ? 'border-indigo-600 shadow-xs ring-1 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold uppercase">
                      TRIGGER: {wf.trigger}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{wf.name}</h3>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleWorkflow(wf.id);
                    }}
                    className="text-slate-500 hover:text-slate-900"
                  >
                    {wf.active ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <ToggleRight className="w-6 h-6 text-emerald-600" /> Active
                      </span>
                    ) : (
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <ToggleLeft className="w-6 h-6 text-slate-400" /> Paused
                      </span>
                    )}
                  </button>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-slate-600">
                  <strong className="text-slate-700">Conditions:</strong> {wf.conditions}
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500">Execution Actions:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {wf.actions.map((act, actIdx) => (
                      <div
                        key={actIdx}
                        className="p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-800 flex items-center gap-2"
                      >
                        <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono text-[9px] shrink-0">
                          {actIdx + 1}
                        </div>
                        <span className="truncate">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Runs triggered: <strong className="text-slate-800 font-mono">{wf.runsCount.toLocaleString()}</strong></span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleRunSimulation(wf.trigger);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" /> Test Workflow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Simulator & Audit Console (Right 1 col) */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Trigger Simulator Console</span>
              </h3>
              <span className="font-mono text-[10px] text-slate-400">Test Engine</span>
            </div>

            <p className="text-slate-500 leading-relaxed">
              Fire any application event manually to verify that automated actions, counselor task creation, and WhatsApp dispatches fire in order.
            </p>

            <div className="space-y-2">
              <label className="block font-medium text-slate-700">Select Event to Simulate:</label>
              <div className="space-y-1">
                {triggersList.map(trig => (
                  <button
                    key={trig}
                    disabled={isSimulating}
                    onClick={() => handleRunSimulation(trig)}
                    className="w-full text-left p-2 rounded border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium text-slate-800">{trig}</span>
                    <Play className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Execution Audit Log View */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Execution Log Output</span>
                {isSimulating && (
                  <span className="font-mono text-[10px] text-amber-600 animate-pulse">
                    Processing...
                  </span>
                )}
              </div>

              <div className="p-3 bg-slate-900 text-slate-200 rounded-md font-mono text-[11px] min-h-[140px] max-h-[220px] overflow-y-auto space-y-1">
                {simLogs.length === 0 ? (
                  <span className="text-slate-500 italic">Select an event above to view real-time execution flow.</span>
                ) : (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
