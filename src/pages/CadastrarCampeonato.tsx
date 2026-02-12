import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Upload, Check, CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  modalidade: z.string().min(1, "Modalidade é obrigatória"),
  formato: z.string().min(1, "Formato é obrigatório"),
  campeonato: z.string().optional(),
  inscricaoInicio: z.date().optional(),
  inscricaoFim: z.date().optional(),
  competicaoInicio: z.date().optional(),
  competicaoFim: z.date().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CadastrarCampeonato = () => {
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [miniBannerImage, setMiniBannerImage] = useState<string | null>(null);
  const [selectedDistances, setSelectedDistances] = useState<string[]>([]);
  const [tentativasIlimitadas, setTentativasIlimitadas] = useState(true);
  const [limiteInscritos, setLimiteInscritos] = useState(false);
  const [temPremiacoes, setTemPremiacoes] = useState<string>("sim");
  const [quantidadePremiacoes, setQuantidadePremiacoes] = useState<string>("");
  const [possuiKit, setPossuiKit] = useState<string>("sim");
  const [lotes, setLotes] = useState([
    { id: 1, nome: "", valor: "", descricao: "", permitirCreditos: false }
  ]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMiniBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMiniBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const distances = [
    { value: "3km", label: "3 km" },
    { value: "5km", label: "5 km" },
    { value: "10km", label: "10 km" },
    { value: "15km", label: "15 km" },
    { value: "21km", label: "21 km (meia-maratona)" },
    { value: "42km", label: "42 km (maratona)" },
  ];

  const toggleDistance = (distance: string) => {
    setSelectedDistances(prev =>
      prev.includes(distance)
        ? prev.filter(d => d !== distance)
        : [...prev, distance]
    );
  };


  const adicionarLote = () => {
    setLotes([...lotes, { id: lotes.length + 1, nome: "", valor: "", descricao: "", permitirCreditos: false }]);
  };

  const handleSalvarRascunho = () => {
    toast({
      title: "Rascunho salvo.",
      duration: 3000,
    });
  };

  const onSubmit = (data: FormData) => {
    console.log({ ...data, distances: selectedDistances });
    toast({
      title: "Competição publicada!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/gestao-competicoes")}
            className="bg-[#171717] text-[#CCF725] hover:brightness-90 border-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Button variant="ghost" className="bg-[#171717] text-[#CCF725] hover:brightness-90 border-0" onClick={handleSalvarRascunho}>
            <Check className="h-4 w-4 mr-2" />
            Salvar rascunho
          </Button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          Competições &gt; Nova competição
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Dados básicos */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Dados básicos</h2>
            
            <div className="space-y-6">
              {/* Nome da competição */}
              <div>
                <Label htmlFor="nome" className="text-foreground">
                  Nome da competição
                </Label>
                <Input
                  id="nome"
                  {...register("nome")}
                  placeholder="Corrida Azevio 10K - Etapa São Paulo"
                  className="mt-2"
                />
                {errors.nome && (
                  <p className="text-destructive text-sm mt-1">{errors.nome.message}</p>
                )}
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="descricao" className="text-foreground">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  {...register("descricao")}
                  placeholder="Insira a descrição aqui..."
                  className="mt-2 min-h-[120px]"
                />
                {errors.descricao && (
                  <p className="text-destructive text-sm mt-1">{errors.descricao.message}</p>
                )}
              </div>

              {/* Modalidade e Formato */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modalidade" className="text-foreground">
                    Modalidade
                  </Label>
                  <Select onValueChange={(value) => setValue("modalidade", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corrida">Corrida</SelectItem>
                      <SelectItem value="caminhada">Caminhada</SelectItem>
                      <SelectItem value="ciclismo">Ciclismo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.modalidade && (
                    <p className="text-destructive text-sm mt-1">{errors.modalidade.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="formato" className="text-foreground">
                    Formato
                  </Label>
                  <Select onValueChange={(value) => setValue("formato", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.formato && (
                    <p className="text-destructive text-sm mt-1">{errors.formato.message}</p>
                  )}
                </div>
              </div>

              {/* Banners */}
              <div className="grid grid-cols-2 gap-4">
                {/* Banner da competição */}
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <Label className="text-foreground">Banner da competição</Label>
                  <div className="mt-4 bg-[#262626] border-2 border-dashed border-[#CCF725] rounded-lg p-8 text-center hover:border-[#CCF725]/80 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="banner"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      className="hidden"
                    />
                    <label htmlFor="banner" className="cursor-pointer">
                      {bannerImage ? (
                        <img src={bannerImage} alt="Banner" className="max-h-32 mx-auto" />
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-[#171717] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Upload className="h-6 w-6 text-[#CCF725]" />
                          </div>
                          <p className="text-sm text-[#CCF725] mb-3">
                            Arraste e solte o arquivo aqui
                          </p>
                          <Button type="button" variant="outline" size="sm" className="border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725]/10">
                            Procurar arquivo
                          </Button>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Mini banner */}
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <Label className="text-foreground">
                    Mini banner <span className="text-muted-foreground">(opcional)</span>
                  </Label>
                  <div className="mt-4 bg-[#262626] border-2 border-dashed border-[#CCF725] rounded-lg p-8 text-center hover:border-[#CCF725]/80 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="miniBanner"
                      accept="image/*"
                      onChange={handleMiniBannerUpload}
                      className="hidden"
                    />
                    <label htmlFor="miniBanner" className="cursor-pointer">
                      {miniBannerImage ? (
                        <img src={miniBannerImage} alt="Mini Banner" className="max-h-32 mx-auto" />
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-[#171717] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Upload className="h-6 w-6 text-[#CCF725]" />
                          </div>
                          <p className="text-sm text-[#CCF725] mb-3">
                            Arraste e solte o arquivo aqui
                          </p>
                          <Button type="button" variant="outline" size="sm" className="border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725]/10">
                            Procurar arquivo
                          </Button>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Vincular campeonato */}
              <div>
                <Label htmlFor="campeonato" className="text-foreground">
                  Vincular campeonato
                </Label>
                <Select onValueChange={(value) => setValue("campeonato", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o campeonato a ser vinculado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campeonato1">Campeonato 1</SelectItem>
                    <SelectItem value="campeonato2">Campeonato 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distâncias permitidas */}
              <div>
                <Label className="text-foreground">Distância(s) permitida(s)</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {distances.map((distance) => (
                    <Button
                      key={distance.value}
                      type="button"
                      variant={selectedDistances.includes(distance.value) ? "default" : "outline"}
                      onClick={() => toggleDistance(distance.value)}
                      className="rounded-full"
                    >
                      {distance.label}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant={selectedDistances.includes("outro") ? "default" : "outline"}
                    onClick={() => toggleDistance("outro")}
                    className="rounded-full"
                  >
                    Outro
                  </Button>
                </div>
                {selectedDistances.includes("outro") && (
                  <Input
                    placeholder="Insira outra distância"
                    className="mt-3"
                  />
                )}
                <p className="text-xs text-muted-foreground mt-2">Para outras distâncias</p>
              </div>
            </div>
          </div>

          {/* Período */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Período</h2>
            
            <div className="space-y-6">
              {/* Período de inscrições */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-foreground">Período de inscrições</Label>
                  <p className="text-sm text-red-500">Inscrições encerram às 23h59 do dia final.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !register("inscricaoInicio") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>De: DD/MM/AAAA</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !register("inscricaoFim") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Até: DD/MM/AAAA</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Período da competição */}
              <div>
                <Label className="text-foreground mb-2 block">Período da competição</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !register("competicaoInicio") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>De: DD/MM/AAAA</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !register("competicaoFim") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Até: DD/MM/AAAA</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regras */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Regras</h2>
            
            <div className="space-y-6">
              {/* Tentativas ilimitadas */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="tentativasIlimitadas"
                  checked={tentativasIlimitadas}
                  onCheckedChange={(checked) => setTentativasIlimitadas(checked as boolean)}
                />
                <Label
                  htmlFor="tentativasIlimitadas"
                  className="text-foreground font-normal cursor-pointer"
                >
                  Tentativas ilimitadas
                </Label>
              </div>

              {/* Número máximo de inscritos */}
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Checkbox
                    id="limiteInscritos"
                    checked={limiteInscritos}
                    onCheckedChange={(checked) => setLimiteInscritos(checked as boolean)}
                  />
                  <Label
                    htmlFor="limiteInscritos"
                    className="text-foreground font-normal cursor-pointer"
                  >
                    Número máximo de inscritos
                  </Label>
                </div>
                {limiteInscritos && (
                  <Input
                    type="number"
                    placeholder="Ex: 100"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Premiações */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Premiações</h2>
            
            <div className="space-y-6">
              {/* Sim/Não Radio */}
              <RadioGroup value={temPremiacoes} onValueChange={setTemPremiacoes} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="premiacoes-sim" />
                  <Label htmlFor="premiacoes-sim" className="text-foreground font-normal cursor-pointer">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="premiacoes-nao" />
                  <Label htmlFor="premiacoes-nao" className="text-foreground font-normal cursor-pointer">
                    Não
                  </Label>
                </div>
              </RadioGroup>

              {/* Opções de quantidade - só aparecem se "Sim" */}
              {temPremiacoes === "sim" && (
                <div>
                  <Label className="text-foreground mb-3 block">
                    Nº de pessoas que poderão ganhar recompensa
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant={quantidadePremiacoes === "1-5" ? "default" : "outline"}
                      onClick={() => setQuantidadePremiacoes("1-5")}
                      className="rounded-full"
                    >
                      1–5
                    </Button>
                    <Button
                      type="button"
                      variant={quantidadePremiacoes === "6-10" ? "default" : "outline"}
                      onClick={() => setQuantidadePremiacoes("6-10")}
                      className="rounded-full"
                    >
                      6–10
                    </Button>
                    <Button
                      type="button"
                      variant={quantidadePremiacoes === "11-20" ? "default" : "outline"}
                      onClick={() => setQuantidadePremiacoes("11-20")}
                      className="rounded-full"
                    >
                      11–20
                    </Button>
                    <Button
                      type="button"
                      variant={quantidadePremiacoes === "outro" ? "default" : "outline"}
                      onClick={() => setQuantidadePremiacoes("outro")}
                      className="rounded-full"
                    >
                      Outro
                    </Button>
                  </div>
                  
                  {/* Input só aparece quando "Outro" está selecionado */}
                  {quantidadePremiacoes === "outro" && (
                    <Input
                      placeholder="Insira outra quantidade"
                      className="mt-3"
                      type="number"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Inscrição e checkout */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Inscrição e checkout</h2>
            
            <div className="space-y-6">
              {/* Possuir Kit Incluso */}
              <div>
                <Label className="text-foreground mb-3 block">Possuir Kit Incluso?</Label>
                <RadioGroup value={possuiKit} onValueChange={setPossuiKit} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="kit-sim" />
                    <Label htmlFor="kit-sim" className="text-foreground font-normal cursor-pointer">
                      Sim
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="kit-nao" />
                    <Label htmlFor="kit-nao" className="text-foreground font-normal cursor-pointer">
                      Não
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Tipo de competição */}
              <div>
                <Label htmlFor="tipoCompeticao" className="text-foreground">
                  Tipo de competição
                </Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione: Gratuita ou Paga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gratuita">Gratuita</SelectItem>
                    <SelectItem value="paga">Paga</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lotes dinâmicos */}
              {lotes.map((lote, index) => (
                <div key={lote.id}>
                  {index > 0 && <div className="border-t border-border mb-6" />}
                  <div className="space-y-4">
                    {/* Nome do lote */}
                    <div>
                      <Label className="text-foreground text-sm">
                        Ex.: Lote {index + 1} - Medalha garantida
                      </Label>
                      <Input
                        placeholder={`Ex.: Lote ${index + 1} - Medalha garantida`}
                        className="mt-2"
                        value={lote.nome}
                        onChange={(e) => {
                          const novosLotes = [...lotes];
                          novosLotes[index].nome = e.target.value;
                          setLotes(novosLotes);
                        }}
                      />
                    </div>

                    {/* Valor */}
                    <div>
                      <Input
                        type="text"
                        placeholder="R$ 0,00"
                        value={lote.valor}
                        onChange={(e) => {
                          const novosLotes = [...lotes];
                          novosLotes[index].valor = e.target.value;
                          setLotes(novosLotes);
                        }}
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <Label className="text-foreground text-sm mb-2 block">Descrição</Label>
                      <Textarea
                        placeholder="Ex.: Medalha garantida a todos os inscritos"
                        className="min-h-[100px]"
                        value={lote.descricao}
                        onChange={(e) => {
                          const novosLotes = [...lotes];
                          novosLotes[index].descricao = e.target.value;
                          setLotes(novosLotes);
                        }}
                      />
                    </div>

                    {/* Permitir compra com créditos */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`creditos-${lote.id}`}
                        checked={lote.permitirCreditos}
                        onCheckedChange={(checked) => {
                          const novosLotes = [...lotes];
                          novosLotes[index].permitirCreditos = checked as boolean;
                          setLotes(novosLotes);
                        }}
                      />
                      <Label
                        htmlFor={`creditos-${lote.id}`}
                        className="text-foreground text-sm font-normal cursor-pointer"
                      >
                        Permitir compra com créditos de assinatura
                      </Label>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botão adicionar opção */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={adicionarLote}
                  className="border-[#CCF725] text-[#CCF725] hover:bg-[#CCF725]/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar opção de valor
                </Button>
              </div>
            </div>
          </div>

          {/* Botão final */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit"
              className="bg-[#CCF725] text-[#171717] hover:bg-[#CCF725]/90 font-semibold px-8"
            >
              <Check className="h-4 w-4 mr-2" />
              Salvar e publicar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastrarCampeonato;
