/**
 * @file CreateDealerModal.tsx
 * @description 새로운 딜러를 시스템에 등록하기 위한 입력 폼 모달 기능 컴포넌트입니다.
 * 딜러 코드, 이름, 이메일 등 필수 정보와 추가적인 연락처 정보를 수집합니다.
 */

"use client";

import React, { useState } from "react";
import { ContentModal } from "@/components/layout/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

/**
 * @interface CreateDealerModalProps
 * @property {boolean} isOpen - 모달의 열림/닫힘 상태
 * @property {() => void} onClose - 모달을 닫을 때 호출되는 함수
 * @property {(dealerData: any) => void} onConfirm - 딜러 생성이 확정되었을 때 폼 데이터를 전달하는 콜백
 */
interface CreateDealerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (dealerData: any) => void;
}

export default function CreateDealerModal({
    isOpen,
    onClose,
    onConfirm,
}: CreateDealerModalProps) {
    const [formData, setFormData] = useState({
        dealerType: "DLR",
        dealerCode: "",
        dealerName: "",
        postalCode: "",
        fullAddress: "",
        representativeEmail: "",
        phoneNumber: "",
        setRandomPassword: true,
        websiteUrl: "",
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleConfirm = () => {
        // Basic validation for required fields
        if (!formData.dealerCode || !formData.dealerName || !formData.representativeEmail) {
            alert("Please fill in all required fields marked with *");
            return;
        }

        // Map the new form data to the table's expected record structure
        // Since the table expects fields like 'code', 'name', 'dealerType' (standard/premium etc), 
        // we map them accordingly.
        const submissionData = {
            dealerId: formData.dealerCode, // Local adaptation
            sideMenuSet: "Full Set", // Default value
            isActive: true, // Default active
            ...formData
        };

        onConfirm(submissionData);
        onClose();
    };

    return (
        <ContentModal
            isOpen={isOpen}
            onClose={onClose}
            title="Create dealer"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </>
            }
        >
            <div className="flex flex-col gap-4">
                <Select
                    label="Dealer type"
                    value={formData.dealerType}
                    onChange={(val) => handleChange("dealerType", val)}
                    options={[
                        { value: "DLR", label: "DLR" },
                        { value: "DGP", label: "DGP" },
                    ]}
                />

                <Input
                    label="Dealer code"
                    id="dealerCode"
                    placeholder="A11 Ad 50501"
                    value={formData.dealerCode}
                    onChange={(e) => handleChange("dealerCode", e.target.value)}
                    required
                />

                <Input
                    label="Dealer name"
                    id="dealerName"
                    placeholder="Dealer name"
                    value={formData.dealerName}
                    onChange={(e) => handleChange("dealerName", e.target.value)}
                    required
                />

                <Input
                    label="Postal code"
                    id="postalCode"
                    placeholder="12345"
                    value={formData.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                />

                <Input
                    label="Full address"
                    id="fullAddress"
                    placeholder="123 Main Street Springfield"
                    value={formData.fullAddress}
                    onChange={(e) => handleChange("fullAddress", e.target.value)}
                />

                <Input
                    label="Representative email"
                    id="representativeEmail"
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.representativeEmail}
                    onChange={(e) => handleChange("representativeEmail", e.target.value)}
                    required
                />

                <Input
                    label="Phone number"
                    id="phoneNumber"
                    placeholder="010-0000-0000"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />

                <div className="flex items-center gap-2 py-2">
                    <Checkbox
                        checked={formData.setRandomPassword}
                        onCheckedChange={(checked) => handleChange("setRandomPassword", checked)}
                    />
                    <span
                        className="text-sm font-semibold text-contentPrimary cursor-pointer pointer-events-auto"
                        onClick={() => handleChange("setRandomPassword", !formData.setRandomPassword)}
                    >
                        Set random password
                    </span>
                </div>

                <Input
                    label="Website URL"
                    id="websiteUrl"
                    placeholder="Website URL"
                    value={formData.websiteUrl}
                    onChange={(e) => handleChange("websiteUrl", e.target.value)}
                />
            </div>
        </ContentModal>
    );
}
