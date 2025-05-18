// src/pages/functions/dateCalculator/components/DurationConfig.jsx
import React from "react";
import SearchableSelect from "../../../../components/filters/SearchableSelect";

const durationUnits = [
  { label: "🕒 Seconds", value: "second" },
  { label: "⏱ Minutes", value: "minute" },
  { label: "🕰 Hours", value: "hour" },
  { label: "📆 Days", value: "day" },
];

const durationModes = [
  { label: "🔢 Fixed Duration", value: "fixed" },
  { label: "📄 From Column", value: "column" },
];

const operations = [
  { label: "➕ Add", value: "add" },
  { label: "➖ Subtract", value: "subtract" },
];

const DurationConfig = ({
  headers,
  mode,
  setMode,
  operation,
  setOperation,
  durationUnit,
  setDurationUnit,
  fixedDuration,
  setFixedDuration,
  durationColumn,
  setDurationColumn,
  dateColumn,
  setDateColumn,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <SearchableSelect
          label="📅 Date Column"
          options={headers}
          value={dateColumn}
          onChange={setDateColumn}
        />

        <SearchableSelect
          label="🧮 Duration Mode"
          options={durationModes.map((d) => d.label)}
          value={durationModes.find((m) => m.value === mode)?.label || ""}
          onChange={(label) =>
            setMode(
              durationModes.find((m) => m.label === label)?.value || "fixed"
            )
          }
        />

        <SearchableSelect
          label="🔁 Operation"
          options={operations.map((o) => o.label)}
          value={operations.find((o) => o.value === operation)?.label || ""}
          onChange={(label) =>
            setOperation(
              operations.find((o) => o.label === label)?.value || "add"
            )
          }
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mode === "fixed" ? (
          <div>
            <label className="text-sm text-gray-400">📏 Duration Amount</label>
            <input
              type="number"
              className="w-full bg-gray-800 p-2 rounded"
              value={fixedDuration}
              onChange={(e) => setFixedDuration(Number(e.target.value))}
              placeholder="e.g. 7"
            />
          </div>
        ) : (
          <SearchableSelect
            label="🧾 Duration Column"
            options={headers}
            value={durationColumn}
            onChange={setDurationColumn}
          />
        )}

        <SearchableSelect
          label="⏱️ Duration Unit"
          options={durationUnits.map((u) => u.label)}
          value={
            durationUnits.find((u) => u.value === durationUnit)?.label || ""
          }
          onChange={(label) =>
            setDurationUnit(
              durationUnits.find((u) => u.label === label)?.value || "second"
            )
          }
        />
      </div>
    </>
  );
};

export default DurationConfig;
