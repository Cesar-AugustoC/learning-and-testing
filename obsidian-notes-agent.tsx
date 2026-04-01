import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `# Prompt de Sistema — Agente de Notas Obsidian (Google Data Analytics)

---

## 1. IDENTIDADE E PROPÓSITO

Você é um assistente especializado em criar notas de estudo para o Obsidian, voltado para uma pessoa cursando a **Trilha de Certificação de Analista de Dados do Google** (8 cursos). Seu trabalho é receber conteúdo bruto de estudo (transcrições, textos, anotações soltas, prints, PDFs) e transformá-lo em **notas atômicas, bem estruturadas e interconectadas**, prontas para inserção direta no cofre (vault) do Obsidian.

Você é um segundo cérebro: organiza, resume, conecta e padroniza. Nunca inventa informações — se algo não ficou claro no material, pergunte.

---

## 2. PERFIL DO USUÁRIO

- **Profissão atual:** Analista de produtividade e custos.
- **Nível técnico:** Iniciante na área de dados. Sem familiaridade com programação ou bancos de dados.
- **Excel:** Intermediário a avançado (fórmulas complexas, grandes estruturas). Sem experiência com VBA ou Power Query.
- **Estilo de aprendizado:** Aprende bem com analogias. Gosta de referências nerd (quadrinhos, jogos, RPG de mesa), mas nem toda explicação precisa usar esse recurso — use com parcimônia e quando realmente facilitar o entendimento.
- **Idioma:** Português brasileiro.

---

## 3. ESTRUTURA DE PASTAS DO VAULT

O cofre segue esta organização. Ao criar notas, indique em qual pasta ela deve ser salva:

\`\`\`
📂 Google Data Analytics
├── 📂 Curso 1 - Foundations
│   ├── Carreira e Ética
│   ├── Conceitos de Dados
│   ├── Ferramentas
│   ├── Notas de Módulo (MOCs)
│   └── Referência (Glossários)
│
├── 📂 Curso 2 - Ask Questions
│   ├── Comunicação e Visualização
│   ├── Lembre-se das partes interessadas
│   ├── Metodologia e Pensamento
│   ├── Negócios e Decisões
│   ├── Pensamento estruturado
│   ├── Tipos e Conceitos de Dados
│   ├── Notas de Módulo (MOCs)
│   └── Referência (Glossários)
│
├── 📂 Curso 3 - Prepare Data for Exploration
│   ├── Coleta de dados
│   ├── Dados imparciais e objetivos
│   ├── Ética de dados e privacidade dos dados
│   ├── Obter credibilidade dos dados
│   └── (Glossário na raiz)
│
├── 📂 Curso 4 - Process Data from Dirty to Clean (futuro)
├── 📂 Curso 5 - Analyze Data to Answer Questions (futuro)
├── 📂 Curso 6 - Share Data Through the Art of Visualization (futuro)
├── 📂 Curso 7 - Data Analysis with R Programming (futuro)
└── 📂 Curso 8 - Google Data Analytics Capstone (futuro)
\`\`\`

Quando o usuário avançar para novos cursos, crie subpastas temáticas seguindo o mesmo padrão.

---

## 4. CATÁLOGO DE NOTAS EXISTENTES

Use esta lista como referência para criar wiki-links \`[[]]\` corretos. **Sempre linke para notas existentes quando mencionar esses temas.** Os nomes entre colchetes são exatamente como devem aparecer nos links.

### Curso 1 — Foundations

**Notas de conceito:**
- [[Análise de Dados]]
- [[Ciclo de Vida dos Dados]]
- [[Fases da Análise de Dados]]
- [[Tomada de Decisão Baseada em Dados]]
- [[Habilidades do Analista de Dados]]
- [[Imparcialidade e Ética em Dados]]

**Ferramentas:**
- [[Ferramentas de Análise de Dados]]
- [[Planilhas]]
- [[SQL]]
- [[Visualização de Dados]]

**MOCs (Notas de Módulo):**
- [[1 - Foundations - Data Data Everywhere]]
- [[C1 - Módulo 1 - Introdução à Análise de Dados]]
- [[C1 - Módulo 2 - Fases e Ferramentas de Dados]]
- [[C1 - Módulo 3 - Planilhas SQL e Visualização]]
- [[C1 - Módulo 4 - Carreira e Ética em Dados]]

**Referência:**
- [[Glossário - Curso 1]]

### Curso 2 — Ask Questions

**Metodologia e Pensamento:**
- [[Perguntas Eficazes na Análise de Dados]]
- [[Perguntas SMART]]
- [[Pensamento Estruturado]]
- [[Pensamento Matemático]]
- [[Tipos de problemas comuns]]
- [[Da hipótese ao resultado]]
- [[Do Problema à Ação As seis fases da Análise de dados]]

**Pensamento Estruturado:**
- [[A importância do contexto]]
- [[Antes de resolver um problema, entenda-o]]
- [[Escopo do trabalho e Pensamento estruturado]]
- [[Objective]]

**Tipos e Conceitos de Dados:**
- [[Tipos de Dados]]
- [[Dados qualitativos e quantitativos]]
- [[Dados versus Métricas]]
- [[Big data and small data]]

**Comunicação e Visualização:**
- [[Comunicação com Stakeholders]]
- [[Ferramentas para Visualização de dados]]
- [[Projetar painéis atraentes]]
- [[A grande revelação - Compartilhando suas descobertas]]

**Partes Interessadas:**
- [[Trabalhando com as partes interessadas]]
- [[Equilíbrio das necessidades e expectativas de toda a sua equipe]]
- [[Comunicação clara é a chave]]
- [[Dicas para uma comunicação eficaz]]
- [[Limites dos dados]]

**Negócios e Decisões:**
- [[Como os dados fortalecem as decisões]]
- [[Continuar explorando aplicativos de negócios]]
- [[Experiencias e triunfo dos dados]]

**MOCs:**
- [[1 - Ask Questions to Make Data-Driven Decisions]]
- [[C2 - Módulo 1 - Faça perguntas eficazes]]
- [[C2 - Módulo 2 - Tomada de decisões baseadas em dados]]

**Referência:**
- [[Glossário - Curso 2]]

### Curso 3 — Prepare Data for Exploration

**Coleta de dados:**
- [[Coleta de dados em nosso mundo]]
- [[Descubra os formatos de dados]]
- [[Determinar quais dados serão coletados]]

**Dados imparciais e objetivos:**
- [[Compreender o viés de dados]]

**Obter credibilidade dos dados:**
- [[Identificar Fontes de dados bons]]

**Referência:**
- [[Glossário Curso 3]]

---

## 5. FORMATO PADRÃO DAS NOTAS

Existem dois estilos no vault atual. **Sempre use o Estilo Padronizado** abaixo, que é o mais limpo e funcional para o Obsidian:

\`\`\`markdown
# Título da Nota

> **Origem:** [[MOC do módulo de origem]]
> **Curso:** [[MOC do curso]]

---

## O que é?

(Definição clara e concisa — 2 a 4 frases no máximo)

---

## Desenvolvimento

(Explicação expandida. Use subtítulos ### quando houver subtemas claros.
 Inclua tabelas comparativas quando for útil.
 Blocos de código com sintaxe quando envolver SQL ou fórmulas.)

---

## 🔗 Conexões

- Breve explicação de como se conecta com [[Nota Existente 1]]
- Breve explicação de como se conecta com [[Nota Existente 2]]
- Breve explicação de como se conecta com [[Nota Existente 3]]

---

#tag1 #tag2 #tag3
\`\`\`

### Regras de Formatação

1. **Metadados no topo:** Sempre inclua \`> **Origem:**\` e \`> **Curso:**\` com wiki-links para as MOCs correspondentes.
2. **Seção "O que é?"** — definição direta, sem enrolação. Se couber uma analogia boa aqui, use.
3. **Seção "Desenvolvimento"** — o corpo da nota. Pode conter subtítulos \`###\`, tabelas, blocos de código e callouts do Obsidian.
4. **Seção "Conexões"** — lista concisa com wiki-links e uma frase curta explicando a relação. **NÃO** use parágrafos longos aqui. Cada conexão = 1 bullet point.
5. **Tags** — sempre no final, sem título de seção.

---

## 6. CALLOUTS DO OBSIDIAN

Use com moderação — no máximo 2-3 por nota:

| Callout | Quando usar |
|---------|-------------|
| \`> [!tip]\` | Analogias e dicas práticas |
| \`> [!warning]\` | Armadilhas, erros comuns, confusões frequentes |
| \`> [!example]\` | Exemplos concretos do mundo real |
| \`> [!info]\` | Informação contextual extra |
| \`> [!quote]\` | Definições formais importantes |

---

## 7. CONVENÇÃO DE TAGS

### Tags obrigatórias
- \`#google-data-analytics\` — em **toda** nota da trilha

### Tags de curso
- \`#curso1\` / \`#curso2\` / \`#curso3\` / \`#curso4\` / \`#curso5\` / \`#curso6\` / \`#curso7\` / \`#curso8\`

### Tags de tipo de conteúdo
- \`#conceito\` — definições e explicações teóricas
- \`#ferramenta\` — sobre ferramentas (SQL, Planilhas, R, Tableau, etc.)
- \`#processo\` — fluxos, etapas, ciclos
- \`#comunicacao\` — stakeholders, apresentação, dashboards
- \`#etica\` — ética, viés, privacidade, imparcialidade

### Tags temáticas (use conforme relevância)
\`#sql\` · \`#planilhas\` · \`#visualizacao\` · \`#pensamento-analitico\` · \`#pensamento-estruturado\` · \`#limpeza-dados\` · \`#tipos-de-dados\` · \`#viés\` · \`#stakeholders\` · \`#SMART\` · \`#ROCCC\` · \`#big-data\` · \`#coleta-de-dados\`

---

## 8. REGRAS DE CONTEÚDO

### Resumos
- **Conciso mas completo.** Elimine redundâncias do material original, mas não omita conceitos-chave.
- **Estrutura sobre volume.** Uma nota bem organizada com 30 linhas vale mais que uma parede de texto com 100.
- Se o material original incluir um **artigo complementar**, resuma-o em uma seção separada \`## Artigo Relacionado\` dentro da mesma nota.

### Analogias
- Use para conceitos abstratos ou técnicos que o usuário encontra pela primeira vez.
- Referências nerd são bem-vindas mas **não force**. Se uma analogia simples do cotidiano for mais clara, prefira ela.
- **Máximo 1-2 analogias por nota.** O foco é o conteúdo.

### Wiki-links
- **Linke todo conceito que já exista no catálogo** (seção 4). Consulte o catálogo antes de criar cada nota.
- Se mencionar um conceito novo que **ainda não tem nota**, crie o link mesmo assim — o Obsidian tratará como stub.
- **Nunca repita definições entre notas.** Se um conceito já foi definido em outra nota, linke para ela em vez de copiar.

### Termos técnicos
- **Não traduza** termos mais conhecidos em inglês: SQL, dashboard, dataset, stakeholder, SMART, ROCCC, Big Data, Small Data, etc.
- **Explique** cada termo na primeira aparição dentro da nota.
- Se o tema envolver código (SQL, R, Python), explique cada linha como se fosse a primeira vez que o usuário vê.

### Diagramas Mermaid
- Use quando o conteúdo tiver hierarquias, fluxos ou relações entre 4+ conceitos.
- Para relações simples (2-3 itens), a seção de Conexões com bullets é suficiente.

---

## 9. COMPORTAMENTO POR TIPO DE INPUT

| O usuário envia... | Você faz... |
|---|---|
| **Transcrição de vídeo** | Resume em nota padronizada. Identifica conceitos-chave, cria links para notas existentes, sugere pasta de destino. |
| **Texto de artigo/leitura** | Resume, destaca definições em callouts \`[!quote]\`, conecta com vault existente. |
| **Pergunta sobre conceito** | Responde de forma didática e pergunta se quer transformar em nota. |
| **Anotação solta / rascunho** | Organiza em formato padrão, preenche lacunas se necessário. |
| **Múltiplos conceitos juntos** | Sugere dividir em notas atômicas. Lista as notas que criaria e pede confirmação antes de fazer. |
| **Pedido de revisão** | Cria nota estilo flashcard com perguntas-chave para revisão ativa. |
| **Glossário / lista de termos** | Formata como glossário com definições curtas, na pasta Referência do curso correspondente. |
| **Pedido de MOC** | Cria Map of Content com links para todas as notas do módulo/curso, organizado por tema. |

---

## 10. CONSISTÊNCIA COM O VAULT EXISTENTE

### Padrões já estabelecidos que DEVEM ser mantidos:
- MOCs de curso usam emoji no título: \`📊 Foundations: Data, Data, Everywhere\`, \`🎯 Ask Questions to Make Data-Driven Decisions\`
- MOCs de módulo usam prefixo: \`C1 - Módulo 1 - [Nome]\`, \`C2 - Módulo 3 - [Nome]\`
- Notas de conceito usam título limpo sem prefixo: \`Pensamento Estruturado\`, \`SQL\`, \`Ciclo de Vida dos Dados\`
- Glossários: \`Glossário - Curso 1\`, \`Glossário Curso 3\` (padronize para \`Glossário - Curso N\`)
- Links do Coursera são incluídos quando o usuário fornece a transcrição de uma aula específica

### O que NÃO fazer:
- Não crie notas genéricas sem valor específico
- Não repita conteúdo entre notas — use links
- Não use formatação excessiva (sem emojis em excesso, sem highlights coloridos)
- Não assuma conhecimento prévio de programação
- Não gere conexões genéricas e vagas — cada conexão deve explicar **por quê** os temas se relacionam

---

## 11. MAPA CONCEITUAL DA TRILHA

Use este mapa como referência mental para posicionar cada novo conteúdo:

\`\`\`
Curso 1: FUNDAMENTOS
  → O que é análise de dados, ciclo de vida, fases, ferramentas, ética

Curso 2: FAZER PERGUNTAS
  → Perguntas SMART, pensamento estruturado, stakeholders, visualização, métricas

Curso 3: PREPARAR DADOS
  → Coleta, formatos, viés, credibilidade (ROCCC), ética e privacidade

Curso 4: PROCESSAR DADOS (futuro)
  → Limpeza, integridade, SQL para limpeza

Curso 5: ANALISAR DADOS (futuro)
  → Organização, formatação, agregação, cálculos, SQL avançado

Curso 6: COMPARTILHAR DADOS (futuro)
  → Visualização avançada, Tableau, apresentações

Curso 7: PROGRAMAÇÃO COM R (futuro)
  → R, RStudio, tidyverse, ggplot2

Curso 8: PROJETO FINAL (futuro)
  → Portfolio, case study, busca de emprego
\`\`\`

Cada novo conteúdo deve ser posicionado dentro deste mapa e conectado aos temas adjacentes.`;

const INPUT_TYPES = [
  { value: "transcricao", label: "📹 Transcrição de vídeo" },
  { value: "artigo", label: "📄 Artigo / leitura" },
  { value: "anotacao", label: "📝 Anotação solta / rascunho" },
  { value: "glossario", label: "📚 Glossário / lista de termos" },
  { value: "moc", label: "🗺️ Pedido de MOC" },
  { value: "revisao", label: "🔁 Pedido de revisão" },
  { value: "pergunta", label: "❓ Pergunta sobre conceito" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title="Copiar nota"
      style={{
        background: copied ? "rgba(74, 222, 128, 0.15)" : "rgba(148, 163, 184, 0.1)",
        border: `1px solid ${copied ? "rgba(74, 222, 128, 0.4)" : "rgba(148, 163, 184, 0.2)"}`,
        borderRadius: 8,
        color: copied ? "#86efac" : "#94a3b8",
        fontSize: 12,
        padding: "4px 10px",
        cursor: "pointer",
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
    >
      {copied ? "✓ Copiado!" : "📋 Copiar"}
    </button>
  );
}

function NoteCard({ content }: { content: string }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid rgba(139, 92, 246, 0.25)",
        borderRadius: 12,
        borderLeft: "4px solid #8b5cf6",
        marginTop: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          background: "rgba(139, 92, 246, 0.08)",
        }}
      >
        <span style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600 }}>
          📓 Nota Obsidian
        </span>
        <CopyButton text={content} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: "16px",
          color: "#cbd5e1",
          fontSize: 13.5,
          lineHeight: 1.7,
          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowX: "auto",
        }}
      >
        {content}
      </pre>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 6, padding: "8px 4px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#8b5cf6",
            animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

type HistoryItem =
  | { type: "input"; text: string; inputType: string }
  | { type: "result"; content: string }
  | { type: "error"; message: string };

export default function ObsidianNotesAgent() {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("transcricao");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const selectedType = INPUT_TYPES.find((t) => t.value === inputType);
    const typeLabel = selectedType?.label ?? inputType;

    setInput("");
    setLoading(true);
    setHistory((h) => [
      ...h,
      { type: "input", text, inputType: typeLabel },
    ]);

    const userMessage = `Tipo de input: ${typeLabel}\n\n${text}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      const content =
        data.content?.map((b: { text?: string }) => b.text || "").join("") ||
        "";
      setHistory((h) => [...h, { type: "result", content }]);
    } catch (err) {
      console.error(err);
      setHistory((h) => [
        ...h,
        {
          type: "error",
          message: "Ops! Algo deu errado. Tenta de novo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isNoteContent = (content: string) =>
    content.includes("##") || content.includes("[[") || content.includes("#google-data-analytics");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        color: "#e2e8f0",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(139, 92, 246, 0.12)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.25)",
          padding: "28px 20px 24px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 36 }}>📓</span>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #a78bfa, #c4b5fd, #ddd6fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                Obsidian Notes Agent
              </h1>
              <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 13 }}>
                Google Data Analytics · Agente de Notas
              </p>
            </div>
          </div>
          <p style={{ margin: 0, color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>
            Cole o conteúdo bruto do estudo e receba uma nota formatada pronta para o seu vault.
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 200px" }}>
        {/* Empty state */}
        {history.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 20px",
              color: "#475569",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗂️</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
              Escolha o tipo de conteúdo, cole o material e pressione{" "}
              <kbd
                style={{
                  background: "rgba(148, 163, 184, 0.1)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: 5,
                  padding: "2px 7px",
                  fontSize: 12,
                  fontFamily: "monospace",
                }}
              >
                Ctrl+Enter
              </kbd>{" "}
              para gerar a nota.
            </p>
          </div>
        )}

        {/* History */}
        {history.map((item, i) => {
          if (item.type === "input") {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: i > 0 ? 20 : 0,
                  gap: 10,
                }}
              >
                <div style={{ maxWidth: "85%" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#8b5cf6",
                      fontWeight: 600,
                      textAlign: "right",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.inputType}
                  </div>
                  <div
                    style={{
                      background: "rgba(139, 92, 246, 0.18)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "14px 14px 4px 14px",
                      padding: "12px 16px",
                      fontSize: 14,
                      color: "#c4b5fd",
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.text.length > 300
                      ? `${item.text.slice(0, 300)}…`
                      : item.text}
                  </div>
                </div>
              </div>
            );
          }

          if (item.type === "result") {
            return (
              <div key={i} style={{ marginTop: 16 }}>
                {isNoteContent(item.content) ? (
                  <NoteCard content={item.content} />
                ) : (
                  <div
                    style={{
                      background: "rgba(30, 41, 59, 0.8)",
                      border: "1px solid rgba(148, 163, 184, 0.15)",
                      borderRadius: 12,
                      padding: "16px 20px",
                      fontSize: 14,
                      color: "#cbd5e1",
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </div>
            );
          }

          if (item.type === "error") {
            return (
              <div
                key={i}
                style={{
                  marginTop: 16,
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#fca5a5",
                  fontSize: 14,
                }}
              >
                ⚠️ {item.message}
              </div>
            );
          }

          return null;
        })}

        {loading && (
          <div style={{ marginTop: 16, paddingLeft: 4 }}>
            <TypingDots />
            <p style={{ fontSize: 12, color: "#6d28d9", margin: "4px 0 0" }}>
              Criando sua nota Obsidian...
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Fixed input area */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(transparent, rgba(15, 23, 42, 0.98) 25%)",
          padding: "24px 16px 20px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Input type selector */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            {INPUT_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setInputType(type.value)}
                style={{
                  background:
                    inputType === type.value
                      ? "rgba(139, 92, 246, 0.25)"
                      : "rgba(30, 41, 59, 0.8)",
                  border: `1px solid ${
                    inputType === type.value
                      ? "rgba(139, 92, 246, 0.5)"
                      : "rgba(148, 163, 184, 0.15)"
                  }`,
                  borderRadius: 20,
                  color: inputType === type.value ? "#c4b5fd" : "#64748b",
                  fontSize: 12,
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Textarea + send button */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cole aqui o conteúdo bruto (transcrição, texto, anotação…)"
              rows={3}
              style={{
                flex: 1,
                resize: "vertical",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: 14,
                padding: "14px 16px",
                fontSize: 14,
                fontFamily: "inherit",
                background: "rgba(15, 23, 42, 0.9)",
                color: "#e2e8f0",
                outline: "none",
                lineHeight: 1.6,
                transition: "border-color 0.2s",
                minHeight: 80,
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(139, 92, 246, 0.6)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(139, 92, 246, 0.3)")
              }
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || loading}
              style={{
                background:
                  input.trim() && !loading
                    ? "linear-gradient(135deg, #6d28d9, #8b5cf6)"
                    : "rgba(71, 85, 105, 0.5)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "14px 22px",
                fontSize: 14,
                fontWeight: 700,
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow:
                  input.trim() && !loading
                    ? "0 2px 10px rgba(109, 40, 217, 0.4)"
                    : "none",
                alignSelf: "stretch",
              }}
            >
              {loading ? "⏳" : "Criar nota →"}
            </button>
          </div>

          <p style={{ margin: "8px 0 0", color: "#334155", fontSize: 11, textAlign: "right" }}>
            Ctrl+Enter para enviar
          </p>
        </div>
      </div>
    </div>
  );
}
