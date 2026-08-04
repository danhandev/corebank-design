import * as React from "react"
import { Button } from "@/shared/ui/button"
import { FormSection } from "@/shared/ui/form-section"
import { AlertDialog } from "@/shared/ui/alert-dialog"
import { ConfirmDialog } from "@/shared/ui/confirm-dialog"
import { ErrorDialog } from "@/shared/ui/error-dialog"

type OpenModal = "alert" | "confirm" | "error" | null

/** shared/ui 모달 계열(Modal 베이스 위의 AlertDialog/ConfirmDialog/ErrorDialog) 트리거 보드. */
export function ModalFamilyGallery() {
  const [open, setOpen] = React.useState<OpenModal>(null)
  const close = () => setOpen(null)

  return (
    <div>
      <FormSection title="공통 모달">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={() => setOpen("alert")}>
            안내 다이얼로그
          </Button>
          <Button variant="outline" onClick={() => setOpen("confirm")}>
            확인 다이얼로그
          </Button>
          <Button variant="danger" onClick={() => setOpen("error")}>
            오류 다이얼로그
          </Button>
        </div>
      </FormSection>

      <AlertDialog
        open={open === "alert"}
        onClose={close}
        messages={["안내 문구 예시입니다.", "확인을 누르면 닫힙니다."]}
      />

      <ConfirmDialog
        open={open === "confirm"}
        onClose={close}
        onConfirm={close}
        items={[
          { label: "항목 A", value: "값 A" },
          { label: "항목 B", value: "값 B" },
          { label: "항목 C", value: "값 C" },
        ]}
      />

      <ErrorDialog
        open={open === "error"}
        onClose={close}
        messages={["요청을 처리하지 못했습니다.", "잠시 후 다시 시도하세요."]}
        code="E-00000"
      />
    </div>
  )
}
