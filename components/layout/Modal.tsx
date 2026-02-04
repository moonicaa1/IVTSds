/**
 * @file Modal.tsx
 * @description 애플리케이션 전반에서 사용되는 다양한 모달 UI를 정의합니다.
 * 컨텐츠를 담는 대형 모달(ContentModal)과 확인/취소용 경고창(ConfirmModal)을 제공합니다.
 */

"use client";

import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "@/components/ui/Button";

/**
 * @interface ModalProps
 * @description ContentModal 컴포넌트의 Props 정의
 */
export interface ModalProps {
    /** 모달의 노출 여부입니다. */
    isOpen: boolean;
    /** 모달을 닫을 때 호출되는 콜백 함수입니다. */
    onClose: () => void;
    /** 모달 상단에 표시될 제목입니다. */
    title: string;
    /** 모달 본문에 들어갈 내용입니다. */
    children: React.ReactNode;
    /** 모달 하단(액션 영역)에 들어갈 요소입니다. */
    footer?: React.ReactNode;
}

/**
 * @component ContentModal
 * @description
 * 피그마 디자인을 반영한 범용 컨텐츠 모달 레이아웃입니다. (폭: 720px)
 */
export function ContentModal({
    isOpen,
    onClose,
    title,
    children,
    footer,
}: ModalProps) {
    // 모달이 열려있을 때 바디 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dimmed Overlay */}
            <div
                className="absolute inset-0 bg-[#000000B3] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-[12px] bg-backgroundPrimary shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)] transition-all"
                style={{ maxHeight: "80vh" }}
            >
                {/* Dialog Head */}
                <div className="flex shrink-0 items-center justify-between border-b border-borderSecondary bg-backgroundPrimary p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
                    <h2 className="text-xl font-semibold leading-7 tracking-[-0.5px] text-contentPrimary">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-contentTertiary hover:bg-gray-100 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Dialog Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-contentTertiary scrollbar-track-transparent">
                    <div className="min-h-0 w-full">{children}</div>
                </div>

                {/* Dialog Bottom */}
                {footer && (
                    <div className="flex shrink-0 items-center justify-end gap-3 border-t border-borderSecondary bg-backgroundPrimary p-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * @interface ConfirmModalProps
 * @description ConfirmModal 컴포넌트의 Props 정의
 */
export interface ConfirmModalProps {
    /** 모달의 노출 여부입니다. */
    isOpen: boolean;
    /** 모달을 닫을 때(취소) 호출되는 콜백 함수입니다. */
    onClose: () => void;
    /** 확인 버튼을 클릭했을 때 호출되는 콜백 함수입니다. */
    onConfirm: () => void;
    /** 모달 상단에 표시될 제목입니다. */
    title: string;
    /** 사용자에게 보여줄 상세 설명 메시지입니다. */
    description: string;
    /** 확인 버튼의 텍스트입니다. (기본값: Confirm) */
    confirmText?: string;
    /** 취소 버튼의 텍스트입니다. (기본값: Cancel) */
    cancelText?: string;
    /** 모달의 성격(기본, 파괴적 액션)에 따른 스타일 변형입니다. */
    variant?: "default" | "destructive";
}

/**
 * @component ConfirmModal
 * @description
 * 피그마 디자인을 반영한 확인/알림용 모달입니다. (폭: 480px)
 */
export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
}: ConfirmModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Dimmed Overlay */}
            <div
                className="absolute inset-0 bg-[#000000B3] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative flex w-full max-w-[480px] flex-col gap-4 rounded-[12px] border border-borderPrimary bg-backgroundPrimary p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all">
                {/* Text Content */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold leading-7 tracking-[-0.5px] text-contentPrimary">
                        {title}
                    </h2>
                    <p className="text-sm font-medium leading-5 text-contentTertiary">
                        {description}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button
                        variant="default"
                        className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
