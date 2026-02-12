import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RegisterPartnerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegisterPartnerSheet = ({ open, onOpenChange }: RegisterPartnerSheetProps) => {
  const [name, setName] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const partnerTypes = ["Assessoria", "Academia", "Treinador", "Individual", "Influenciador"];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 0) return "";
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = () => {
    if (!name || !partnerType || !email || !city || !state) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Parceiro cadastrado com sucesso!");
    onOpenChange(false);
    // Reset form
    setName("");
    setPartnerType("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[40vw] sm:max-w-none bg-[#262626] border-border p-0 overflow-hidden flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-xl font-semibold text-foreground">
            Cadastrar novo parceiro
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Preencha as informações abaixo para cadastrar um novo parceiro.
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-6 overflow-y-auto flex-1">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-foreground">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Digite o nome completo do parceiro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
            />
          </div>

          {/* Tipo de parceiro */}
          <div className="space-y-3">
            <Label className="text-sm text-foreground">Tipo de parceiro</Label>
            <div className="flex flex-wrap gap-2">
              {partnerTypes.map((type) => (
                <Button
                  key={type}
                  variant={partnerType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPartnerType(partnerType === type ? "" : type)}
                  className={
                    partnerType === type
                      ? "bg-success text-success-foreground"
                      : "bg-[#1A1A1A] text-foreground border-0"
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
            />
          </div>

          {/* Telefone (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-foreground">
              Telefone (opcional)
            </Label>
            <Input
              id="phone"
              type="text"
              placeholder="(DDD) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={15}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
            />
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm text-foreground">
                Cidade
              </Label>
              <Input
                id="city"
                placeholder="Digite a cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm text-foreground">
                Estado
              </Label>
              <Input
                id="state"
                placeholder="Digite o estado"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
              />
            </div>
          </div>
        </div>

        <SheetFooter className="p-6 pt-4 border-t border-border mt-auto">
          <div className="flex gap-3 w-full">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-success text-success-foreground hover:bg-success/90"
            >
              Cadastrar parceiro
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
