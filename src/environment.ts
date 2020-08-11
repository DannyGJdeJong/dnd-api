interface EnvVariable {
  (key: string, required?: true): string;
  (key: string, required?: false): string | undefined;
}

export const getEnvVariable: EnvVariable = (key: string, required = true) => {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Environement variable '${key}' is not specified`);
  }

  return value!;
}
