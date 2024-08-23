import type { WebContext } from 'brisa';

export default function CounterWC(
  { start = 0, color = '#2cebcf' }: { start?: number; color?: string },
  { state, css }: WebContext,
) {
  const count = state(start);

  css`
    button {
      background-color: ${color};
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px;
      margin: 5px;
      cursor: pointer;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  return (
    <div>
      <button onClick={() => count.value++}>+</button>
      {count.value}
      <button onClick={() => count.value--}>-</button>
    </div>
  );
}
