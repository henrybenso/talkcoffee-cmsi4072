export default function RatingButton({ onButtonClicked }) {
  return (
    <div>
      <button
        className="px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:bg-yellow-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
        onClick={() => onButtonClicked(1)}
        value="1"
      >
        1
      </button>
      <button
        className="px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:bg-yellow-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
        onClick={() => onButtonClicked(2)}
        value="2"
      >
        2
      </button>
      <button
        className="px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:bg-yellow-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
        onClick={() => onButtonClicked(3)}
        value="3"
      >
        3
      </button>
      <button
        className="px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:bg-yellow-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
        onClick={() => onButtonClicked(4)}
        value="4"
      >
        4
      </button>
      <button
        className="px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:bg-yellow-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
        onClick={() => onButtonClicked(5)}
        value="5"
      >
        5
      </button>
    </div>
  );
}
