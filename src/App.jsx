import { useState, useEffect } from "react";
import constants, { buildPresenceChecklist } from "../constants.js";
import * as pdfjsLib from "pdfjs-dist";
import AppHeader from "./components/AppHeader.jsx";
import UploadPanel from "./components/UploadPanel.jsx";
import LoadingState from "./components/LoadingState.jsx";
import AnalysisResults from "./components/AnalysisResults.jsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function App() {
  const [aiReady, setAiReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [, setResumeText] = useState("");
  const [presenceChecklist, setPresenceChecklist] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const extractPDFText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const texts = await Promise.all(
      Array.from({ length: pdf.numPages }, (_, i) =>
        pdf
          .getPage(i + 1)
          .then((page) =>
            page.getTextContent().then((tc) => tc.items.map((item) => item.str).join(" "))
          )
      )
    );

    return texts.join("\n");
  };

  const parseJSONResponse = (reply) => {
    try {
      const match = reply.match(/\{[\s\S]*\}/);
      const parsed = match ? JSON.parse(match[0]) : {};
      if (!parsed.overallScore && !parsed.error) {
        throw new Error("Invalid response schema");
      }
      return parsed;
    } catch (err) {
      throw new Error(`failed to parse Ai Response: ${err.message}`);
    }
  };

  const analyzeResume = async (text) => {
    const prompt = constants.ANALYZE_RESUME_PROMPT.replace("{{DOCUMENT_TEXT}}", text);

    const response = await window.puter.ai.chat(
      [
        { role: "system", content: "You are an expert resume reviewer.." },
        { role: "user", content: prompt },
      ],
      { model: "gpt-4o" }
    );

    const result = parseJSONResponse(
      typeof response === "string" ? response : response.message?.content || ""
    );
    if (result.error) throw new Error(result.error);
    return result;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      return alert("please upload a valid pdf file");
    }

    setUploadedFile(file);
    setLoading(true);
    setAnalysis(null);
    setResumeText("");
    setPresenceChecklist([]);

    try {
      const text = await extractPDFText(file);
      setResumeText(text);
      setPresenceChecklist(buildPresenceChecklist(text));
      setAnalysis(await analyzeResume(text));
    } catch (err) {
      alert(`error : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setResumeText("");
    setPresenceChecklist([]);
  };

  return (
    <div className="min-h-screen bg-main-gradient flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto mt-10">
        <AppHeader />

        {!uploadedFile && <UploadPanel aiReady={aiReady} onFileUpload={handleFileUpload} />}
        {loading && <LoadingState />}
        {analysis && uploadedFile && (
          <AnalysisResults
            analysis={analysis}
            uploadedFile={uploadedFile}
            presenceChecklist={presenceChecklist}
            onReset={reset}
          />
        )}
      </div>
    </div>
  );
}

export default App;
