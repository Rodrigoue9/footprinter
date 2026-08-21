/**
 * tscircuit / pgstrap PGlite in-memory type generator helper
 */
export interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
}

export function mapPostgresTypeToTypeScript(pgType: string): string {
  const normalized = pgType.toLowerCase();
  if (normalized.includes('int') || normalized.includes('float') || normalized.includes('numeric') || normalized.includes('real')) {
    return 'number';
  }
  if (normalized.includes('bool')) {
    return 'boolean';
  }
  if (normalized.includes('json')) {
    return 'Record<string, any>';
  }
  if (normalized.includes('date') || normalized.includes('time')) {
    return 'Date | string';
  }
  return 'string';
}

export function generateInterface(tableName: string, columns: ColumnDefinition[]): string {
  const fields = columns.map(c => `  ${c.name}${c.nullable ? '?' : ''}: ${mapPostgresTypeToTypeScript(c.type)};`).join('\n');
  return `export interface ${tableName} {\n${fields}\n}`;
}
