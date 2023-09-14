export default function RatingButton(props: { ratingNumber: number }) {
  return (
    <button className="px-4 py-1 text-sm font-semibold rounded-full border hover:text-white hover:bg-yellow-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2">
      {props.ratingNumber}
    </button>
  );
}
