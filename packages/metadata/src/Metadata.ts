export type MetadataType = string | symbol;

export default abstract class Metadata {
  public readonly type: MetadataType;

  constructor(type: MetadataType) {
    this.type = type;
  }
}
