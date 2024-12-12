export interface FormulaInputsMetadata {
  customInputNames: string[];
  systemInputNames: string[];
}

export interface FormulaCompilation {
  ast: string | Record<string, unknown>;
  version: number;
  astCompressed?: boolean;
}

export type FormulaCompilationWithInputs = FormulaInputsMetadata & FormulaCompilation;
