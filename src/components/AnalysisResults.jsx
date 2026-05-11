import { METRIC_CONFIG } from "../../constants.js";

const DEFAULT_ACTION_ITEMS = [
  "Optimize keyword placement for better ATS scoring",
  "Enhance content with quantifiable achievments",
  "Consider tailoring content for specific industries",
  "Strengthen summary with impactful opening statement",
  "Highlight soft skills with concrete examples",
];

const DEFAULT_PRO_TIPS = [
  "Use strong action verbs to start bullet points",
  "Quantify achievements with numbers and data whenever possible",
  "Tailor your resume for each job application by highlighting relevant keywords and skills",
  "Keep your resume concise and easy to read - aim for one page if possible",
  "Proofread carefully for any typos or grammatical errors",
];

function scoreValue(overallScore) {
  return parseInt(overallScore, 10) || 0;
}

function scoreStatusClass(score) {
  if (score >= 8) return "score-status-excellent";
  if (score >= 6) return "score-status-good";
  return "score-status-improvement";
}

function progressClass(score) {
  if (score >= 8) return "progress-excellent";
  if (score >= 6) return "progress-good";
  return "progress-improvement";
}

function scoreLabel(score) {
  if (score >= 8) return "Excellent";
  if (score >= 6) return "Good";
  return "Need Improvements";
}

function scoreEmoji(score) {
  if (score >= 8) return "🌟";
  if (score >= 6) return "✨";
  return "👎";
}

function AnalysisResults({ analysis, uploadedFile, presenceChecklist, onReset }) {
  const score = scoreValue(analysis.overallScore);

  return (
    <div className="space-y-6 p-4 sm:px-8 lg:px-12">
      <div className="file-info-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="icon-container-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
              <span className="text-3xl">📄</span>
            </div>
            <div>
              <h3 className="text-green-500 mb-1 text-xl font-bold">Analyses Complete</h3>
              <p className="text-slate-300 text-sm break-all">{uploadedFile.name}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="btn-secondary px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              🔁 New Analysis
            </button>
          </div>
        </div>
      </div>

      <div className="score-card">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="icon-container-lg">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
              Your Overall Resume Score
            </h2>
          </div>

          <div className="relative">
            <canvas id="score-chart" width="120" height="120" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-4xl">{analysis.overallScore}</span>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-gradient-to-r ${scoreStatusClass(
              score
            )} text-white font-semibold shadow-lg`}
          >
            <span className="text-lg">{scoreEmoji(score)}</span>
            <span className="font-semibold">
              {score} / 10 - {scoreLabel(score)}
            </span>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${progressClass(
              score
            )}`}
            style={{ width: `${(score / 10) * 100}%` }}
          />
        </div>

        <p className="text-center text-sm text-slate-400 mt-3 font-medium">
          Score based on content quality, formatting, and keyword usage
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="feature-card-green group">
          <div className="icon-container-lg bg-green-500/20 group-hover:bg-green-400/30 transition-colors duration-300 mx-auto mb-3">
            <span className="text-xl text-green-300">✔</span>
          </div>
          <h4 className="text-green-400 uppercase tracking-wider font-semibold text-lg sm:text-xl">
            Top Strengths
          </h4>
          <div className="space-y-2 text-left mt-4">
            {analysis.strengths.slice(0, 3).map((strength, index) => (
              <div key={index} className="list-item-green cursor-pointer">
                <span className="text-green-300 text-sm mt-0.5">●</span>
                <p className="text-sm font-medium leading-relaxed text-slate-200">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-card-orange group">
          <div className="icon-container-lg bg-orange-500/20 group-hover:bg-orange-400/30 transition-colors duration-300 mx-auto mb-3">
            <span className="text-xl text-orange-300">⚡</span>
          </div>
          <h4 className="text-orange-400 uppercase tracking-wider font-semibold text-lg sm:text-xl">
            Areas to Improve
          </h4>
          <div className="space-y-2 text-left mt-4">
            {analysis.improvements.slice(0, 3).map((improvement, index) => (
              <div key={index} className="list-item-orange cursor-pointer">
                <span className="text-orange-300 text-sm mt-0.5">●</span>
                <p className="text-sm font-medium leading-relaxed text-slate-200">{improvement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card group">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-container bg-purple-500/20">
            <span className="text-purple-300 text-lg">📋</span>
          </div>
          <h4 className="text-white font-bold text-xl">Executive Summary</h4>
        </div>
        <div className="summary-box">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{analysis.summary}</p>
        </div>
      </div>

      <div className="section-card group">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-container bg-sky-400/20">
            <span className="text-lg">📊</span>
          </div>
          <h4 className="text-white font-bold text-xl">Perfomance Metrics</h4>
        </div>
        <div className="space-y-4">
          {METRIC_CONFIG.map((cfg, index) => {
            const value = analysis.performanceMetrics?.[cfg.key] ?? cfg.defaultValue;

            return (
              <div key={index} className="group/item">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cfg.icon}</span>
                    <p className="text-slate-200 font-semibold">{cfg.label}</p>
                  </div>
                  <span className="text-slate-300 font-bold">{value}/10</span>
                </div>
                <div className="progress-bar-small">
                  <div
                    className={`h-full bg-gradient-to-r ${cfg.colorClass} rounded-full transition-all duration-1000 ease-out group-hover/item:shadow-lg ${cfg.shadowClass}`}
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-card group">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-container bg-purple-400/20">
            <span className="text-lg text-purple-300">🔍</span>
          </div>
          <h2 className="text-purple-400 font-bold text-xl">Resume Insights</h2>
        </div>
        <div className="grid gap-4">
          <div className="info-box-cyan group/item">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg text-cyan-400">🎯</span>
              <h3 className="text-cyan-300 font-semibold text-lg">Action Items</h3>
            </div>
            <div className="space-y-2">
              {(analysis.actionItems || DEFAULT_ACTION_ITEMS).map((item, index) => (
                <div key={index} className="list-item-cyan">
                  <span className="text-cyan-400 text-sm mt-0.5">●</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="info-box-emerald group/item">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg text-emerald-400">💡</span>
              <h3 className="text-emerald-300 font-semibold text-lg">Pro Tips</h3>
            </div>
            <div className="space-y-2">
              {(analysis.proTips || DEFAULT_PRO_TIPS).map((tip, index) => (
                <div key={index} className="list-item-emerald">
                  <span className="text-emerald-400 text-sm mt-0.5">●</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-card group">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-container bg-violet-500/20">
            <span className="text-lg text-violet-300">🤖</span>
          </div>
          <h2 className="text-violet-400 font-bold text-xl">ATS Optimization</h2>
        </div>
        <div className="info-box-violet mb-4">
          <div className="flex items-center gap-3 m-2">
            <div>
              <h3 className="text-violet-300 font-semibold text-lg mb-1.5">What is ATS?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                ATS stands for Applicant Tracking System, a software used by recruiters to scan
                and rank resumes based on keywords, skills, and experience.
              </p>
            </div>
          </div>
        </div>

        <div className="info-box-violet">
          <div className="flex items-center gap-3 m-2">
            <span className="text-lg text-violet-300">🤖</span>
            <h3 className="text-violet-300 font-semibold text-lg mb-1.5">
              ATS Compatibility Checklist
            </h3>
          </div>
          <div className="space-y-2">
            {(presenceChecklist || []).map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-slate-200">
                <span className={`text-lg ${item.present ? "text-emerald-400" : "text-red-400"}`}>
                  {item.present ? "✔" : "✘"}
                </span>
                <p className="text-sm font-medium leading-relaxed text-slate-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card group">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-container bg-blue-500/20">
            <span className="text-lg text-blue-300">🔑</span>
          </div>
          <h2 className="text-blue-400 font-bold text-xl">Recommended Keywords</h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {analysis.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag group/item cursor-pointer">
              {keyword}
            </span>
          ))}
        </div>
        <div className="info-box-blue">
          <p className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
            <span className="text-lg text-blue-300">💡</span>
            <span>Sprinkle keywords naturally through your resume</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
