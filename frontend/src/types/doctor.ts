export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
  location?: string;
  about?: string;
}