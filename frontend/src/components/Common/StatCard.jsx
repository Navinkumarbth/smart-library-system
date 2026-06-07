function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded shadow-sm px-4 py-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded bg-gray-900 text-white flex items-center justify-center text-sm">
        {icon}
      </div>
      <div className="text-sm">
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;


