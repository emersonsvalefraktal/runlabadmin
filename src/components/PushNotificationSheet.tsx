import { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PushNotificationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PushNotificationSheet = ({ open, onOpenChange }: PushNotificationSheetProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sendType, setSendType] = useState("immediate");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  const formatTime = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    setDate(formatted);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTime(e.target.value);
    setTime(formatted);
  };

  const handleSubmit = () => {
    toast.success("Notificação agendada com sucesso!");
    onOpenChange(false);
    // Reset form
    setTitle("");
    setDescription("");
    setSendType("immediate");
    setDate("");
    setTime("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[40vw] sm:max-w-none bg-[#262626] border-border p-0 overflow-hidden flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-xl font-semibold text-foreground">
            Cadastrar nova notificação
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Preencha as informações abaixo para cadastrar uma nova notificação.
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm text-foreground">
              Título da notificação
            </Label>
            <Textarea
              id="title"
              placeholder="Ex: Nova corrida disponível este fim de semana"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-h-[100px] bg-[#1A1A1A] border-0 text-foreground resize-none"
              maxLength={50}
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {title.length}/50
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-foreground">
              Descrição
            </Label>
            <Textarea
              id="description"
              placeholder="Ex: Garanta sua vaga na prova de 10km. Inscreva-se até sexta-feira."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] bg-[#1A1A1A] border-0 text-foreground resize-none"
              maxLength={100}
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {description.length}/100
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-foreground">Tipo de envio</Label>
            <RadioGroup value={sendType} onValueChange={setSendType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate" className="text-sm text-foreground cursor-pointer">
                  Envio imediato
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scheduled" id="scheduled" />
                <Label htmlFor="scheduled" className="text-sm text-foreground cursor-pointer">
                  Envio agendado
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm text-foreground">
                Data
              </Label>
              <Input
                id="date"
                type="text"
                placeholder="DD/MM/AAAA"
                value={date}
                onChange={handleDateChange}
                maxLength={10}
                className="bg-[#1A1A1A] border-0 text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm text-foreground">
                Hora
              </Label>
              <Input
                id="time"
                type="text"
                placeholder="HH:MM"
                value={time}
                onChange={handleTimeChange}
                maxLength={5}
                className="bg-[#1A1A1A] border-0 text-foreground"
              />
            </div>
          </div>
        </div>

        <SheetFooter className="p-6 pt-4 border-t border-border mt-auto">
          <div className="flex gap-3 w-full">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-[#1A1A1A] text-foreground hover:bg-[#171717] hover:text-foreground"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Agendar envio
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
