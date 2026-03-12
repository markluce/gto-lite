import { useState, useMemo } from "react";
import {
  ranks,
  positions,
  getHandName,
  rangesByPosition,
  calcRangePercent,
} from "../data/preflopData";

function PreflopTrainer() {
  const [posIdx, setPosIdx] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);

  const pos = positions[posIdx];
  const grid = rangesByPosition[pos.id];
  const rangePercent = useMemo(() => calcRangePercent(grid), [grid]);

  const nextSeat = () => {
    setPosIdx((i) => (i + 1) % positions.length);
    setSelectedCell(null);
  };

  const prevSeat = () => {
    setPosIdx((i) => (i - 1 + positions.length) % positions.length);
    setSelectedCell(null);
  };

  return (
    <div>
      {/* Position Bar */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden mb-4">
        {/* Top bar: game info */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border text-xs">
          <span className="text-text-secondary font-mono">
            Cash 100bb
          </span>
          <span className="text-accent-light font-semibold">
            {pos.id}{" "}
            <span className="text-text-secondary font-normal">100</span>
          </span>
          <span className="text-text-secondary">
            RFI Open
          </span>
        </div>

        {/* Position selector */}
        <div className="flex items-center border-b border-border">
          {positions.map((p, i) => (
            <button
              key={p.id}
              className={`flex-1 py-2.5 text-center text-xs font-bold border-none cursor-pointer transition-all duration-200 ${
                i === posIdx
                  ? "text-bg"
                  : "text-text-secondary hover:text-text bg-transparent"
              }`}
              style={
                i === posIdx
                  ? { backgroundColor: p.color, color: "#fff" }
                  : {}
              }
              onClick={() => {
                setPosIdx(i);
                setSelectedCell(null);
              }}
            >
              <div>{p.id}</div>
              <div className="text-[0.6rem] font-normal opacity-80">100</div>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between px-3 py-2 text-xs">
          <div>
            <span className="text-text-secondary">Range: </span>
            <span className="text-accent-light font-bold">{rangePercent}%</span>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: "#22c55e" }}
              />
              <span className="text-text-secondary">Raise</span>
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: "#dc2626" }}
              />
              <span className="text-text-secondary">Mixed</span>
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: "#1e293b" }}
              />
              <span className="text-text-secondary">Fold</span>
            </span>
          </div>
        </div>
      </div>

      {/* 13x13 Hand Matrix */}
      <div className="rounded-xl border border-border overflow-hidden mb-4">
        <div
          className="grid gap-px p-px"
          style={{
            gridTemplateColumns: "repeat(13, 1fr)",
            backgroundColor: "var(--t-border)",
          }}
        >
          {ranks.map((_, row) =>
            ranks.map((_, col) => {
              const freq = grid[row][col];
              const hand = getHandName(row, col);
              const isPair = row === col;
              const isSuited = col > row;
              const isSelected =
                selectedCell &&
                selectedCell[0] === row &&
                selectedCell[1] === col;

              // Color based on frequency
              let bgColor;
              let textColor = "#fff";
              if (freq >= 80) {
                bgColor = "#16a34a"; // strong green
              } else if (freq >= 50) {
                bgColor = "#dc2626"; // red = mixed
              } else if (freq >= 20) {
                bgColor = "#991b1b"; // dark red = mostly fold
                textColor = "#fca5a5";
              } else {
                bgColor = "#0f172a"; // fold = dark
                textColor = "#475569";
              }

              return (
                <button
                  key={`${row}-${col}`}
                  className={`aspect-square flex items-center justify-center text-[0.55rem] sm:text-xs font-mono font-semibold border-none cursor-pointer transition-all duration-100 leading-none ${
                    isSelected ? "ring-2 ring-white z-10" : ""
                  }`}
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                  onClick={() => setSelectedCell([row, col])}
                >
                  {hand}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Selected Hand Detail */}
      {selectedCell && (
        <div className="rounded-xl border border-border bg-surface px-4 py-3 mb-4">
          <HandDetail
            row={selectedCell[0]}
            col={selectedCell[1]}
            grid={grid}
            posName={pos.id}
            posColor={pos.color}
          />
        </div>
      )}

      {/* Next Seat Button */}
      <div className="flex gap-3">
        <button
          onClick={prevSeat}
          className="flex-1 py-3 rounded-xl border border-border bg-surface text-text-secondary text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-surface-hover"
        >
          ← {positions[(posIdx - 1 + positions.length) % positions.length].id}
        </button>
        <button
          onClick={nextSeat}
          className="flex-1 py-3 rounded-xl border-none text-sm font-bold cursor-pointer transition-all duration-200 hover:opacity-90"
          style={{
            backgroundColor: positions[(posIdx + 1) % positions.length].color,
            color: "#fff",
          }}
        >
          下一位：{positions[(posIdx + 1) % positions.length].id} →
        </button>
      </div>
    </div>
  );
}

function HandDetail({ row, col, grid, posName, posColor }) {
  const hand = getHandName(row, col);
  const freq = grid[row][col];
  const isPair = row === col;
  const isSuited = col > row;
  const combos = isPair ? 6 : isSuited ? 4 : 12;
  const type = isPair ? "Pocket Pair" : isSuited ? "Suited" : "Offsuit";

  let action;
  if (freq >= 80) action = { label: "Raise", color: "#16a34a" };
  else if (freq >= 50) action = { label: "Mixed", color: "#dc2626" };
  else if (freq >= 20) action = { label: "Mostly Fold", color: "#991b1b" };
  else action = { label: "Fold", color: "#475569" };

  return (
    <div className="flex items-center gap-4">
      <div
        className="text-2xl font-bold font-mono px-3 py-2 rounded-lg"
        style={{ backgroundColor: `${posColor}20`, color: posColor }}
      >
        {hand}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: `${action.color}30`, color: action.color === "#475569" ? "#94a3b8" : action.color }}
          >
            {action.label}
          </span>
          <span className="text-xs text-text-secondary">{type}</span>
          <span className="text-xs text-text-secondary">{combos} combos</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">{posName}:</span>
          {freq > 0 ? (
            <>
              <div className="flex-1 h-2 rounded-full bg-border overflow-hidden max-w-[120px]">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${freq}%`,
                    backgroundColor: freq >= 80 ? "#16a34a" : "#dc2626",
                  }}
                />
              </div>
              <span className="text-xs font-mono text-accent-light">
                Raise {freq}%
              </span>
            </>
          ) : (
            <span className="text-xs text-text-secondary">Fold</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreflopTrainer;
