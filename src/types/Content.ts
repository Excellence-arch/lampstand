// src/types/Content.ts
export interface Content {
  id: string;
  title: string;
  description: string;
  body: string;
  contentType: string; // contentType must be one of these values
}
