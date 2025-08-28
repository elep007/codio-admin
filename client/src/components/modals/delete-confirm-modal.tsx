import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmModal({
  title,
  description,
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="card-gradient border border-border max-w-sm">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-confirm-title">
            {title}
          </h3>
          <p className="text-muted-foreground mb-6" data-testid="text-confirm-description">
            {description}
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-accent hover:bg-accent/80"
              disabled={isLoading}
              data-testid="button-cancel-delete"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              disabled={isLoading}
              data-testid="button-confirm-delete"
            >
              {isLoading ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
