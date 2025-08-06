// src/utils/parseQuantity.ts
interface QuantityInfo {
    quantity: number;
    unit: string;
}

export function parseQuantity(productName: string): QuantityInfo {
    if (!productName) return { quantity: 1, unit: "개" };
    const patterns: { regex: RegExp; unit: string }[] = [
        { regex: /([0-9]+(?:\.[0-9]+)?)\s*개입/i, unit: "개입" },
        { regex: /([0-9]+(?:\.[0-9]+)?)\s*개/i, unit: "개" },
        { regex: /([0-9]+(?:\.[0-9]+)?)\s*kg/i, unit: "kg" },
        { regex: /([0-9]+(?:\.[0-9]+)?)\s*g/i, unit: "g" },
        { regex: /([0-9]+(?:\.[0-9]+)?)\s*ml/i, unit: "ml" },
        { regex: /([0-9]+(?:\.[0-9]+)?)\s*l/i, unit: "L" },
    ];
    for (const { regex, unit } of patterns) {
        const match = productName.match(regex);
        if (match) {
            return { quantity: parseFloat(match[1]), unit };
        }
    }
    return { quantity: 1, unit: "개" };
}
