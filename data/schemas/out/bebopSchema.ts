import { BebopView, BebopRuntimeError, BebopRecord, BebopJson, BebopTypeGuard, Guid, GuidMap } from "bebop";

export interface IItem extends BebopRecord {
  x?: number;
  y?: number;
  z?: number;
}

export class Item implements IItem {
  public x?: number;
  public y?: number;
  public z?: number;

  constructor(record: IItem) {
    this.x = record.x;
    this.y = record.y;
    this.z = record.z;
  }

  /**
   * Serializes the current instance into a JSON-Over-Bebop string
   */
  public toJSON(): string {
    return Item.encodeToJSON(this);
  }

  /**
   * Serializes the specified object into a JSON-Over-Bebop string
   */
  public static encodeToJSON(record: IItem): string {
    return JSON.stringify(record, BebopJson.replacer);
  }

  /**
   * Validates that the runtime types of members in the current instance are correct.
   */
  public validateTypes(): void {
    Item.validateCompatibility(this);
  }

  /**
   * Validates that the specified dynamic object can become an instance of {@link Item}.
   */
  public static validateCompatibility(record: IItem): void {
    if (record.x !== undefined) {
      BebopTypeGuard.ensureInt32(record.x)
    }
    if (record.y !== undefined) {
      BebopTypeGuard.ensureFloat(record.y)
    }
    if (record.z !== undefined) {
      BebopTypeGuard.ensureFloat(record.z)
    }
  }

  /**
   * Unsafely creates an instance of {@link Item} from the specified dynamic object. No type checking is performed.
   */
  public static unsafeCast(record: any): IItem {
      return new Item(record);
  }

  /**
   * Creates a new {@link Item} instance from a JSON-Over-Bebop string. Type checking is performed.
   */
  public static fromJSON(json: string): IItem {
    if (typeof json !== 'string' || json.trim().length === 0) {
      throw new BebopRuntimeError(`Item.fromJSON: expected string`);
    }
    const parsed = JSON.parse(json, BebopJson.reviver);
    Item.validateCompatibility(parsed);
    return Item.unsafeCast(parsed);
  }
  public encode(): Uint8Array {
    return Item.encode(this);
  }

  public static encode(record: IItem): Uint8Array {
    const view = BebopView.getInstance();
    view.startWriting();
    Item.encodeInto(record, view);
    return view.toArray();
  }

  public static encodeInto(record: IItem, view: BebopView): number {
    const before = view.length;
    const pos = view.reserveMessageLength();
    const start = view.length;
    if (record.x !== undefined) {
      view.writeByte(1);
      view.writeInt32(record.x);
    }
    if (record.y !== undefined) {
      view.writeByte(2);
      view.writeFloat64(record.y);
    }
    if (record.z !== undefined) {
      view.writeByte(3);
      view.writeFloat64(record.z);
    }
    view.writeByte(0);
    const end = view.length;
    view.fillMessageLength(pos, end - start);
    const after = view.length;
    return after - before;
  }

  public static decode(buffer: Uint8Array): IItem {
    const view = BebopView.getInstance();
    view.startReading(buffer);
    return Item.readFrom(view);
  }

  public static readFrom(view: BebopView): IItem {
    let message: IItem = {};
    const length = view.readMessageLength();
    const end = view.index + length;
    while (true) {
      switch (view.readByte()) {
        case 0:
          return new Item(message);

        case 1:
          message.x = view.readInt32();
          break;

        case 2:
          message.y = view.readFloat64();
          break;

        case 3:
          message.z = view.readFloat64();
          break;

        default:
          view.index = end;
          return new Item(message);
      }
    }
  }
}

export interface IData extends BebopRecord {
  items?: Array<IItem>;
}

export class Data implements IData {
  public items?: Array<IItem>;

  constructor(record: IData) {
    this.items = record.items;
  }

  /**
   * Serializes the current instance into a JSON-Over-Bebop string
   */
  public toJSON(): string {
    return Data.encodeToJSON(this);
  }

  /**
   * Serializes the specified object into a JSON-Over-Bebop string
   */
  public static encodeToJSON(record: IData): string {
    return JSON.stringify(record, BebopJson.replacer);
  }

  /**
   * Validates that the runtime types of members in the current instance are correct.
   */
  public validateTypes(): void {
    Data.validateCompatibility(this);
  }

  /**
   * Validates that the specified dynamic object can become an instance of {@link Data}.
   */
  public static validateCompatibility(record: IData): void {
    if (record.items !== undefined) {
      BebopTypeGuard.ensureArray(record.items, Item.validateCompatibility);
    }
  }

  /**
   * Unsafely creates an instance of {@link Data} from the specified dynamic object. No type checking is performed.
   */
  public static unsafeCast(record: any): IData {
      return new Data(record);
  }

  /**
   * Creates a new {@link Data} instance from a JSON-Over-Bebop string. Type checking is performed.
   */
  public static fromJSON(json: string): IData {
    if (typeof json !== 'string' || json.trim().length === 0) {
      throw new BebopRuntimeError(`Data.fromJSON: expected string`);
    }
    const parsed = JSON.parse(json, BebopJson.reviver);
    Data.validateCompatibility(parsed);
    return Data.unsafeCast(parsed);
  }
  public encode(): Uint8Array {
    return Data.encode(this);
  }

  public static encode(record: IData): Uint8Array {
    const view = BebopView.getInstance();
    view.startWriting();
    Data.encodeInto(record, view);
    return view.toArray();
  }

  public static encodeInto(record: IData, view: BebopView): number {
    const before = view.length;
    const pos = view.reserveMessageLength();
    const start = view.length;
    if (record.items !== undefined) {
      view.writeByte(1);
      {
      const length0 = record.items.length;
      view.writeUint32(length0);
      for (let i0 = 0; i0 < length0; i0++) {
        Item.encodeInto(record.items[i0], view)
      }
    }
    }
    view.writeByte(0);
    const end = view.length;
    view.fillMessageLength(pos, end - start);
    const after = view.length;
    return after - before;
  }

  public static decode(buffer: Uint8Array): IData {
    const view = BebopView.getInstance();
    view.startReading(buffer);
    return Data.readFrom(view);
  }

  public static readFrom(view: BebopView): IData {
    let message: IData = {};
    const length = view.readMessageLength();
    const end = view.index + length;
    while (true) {
      switch (view.readByte()) {
        case 0:
          return new Data(message);

        case 1:
          {
        let length0 = view.readUint32();
        message.items = new Array<IItem>(length0);
        for (let i0 = 0; i0 < length0; i0++) {
          let x0: IItem;
          x0 = Item.readFrom(view);
          message.items[i0] = x0;
        }
      }
          break;

        default:
          view.index = end;
          return new Data(message);
      }
    }
  }
}

