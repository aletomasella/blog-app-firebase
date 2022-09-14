import { Timestamp } from "firebase/firestore";

export interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  category: string;
  imageUrl: string;
  tags: string[];
  trending: "YES" | "NO";
  timestape: Timestamp;
}
