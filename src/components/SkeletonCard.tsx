export default function SkeletonCard() {
    return (
        <div className="animate-pulse p-4 rounded-xl cursor-pointer hover:bg-slate-50 transition flex items-center gap-4 bg-white w-full">
            <div className="h-20 w-20 rounded-lg bg-slate-200 flex items-center justify-center">
                <div className="w-12 h-12 bg-slate-300 rounded-full" />
            </div>
            <div className="flex-1 space-y-3">
                <div className="h-6 w-1/2 bg-slate-200 rounded" />
                <div className="h-4 w-1/3 bg-slate-200 rounded" />
                <div className="flex gap-2 mt-2">
                    <div className="h-4 w-1/4 bg-slate-200 rounded" />
                    <div className="h-4 w-1/4 bg-slate-200 rounded" />
                </div>
            </div>
        </div>
    );
}
