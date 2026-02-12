import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Upload, Pencil, CalendarIcon, CloudUpload, Check, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const formSchema = z.object({
  nome: z.string().trim().min(1, "Nome da competição é obrigatório").max(100, "Nome muito longo"),
  descricao: z.string().trim().max(500, "Descrição muito longa"),
  modalidade: z.string().min(1, "Selecione uma modalidade"),
  formato: z.string().min(1, "Selecione um formato"),
  campeonato: z.string().optional(),
  distancia: z.string().min(1, "Selecione ao menos uma distância"),
  outraDistancia: z.string().optional(),
  inscricaoInicio: z.date().optional(),
  inscricaoFim: z.date().optional(),
  competicaoInicio: z.date().optional(),
  competicaoFim: z.date().optional(),
  tentativasIlimitadas: z.boolean().optional(),
  numeroMaximoInscritos: z.boolean().optional(),
  maxInscritos: z.string().optional(),
  premiacoes: z.enum(["sim", "nao"]).optional(),
  quantidadeRecompensas: z.string().optional(),
  outraQuantidade: z.string().optional(),
  possuiKit: z.enum(["sim", "nao"]).optional(),
  tipoCompeticao: z.string().optional(),
  lote1Nome: z.string().optional(),
  lote1Preco: z.string().optional(),
  lote1Descricao: z.string().optional(),
  lote1CreditosAssinatura: z.boolean().optional(),
  lote2Nome: z.string().optional(),
  lote2Preco: z.string().optional(),
  lote2Descricao: z.string().optional(),
  lote2CreditosAssinatura: z.boolean().optional()
});
type FormData = z.infer<typeof formSchema>;
const EditarCompeticao = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedPatrocinadores, setSelectedPatrocinadores] = useState<File[]>([]);
  const [previewPatrocinadores, setPreviewPatrocinadores] = useState<string[]>([]);
  const [documento1, setDocumento1] = useState<File | null>(null);
  const [documento2, setDocumento2] = useState<File | null>(null);
  const [documento3, setDocumento3] = useState<File | null>(null);
  const [distanciaSelecionada, setDistanciaSelecionada] = useState<string>("outro");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "Desafio 5km",
      descricao: "",
      modalidade: "",
      formato: "",
      campeonato: "",
      distancia: "outro",
      outraDistancia: "",
      inscricaoInicio: undefined,
      inscricaoFim: undefined,
      competicaoInicio: undefined,
      competicaoFim: undefined,
      tentativasIlimitadas: false,
      numeroMaximoInscritos: true,
      maxInscritos: "",
      premiacoes: "sim",
      quantidadeRecompensas: "",
      outraQuantidade: "",
      possuiKit: "sim",
      tipoCompeticao: "",
      lote1Nome: "",
      lote1Preco: "",
      lote1Descricao: "",
      lote1CreditosAssinatura: false,
      lote2Nome: "",
      lote2Preco: "",
      lote2Descricao: "",
      lote2CreditosAssinatura: false
    }
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePatrocinadoresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedPatrocinadores(prev => [...prev, ...files]);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewPatrocinadores(prev => [...prev, ...urls]);
    }
  };

  const handlePatrocinadoresDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlePatrocinadoresDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      setSelectedPatrocinadores(prev => [...prev, ...files]);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewPatrocinadores(prev => [...prev, ...urls]);
    }
  };

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>, setDoc: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setDoc(file);
    }
  };

  const handleDocumentoDrop = (e: React.DragEvent, setDoc: (file: File | null) => void) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setDoc(file);
    }
  };

  const handleSave = (data: FormData) => {
    console.log("Form data:", data);
    toast.success("Dados salvos com sucesso!");
  };
  return <div className="min-h-screen bg-background">
      <Header />
      <form onSubmit={form.handleSubmit(handleSave)} className="pt-24">
      {/* Action Bar */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2 hover:bg-transparent" style={{ color: '#CCF725' }} onClick={() => navigate(`/gestao-competicoes/${id}`)}>
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Button>

            <Button type="submit" className="gap-2 border-0 hover:brightness-90 transition-all" style={{
            backgroundColor: '#CCF725',
            color: '#1A1A1A'
          }}>
              Salvar dados
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Banner */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3 rounded-[20px] px-6 py-4" style={{
        backgroundColor: '#CCF725',
        color: '#1A1A1A'
      }}>
          <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 1.75L12.25 3.5L4.375 11.375H2.625V9.625L10.5 1.75Z" stroke="#CCF725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-medium">Você está editando está página</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div>
          {/* Image Upload Area */}
          <div className="relative rounded-[20px] bg-[#1A1A1A] p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]" onDragOver={handleDragOver} onDrop={handleDrop}>
            {previewUrl ? <div className="relative w-full h-full flex items-center justify-center">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-[350px] rounded-lg object-contain" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrl("");
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center hover:brightness-90 transition-all"
                  style={{ backgroundColor: '#CCF725' }}
                >
                  <X className="w-5 h-5" style={{ color: '#1A1A1A' }} />
                </button>
              </div> : <>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
              backgroundColor: '#CCF725'
            }}>
                  <Upload className="w-8 h-8" style={{
                color: '#1A1A1A'
              }} />
                </div>
                
                <p className="text-sm" style={{ color: '#CCF725' }}>
                  Arraste e solte a imagem aqui
                </p>

                <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725] hover:text-[#1A1A1A] bg-transparent" asChild>
                    <span>Procurar arquivo</span>
                  </Button>
                </label>
              </>}
          </div>

          {/* Dados Básicos Form */}
          <div className="mt-10">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Dados básicos</h2>

              {/* Nome da competição */}
              <div className="mb-6">
                <Label htmlFor="nome" className="text-sm text-muted-foreground mb-2 block">
                  Nome da competição
                </Label>
                <Input id="nome" placeholder="Ex: Desafio 5km" {...form.register("nome")} className="bg-[#1A1A1A] border-border/30" />
                {form.formState.errors.nome && <p className="text-sm text-destructive mt-1">{form.formState.errors.nome.message}</p>}
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <Label htmlFor="descricao" className="text-sm text-muted-foreground mb-2 block">
                  Descrição
                </Label>
                <div className="relative">
                  <Textarea id="descricao" placeholder="Insira a descrição aqui..." {...form.register("descricao")} className="bg-[#1A1A1A] border-border/30 min-h-[120px] resize-none" />
                  <button type="button" className="absolute bottom-3 right-3 p-1.5 rounded-md hover:bg-accent">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                {form.formState.errors.descricao && <p className="text-sm text-destructive mt-1">{form.formState.errors.descricao.message}</p>}
              </div>

              {/* Modalidade e Formato */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="modalidade" className="text-sm text-muted-foreground mb-2 block">
                    Modalidade
                  </Label>
                  <Select value={form.watch("modalidade")} onValueChange={value => form.setValue("modalidade", value)}>
                    <SelectTrigger className="bg-[#1A1A1A] border-border/30">
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-border/30">
                      <SelectItem value="corrida">Corrida</SelectItem>
                      <SelectItem value="caminhada">Caminhada</SelectItem>
                      <SelectItem value="ciclismo">Ciclismo</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.modalidade && <p className="text-sm text-destructive mt-1">{form.formState.errors.modalidade.message}</p>}
                </div>

                <div>
                  <Label htmlFor="formato" className="text-sm text-muted-foreground mb-2 block">
                    Formato
                  </Label>
                  <Select value={form.watch("formato")} onValueChange={value => form.setValue("formato", value)}>
                    <SelectTrigger className="bg-[#1A1A1A] border-border/30">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-border/30">
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.formato && <p className="text-sm text-destructive mt-1">{form.formState.errors.formato.message}</p>}
                </div>
              </div>

              {/* Vincular campeonato */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="campeonato" className="text-sm text-muted-foreground">
                    Vincular campeonato
                  </Label>
                  <span className="text-xs text-muted-foreground">(opcional)</span>
                </div>
                <Select value={form.watch("campeonato")} onValueChange={value => form.setValue("campeonato", value)}>
                  <SelectTrigger className="bg-[#1A1A1A] border-border/30">
                    <SelectValue placeholder="Selecione o campeonato a ser vinculado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-border/30">
                    <SelectItem value="campeonato1">Campeonato 1</SelectItem>
                    <SelectItem value="campeonato2">Campeonato 2</SelectItem>
                    <SelectItem value="campeonato3">Campeonato 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Período Section */}
          <div className="mt-6">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Período</h2>

              {/* Período de inscrições */}
              <div className="mb-6">
                <Label className="text-sm text-muted-foreground mb-3 block">
                  Período de inscrições
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Data Início Inscrição */}
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-[#1A1A1A] border-border/30", !form.watch("inscricaoInicio") && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("inscricaoInicio") ? format(form.watch("inscricaoInicio")!, "dd/MM/yyyy") : <span>De: DD/MM/AAAA</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-border/30" align="start">
                        <Calendar mode="single" selected={form.watch("inscricaoInicio")} onSelect={date => form.setValue("inscricaoInicio", date)} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Data Fim Inscrição */}
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-[#1A1A1A] border-border/30", !form.watch("inscricaoFim") && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("inscricaoFim") ? format(form.watch("inscricaoFim")!, "dd/MM/yyyy") : <span>Até: DD/MM/AAAA</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-border/30" align="start">
                        <Calendar mode="single" selected={form.watch("inscricaoFim")} onSelect={date => form.setValue("inscricaoFim", date)} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Período da competição */}
              <div>
                <Label className="text-sm text-muted-foreground mb-3 block">
                  Período da competição
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Data Início Competição */}
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-[#1A1A1A] border-border/30", !form.watch("competicaoInicio") && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("competicaoInicio") ? format(form.watch("competicaoInicio")!, "dd/MM/yyyy") : <span>De: DD/MM/AAAA</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-border/30" align="start">
                        <Calendar mode="single" selected={form.watch("competicaoInicio")} onSelect={date => form.setValue("competicaoInicio", date)} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Data Fim Competição */}
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-[#1A1A1A] border-border/30", !form.watch("competicaoFim") && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("competicaoFim") ? format(form.watch("competicaoFim")!, "dd/MM/yyyy") : <span>Até: DD/MM/AAAA</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-border/30" align="start">
                        <Calendar mode="single" selected={form.watch("competicaoFim")} onSelect={date => form.setValue("competicaoFim", date)} initialFocus className={cn("p-3 pointer-events-auto")} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Regras Section */}
          <div className="mt-6">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Regras</h2>

              {/* Tentativas ilimitadas */}
              <div className="flex items-center gap-3 mb-4">
                <Checkbox
                  id="tentativasIlimitadas"
                  checked={form.watch("tentativasIlimitadas") || false}
                  onCheckedChange={(checked) =>
                    form.setValue("tentativasIlimitadas", checked as boolean)
                  }
                />
                <Label
                  htmlFor="tentativasIlimitadas"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Tentativas ilimitadas
                </Label>
              </div>

              {/* Número máximo de inscritos */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="numeroMaximoInscritos"
                    checked={form.watch("numeroMaximoInscritos") || false}
                    onCheckedChange={(checked) =>
                      form.setValue("numeroMaximoInscritos", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="numeroMaximoInscritos"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    Número máximo de inscritos
                  </Label>
                </div>

                {form.watch("numeroMaximoInscritos") && (
                  <div className="ml-7">
                    <Input
                      type="number"
                      placeholder="Ex: 100"
                      {...form.register("maxInscritos")}
                      className="bg-[#1A1A1A] border-border/30 w-48"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Premiações Section */}
          <div className="mt-6">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Premiações</h2>

              {/* Sim/Não Radio */}
              <RadioGroup
                value={form.watch("premiacoes")}
                onValueChange={(value) => form.setValue("premiacoes", value as "sim" | "nao")}
                className="flex gap-6 mb-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sim" id="premiacoes-sim" />
                  <Label htmlFor="premiacoes-sim" className="text-sm cursor-pointer">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="nao" id="premiacoes-nao" />
                  <Label htmlFor="premiacoes-nao" className="text-sm cursor-pointer">
                    Não
                  </Label>
                </div>
              </RadioGroup>

              {form.watch("premiacoes") === "sim" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Nº de pessoas que poderão ganhar recompensas
                  </p>

                  {/* Quantidade Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "px-6 py-2 bg-[#1A1A1A] border-border/30",
                        form.watch("quantidadeRecompensas") === "5-5" &&
                          "border-0"
                      )}
                      style={
                        form.watch("quantidadeRecompensas") === "5-5"
                          ? { backgroundColor: "#CCF725", color: "#1A1A1A" }
                          : {}
                      }
                      onClick={() => form.setValue("quantidadeRecompensas", "5-5")}
                    >
                      5-5
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "px-6 py-2 bg-[#1A1A1A] border-border/30",
                        form.watch("quantidadeRecompensas") === "6-10" &&
                          "border-0"
                      )}
                      style={
                        form.watch("quantidadeRecompensas") === "6-10"
                          ? { backgroundColor: "#CCF725", color: "#1A1A1A" }
                          : {}
                      }
                      onClick={() => form.setValue("quantidadeRecompensas", "6-10")}
                    >
                      6-10
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "px-6 py-2 bg-[#1A1A1A] border-border/30",
                        form.watch("quantidadeRecompensas") === "11-20" &&
                          "border-0"
                      )}
                      style={
                        form.watch("quantidadeRecompensas") === "11-20"
                          ? { backgroundColor: "#CCF725", color: "#1A1A1A" }
                          : {}
                      }
                      onClick={() => form.setValue("quantidadeRecompensas", "11-20")}
                    >
                      11-20
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "px-6 py-2 bg-[#1A1A1A] border-border/30",
                        form.watch("quantidadeRecompensas") === "outro" &&
                          "border-0"
                      )}
                      style={
                        form.watch("quantidadeRecompensas") === "outro"
                          ? { backgroundColor: "#CCF725", color: "#1A1A1A" }
                          : {}
                      }
                      onClick={() => form.setValue("quantidadeRecompensas", "outro")}
                    >
                      Outro
                    </Button>
                  </div>

                  {/* Input condicional para "Outro" */}
                  {form.watch("quantidadeRecompensas") === "outro" && (
                    <Input
                      type="text"
                      placeholder="Insira outra quantidade"
                      {...form.register("outraQuantidade")}
                      className="bg-[#1A1A1A] border-border/30"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Inscrição e checkout Section */}
          <div className="mt-6">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Inscrição e checkout</h2>

              {/* Possui kit incluído? */}
              <div className="mb-6">
                <Label className="text-sm text-muted-foreground mb-3 block">
                  Possui kit incluído?
                </Label>
                <RadioGroup
                  value={form.watch("possuiKit")}
                  onValueChange={(value) => form.setValue("possuiKit", value as "sim" | "nao")}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="sim" id="kit-sim" />
                    <Label htmlFor="kit-sim" className="text-sm cursor-pointer">
                      Sim
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="nao" id="kit-nao" />
                    <Label htmlFor="kit-nao" className="text-sm cursor-pointer">
                      Não
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Tipo de competição */}
              <div className="mb-6">
                <Label htmlFor="tipoCompeticao" className="text-sm text-muted-foreground mb-2 block">
                  Tipo de competição
                </Label>
                <Select
                  value={form.watch("tipoCompeticao")}
                  onValueChange={(value) => form.setValue("tipoCompeticao", value)}
                >
                  <SelectTrigger className="bg-[#1A1A1A] border-border/30">
                    <SelectValue placeholder="Selecione: Gratuita ou Paga" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-border/30">
                    <SelectItem value="gratuita">Gratuita</SelectItem>
                    <SelectItem value="paga">Paga</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lote 1 */}
              <div className="mb-6">
                <Label className="text-sm text-muted-foreground mb-3 block">
                  Ex.: Lote 1 - Medalha garantida
                </Label>
                
                <Input
                  placeholder="R$ 0,00"
                  {...form.register("lote1Preco")}
                  className="bg-[#1A1A1A] border-border/30 mb-3"
                />

                <Label className="text-sm text-muted-foreground mb-2 block">
                  Descrição
                </Label>
                <Textarea
                  placeholder="Ex.: Modalida garantida à todos os inscritos"
                  {...form.register("lote1Descricao")}
                  className="bg-[#1A1A1A] border-border/30 min-h-[100px] resize-none mb-3"
                />

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="lote1Creditos"
                    checked={form.watch("lote1CreditosAssinatura") || false}
                    onCheckedChange={(checked) =>
                      form.setValue("lote1CreditosAssinatura", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="lote1Creditos"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Permitir compra com créditos do assinatura
                  </Label>
                </div>
              </div>

              {/* Lote 2 */}
              <div>
                <Label className="text-sm text-muted-foreground mb-3 block">
                  Ex.: Lote 2 - Camiseta garantida + Modalha
                </Label>
                
                <Input
                  placeholder="R$ 0,00"
                  {...form.register("lote2Preco")}
                  className="bg-[#1A1A1A] border-border/30 mb-3"
                />

                <Label className="text-sm text-muted-foreground mb-2 block">
                  Descrição
                </Label>
                <Textarea
                  placeholder="Ex.: Camiseta garantida à todos os inscritos"
                  {...form.register("lote2Descricao")}
                  className="bg-[#1A1A1A] border-border/30 min-h-[100px] resize-none mb-3"
                />

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="lote2Creditos"
                    checked={form.watch("lote2CreditosAssinatura") || false}
                    onCheckedChange={(checked) =>
                      form.setValue("lote2CreditosAssinatura", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="lote2Creditos"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Permitir compra com créditos do assinatura
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Patrocinadores Section */}
          <div className="mt-6">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Patrocinadores</h2>

              {/* Upload Area */}
              <div 
                className="relative rounded-[20px] bg-[#1A1A1A] p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]"
                onDragOver={handlePatrocinadoresDragOver}
                onDrop={handlePatrocinadoresDrop}
              >
                {previewPatrocinadores.length > 0 ? (
                  <div className="w-full flex flex-wrap gap-4 items-center justify-center">
                    {previewPatrocinadores.map((url, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={url} 
                          alt={`Patrocinador ${index + 1}`} 
                          className="max-w-[150px] max-h-[100px] rounded-lg object-contain" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPatrocinadores(prev => prev.filter((_, i) => i !== index));
                            setPreviewPatrocinadores(prev => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center hover:brightness-90 transition-all"
                          style={{ backgroundColor: '#CCF725' }}
                        >
                          <X className="w-4 h-4" style={{ color: '#1A1A1A' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center" 
                      style={{ backgroundColor: '#CCF725' }}
                    >
                      <CloudUpload 
                        className="w-8 h-8" 
                        style={{ color: '#1A1A1A' }} 
                      />
                    </div>
                    
                    <p className="text-sm" style={{ color: '#CCF725' }}>
                      Arraste e solte as imagens aqui
                    </p>

                    <input 
                      type="file" 
                      id="patrocinadores-upload" 
                      className="hidden" 
                      accept="image/*"
                      multiple
                      onChange={handlePatrocinadoresChange}
                    />
                    <label htmlFor="patrocinadores-upload">
                      <Button 
                        variant="outline" 
                        className="cursor-pointer border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725] hover:text-[#1A1A1A] bg-transparent" 
                        asChild
                      >
                        <span>Procurar arquivo</span>
                      </Button>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Documentos Section */}
          <div className="mt-6">
            <div className="rounded-[20px] border border-border/50 bg-[#2A2A2A] p-8">
              <h2 className="text-lg font-semibold mb-6">Documentos</h2>

              <div className="grid grid-cols-3 gap-4">
                {/* Documento 1 */}
                <div
                  className="relative rounded-[20px] bg-[#1A1A1A] p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDocumentoDrop(e, setDocumento1)}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: '#CCF725' }}
                  >
                    <CloudUpload 
                      className="w-6 h-6" 
                      style={{ color: '#1A1A1A' }} 
                    />
                  </div>
                  
                  <p className="text-xs text-center" style={{ color: '#CCF725' }}>
                    Arraste e solte o arquivo aqui
                  </p>

                  <input 
                    type="file" 
                    id="documento1-upload" 
                    className="hidden" 
                    onChange={(e) => handleDocumentoChange(e, setDocumento1)}
                  />
                  <label htmlFor="documento1-upload">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="cursor-pointer border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725] hover:text-[#1A1A1A] bg-transparent text-xs" 
                      asChild
                    >
                      <span>Procurar arquivo</span>
                    </Button>
                  </label>
                  
                  {documento1 && (
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-[#CCF725]">{documento1.name}</p>
                      <button
                        type="button"
                        onClick={() => setDocumento1(null)}
                        className="w-5 h-5 rounded-full flex items-center justify-center hover:brightness-90 transition-all"
                        style={{ backgroundColor: '#CCF725' }}
                      >
                        <X className="w-3 h-3" style={{ color: '#1A1A1A' }} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Documento 2 */}
                <div
                  className="relative rounded-[20px] bg-[#1A1A1A] p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDocumentoDrop(e, setDocumento2)}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: '#CCF725' }}
                  >
                    <CloudUpload 
                      className="w-6 h-6" 
                      style={{ color: '#1A1A1A' }} 
                    />
                  </div>
                  
                  <p className="text-xs text-center" style={{ color: '#CCF725' }}>
                    Arraste e solte o arquivo aqui
                  </p>

                  <input 
                    type="file" 
                    id="documento2-upload" 
                    className="hidden" 
                    onChange={(e) => handleDocumentoChange(e, setDocumento2)}
                  />
                  <label htmlFor="documento2-upload">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="cursor-pointer border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725] hover:text-[#1A1A1A] bg-transparent text-xs" 
                      asChild
                    >
                      <span>Procurar arquivo</span>
                    </Button>
                  </label>
                  
                  {documento2 && (
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-[#CCF725]">{documento2.name}</p>
                      <button
                        type="button"
                        onClick={() => setDocumento2(null)}
                        className="w-5 h-5 rounded-full flex items-center justify-center hover:brightness-90 transition-all"
                        style={{ backgroundColor: '#CCF725' }}
                      >
                        <X className="w-3 h-3" style={{ color: '#1A1A1A' }} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Documento 3 */}
                <div
                  className="relative rounded-[20px] bg-[#1A1A1A] p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDocumentoDrop(e, setDocumento3)}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: '#CCF725' }}
                  >
                    <CloudUpload 
                      className="w-6 h-6" 
                      style={{ color: '#1A1A1A' }} 
                    />
                  </div>
                  
                  <p className="text-xs text-center" style={{ color: '#CCF725' }}>
                    Arraste e solte o arquivo aqui
                  </p>

                  <input 
                    type="file" 
                    id="documento3-upload" 
                    className="hidden" 
                    onChange={(e) => handleDocumentoChange(e, setDocumento3)}
                  />
                  <label htmlFor="documento3-upload">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="cursor-pointer border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725] hover:text-[#1A1A1A] bg-transparent text-xs" 
                      asChild
                    >
                      <span>Procurar arquivo</span>
                    </Button>
                  </label>
                  
                  {documento3 && (
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-[#CCF725]">{documento3.name}</p>
                      <button
                        type="button"
                        onClick={() => setDocumento3(null)}
                        className="w-5 h-5 rounded-full flex items-center justify-center hover:brightness-90 transition-all"
                        style={{ backgroundColor: '#CCF725' }}
                      >
                        <X className="w-3 h-3" style={{ color: '#1A1A1A' }} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-5 flex justify-end">
            <Button 
              type="submit" 
              className="gap-2 border-0 hover:brightness-90 transition-all px-8 py-3" 
              style={{
                backgroundColor: '#CCF725',
                color: '#1A1A1A'
              }}
            >
              <Check className="w-5 h-5" />
              Salvar dados
            </Button>
          </div>
        </div>
      </main>
    </form>
    </div>;
};
export default EditarCompeticao;