import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a friendly and encouraging English tutor for a Brazilian Portuguese speaker who is learning English. 

When the user sends you a sentence or phrase in English, you must respond in EXACTLY this JSON format (no markdown, no backticks, just raw JSON):

{
  "original": "the user's original text",
  "hasErrors": true/false,
  "corrected": "the corrected version (same as original if no errors)",
  "translation": "tradução em português brasileiro",
  "explanation": "explicação em português do significado, contexto e uso da frase/expressão",
  "errors": [
    {
      "wrong": "the wrong part",
      "right": "the correct form",
      "tip": "dica em português explicando o erro e como evitar"
    }
  ],
  "levelTag": "Beginner/Intermediate/Advanced",
  "funFact": "um fato curioso opcional sobre a expressão, gíria ou gramática em português (pode ser vazio)"
}

Rules:
- Always explain in Brazilian Portuguese (informal, friendly tone)
- Be encouraging, never condescending
- If the sentence is perfect, congratulate the user and still explain meaning
- Detect grammar, spelling, punctuation, and word choice errors
- Give practical, memorable tips
- The "funFact" should be interesting trivia about the expression or grammar point when relevant
- If the input is in Portuguese, gently remind the user to write in English and provide the English translation
- RESPOND ONLY WITH THE JSON OBJECT, nothing else`;

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 6, padding: "8px 0", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#8B6F47",
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

function ErrorCard({ error, index }) {
  return (
    <div style={{
      background: "#FFF5F5", border: "1px solid #FEB2B2", borderRadius: 10,
      padding: "12px 16px", marginTop: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#C53030" }}>#{index + 1}</span>
        <span style={{
          textDecoration: "line-through", color: "#C53030",
          fontFamily: "'Lora', serif", fontSize: 15,
        }}>{error.wrong}</span>
        <span style={{ color: "#999", fontSize: 13 }}>→</span>
        <span style={{
          color: "#276749", fontWeight: 600,
          fontFamily: "'Lora', serif", fontSize: 15,
        }}>{error.right}</span>
      </div>
      <p style={{
        margin: 0, fontSize: 13.5, color: "#555", lineHeight: 1.5,
        fontFamily: "'DM Sans', sans-serif",
      }}>💡 {error.tip}</p>
    </div>
  );
}

function ResultCard({ data }) {
  const isPerfect = !data.hasErrors;

  return (
    <div style={{
      background: "#FFFDF7", border: "1px solid #E8DCC8",
      borderRadius: 14, padding: "24px 28px", marginTop: 16,
      boxShadow: "0 2px 12px rgba(139,111,71,0.08)",
      animation: "fadeUp 0.4s ease-out",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Status Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
          letterSpacing: "0.5px", textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          background: isPerfect ? "#C6F6D5" : "#FEEBC8",
          color: isPerfect ? "#276749" : "#975A16",
        }}>
          {isPerfect ? "✨ Perfeito!" : "📝 Quase lá!"}
        </span>
        <span style={{
          padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
          background: "#EBE5D9", color: "#8B6F47",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {data.levelTag}
        </span>
      </div>

      {/* Original + Corrected */}
      {data.hasErrors && (
        <div style={{
          background: "#F0FFF4", border: "1px solid #C6F6D5", borderRadius: 10,
          padding: "14px 18px", marginBottom: 16,
        }}>
          <p style={{
            margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.8px",
            color: "#276749", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
          }}>Versão corrigida</p>
          <p style={{
            margin: "6px 0 0", fontSize: 17, color: "#276749",
            fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1.5,
          }}>"{data.corrected}"</p>
        </div>
      )}

      {/* Translation */}
      <div style={{ marginBottom: 16 }}>
        <p style={{
          margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.8px",
          color: "#8B6F47", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        }}>Tradução</p>
        <p style={{
          margin: "6px 0 0", fontSize: 16, color: "#2D2006",
          fontFamily: "'Lora', serif", lineHeight: 1.6,
        }}>{data.translation}</p>
      </div>

      {/* Explanation */}
      <div style={{ marginBottom: 16 }}>
        <p style={{
          margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.8px",
          color: "#8B6F47", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        }}>Explicação</p>
        <p style={{
          margin: "6px 0 0", fontSize: 14.5, color: "#4A3F2F",
          fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7,
        }}>{data.explanation}</p>
      </div>

      {/* Errors */}
      {data.errors && data.errors.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{
            margin: "0 0 4px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.8px",
            color: "#C53030", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
          }}>Erros encontrados ({data.errors.length})</p>
          {data.errors.map((err, i) => <ErrorCard key={i} error={err} index={i} />)}
        </div>
      )}

      {/* Fun Fact */}
      {data.funFact && (
        <div style={{
          background: "#F7F0E6", borderRadius: 10, padding: "12px 16px",
          borderLeft: "3px solid #D4A44C",
        }}>
          <p style={{
            margin: 0, fontSize: 13.5, color: "#6B5A3E", lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif",
          }}>🧠 <strong>Curiosidade:</strong> {data.funFact}</p>
        </div>
      )}
    </div>
  );
}

export default function EnglishTutor() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setLoading(true);
    setHistory((h) => [...h, { type: "input", text }]);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: text }],
        }),
      });

      const data = await response.json();
      const raw = data.content?.map((b) => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setHistory((h) => [...h, { type: "result", data: parsed }]);
    } catch (err) {
      console.error(err);
      setError("Ops, algo deu errado na análise. Tenta de novo!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const examples = [
    "I goed to the store yesterday",
    "She don't like coffee",
    "Break a leg!",
    "It's raining cats and dogs",
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#FAF6EF",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #3E2C1A 0%, #5C3D1E 50%, #7A5430 100%)",
        padding: "32px 28px 28px", color: "#FFF",
        borderBottom: "3px solid #D4A44C",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>📖</span>
            <h1 style={{
              margin: 0, fontSize: 28, fontWeight: 700,
              fontFamily: "'Lora', serif", letterSpacing: "-0.5px",
            }}>English Lens</h1>
          </div>
          <p style={{
            margin: 0, fontSize: 14, color: "#D4BFA0", lineHeight: 1.5,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Escreva algo em inglês e receba tradução, explicação e correções detalhadas.
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 140px" }}>

        {/* Examples (only show if no history) */}
        {history.length === 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{
              fontSize: 12, textTransform: "uppercase", letterSpacing: "1px",
              color: "#8B6F47", fontWeight: 600, marginBottom: 10,
            }}>Tente um desses exemplos:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(ex); textareaRef.current?.focus(); }}
                  style={{
                    background: "#FFF", border: "1px solid #E8DCC8", borderRadius: 20,
                    padding: "8px 16px", fontSize: 13, color: "#5C3D1E",
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#F7F0E6";
                    e.target.style.borderColor = "#D4A44C";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#FFF";
                    e.target.style.borderColor = "#E8DCC8";
                  }}
                >
                  "{ex}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {history.map((item, i) => (
          <div key={i}>
            {item.type === "input" && (
              <div style={{
                display: "flex", justifyContent: "flex-end", marginTop: i > 0 ? 20 : 0,
              }}>
                <div style={{
                  background: "#5C3D1E", color: "#FFF", borderRadius: "14px 14px 4px 14px",
                  padding: "12px 18px", maxWidth: "85%", fontSize: 15,
                  fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1.5,
                }}>
                  "{item.text}"
                </div>
              </div>
            )}
            {item.type === "result" && <ResultCard data={item.data} />}
          </div>
        ))}

        {loading && (
          <div style={{ marginTop: 16, paddingLeft: 4 }}>
            <TypingDots />
            <p style={{ fontSize: 12, color: "#8B6F47", margin: "4px 0 0" }}>
              Analisando seu texto...
            </p>
          </div>
        )}

        {error && (
          <div style={{
            marginTop: 16, background: "#FFF5F5", border: "1px solid #FEB2B2",
            borderRadius: 10, padding: "12px 16px", color: "#C53030", fontSize: 14,
          }}>
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area - Fixed Bottom */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, #FAF6EF 20%)",
        padding: "24px 16px 20px",
      }}>
        <div style={{
          maxWidth: 640, margin: "0 auto",
          display: "flex", gap: 10, alignItems: "flex-end",
        }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type something in English..."
            rows={1}
            style={{
              flex: 1, resize: "none", border: "2px solid #E8DCC8",
              borderRadius: 14, padding: "14px 18px", fontSize: 15,
              fontFamily: "'Lora', serif", background: "#FFF",
              color: "#2D2006", outline: "none",
              transition: "border-color 0.2s",
              lineHeight: 1.5,
            }}
            onFocus={(e) => e.target.style.borderColor = "#D4A44C"}
            onBlur={(e) => e.target.style.borderColor = "#E8DCC8"}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || loading}
            style={{
              background: input.trim() && !loading
                ? "linear-gradient(135deg, #5C3D1E, #7A5430)"
                : "#CCC",
              color: "#FFF", border: "none", borderRadius: 14,
              padding: "14px 22px", fontSize: 15, fontWeight: 600,
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s", whiteSpace: "nowrap",
              boxShadow: input.trim() && !loading
                ? "0 2px 8px rgba(92,61,30,0.3)" : "none",
            }}
          >
            {loading ? "..." : "Analisar →"}
          </button>
        </div>
      </div>
    </div>
  );
}
