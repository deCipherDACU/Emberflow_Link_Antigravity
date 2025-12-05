export interface LifeArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subAreas: LifeArea[];
}
