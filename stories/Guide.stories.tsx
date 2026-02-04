import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
    title: "Guide",
    parameters: {
        layout: "fullscreen",
        options: { showPanel: false },
    },
};

export default meta;

export const TechnicalExcellence: StoryObj = {
    name: "Technical Excellence Guide",
    render: () => (
        <div className="min-h-screen bg-white">
            {/* Single-column, typography-first layout */}
            <div className="max-w-4xl mx-auto px-8 py-16">

                {/* Header - Pure Typography */}
                <header className="mb-20 border-b border-neutral-100 pb-8">
                    <h1 className="text-5xl font-bold tracking-tight text-black mb-3">
                        Technical Excellence
                    </h1>
                    <p className="text-base text-neutral-500">
                        Quality metrics for IVTS Design System
                    </p>
                </header>

                {/* Metrics Grid - Minimal, Data-First */}
                <div className="grid grid-cols-3 gap-px bg-neutral-100 border border-neutral-100 mb-16">
                    {/* Maturity */}
                    <div className="bg-white p-8">
                        <div className="text-sm font-medium text-neutral-400 mb-2">Maturity</div>
                        <div className="text-4xl font-bold text-black">100%</div>
                    </div>

                    {/* Coverage */}
                    <div className="bg-white p-8">
                        <div className="text-sm font-medium text-neutral-400 mb-2">Coverage</div>
                        <div className="text-4xl font-bold text-black">100%</div>
                    </div>

                    {/* Components */}
                    <div className="bg-white p-8">
                        <div className="text-sm font-medium text-neutral-400 mb-2">Components</div>
                        <div className="text-4xl font-bold text-black">14</div>
                    </div>
                </div>

                {/* Quality Gates - Typography Only */}
                <section className="mb-16">
                    <h2 className="text-sm font-semibold text-black uppercase tracking-wide mb-6">
                        Quality Gates
                    </h2>

                    <div className="space-y-px bg-neutral-100 border border-neutral-100">
                        {[
                            { name: "Interaction Tests", status: "Passing" },
                            { name: "Visual Regression", status: "Passing" },
                            { name: "Test Coverage", status: "Passing" },
                            { name: "Production Build", status: "Passing" },
                        ].map((gate, idx) => (
                            <div key={idx} className="bg-white px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                                <span className="text-sm font-medium text-black">{gate.name}</span>
                                <span className="text-xs font-mono text-neutral-400">{gate.status}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Environment Info - Minimal Footer */}
                <footer className="pt-8 border-t border-neutral-100">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>Environment: Production</span>
                        <span>Deployed via Chromatic</span>
                    </div>
                </footer>
            </div>
        </div>
    )
};
