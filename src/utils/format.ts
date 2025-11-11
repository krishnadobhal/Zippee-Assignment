export function cmToMeters(val: string): string {
    if (val === "unknown") return "Unknown";
    const n = Number(val);
    return Number.isNaN(n) ? "Unknown" : (n / 100).toFixed(2) + " m";
}

export function massKg(val: string): string {
    if (val === "unknown") return "Unknown";
    const n = Number(val.replace(",", ""));
    return Number.isNaN(n) ? "Unknown" : n + " kg";
}

export function formatDate(iso: string) {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
        d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
}

//Generates a color based on species name
export const getSpeciesColor = (speciesName?: string) => {
    if (!speciesName) return "#ffffff"

    let hash = 0;
    for (let i = 0; i < speciesName.length; i++) {
        hash = speciesName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 40%, 50%)`;
};