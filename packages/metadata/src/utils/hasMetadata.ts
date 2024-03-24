import { MetadataType } from '../Metadata';

function hasMetadata(
  target: Object,
  metadataType: MetadataType,
  propertyKey?: string | symbol,
): boolean {
  return propertyKey
    ? Reflect.hasMetadata(metadataType, target, propertyKey)
    : Reflect.hasMetadata(metadataType, target);
}

export default hasMetadata;
