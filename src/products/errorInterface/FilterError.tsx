interface FilterErrorProps {
  containerClass: string;
  title: string;
}

function FilterError({ containerClass = "", title }: FilterErrorProps) {
  return (
    <div className={containerClass}>
      <div className="mb-3 text-xs">{title}</div>
      <div className="text-xs text-red-500">Error al cargar el filtro</div>
    </div>
  );
}
