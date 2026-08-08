import * as React from "react"
import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { NAV } from "@/shared/config/nav"
import { IconButton } from "@/shared/ui/icon-button"
import { cn } from "@/shared/lib/utils"

type FullMenuOverlayProps = {
  open: boolean
  onClose: () => void
}

/**
 * REQ-CMN-004 전체메뉴. 상단 GNB 헤더는 그대로 두고(top-18) 그 아래 영역만
 * 딤 + 메뉴 시트로 덮는다. 시트는 헤더 하단에서 펼쳐지는 메가메뉴 형태이며,
 * 카테고리별 상단 룰로 컬럼 높이 편차를 시각적으로 정렬한다.
 */
export function FullMenuOverlay({ open, onClose }: FullMenuOverlayProps) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-x-0 top-18 bottom-0 z-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="전체메뉴"
    >
      {/* 헤더 아래 영역을 덮는 딤. 빈 곳을 누르면 닫힌다. */}
      <button
        type="button"
        aria-label="전체메뉴 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-overlay-scrim"
      />

      {/* 메뉴 시트 — 헤더 바로 아래에서 펼쳐진다 */}
      <div className="absolute inset-x-0 top-0 border-t-2 border-navy bg-surface-elevated shadow-pop">
        <div className="mx-auto w-320 px-4">
          <div className="flex h-14 items-center justify-between">
            <span className="text-h2 font-heading text-ink">전체메뉴</span>
            <IconButton
              onClick={onClose}
              className="border border-border bg-surface-elevated text-ink-muted hover:bg-surface hover:text-ink"
              aria-label="전체메뉴 닫기"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </IconButton>
          </div>

          <div className="grid grid-cols-4 border-t border-border pb-12">
            {NAV.map((cat, index) => (
              <div
                key={cat.id}
                className={cn(
                  "px-6 pt-7",
                  index === 0 && "pl-0",
                  index > 0 && "border-l border-border",
                )}
              >
                <h3 className="mb-5 border-b border-border-strong pb-3 text-lg font-heading text-primary">
                  {cat.label}
                </h3>
                <div className="flex flex-col gap-7">
                  {cat.groups.map((group) => (
                    <div key={group.title}>
                      <p className="mb-2.5 text-xs font-label whitespace-nowrap text-ink-faint">
                        {group.title}
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {group.items.map((item) => (
                          <li key={`${item.screenId}-${item.path}`}>
                            <Link
                              to={item.path}
                              data-screen-id={item.screenId}
                              onClick={onClose}
                              className="inline-block text-base font-label whitespace-nowrap text-ink hover:text-primary hover:underline"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
