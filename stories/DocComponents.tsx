import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface DocCardProps {
    title: string;
    children: React.ReactNode;
    example?: React.ReactNode;
}

export const DoDontLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {children}
    </div>
);

export const DoCard = ({ title, children, example }: DocCardProps) => (
    <div className="flex flex-col border border-emerald-100 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border-b border-emerald-100">
            <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-900">Do</span>
        </div>
        <div className="p-5">
            {example && (
                <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center min-h-[100px]">
                    {example}
                </div>
            )}
            <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
            <div className="text-sm text-slate-600 leading-relaxed">
                {children}
            </div>
        </div>
    </div>
);

export const DontCard = ({ title, children, example }: DocCardProps) => (
    <div className="flex flex-col border border-red-100 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border-b border-red-100">
            <XCircleIcon className="w-5 h-5 text-red-600" />
            <span className="font-bold text-red-900">Don't</span>
        </div>
        <div className="p-5">
            {example && (
                <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center min-h-[100px]">
                    {example}
                </div>
            )}
            <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
            <div className="text-sm text-slate-600 leading-relaxed">
                {children}
            </div>
        </div>
    </div>
);
