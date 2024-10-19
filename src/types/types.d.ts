

export interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export interface UserProps{
  name?:string,
  email:string,
  password:string
}

export interface LinkType {
  id: string; // Changed to string to match uuid
  platform: string;
  url: string;
}

export interface userDataProps{
  name:string,
  email:string,
  links:LinkType[],
  image:string
}