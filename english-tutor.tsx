import { useState, useRef } from "react";

const SYSTEM_PROMPT = `You are an English tutor for a Brazilian Portuguese speaker who is learning English. 
When the user provides text in English, you must respond ONLY in valid JSON (no markdown, no backticks, no preamble) with this exact structure:

{
  "translation": "Tradução para português brasileiro",
  "explanation": "Explicação em português do significado, contexto e uso da frase/expressão",
  "corrections": [
    {
      "original": "trecho com erro",
      "corrected": "versão corrigida",
      "reason": "explicação em português do erro"
    }
  ],
  "tips": ["dica 1 em português", "dica 2 em português"],
  "level": "beginner|intermediate|advanced"
}

Rules:
- If there are NO errors, return an empty array for "corrections" and praise the user in "tips"
- Always explain grammar rules simply in Brazilian Portuguese
- Use analogies or examples to make explanations clearer
- The "level" field should estimate the complexity of the English used
- Keep explanations friendly and encouraging
- If the text has slang or idioms, explain their cultural context
- Provide 2-4 useful tips always`;

export default function EnglishTutor() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const textRef = useRef(null);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: input.trim() }],
        }),
      });

      const data = await res.json();
      const text = data.content?.map((i) => i.text || "").join("\n") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setHistory((prev) => [{ input: input.trim(), result: parsed, time: new Date() }, ...prev].slice(0, 20));
    } catch (err) {
      setError("Ops! Algo deu errado na análise. Tenta de novo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      analyze();
    }
  };

  const levelInfo = {
    beginner: { label: "Iniciante", color: "#4ade80", icon: "🌱" },
    intermediate: { label: "Intermediário", color: "#facc15", icon: "📚" },
    advanced: { label: "Avançado", color: "#f87171", icon: "🎓" },
  };

  const loadExample = (text) => {
    setInput(text);
    textRef.current?.focus();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      color: "#e2e8f0",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      padding: "24px 16px",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🇺🇸 → 🇧🇷</div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}>English Tutor</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 6 }}>
            Digite em inglês e receba tradução, explicações e correções
          </p>
        </div>

        {/* Input Area */}
        <div style={{
          background: "rgba(30, 41, 59, 0.8)",
          borderRadius: 16,
          border: "1px solid rgba(148, 163, 184, 0.15)",
          padding: 20,
          marginBottom: 24,
          backdropFilter: "blur(10px)",
        }}>
          <textarea
            ref={textRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your English text here..."
            style={{
              width: "100%",
              minHeight: 100,
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: 12,
              color: "#f1f5f9",
              fontSize: 16,
              padding: 16,
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <span style={{ color: "#64748b", fontSize: 12 }}>Ctrl + Enter para analisar</span>
            <button
              onClick={analyze}
              disabled={loading || !input.trim()}
              style={{
                background: loading ? "#475569" : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: !input.trim() ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              {loading ? "⏳ Analisando..." : "🔍 Analisar"}
            </button>
          </div>

          {/* Examples */}
          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "#64748b", fontSize: 12, lineHeight: "28px" }}>Exemplos:</span>
            {[
              "I goed to the store yesterday",
              "She don't like pizza",
              "It's raining cats and dogs",
            ].map((ex) => (
              <button
                key={ex}
                onClick={() => loadExample(ex)}
                style={{
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: 8,
                  color: "#a5b4fc",
                  fontSize: 12,
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            color: "#fca5a5",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{
              width: 48, height: 48, border: "3px solid #334155",
              borderTopColor: "#818cf8", borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }} />
            <p style={{ color: "#94a3b8" }}>Analisando seu texto...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Level Badge */}
            {result.level && levelInfo[result.level] && (
              <div style={{ textAlign: "center" }}>
                <span style={{
                  background: `${levelInfo[result.level].color}20`,
                  border: `1px solid ${levelInfo[result.level].color}50`,
                  color: levelInfo[result.level].color,
                  borderRadius: 20,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  {levelInfo[result.level].icon} Nível: {levelInfo[result.level].label}
                </span>
              </div>
            )}

            {/* Translation */}
            <div style={{
              background: "rgba(30, 41, 59, 0.8)",
              borderRadius: 16,
              border: "1px solid rgba(96, 165, 250, 0.2)",
              padding: 20,
              borderLeft: "4px solid #60a5fa",
            }}>
              <h3 style={{ margin: "0 0 10px", color: "#60a5fa", fontSize: 15, fontWeight: 700 }}>
                🌐 Tradução
              </h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#e2e8f0" }}>
                {result.translation}
              </p>
            </div>

            {/* Explanation */}
            <div style={{
              background: "rgba(30, 41, 59, 0.8)",
              borderRadius: 16,
              border: "1px solid rgba(167, 139, 250, 0.2)",
              padding: 20,
              borderLeft: "4px solid #a78bfa",
            }}>
              <h3 style={{ margin: "0 0 10px", color: "#a78bfa", fontSize: 15, fontWeight: 700 }}>
                💡 Explicação
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#cbd5e1" }}>
                {result.explanation}
              </p>
            </div>

            {/* Corrections */}
            {result.corrections?.length > 0 && (
              <div style={{
                background: "rgba(30, 41, 59, 0.8)",
                borderRadius: 16,
                border: "1px solid rgba(248, 113, 113, 0.2)",
                padding: 20,
                borderLeft: "4px solid #f87171",
              }}>
                <h3 style={{ margin: "0 0 14px", color: "#f87171", fontSize: 15, fontWeight: 700 }}>
                  ✏️ Correções
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {result.corrections.map((c, i) => (
                    <div key={i} style={{
                      background: "rgba(15, 23, 42, 0.5)",
                      borderRadius: 10,
                      padding: 14,
                    }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                        <span style={{
                          background: "rgba(248, 113, 113, 0.15)",
                          color: "#fca5a5",
                          padding: "3px 10px",
                          borderRadius: 6,
                          fontSize: 14,
                          textDecoration: "line-through",
                        }}>
                          {c.original}
                        </span>
                        <span style={{ color: "#64748b" }}>→</span>
                        <span style={{
                          background: "rgba(74, 222, 128, 0.15)",
                          color: "#86efac",
                          padding: "3px 10px",
                          borderRadius: 6,
                          fontSize: 14,
                          fontWeight: 600,
                        }}>
                          {c.corrected}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>
                        {c.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No errors */}
            {result.corrections?.length === 0 && (
              <div style={{
                background: "rgba(30, 41, 59, 0.8)",
                borderRadius: 16,
                border: "1px solid rgba(74, 222, 128, 0.2)",
                padding: 20,
                borderLeft: "4px solid #4ade80",
                textAlign: "center",
              }}>
                <span style={{ fontSize: 32 }}>🎉</span>
                <p style={{ margin: "8px 0 0", color: "#86efac", fontWeight: 600 }}>
                  Nenhum erro encontrado! Mandou bem!
                </p>
              </div>
            )}

            {/* Tips */}
            {result.tips?.length > 0 && (
              <div style={{
                background: "rgba(30, 41, 59, 0.8)",
                borderRadius: 16,
                border: "1px solid rgba(250, 204, 21, 0.2)",
                padding: 20,
                borderLeft: "4px solid #facc15",
              }}>
                <h3 style={{ margin: "0 0 12px", color: "#facc15", fontSize: 15, fontWeight: 700 }}>
                  🚀 Dicas
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {result.tips.map((tip, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}>
                      <span style={{
                        background: "rgba(250, 204, 21, 0.2)",
                        color: "#fde047",
                        borderRadius: 6,
                        minWidth: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </span>
                      <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ color: "#64748b", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              📋 Histórico recente
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {history.slice(1, 6).map((h, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(h.input); setResult(h.result); }}
                  style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#94a3b8",
                    fontSize: 13,
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#cbd5e1" }}>"{h.input.slice(0, 50)}{h.input.length > 50 ? "..." : ""}"</span>
                  {h.result.level && levelInfo[h.result.level] && (
                    <span style={{ fontSize: 11, color: levelInfo[h.result.level].color }}>
                      {levelInfo[h.result.level].icon} {levelInfo[h.result.level].label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
