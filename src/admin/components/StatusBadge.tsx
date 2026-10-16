interface StatusBadgeProps {
  status: 'published' | 'draft' | 'urgent' | string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles = {
    published: 'bg-green-100 text-green-700 border-green-200',
    draft: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    urgent: 'bg-red-100 text-red-700 border-red-200',
    notice: 'bg-blue-100 text-blue-700 border-blue-200',
    event: 'bg-purple-100 text-purple-700 border-purple-200',
    result: 'bg-amber-100 text-amber-700 border-amber-200',
    admission: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };

  const style = styles[status as keyof typeof styles] || styles.draft;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`}>
      {label || status}
    </span>
  );
}
