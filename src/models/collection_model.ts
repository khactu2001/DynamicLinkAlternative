export type Collection = {
  id: number;
  title: string;
  description: string;
  published_at: Date;
  last_collected_at: Date;
  updated_at: Date;
  total_photos: number;
  private: boolean;
  share_key: string;
  cover_photo: CoverPhoto;
  user: User;
  links: CollectionLinks;
};

export type CoverPhoto = {
  id: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  urls: Urls;
  links: CoverPhotoLinks;
};

export type CoverPhotoLinks = {
  self: string;
  html: string;
  download: string;
};

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  profile_image: ProfileImage;
  links: UserLinks;
  updated_at?: Date;
};

export type UserLinks = {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
};

export type ProfileImage = {
  small: string;
  medium: string;
  large: string;
};

export type CollectionLinks = {
  self: string;
  html: string;
  photos: string;
  related: string;
};
