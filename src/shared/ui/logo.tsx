import * as React from "react"
import { cn } from "@/shared/lib/utils"

export type LogoProps = {
  /** 심볼 마크의 높이(px). 워드마크 크기도 이 값에 비례한다. */
  size?: number
  /** 워드마크("CoreBank") 노출 여부. false면 심볼만 렌더한다. */
  showWordmark?: boolean
  /**
   * on-color: 색상 바(GNB 등) 위에서 흰색 단색으로 렌더.
   * brand: 흰 표면 위에서 브랜드색 배지로 렌더(기본).
   */
  tone?: "brand" | "on-color"
  className?: string
  /** 스크린리더용 대체 텍스트. 기본 "CoreBank". */
  title?: string
}

/**
 * CoreBank 아이덴티티. 세리프 "CB" 모노그램 배지 + 워드마크 조합.
 * 색은 전부 디자인 토큰으로만 참조하며, 브랜드 자산을 복제하지 않는다.
 */
export function Logo({
  size = 28,
  showWordmark = true,
  tone = "brand",
  className,
  title = "CoreBank",
}: LogoProps) {
  const onColor = tone === "on-color"
  const circleFill = onColor ? "var(--color-white)" : "var(--color-primary)"
  const glyphFill = onColor ? "var(--color-primary)" : "var(--color-white)"

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      role="img"
      aria-label={title}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="24" cy="24" r="24" fill={circleFill} />
        {/* 세리프 CB 모노그램. C를 크게 두고 B를 안쪽으로 겹쳐 배치한다. */}
        <text
          x="9.5"
          y="34"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="30"
          fontWeight="700"
          fill={glyphFill}
        >
          C
        </text>
        <text
          x="22"
          y="34.5"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="26"
          fontWeight="700"
          fill={glyphFill}
        >
          B
        </text>
      </svg>

      {showWordmark && (
        <span
          className={cn(
            "font-heading leading-none tracking-tight",
            onColor ? "text-white" : "text-primary",
          )}
          style={{ fontSize: Math.round(size * 0.72) }}
        >
          <span className="font-value">Core</span>
          <span className="font-label">Bank</span>
        </span>
      )}
    </span>
  )
}
