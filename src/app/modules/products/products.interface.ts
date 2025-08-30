import { Types } from "mongoose";

type TCategory =
  | "smartphone"
  | "tablet"
  | "laptop"
  | "smartwatch"
  | "headphone"
  | "speaker"
  | "console"
  | "camera"
  | "drone"
  | "gaming"
  | "vr"
  | "audio"
  | "television"
  | "accessory";

type TOperatingSystem =
  | "iOS"
  | "Android"
  | "Windows"
  | "macOS"
  | "Linux"
  | "ipadOS"
  | "tvOS"
  | "watchOS"
  | "Other";
type TConnectivity =
  | "WiFi"
  | "Bluetooth"
  | "NFC"
  | "GPS"
  | "4G"
  | "5G"
  | "USB"
  | "HDMI"
  | "Thunderbolt";

type TPowerSource = "Battery" | "Plug-in" | "Battery & Plug-in";

export type TFeature = {
  // cameraResolution?: string;
  // storageCapacity?: string;
  // screenSize?: string;
  [key: string]: any; // Additional features can be added dynamically
};

export type TDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type TProduct = {
  name: string;
  price: number;
  imageURL: string;
  seller_id: Types.ObjectId;
  quantity: number;
  releaseDate: Date;
  brand: string;
  modelNo: string;
  category: TCategory;
  operatingSystem?: TOperatingSystem;
  connectivity: TConnectivity[];
  powerSource: TPowerSource;
  features: TFeature;
  weight?: number;
  dimensions?: TDimensions;
  compatibility?: string[];
};

// // static methods
// export interface staticProductModel extends Model<TProduct> {
//   isProductExist(name: string): Promise<TProduct>;
// }
