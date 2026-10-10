type LoadingProps = {
  title: string;
};

export default function Loading({ title }: LoadingProps) {
  return (
    <div className="flex min-h-87.5 flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-red-500" />

      <p className="mt-4 text-gray-400">
        Loading {title}...
      </p>
    </div>
  );
}