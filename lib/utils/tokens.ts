/**
 * Design Tokens 유틸리티
 * Figma Variable 기반 토큰을 Tailwind CSS에서 사용할 수 있도록 변환
 * 생성일: 2026-01-14
 */

// 토큰 파일 import
import primitiveStringTokens from "../../tokens/primitiveString/Mode1.tokens.json";
import lightSemanticTokens from "../../tokens/semantic/Light.tokens.json";
import darkSemanticTokens from "../../tokens/semantic/Dark.tokens.json";

/**
 * Spacing 토큰 추출
 */
function getSpacingTokens() {
  const spacing = primitiveStringTokens["Spacing (Margin & Padding)"];
  const spacingObj: Record<string, string> = {};

  if (spacing) {
    Object.entries(spacing).forEach(([key, value]) => {
      if (typeof value === "object" && "$value" in value) {
        // 숫자 키는 그대로 사용 (예: "0", "1", "2")
        // 특수 키는 변환 (예: "px" -> "px", "0․5" -> "0.5")
        const cleanKey = key.replace(/․/g, "."); // 중간 점을 소수점으로 변환
        spacingObj[cleanKey] = `${value.$value}px`;
      }
    });
  }

  return spacingObj;
}

/**
 * Border Radius 토큰 추출
 */
function getBorderRadiusTokens() {
  const borderRadius = primitiveStringTokens["Border Radius"];
  const borderRadiusObj: Record<string, string> = {};

  if (borderRadius) {
    Object.entries(borderRadius).forEach(([key, value]) => {
      if (typeof value === "object" && "$value" in value) {
        const radiusValue = value.$value;
        // rounded-full은 9999px이므로 "9999px"로 저장
        borderRadiusObj[key] = radiusValue === 9999 ? "9999px" : `${radiusValue}px`;
      }
    });
  }

  return borderRadiusObj;
}

/**
 * Helper to extract tokens recursively (handling extensions)
 */
function extractTokens(source: any, target: Record<string, string>) {
  if (!source) return;
  Object.entries(source).forEach(([key, value]) => {
    const item = value as any;
    if (key === "extensions" || key === "Extensions") {
      extractTokens(item, target);
    } else if (item?.$value?.hex) {
      target[key] = item.$value.hex;
    }
  });
}

/**
 * Semantic 색상 토큰 추출 (라이트 모드)
 */
function getLightSemanticColors() {
  const colors: Record<string, string> = {};

  extractTokens(lightSemanticTokens.core, colors);
  extractTokens(lightSemanticTokens.content, colors);
  extractTokens(lightSemanticTokens.background, colors);
  extractTokens(lightSemanticTokens.Border, colors);

  return colors;
}

/**
 * Semantic 색상 토큰 추출 (다크 모드)
 */
function getDarkSemanticColors() {
  const colors: Record<string, string> = {};

  extractTokens(darkSemanticTokens.core, colors);
  extractTokens(darkSemanticTokens.content, colors);
  extractTokens(darkSemanticTokens.background, colors);
  extractTokens(darkSemanticTokens.Border, colors);

  return colors;
}

export const spacingTokens = getSpacingTokens();
export const borderRadiusTokens = getBorderRadiusTokens();
export const lightSemanticColors = getLightSemanticColors();
export const darkSemanticColors = getDarkSemanticColors();
