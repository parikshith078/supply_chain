export enum ActorType {
  FARMER = "FARMER",
  PROCESSOR = "PROCESSOR",
  DISTRIBUTOR = "DISTRIBUTOR",
  RETAILER = "RETAILER",
}
export type UserPublicData = {
  actorType: ActorType;
  recordId: string;
  registered: boolean;
};
