// src/utils/parseQuantity.ts
interface QuantityInfo {
    quantity: number;
    unit: string;
}

export function parseQuantity(productName: string): QuantityInfo {
if (!productName) {
        return { quantity: 1, unit: "개" };
    }
    
    const patterns: { regex: RegExp; unit: string }[] = [
        { regex: /(\d+(?:\.\d+)?)\s*개입/i, unit: "개입" },
        { regex: /(\d+(?:\.\d+)?)\s*개/i, unit: "개" },
        { regex: /(\d+(?:\.\d+)?)\s*kg/i, unit: "kg" },
        { regex: /(\d+(?:\.\d+)?)\s*g/i, unit: "g" },
        { regex: /(\d+(?:\.\d+)?)\s*ml/i, unit: "ml" },
        { regex: /(\d+(?:\.\d+)?)\s*L/i, unit: "L" },
        { regex: /(\d+(?:\.\d+)?)\s*봉지/i, unit: "봉지" },
        { regex: /(\d+(?:\.\d+)?)\s*병/i, unit: "병" },
        { regex: /(\d+(?:\.\d+)?)\s*캔/i, unit: "캔" },
    ];
    
    for (let i = 0; i < patterns.length; i++) {
        const { regex, unit } = patterns[i];
        
        const match = productName.match(regex);
        
        if (match) {
            let result;
            if (regex.source.includes('EA')) {
                result = { quantity: parseInt(match[2]), unit };
            } else {
                result = { quantity: parseFloat(match[1]), unit };
            }
            
            return result;
        }
    }
    const defaultResult = { quantity: 1, unit: "개" };
    
    return defaultResult;
}
