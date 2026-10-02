import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Plus,
  Bot,
  Workflow,
  Sparkles,
  Phone,
  CheckCheck,
  Check,
  Smartphone,
  ChevronRight,
  ArrowDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WhatsAppConversation, WhatsAppTemplate } from '../../types';

export const WhatsAppModule: React.FC = () => {
  const {
    whatsAppConversations,
    sendWhatsAppMessage,
    whatsAppTemplates,
    chatFlowNodes,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inbox' | 'templates' | 'flow-builder'>('inbox');
  const [selectedConversation, setSelectedConversation] = useState<WhatsAppConversation>(
    whatsAppConversations[0] || ({} as WhatsAppConversation)
  );
  const [messageInput, setMessageInput] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  // Simulator state for WhatsApp Chat Flow
  const [simStep, setSimStep] = useState<string>('node-welcome');
  const [simHistory, setSimHistory] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    {
      sender: 'bot',
      text: 'Welcome to Nact Study! 🚀 Empowering modern careers in AI, Tech, and Leadership.\n\nWhat would you like to explore today?'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation.id) return;

    sendWhatsAppMessage(selectedConversation.id, messageInput);
    setMessageInput('');
  };

  const handleApplyTemplate = (templateId: string) => {
    const tmpl = whatsAppTemplates.find(t => t.id === templateId);
    if (!tmpl) return;

    let body = tmpl.body;
    body = body.replace('{{name}}', selectedConversation.contactName || 'Learner');
    body = body.replace('{{course}}', 'Full-Stack Data Science & GenAI Masterclass');
    body = body.replace('{{time}}', '7:00 PM IST');
    body = body.replace('{{link}}', 'https://nactstudy.com/pay/order-8812');
    body = body.replace('{{certificate_number}}', 'NACT-CERT-2026-9042');

    setMessageInput(body);
    setSelectedTemplateId('');
  };

  const handleSimOptionClick = (optionLabel: string, nextNodeId: string) => {
    const nextNode = chatFlowNodes.find(n => n.id === nextNodeId);
    if (!nextNode) return;

    setSimHistory(prev => [
      ...prev,
      { sender: 'user', text: optionLabel },
      { sender: 'bot', text: nextNode.content }
    ]);
    setSimStep(nextNodeId);
  };

  const handleResetSimulator = () => {
    setSimStep('node-welcome');
    setSimHistory([
      {
        sender: 'bot',
        text: 'Welcome to Nact Study! 🚀 Empowering modern careers in AI, Tech, and Leadership.\n\nWhat would you like to explore today?'
      }
    ]);
  };

  const currentSimNode = chatFlowNodes.find(n => n.id === simStep);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>WhatsApp Automation & Conversational CRM</span>
            <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Meta Cloud API Connected
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Two-way counselor inbox, verified HSM templates with variable insertion, and visual chat flow engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'inbox' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Counselor Inbox ({whatsAppConversations.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'templates' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              HSM Templates ({whatsAppTemplates.length})
            </button>
            <button
              onClick={() => setActiveTab('flow-builder')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'flow-builder' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visual Chat Flow Builder
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Live Inbox & Chat View */}
      {activeTab === 'inbox' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs grid grid-cols-1 md:grid-cols-3 h-[650px]">
          {/* Left Column: Conversations List */}
          <div className="border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
            <div className="p-3 border-b border-slate-200 bg-white">
              <span className="text-xs font-bold text-slate-900">Active Inquiries</span>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {whatsAppConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-3 cursor-pointer text-xs transition-colors ${
                    selectedConversation.id === conv.id
                      ? 'bg-emerald-50/60 border-l-3 border-emerald-600'
                      : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span className="truncate">{conv.contactName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">{conv.phone}</div>
                  <div className="text-[11px] text-slate-600 truncate mt-1">{conv.lastMessage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Conversation Bubble Thread */}
          <div className="md:col-span-2 flex flex-col h-full bg-[#efeae2]/40">
            {/* Thread Header */}
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span>{selectedConversation.contactName}</span>
                  <span className="font-mono text-[11px] font-normal text-slate-500">
                    ({selectedConversation.phone})
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Assigned Counselor: <strong>{selectedConversation.assignedCounselor}</strong>
                </div>
              </div>

              {/* Template quick inject */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedTemplateId}
                  onChange={e => handleApplyTemplate(e.target.value)}
                  className="px-2 py-1 text-xs border border-slate-200 rounded-md bg-white text-slate-700 font-medium"
                >
                  <option value="">Insert Verified Template...</option>
                  {whatsAppTemplates.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bubble Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {selectedConversation.messages?.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-xs shadow-2xs space-y-1 ${
                      msg.sender === 'customer'
                        ? 'bg-white text-slate-900 border border-slate-200'
                        : 'bg-[#d9fdd3] text-slate-900 border border-emerald-200'
                    }`}
                  >
                    {msg.templateName && (
                      <div className="text-[10px] font-mono text-emerald-800 font-semibold border-b border-emerald-200 pb-0.5">
                        Template: {msg.templateName}
                      </div>
                    )}
                    <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-mono">
                      <span>{msg.timestamp}</span>
                      {msg.sender !== 'customer' && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Outbound Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Type reply or pick template above..."
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: WhatsApp HSM Templates */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatsAppTemplates.map(tmpl => (
            <div key={tmpl.id} className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-900">{tmpl.name}</span>
                  <div className="text-[11px] text-slate-400">Category: {tmpl.category}</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[10px] rounded font-semibold">
                  Approved
                </span>
              </div>

              <div className="p-3 bg-[#efeae2]/30 border border-slate-200 rounded font-sans text-slate-800 whitespace-pre-line leading-relaxed">
                {tmpl.body}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Variables: {tmpl.variables.map(v => `{{${v}}}`).join(', ')}</span>
                <button
                  onClick={() => showToast(`Template ${tmpl.name} ready for broadcast campaign.`)}
                  className="text-emerald-700 hover:text-emerald-900 font-semibold"
                >
                  Use in Broadcast
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Visual Chat Flow Builder + Phone Simulator */}
      {activeTab === 'flow-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual Decision Tree (Left 2 cols) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-indigo-600" />
                  <span>Rule-Based WhatsApp Chat Tree Structure</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Visual node representation of automatic inbound qualification flow
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Live on +91 98765 43210
              </span>
            </div>

            {/* Visual Node Diagram */}
            <div className="space-y-4">
              {chatFlowNodes.map((node, idx) => (
                <div
                  key={node.id}
                  className={`p-4 rounded-lg border text-xs space-y-2 transition-all ${
                    simStep === node.id
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {node.type.toUpperCase()}
                      </span>
                      <span>{node.title}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Node ID: {node.id}</span>
                  </div>

                  <p className="text-slate-600 whitespace-pre-line bg-white p-2.5 rounded border border-slate-100">
                    {node.content}
                  </p>

                  {node.options && (
                    <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2">
                      <span className="text-[11px] font-medium text-slate-500">Branching Buttons:</span>
                      {node.options.map((opt, optIdx) => (
                        <span
                          key={optIdx}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-[11px] font-medium text-slate-700 flex items-center gap-1"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                          <span className="font-mono text-[9px] text-indigo-600">{opt.nextNodeId}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Phone Simulator (Right 1 col) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-slate-700" />
                <span>Live Chatbot Phone Tester</span>
              </span>
              <button
                onClick={handleResetSimulator}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Reset Chat
              </button>
            </div>

            {/* Smartphone Frame */}
            <div className="w-full max-w-[340px] mx-auto bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800">
              {/* Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2" />

              <div className="bg-[#efeae2] rounded-[24px] overflow-hidden flex flex-col h-[520px]">
                {/* Simulated WhatsApp Header */}
                <div className="p-3 bg-[#075e54] text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs">
                      N
                    </div>
                    <div>
                      <div className="font-bold">Nact Study Official</div>
                      <div className="text-[10px] text-emerald-200">Verified Business Bot</div>
                    </div>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                  {simHistory.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-2.5 rounded-lg text-xs shadow-2xs whitespace-pre-line leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-[#d9fdd3] text-slate-900'
                            : 'bg-white text-slate-900'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Interactive Quick Action Buttons */}
                {currentSimNode?.options && (
                  <div className="p-2.5 bg-slate-100 border-t border-slate-200 space-y-1.5">
                    <div className="text-[10px] text-slate-500 font-semibold text-center uppercase tracking-wide">
                      Select WhatsApp Response:
                    </div>
                    {currentSimNode.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSimOptionClick(opt.label, opt.nextNodeId)}
                        className="w-full py-1.5 px-2 bg-white hover:bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-indigo-700 shadow-2xs text-center transition-colors truncate"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
