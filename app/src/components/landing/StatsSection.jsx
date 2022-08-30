export function StatsSection({ stats }) {
  return (
  <div className="stats-container">
    <h5>Oto podsumowanie Twoich podróży</h5>
    <p>Ilość zorganizowanych: {stats.organized}</p>
    <p>Ilość jako pasażer:</p>
    <p>Ilość cofniętych:</p>
    <p>Data pierwszego wyjazdu:</p>
    <p>Data osatniego wyjazdu:</p>
  </div>);
}
