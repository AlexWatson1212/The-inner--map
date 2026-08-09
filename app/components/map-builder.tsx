"use client";

import { useMemo, useState } from "react";

export type FocusKey = "capacity" | "starting" | "overload" | "recovery" | "connection" | "identity" | "cost";

const focusOptions: Record<FocusKey, { label: string; prompt: string }> = {
  capacity: {
    label: "Changing capacity",
    prompt: "Think of one recent moment when you could do less—or more—than you expected.",
  },
  starting: {
    label: "Starting or switching",
    prompt: "Think of one task you wanted or needed to begin but could not get into motion.",
  },
  overload: {
    label: "Overload",
    prompt: "Think of one moment when everything felt like too much, even if the reason was unclear.",
  },
  recovery: {
    label: "Rest and recovery",
    prompt: "Think of one period of downtime that did—or did not—leave you more restored.",
  },
  connection: {
    label: "Connection and communication",
    prompt: "Think of one moment when you wanted connection but the form or intensity felt costly.",
  },
  identity: {
    label: "Masking and fit",
    prompt: "Think of one choice or environment where you felt more natural, monitored or adapted.",
  },
  cost: {
    label: "Hidden cost",
    prompt: "Think of one thing you managed outwardly that required more recovery than others could see.",
  },
};

const capacityOptions = [
  ["very-low", "Very little", "I was already near my limit."],
  ["uneven", "Uneven", "Some things were possible; others were not."],
  ["steady", "Fairly steady", "I had some room to respond and adapt."],
  ["unclear", "Not sure", "I could not read my capacity clearly at the time."],
];

const conditionOptions = [
  "Poor or interrupted sleep",
  "Too little recovery",
  "Noise, light, touch or visual input",
  "Hunger, pain or physical discomfort",
  "Time pressure or consequences",
  "Unclear expectations",
  "A transition or interruption",
  "Social monitoring or masking",
  "Conflict or emotional demand",
  "Too many choices",
  "Low interest or no visible first step",
  "Useful structure or a clear cue",
  "Enough time alone",
  "Support from another person",
  "Movement, novelty or strong interest",
  "A familiar, predictable environment",
];

const impactOptions = [
  ["harder", "It increased the cost", "The moment required more effort, recovery or self-monitoring."],
  ["easier", "It reduced the cost", "Something made action, communication or recovery more available."],
  ["mixed", "It helped and cost me", "The same condition supported one need while making another harder."],
  ["unknown", "I cannot tell yet", "I have an observation, but not enough evidence for a conclusion."],
];

const experimentOptions = [
  ["reduce", "Reduce one demand", "Make the task, duration or expectation smaller for one attempt."],
  ["sequence", "Sequence two needs", "Meet one need first, then set a clear point to return to the other."],
  ["channel", "Change the channel", "Keep the intention but change the format—for example, writing instead of a call."],
  ["anchor", "Add one anchor", "Keep one part familiar, visible or predictable while the rest changes."],
  ["support", "Add specific support", "Ask for one concrete piece of help, clarification or company."],
  ["recover", "Protect recovery", "Plan lower demand or input after the activity, not only before it."],
  ["observe", "Observe once more", "Make no deliberate change yet; collect another example before deciding."],
];

const lowCapacityOptions = [
  {
    key: "demand",
    label: "Reduce one demand",
    action: "Choose one thing that can be delayed, shortened or done less completely.",
    script: "I have less capacity than expected. I cannot do the full version now; I can return to it later.",
  },
  {
    key: "input",
    label: "Reduce one input",
    action: "Lower one source of noise, light, touch, information or conversation.",
    script: "I need less input for a while. I am going to pause the conversation and come back when I can.",
  },
  {
    key: "support",
    label: "Add one support",
    action: "Ask for one concrete thing: a written answer, a reminder, company or help with the first step.",
    script: "I am overloaded and words are harder. Could you help with this one specific part: ____?",
  },
  {
    key: "decision",
    label: "Stop choosing for now",
    action: "Pause non-urgent decisions. Pick one familiar, neutral next action and let that be enough.",
    script: "I cannot make a useful decision right now. I will pause and reconsider when I have more room.",
  },
];

export function MapBuilder({
  initialMode = "standard",
  initialFocus = "capacity",
}: {
  initialMode?: "standard" | "low";
  initialFocus?: FocusKey;
}) {
  const [mode, setMode] = useState<"standard" | "low">(initialMode);
  const [step, setStep] = useState(1);
  const [focus, setFocus] = useState<FocusKey>(initialFocus);
  const [moment, setMoment] = useState("");
  const [capacity, setCapacity] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [otherCondition, setOtherCondition] = useState("");
  const [impact, setImpact] = useState("");
  const [experiment, setExperiment] = useState("");
  const [review, setReview] = useState("");
  const [copyState, setCopyState] = useState("Copy summary");

  const summary = useMemo(() => {
    const focusText = focusOptions[focus].label;
    const capacityText = capacityOptions.find(([key]) => key === capacity)?.[1] ?? "Not recorded";
    const impactText = impactOptions.find(([key]) => key === impact)?.[1] ?? "Not recorded";
    const experimentText = experimentOptions.find(([key]) => key === experiment)?.[1] ?? "Not chosen";
    const allConditions = [...conditions, ...(otherCondition.trim() ? [otherCondition.trim()] : [])];

    return [
      "MY FIRST SIGNAL MAP",
      "",
      `Area: ${focusText}`,
      `Specific moment: ${moment.trim() || "Not written down"}`,
      `Capacity at the time: ${capacityText}`,
      `Conditions present: ${allConditions.length ? allConditions.join("; ") : "Not recorded"}`,
      `Possible effect: ${impactText}`,
      `Small experiment: ${experimentText}`,
      `What I will review: ${review.trim() || "Did it change the effort, cost or recovery needed?"}`,
      "",
      "This is an observation and a working hypothesis—not a diagnosis or final explanation.",
      "Created with The Inner Map · theinnermap.co.uk",
    ].join("\n");
  }, [focus, moment, capacity, conditions, otherCondition, impact, experiment, review]);

  const toggleCondition = (condition: string) => {
    setConditions((current) =>
      current.includes(condition)
        ? current.filter((item) => item !== condition)
        : [...current, condition],
    );
  };

  const next = () => setStep((current) => Math.min(4, current + 1));
  const back = () => setStep((current) => Math.max(1, current - 1));

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy summary"), 1800);
    } catch {
      setCopyState("Select the text below to copy");
    }
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "my-first-signal-map.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  if (mode === "low") {
    return <LowCapacityTool onSwitch={() => setMode("standard")} />;
  }

  return (
    <div className="map-tool">
      <div className="map-tool__header">
        <div>
          <p className="mini-label">Five-minute version</p>
          <h2>Map one moment</h2>
        </div>
        <button className="capacity-switch" type="button" onClick={() => setMode("low")}>
          I need the shorter version
        </button>
      </div>

      <div className="tool-progress" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((number) => (
          <span key={number} className={number <= step ? "is-active" : ""}>
            <span>{number}</span>
          </span>
        ))}
      </div>

      <form onSubmit={(event) => event.preventDefault()}>
        {step === 1 && (
          <fieldset className="tool-step">
            <legend>
              <span className="step-kicker">Step 1 · Choose the area</span>
              What are you trying to understand?
            </legend>
            <p className="step-intro">Choose the closest fit. It does not need to be exact.</p>
            <div className="option-grid option-grid--focus">
              {(Object.entries(focusOptions) as [FocusKey, { label: string; prompt: string }][]).map(([key, option]) => (
                <label className={`choice-card ${focus === key ? "is-selected" : ""}`} key={key}>
                  <input type="radio" name="focus" value={key} checked={focus === key} onChange={() => setFocus(key)} />
                  <span className="choice-card__control" aria-hidden="true" />
                  <span><strong>{option.label}</strong><small>{option.prompt}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="tool-step">
            <legend>
              <span className="step-kicker">Step 2 · Capture a moment</span>
              What actually happened?
            </legend>
            <p className="step-intro">{focusOptions[focus].prompt}</p>
            <label className="field-label" htmlFor="moment">
              One specific example <span>(optional)</span>
            </label>
            <textarea
              id="moment"
              value={moment}
              onChange={(event) => setMoment(event.target.value)}
              rows={4}
              maxLength={600}
              placeholder="For example: I opened the email, reread it four times and still could not reply."
            />
            <p className="field-help">Describe what could be observed. Leave out names and identifying details.</p>

            <div className="sub-question">
              <p className="field-label" id="capacity-label">How available did your capacity feel at the time?</p>
              <div className="option-grid option-grid--capacity" role="radiogroup" aria-labelledby="capacity-label">
                {capacityOptions.map(([key, label, description]) => (
                  <label className={`choice-card choice-card--small ${capacity === key ? "is-selected" : ""}`} key={key}>
                    <input type="radio" name="capacity" value={key} checked={capacity === key} onChange={() => setCapacity(key)} />
                    <span className="choice-card__control" aria-hidden="true" />
                    <span><strong>{label}</strong><small>{description}</small></span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="tool-step">
            <legend>
              <span className="step-kicker">Step 3 · Notice the conditions</span>
              What was present around the moment?
            </legend>
            <p className="step-intro">Select any that may matter. Presence does not prove cause.</p>
            <div className="chip-grid">
              {conditionOptions.map((condition) => (
                <label className={`condition-chip ${conditions.includes(condition) ? "is-selected" : ""}`} key={condition}>
                  <input type="checkbox" checked={conditions.includes(condition)} onChange={() => toggleCondition(condition)} />
                  <span aria-hidden="true">{conditions.includes(condition) ? "✓" : "+"}</span>
                  {condition}
                </label>
              ))}
            </div>
            <label className="field-label field-label--spaced" htmlFor="other-condition">Something else <span>(optional)</span></label>
            <input
              id="other-condition"
              type="text"
              value={otherCondition}
              onChange={(event) => setOtherCondition(event.target.value)}
              maxLength={160}
              placeholder="A condition not listed above"
            />

            <div className="sub-question">
              <p className="field-label" id="impact-label">What is your best current reading of its effect?</p>
              <div className="option-grid option-grid--impact" role="radiogroup" aria-labelledby="impact-label">
                {impactOptions.map(([key, label, description]) => (
                  <label className={`choice-card choice-card--small ${impact === key ? "is-selected" : ""}`} key={key}>
                    <input type="radio" name="impact" value={key} checked={impact === key} onChange={() => setImpact(key)} />
                    <span className="choice-card__control" aria-hidden="true" />
                    <span><strong>{label}</strong><small>{description}</small></span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="tool-step">
            <legend>
              <span className="step-kicker">Step 4 · Choose a small test</span>
              What is one reversible change?
            </legend>
            <p className="step-intro">A useful experiment can be tiny. “Observe once more” is a valid choice.</p>
            <div className="option-grid option-grid--experiment">
              {experimentOptions.map(([key, label, description]) => (
                <label className={`choice-card choice-card--small ${experiment === key ? "is-selected" : ""}`} key={key}>
                  <input type="radio" name="experiment" value={key} checked={experiment === key} onChange={() => setExperiment(key)} />
                  <span className="choice-card__control" aria-hidden="true" />
                  <span><strong>{label}</strong><small>{description}</small></span>
                </label>
              ))}
            </div>

            <label className="field-label field-label--spaced" htmlFor="review">What will you look for afterwards? <span>(optional)</span></label>
            <input
              id="review"
              type="text"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              maxLength={240}
              placeholder="For example: whether replying in writing reduces the recovery I need."
            />

            <div className="map-summary" aria-live="polite">
              <div className="map-summary__heading">
                <div><p className="mini-label">Your working map</p><h3>One observation. One possible test.</h3></div>
                <span>Not a verdict</span>
              </div>
              <pre>{summary}</pre>
              <div className="summary-actions">
                <button className="button button--primary" type="button" onClick={copySummary}>{copyState}</button>
                <button className="button button--outline" type="button" onClick={downloadSummary}>Download .txt</button>
                <button className="text-button" type="button" onClick={() => window.print()}>Print</button>
              </div>
            </div>
          </fieldset>
        )}

        <div className="tool-navigation">
          {step > 1 ? <button className="button button--outline" type="button" onClick={back}>Back</button> : <span />}
          {step < 4 && <button className="button button--primary" type="button" onClick={next}>Continue <span aria-hidden="true">→</span></button>}
        </div>
      </form>
    </div>
  );
}

function LowCapacityTool({ onSwitch }: { onSwitch: () => void }) {
  const [choice, setChoice] = useState<(typeof lowCapacityOptions)[number] | null>(null);
  const [copyState, setCopyState] = useState("Copy the words");

  const copyScript = async () => {
    if (!choice) return;
    try {
      await navigator.clipboard.writeText(choice.script);
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy the words"), 1800);
    } catch {
      setCopyState("Select the words to copy");
    }
  };

  return (
    <div className="map-tool map-tool--low">
      <div className="map-tool__header">
        <div>
          <p className="mini-label">30-second version</p>
          <h2>What might reduce the next ten minutes?</h2>
        </div>
        <button className="capacity-switch" type="button" onClick={onSwitch}>I can use the fuller version</button>
      </div>
      <p className="low-tool-intro">Choose one. You are not committing to a plan for the rest of the day.</p>

      <div className="low-tool-options">
        {lowCapacityOptions.map((option) => (
          <button
            type="button"
            key={option.key}
            className={choice?.key === option.key ? "is-selected" : ""}
            onClick={() => setChoice(option)}
            aria-pressed={choice?.key === option.key}
          >
            <span aria-hidden="true">{choice?.key === option.key ? "✓" : "+"}</span>
            {option.label}
          </button>
        ))}
      </div>

      {choice ? (
        <div className="low-result" aria-live="polite">
          <p className="mini-label">One possible next step</p>
          <h3>{choice.action}</h3>
          <div className="script-box">
            <p>Words you can borrow</p>
            <blockquote>“{choice.script}”</blockquote>
            <button className="button button--small button--ink" type="button" onClick={copyScript}>{copyState}</button>
          </div>
          <p className="quiet-note">Stop here. This does not need to solve the day.</p>
        </div>
      ) : (
        <div className="low-result low-result--empty">
          <p>You only need to make one choice. The next step will appear here.</p>
        </div>
      )}
    </div>
  );
}
