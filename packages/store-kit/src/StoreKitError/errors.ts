export type StoreKitErrorName = 'metadata:unexpected_metadata';
type StoreKitErrorCode = 0;
type StoreKitErrorType = 'Metadata';
type StoreKitErrorDescription = string;
type StoreKitErrorDetail = {
  code: StoreKitErrorCode;
  type: StoreKitErrorType;
  description: StoreKitErrorDescription;
};

const errors: Record<StoreKitErrorName, StoreKitErrorDetail> = {
  'metadata:unexpected_metadata': {
    code: 0,
    type: 'Metadata',
    description: 'Неожиданные метаданные',
  },
};

export function generateErrorMessage(errorName: StoreKitErrorName) {
  const { code, type, description } = errors[errorName];
  return `${description}. ${type}:${code}`;
}
