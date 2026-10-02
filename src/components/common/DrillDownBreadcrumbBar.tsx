import React from 'react';
import { ArrowLeft, Filter, X, ChevronRight, CornerDownRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DrillDownBreadcrumbBar: React.FC = () => {
  const {
    navigationHistory,
    activeFilter,
    goBack,
    clearActiveFilter,
    activeModule,
  } = useApp();

  const filterKeys = Object.keys(activeFilter).filter(
    k => activeFilter[k] !== undefined && activeFilter[k] !== null && activeFilter[k] !== '' && activeFilter[k] !== 'All'
  );

  const hasHistory = navigationHistory.length > 0;
  const hasFilters = filterKeys.length > 0;

  if (!hasHistory && !hasFilters) {
    return null;
  }

  const previousItem = hasHistory ? navigationHistory[navigationHistory.length - 1] : null;

  return (
    <div className="bg-indigo-50/90 border-b border-indigo-200/80 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-950 backdrop-blur-xs animate-in slide-in-from-top-1 duration-150 sticky top-0 z-30 shadow-2xs">
      <div className="flex flex-wrap items-center gap-2">
        {hasHistory && previousItem && (
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 hover:border-indigo-600 text-indigo-900 rounded-lg font-bold shadow-2xs transition-all active:scale-95 group"
            title={`Return to ${previousItem.label}`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-600 group-hover:text-white transition-colors" />
            <span>Back to {previousItem.label}</span>
          </button>
        )}

        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          {navigationHistory.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-slate-700 font-semibold">{item.label}</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </React.Fragment>
          ))}
          <span className="text-indigo-800 font-bold bg-indigo-100/70 px-2 py-0.5 rounded">
            {previousItem?.title || activeModule.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 uppercase tracking-wider font-mono">
              <Filter className="w-3 h-3" />
              <span>Applied Filter:</span>
            </span>

            {filterKeys.map(key => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-indigo-200 text-indigo-900 rounded-md text-[11px] font-semibold shadow-2xs"
              >
                <span className="text-indigo-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span>{String(activeFilter[key])}</span>
              </span>
            ))}

            <button
              onClick={clearActiveFilter}
              className="px-2 py-0.5 text-[11px] text-indigo-700 hover:text-indigo-950 font-bold hover:underline flex items-center gap-0.5"
            >
              <X className="w-3 h-3" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
