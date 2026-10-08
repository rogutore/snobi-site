/* The SCA/SCAJ cupping scale drawn to scale: 0–100, with the 80+ band that defines specialty coffee.
   Source: SCAJ (scaj.org/about/specialty-coffee) and the SCA cupping protocol's 80-point threshold. */
const TICKS = [0, 20, 40, 60, 80, 100];

export function ScoreScale() {
  const W = 560, H = 120, L = 16, R = 16, Y = 64;
  const x = (v: number) => L + ((W - L - R) * v) / 100;
  return (
    <svg className="v3-scale" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="カッピングスコア0〜100点のうち、80点以上がスペシャルティ">
      <rect x={x(0)} y={Y - 6} width={x(100) - x(0)} height={12} rx={6} className="track" />
      <rect x={x(80)} y={Y - 6} width={x(100) - x(80)} height={12} rx={6} className="band" />
      {TICKS.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={Y + 10} y2={Y + 16} className="tick" />
          <text x={x(t)} y={Y + 34} textAnchor="middle" className="lbl">{t}</text>
        </g>
      ))}
      <text x={x(100)} y={Y - 18} textAnchor="end" className="band-lbl">80点以上 = スペシャルティ</text>
      <text x={x(0)} y={22} className="cap">CUPPING SCORE</text>
    </svg>
  );
}
