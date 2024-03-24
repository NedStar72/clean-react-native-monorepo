import Metadata from '../Metadata';
import defineMetadata from './defineMetadata';
import hasMetadata from './hasMetadata';

function defineOrAppendMetadata<T extends Metadata>(
  target: Object,
  metadata: T,
  propertyKey?: string | symbol,
) {
  const metadataType = metadata.type;

  if (hasMetadata(target, metadataType, propertyKey)) {
    const definedMetadataValue = propertyKey
      ? Reflect.getMetadata(metadataType, target, propertyKey)
      : Reflect.getMetadata(metadataType, target);
    const newMetadata = Array.isArray(definedMetadataValue)
      ? [...definedMetadataValue, metadata]
      : [definedMetadataValue, metadata];
    if (propertyKey) {
      Reflect.defineMetadata(metadataType, newMetadata, target, propertyKey);
    } else {
      Reflect.defineMetadata(metadataType, newMetadata, target);
    }
  } else {
    defineMetadata(target, metadata, propertyKey);
  }
}

export default defineOrAppendMetadata;
