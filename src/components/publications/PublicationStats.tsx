interface PublicationStatsProps {
  total: number;
}

function PublicationStats({ total }: PublicationStatsProps) {
  return (
    <p className="mt-4 text-sm font-semibold text-primary">
      {total} Publication{total === 1 ? "" : "s"}
    </p>
  );
}

export default PublicationStats;
