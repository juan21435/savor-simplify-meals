
export type ScrapbookItemType = 'note' | 'image' | 'video' | 'link';

export type ScrapbookItem = {
  id: string;
  type: ScrapbookItemType;
  content: string;
  caption?: string;
  date: string;
  title: string;
};

export type ScrapbookEntry = {
  id: string;
  date: string;
  title: string;
  items: ScrapbookItem[];
};
