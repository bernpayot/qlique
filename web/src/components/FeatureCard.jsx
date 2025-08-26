export default function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-2xl flex flex-col items-start space-y-4">
      <div
        className={`h-12 w-12 flex items-center justify-center rounded-full ${bgColor}`}
      >
        <img src={icon} alt={title} className="h-6 w-6 object-contain" />
      </div>

      <div>
        <h3 className="poppins text-black font-bold">{title}</h3>
        <p className="poppins text-black text-sm">{description}</p>
      </div>
    </div>
  );
}

