import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus } from "lucide-react";
import type { OrderFormValues } from "@/lib/validation";
import { ORDER_STATUS_OPTIONS } from "@/lib/constants/order-status";
import { useIsMobile } from "@/hooks/use-mobile";
import type { AddOrderModalProps } from "@/types/modals";
import LayoutMobileModal from "./layout-mobile-modal";
import LayoutDesktopModal from "./layout-desktop-modal";

/**
 * Modale per l'aggiunta di un nuovo ordine.
 * Include campi per cliente, stato, prodotti e totale.
 * Gestisce la visualizzazione mobile e desktop in base alla larghezza dello schermo.
 * @param isAddModalOpen - Indica se la modale è aperta.
 * @param setIsAddModalOpen - Funzione per chiudere la modale.
 * @param form - Oggetto del form con metodi di registrazione e stato degli errori.
 * @param fields - Lista dei prodotti nell'ordine.
 * @param products - Lista dei prodotti disponibili.
 * @param customers - Lista dei clienti disponibili.
 * @param addProduct - Funzione per aggiungere un prodotto all'ordine.
 * @param removeProduct - Funzione per rimuovere un prodotto dall'ordine.
 * @param handleProductChange - Funzione per gestire il cambiamento del prodotto selezionato.
 * @param calculateTotal - Funzione per calcolare il totale dell'ordine.
 * @param serverError - Messaggio di errore dal server, se presente.
 * @param onSubmit - Funzione da chiamare al submit del form.
 */
const AddOrderModal: React.FC<AddOrderModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  form,
  fields,
  products,
  customers,
  addProduct,
  removeProduct,
  handleProductChange,
  calculateTotal,
  serverError,
  onSubmit,
}) => {
  const isMobile = useIsMobile();
  const {
    formState: { errors },
  } = form;

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Nuovo Ordine</DialogTitle>
          <DialogDescription>
            Crea un nuovo ordine per un cliente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2 -mr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerId">Cliente *</Label>
                <Select
                  value={form.watch("customerId")}
                  onValueChange={(value) => form.setValue("customerId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id.toString()}
                      >
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.customerId && (
                  <p className="text-sm text-red-500">
                    {errors.customerId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Stato *</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value) =>
                    form.setValue("status", value as OrderFormValues["status"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Products Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Prodotti *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProduct}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Prodotto
                </Button>
              </div>

              {fields.map((field, index) =>
                isMobile ? (
                  // Mobile layout - Card per ogni prodotto
                  <LayoutMobileModal
                    key={field.id}
                    fields={fields}
                    index={index}
                    form={form}
                    products={products}
                    removeProduct={removeProduct}
                    handleProductChange={handleProductChange}
                  />
                ) : (
                  // Desktop layout - Grid originale
                  <LayoutDesktopModal
                    key={field.id}
                    fields={fields}
                    index={index}
                    form={form}
                    products={products}
                    removeProduct={removeProduct}
                    handleProductChange={handleProductChange}
                  />
                )
              )}

              <div className="text-right pt-2 border-t">
                <div className="text-lg font-semibold">
                  Totale: €{calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter className="flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              onClick={() => setIsAddModalOpen(false)}
            >
              {form.formState.isSubmitting ? "Salvataggio..." : "Crea Ordine"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderModal;
